<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep an explicit repository backup of existing website image binaries under `public/__l5e/assets-v1/` and `public/gallery-backup/` for self-hosting and Git exports; preserve CDN pointers and live admin storage behavior.
- Restrict direct gallery storage SELECT to authenticated admins; public gallery viewing uses existing signed URLs so unpublished storage objects are not anonymously readable.
