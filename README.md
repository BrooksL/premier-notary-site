# Premier Notary Services website (design C2, Direct Line)

A one-page, mobile-first website for Premier Mobile Notary Services & Process Serving, LLC (North Alabama).
This packet contains the approved C2 design as a working static page, plus everything Claude Code needs
to finish it, put a private preview online for the client, and later launch it publicly.

## What's in here

| Path | What it is |
| --- | --- |
| `site/index.html` | The C2 design as a working static page. Open it in a browser to see it. This is the visual source of truth. |
| `site/assets/` | Logo files with transparent backgrounds (emblem, wordmark, full stacked logo) and the original logo the client sent. |
| `preview/` | The preview-only layer: watermark ribbon, copy and right-click deterrents, no-print, and a robots.txt that blocks search engines. |
| `scripts/build.mjs` | Builds `dist/` in `preview` mode (with the preview layer) or `launch` mode (clean). No dependencies. |
| `wrangler.jsonc` | Config for hosting `dist/` on Cloudflare Workers static assets. |
| `CLAUDE.md` | Project guide that Claude Code reads automatically. |
| `docs/kickoff-prompt.md` | The first message to paste into Claude Code. |
| `docs/content.md` | Every line of copy on the page, with the placeholders still to fill. |
| `docs/design-spec.md` | Colors, type, spacing, breakpoints and every component. |
| `docs/hosting-and-protection.md` | How to host the private preview and how to launch. Also covers what the protection can and can't do. |
| `docs/launch-checklist.md` | What you still need from the client, and the steps before going live. |

## Quick start

1. Unzip this folder, then `cd premier-notary-site`.
2. Create a **private** GitHub repository and push this folder to it. Keep it private so the source isn't public.
3. Open the folder in Claude Code and paste the prompt from `docs/kickoff-prompt.md`.
4. To try it locally: `node scripts/build.mjs preview`, then serve `dist/` (for example `npx serve dist`).

## Hosting, in short

- **For the client preview, use Cloudflare with Access, not GitHub Pages.** GitHub Pages sites are public on the internet even when the repository is private. Restricting who can view a Pages site needs GitHub Enterprise Cloud.
- Cloudflare can deploy from your private repo, and Cloudflare Access can limit the site to specific email addresses with a one-time code. Allow only your email and the client's, and a forwarded link won't open for anyone else. The Zero Trust free plan covers up to 50 users.
- **At launch,** turn Access off (or move to GitHub Pages if you prefer) and connect the domain.

Full steps are in `docs/hosting-and-protection.md`.

## About "can't share it, can't copy the source"

Be clear with yourself on this: **any page a browser can display, the viewer can save or inspect.** No script can fully
prevent that. What this setup does:

- **Controls who can open it.** Cloudflare Access only lets in the email addresses you list.
- **Makes casual copying awkward.** Right-click, copy, drag, save and print are blocked outside form fields. A "Design preview, not for distribution" ribbon and a faint watermark are on every view.
- **Keeps it out of search results** with noindex and a robots.txt that disallows everything.
- **Keeps the real source private.** The repo is private, and the code is handed over only after payment.

The protection that actually holds is your agreement: state that the design and code stay yours until paid in full.
The preview layer is removed by the launch build.
