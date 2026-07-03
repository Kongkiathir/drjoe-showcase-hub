import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dr. Joe | Muay Thai Intelligence Architect · ดร.โจ | สถาปนิกแห่ง Muay Thai Intelligence" },
      {
        name: "description",
        content:
          "Official website of Dr. Joe, Nopparat Puttarattanamane — Thai sport media executive, Muay Thai innovator, researcher, founder of MUAY O.G., Originals Studio, IDOL FIGHT, IDOL LEAGUE, and Muay Thai Intelligence initiatives. เว็บไซต์ทางการของดร.โจ นพรัตน์ พุทธรัตนมณี — ผู้บริหารด้านสื่อกีฬา นักสร้างสรรค์นวัตกรรมมวยไทย ผู้ริเริ่มแนวคิด Muay Thai Intelligence",
      },
      {
        name: "keywords",
        content:
          "Dr. Joe, Nopparat Puttarattanamane, Muay Thai Intelligence, MUAY O.G., Originals Studio, Muay Thai Archives, THAI FIGHT, IDOL FIGHT, IDOL LEAGUE, Muay Thai Data, Muay Thai AI, Sport Technology, Sport Intelligence, Muay Thai 6.0, ดร.โจ, นพรัตน์ พุทธรัตนมณี, ฐานข้อมูลมวยไทย, AI มวยไทย, เทคโนโลยีกีฬา, มวยไทย 6.0",
      },
      { name: "author", content: "Dr. Joe (Nopparat Puttarattanamane)" },
      { property: "og:title", content: "Dr. Joe | Muay Thai Intelligence Architect · ดร.โจ | สถาปนิกแห่ง Muay Thai Intelligence" },
      {
        property: "og:description",
        content:
          "Sport media executive, Muay Thai innovator, and researcher — decoding Thailand's combat heritage into data, AI, sport technology, and digital IP. ผู้บริหารสื่อกีฬาและผู้ริเริ่มแนวคิด Muay Thai Intelligence",
      },
      { property: "og:type", content: "profile" },
      { property: "og:site_name", content: "drjoe.site" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Dr. Joe | Muay Thai Intelligence Architect · ดร.โจ | สถาปนิกแห่ง Muay Thai Intelligence" },
      {
        name: "twitter:description",
        content:
          "Decoding Thailand's Muay Thai heritage into data, AI, and sport intelligence.",
      },
      { name: "description", content: "จากคลังไฟต์ สู่ข้อมูลเชิงโครงสร้าง · จากประสบการณ์ สู่ปัญญา · จากมรดกมวยไทย สู่เทคโนโลยีกีฬาระดับโลก · This is the universe of Dr. Joe. · นี่คือจักรวาลของดร.โจ" },
      { property: "og:description", content: "จากคลังไฟต์ สู่ข้อมูลเชิงโครงสร้าง · จากประสบการณ์ สู่ปัญญา · จากมรดกมวยไทย สู่เทคโนโลยีกีฬาระดับโลก · This is the universe of Dr. Joe. · นี่คือจักรวาลของดร.โจ" },
      { name: "twitter:description", content: "จากคลังไฟต์ สู่ข้อมูลเชิงโครงสร้าง · จากประสบการณ์ สู่ปัญญา · จากมรดกมวยไทย สู่เทคโนโลยีกีฬาระดับโลก · This is the universe of Dr. Joe. · นี่คือจักรวาลของดร.โจ" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/uQ0etfvMzkM18fhrnWTOMjpSQSo1/social-images/social-1783060386785-279FFDC2-CC40-49DC-A950-70340E0E25C5.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/uQ0etfvMzkM18fhrnWTOMjpSQSo1/social-images/social-1783060386785-279FFDC2-CC40-49DC-A950-70340E0E25C5.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
