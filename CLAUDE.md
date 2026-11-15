# Premier Notary Services website: project guide

## What this is
A one-page marketing site for Premier Mobile Notary Services & Process Serving, LLC, a mobile notary, loan
signing and process serving company in North Alabama. The design (called C2, "Direct Line") is approved.
Your job is to productionize it, not redesign it.

## Source of truth
- `site/index.html` is the approved design. It already works. Match its layout, spacing, type and colors exactly.
  Copy exact values from it; do not round them or swap in framework defaults.
- `docs/design-spec.md` documents the tokens and components. `docs/content.md` has every line of copy.
- If anything here conflicts with `site/index.html`, the HTML wins. Ask before changing the design.

## Stack
- Plain static HTML and CSS. No framework, no CSS library, no client-side rendering.
- JavaScript only for the preview layer (`preview/preview.js`) and, if needed, the form submit.
- Node is used only for the build script (`scripts/build.mjs`). Keep it dependency-free unless a step truly needs one
  (an HTML/CSS minifier as a devDependency is fine).
- Fonts: Archivo from Google Fonts, with the width axis (`wdth 62..125`) because the design uses `font-stretch`.

## Rules that must hold
- **Mobile first.** Base styles are for phones. Layout changes at container widths of 640px and 960px, using
  `container-type: inline-size` on `.dl` and `@container` rules. Keep it that way.
- **Phone number** `(256) 361-8255` is always a `tel:+12563618255` link. On phones, the giant hero number and the
  sticky bottom bar are the main ways to call.
- **Accessibility.** Real `<a>`, `<button>`, `<label>` and `<input>`; visible focus states; text contrast at least
  4.5:1 (3:1 for 24px and up); touch targets at least 44px; respect `prefers-reduced-motion`.
- **Copy is about the company, not a person.** Never name the owner or any individual notary in site copy.
- **Reviews are real Google reviews.** Quote them exactly as written in `docs/content.md`; never edit, combine or
  invent reviews. Attribute by first name and last initial.
- **Do not add `aggregateRating` or review structured data** copied from Google. Google's guidelines don't allow
  self-serving review markup, and it can't produce stars for a business's own site anyway.
- **No made-up facts.** Anything not in `docs/content.md` (cities served, email, hours, prices) stays a visible
  `[placeholder]` until the client supplies it.

## Build modes
`npm run build:preview` or `npm run build:launch` (they run `scripts/build.mjs`) writes `dist/`.
- **preview**: adds `noindex`, a disallow-all robots.txt, and the preview layer (ribbon, watermark, copy and
  right-click deterrents, no print). Form fields must stay selectable and usable.
- **launch**: clean output, allow-all robots.txt, no preview layer.
If you move CSS into its own file, make sure the build still copies it.

## Suggested work, in order
1. Move the inline `<style>` into `site/styles.css` and link it; keep the CSS identical.
2. Head: canonical URL placeholder, Open Graph and Twitter tags (absolute image URL once the domain is known),
   favicon set made from `assets/emblem.png`, `theme-color` `#F1EFEA`.
3. Structured data: a `LocalBusiness` JSON-LD block (name, telephone, areaServed "North Alabama", URL placeholder,
   logo). No ratings or reviews in it.
4. Request form: wire it to a static-friendly form service (for example Formspree or Web3Forms), or a small
   Cloudflare Worker that emails the request. Add a success message and an error message in the page's voice.
   Keep the Name, Phone, Service, Number of signers, Where to meet, Preferred day and time, and Notes fields.
5. Self-host Archivo (variable woff2 with the `wdth` and `wght` axes, `font-display: swap`) instead of loading it
   from Google Fonts. The giant phone number only fits on a phone because Archivo is condensed at `font-stretch: 70%`;
   a wider fallback font overflows (`.dl` clips it so the page never scrolls sideways). Preload the woff2 and consider
   a size-adjusted fallback `@font-face` to limit layout shift.
6. Optimize images (keep transparent PNGs, add `width` and `height` attributes, consider WebP with PNG fallback).
7. Optionally add minification in the build.
8. Deploy: see `docs/hosting-and-protection.md`. Check Cloudflare's current docs before configuring; dashboard
   steps change often.

## Before you call anything done
- Serve `dist/` and check it at 390px, 768px and 1280px wide. Nothing overlaps or overflows, and the sticky bar
  appears only below 960px.
- Tab through the whole page with a keyboard; every control is reachable and visibly focused.
- Run Lighthouse (mobile): Accessibility and SEO 100, Performance 90+.
- In preview mode, confirm the ribbon shows, right-click and copy are blocked outside form fields, form fields still
  work, and the page has `noindex`.
- In launch mode, confirm none of the preview layer remains.
