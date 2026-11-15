# Kickoff prompt for Claude Code

Paste this as your first message after opening the project folder in Claude Code.

---

Read CLAUDE.md, then docs/design-spec.md and docs/content.md. `site/index.html` is the approved design and already
works; I want it productionized, not redesigned.

Please:
1. Move the inline CSS into `site/styles.css` without changing any values, and make sure `npm run build:preview`
   and `npm run build:launch` still produce a working `dist/`.
2. Finish the `<head>`: Open Graph and Twitter tags, a favicon set from `site/assets/emblem.png`, theme-color, and a
   `LocalBusiness` JSON-LD block with no ratings or reviews. Use clear placeholders for the domain.
3. Wire the request form to [Formspree / Web3Forms / a Cloudflare Worker — pick one] with a success and an error
   message. Keep every field and label as they are.
4. Optimize the logo images and add width and height attributes.
5. Set up deployment to Cloudflare Workers static assets from this private GitHub repo using `wrangler.jsonc`, with
   the build command `npm run build:preview`. Check Cloudflare's current docs first, then walk me through putting
   Cloudflare Access in front of it so only [my email] and [client email] can sign in with a one-time PIN.
6. Run the checks listed at the end of CLAUDE.md and tell me what passed and what didn't.

Don't invent any business facts. Leave anything missing as a visible [placeholder] and list them for me at the end.
