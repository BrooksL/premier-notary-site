# Design spec: C2, Direct Line

The working reference is `site/index.html`. This file explains the system behind it.

## Color
| Token | Hex | Use |
| --- | --- | --- |
| Paper | `#F1EFEA` | Header and hero band, Credentials, Reviews, footer, mobile menu |
| White | `#FFFFFF` | Page ground; How it works, Services, About, Request |
| Ink | `#1A1A18` | All headings, body emphasis, buttons, the giant number |
| Body | `#4F4D48` | Paragraphs (7:1 or better on paper and white) |
| Muted | `#6B6963` | Labels, captions, "For…" lines (4.8:1 on paper) |
| Rule | `#E2DFD8` | Hairlines on white |
| Rule on paper | `#D6D2C9` | Hairlines on paper |
| Field border | `#A9A59B` | Form inputs |
| Gold | `#B1940F` | Brand accent: hairline under the hero number, lines above reviews, rating stars, and the fill of the "Request" buttons (with ink text, 5.9:1) |
| Gold, text | `#96790B` | Step numerals (large text) and focus outlines |

Gold is never used as a text color at body size on light backgrounds, and never with white text on it; neither
meets contrast.

## Type
One family: **Archivo** (Google Fonts, axes `wdth 62..125`, `wght 400..800`).
| Role | Weight | Width (`font-stretch`) | Size, phone → desktop |
| --- | --- | --- | --- |
| Giant phone number | 800 | 70% | `clamp(48px, 13.6cqi, 184px)`, line-height 0.92 |
| H1 | 600 | 110% | 26 → 34 (640) → 44 (960) |
| H2 | 650 | 110% | 30 → 36 → 40 |
| Step numerals | 800 | 70% | 60 → 76 |
| Step and service titles | 650 | 105–108% | 20–21 → 22–23 |
| Credential values | 650 | 108% | 19 → 24 |
| Body | 400 | 100% | 17 (16 in lists), line-height 1.55–1.65 |
| Labels and captions | 400–600 | 100% | 13–15 |

The logo's wordmark is a heavy, wide sans, so Archivo's expanded headings sit naturally next to it.

## Layout
- Content max width 1200px. Side padding 22px on phones, 40px from 640px up.
- Container queries on `.dl` (`container-type: inline-size`) at **640px** and **960px**.
- Section padding: 72/80px on phones, 96–104px on desktop.
- Background rhythm: paper (header + hero), white (How it works, Services), paper (Credentials), white (About),
  paper (Reviews), white (Request), paper (footer).

## Components
- **Header:** emblem (44px tall, 52 on desktop) + wordmark (34px, 40 on desktop). Below 960px a "Menu" button
  (`<details>`) opens a full-width panel on paper with 52px rows; from 960px the inline nav shows instead.
- **Rating row:** five gold stars (17px, 19 on desktop) + "**5.0** from 249 Google reviews". The whole row links to
  #reviews and is at least 44px tall. Stars are `aria-hidden`; the text carries the meaning.
- **Hero:** H1, then the giant number (a `tel:` link), then a 1px gold rule, then the intro. Desktop adds
  "Call now" (solid ink) and "Request an appointment" (solid gold, ink text); both 54px tall, 4px radius.
- **How it works:** three numbered steps (a real sequence). Phones: numeral in a 52px column beside the text.
  Desktop: three columns, numeral on top.
- **Services:** rows under a 2px ink rule with 1px dividers. Phones stack name, description, audience; desktop puts
  them in a row (flex 1 / 2 / 1).
- **Credentials:** 2×2 grid; each item has a 2px ink top rule, with the value large and the label small beneath.
- **About:** text, then three values (Dedicated, Honest, Reliable) as rows; on desktop, two columns.
- **Reviews:** on phones, a horizontal scroll-snap row (cards 84% wide so the next one peeks in); 2×2 grid on
  desktop. Each card has a 2px gold top rule. The scroller is focusable with an accessible name.
- **Request form:** fields 50px tall, 1px `#A9A59B` border, 4px radius, 16px text (prevents iOS zoom). One column on
  phones, pairs from 640px. Submit is solid ink, full width on phones.
- **Footer:** giant number again (`clamp(44px, 12.5cqi, 88px)`), full stacked logo, legal line, disclaimer.
- **Sticky bar (below 960px only):** white bar fixed to the bottom with a 1px top rule and safe-area padding.
  Left: solid ink "call" button with a phone icon and the number; right: solid gold "Request" with ink text. Both
  52px tall.
- **Focus:** 2px `#96790B` outline, 3px offset, on every interactive element.
