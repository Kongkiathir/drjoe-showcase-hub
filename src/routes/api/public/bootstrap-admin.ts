import { createFileRoute } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Idempotent Root Admin bootstrap.
 *
 * Reads ALL sensitive values from environment variables — nothing is
 * hardcoded in the repo.
 *
 *   ROOT_ADMIN_EMAIL             — email of the root admin
 *   ROOT_ADMIN_PASSWORD          — password to set / reset on that account
 *   ROOT_ADMIN_BOOTSTRAP_TOKEN   — shared secret required to invoke the endpoint
 *
 * Usage (from a trusted terminal, never from the browser):
 *   curl -X POST https://<host>/api/public/bootstrap-admin \
 *        -H "x-bootstrap-token: $ROOT_ADMIN_BOOTSTRAP_TOKEN"
 *
 * Behaviour:
 *   • Creates the auth user if missing (email auto-confirmed)
 *   • Resets the password to ROOT_ADMIN_PASSWORD if the user already exists
 *   • Ensures the "admin" row in public.user_roles is present
 *   • Never echoes the password or token in the response
 */
export const Route = createFileRoute("/api/public/bootstrap-admin")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const email = process.env.ROOT_ADMIN_EMAIL;
        const password = process.env.ROOT_ADMIN_PASSWORD;
        const expectedToken = process.env.ROOT_ADMIN_BOOTSTRAP_TOKEN;

        if (!email || !password || !expectedToken) {
          return json({ error: "root_admin_env_missing" }, 500);
        }

        const provided = request.headers.get("x-bootstrap-token") ?? "";
        if (!constantTimeEqual(provided, expectedToken)) {
          return json({ error: "forbidden" }, 403);
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        let userId: string | null = null;
        const created = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        });

        if (created.data.user) {
          userId = created.data.user.id;
        } else {
          // Already exists — do NOT touch password. Only ensure email is confirmed.
          const { data: list } = await supabaseAdmin.auth.admin.listUsers({
            page: 1,
            perPage: 200,
          });
          const found = list?.users.find((u) => u.email === email);
          if (!found) {
            return json(
              { error: "user_create_failed", detail: created.error?.message ?? "unknown" },
              500,
            );
          }
          userId = found.id;
          if (!found.email_confirmed_at) {
            await supabaseAdmin.auth.admin.updateUserById(userId, {
              email_confirm: true,
            });
          }
        }

        const { error: roleErr } = await supabaseAdmin
          .from("user_roles")
          .upsert({ user_id: userId!, role: "admin" }, { onConflict: "user_id,role" });

        if (roleErr) {
          return json({ error: "role_assign_failed", detail: roleErr.message }, 500);
        }

        return json({ ok: true, email, userId, role: "admin" });
      },
    },
  },
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function constantTimeEqual(a: string, b: string): boolean {
  // Hash first so both buffers are the same length regardless of input length
  const ha = createHash("sha256").update(a, "utf8").digest();
  const hb = createHash("sha256").update(b, "utf8").digest();
  return timingSafeEqual(ha, hb);
}
