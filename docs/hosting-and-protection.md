# Hosting and protection

## Recommended path
**Preview:** private GitHub repo → Cloudflare Workers (static assets) → Cloudflare Access, limited to your email and
the client's.
**Launch:** same host with Access turned off and the client's domain connected. You can also move to GitHub Pages
at this point.

### Why not GitHub Pages for the preview
GitHub Pages sites are public on the internet even when the repository is private. Building from a private repo
needs a paid plan (Pro, Team or Enterprise), and limiting who can view the site needs GitHub Enterprise Cloud.
That makes Pages fine for a public launch, but it can't gate a client preview.

## 1. Private repository
- Create a **private** repo and push this folder. Don't add the client as a collaborator.

## 2. Deploy on Cloudflare
Cloudflare's dashboard changes often. Have Claude Code check the current docs before you start.
- In the Cloudflare dashboard, go to **Workers & Pages** and create an application from your GitHub repo.
- Build command: `npm run build:preview`. Deploy command: `npx wrangler deploy` (uses `wrangler.jsonc`, which serves
  `dist/`).
- You'll get a `*.workers.dev` address. Don't send it yet.

## 3. Put Cloudflare Access in front of it
- Open the Worker, go to its **Access** settings, and turn on Access for **all traffic** (not previews only).
- Add an **Allow** policy listing exact email addresses: yours and the client's.
- Use the **one-time PIN** login method. Visitors enter their email and get a code that expires in 10 minutes.
- Test in a private window with an allowed email and with one that isn't allowed.
- The Zero Trust free plan covers up to 50 users, which is plenty here.
- Reference: https://developers.cloudflare.com/workers/configuration/cloudflare-access/

With this in place, a forwarded link is useless: whoever opens it has to receive a code at an allowed address.

## 4. What the preview layer adds (`preview` build)
- A fixed ribbon: "Design preview for Premier Notary Services. Not for distribution." with your studio's credit.
- A faint repeating watermark over the page.
- Right-click, copy, cut and image dragging are blocked outside form fields. Save, view source and print shortcuts
  are intercepted where the browser allows it, and printing shows a notice instead of the page.
- `noindex, nofollow` and a robots.txt that disallows everything.

### What it can't do
- Anyone who can see a page can still get its code: browser developer tools, "Save page", screenshots and screen
  recordings can't be fully blocked. Some browsers don't let pages cancel shortcuts such as view source.
- So treat the layer as a deterrent and a clear "this isn't yours yet" signal. Don't rely on it as a lock.
- The real protection is your agreement. Before sharing, put in writing that the design and code stay your property
  until paid in full, and that ownership (or a license) transfers on payment. I'm not a lawyer, so have the wording
  checked if the project is significant.
- Don't hand over the repository, files or editable design until you're paid.

## 5. Launch
- Switch the build command to `npm run build:launch` (clean output, allow-all robots.txt).
- In the Worker's Access settings, turn Access off or make the Worker public.
- Add the client's domain under the Worker's **Domains & Routes** (the domain's DNS needs to be on Cloudflare, or use
  a CNAME setup as Cloudflare's docs describe).
- Update the canonical URL, Open Graph URLs and JSON-LD `url` to the real domain.
- Add the site link to the client's Google Business Profile.

### If the client wants GitHub Pages at launch
- Run `npm run build:launch` in a GitHub Actions workflow that publishes `dist/` with GitHub Pages, and set a custom
  domain in the repo's Pages settings. The repo can stay private on a paid plan; the site itself will be public,
  which is what you want at launch.
