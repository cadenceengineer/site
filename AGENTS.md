# Repository guidance for agents

## Project Purpose

`site` is the static public website and acquisition experience for CadenceEngineer.
It implements the public-facing product story using the shared brand system.

CadenceEngineer turns software-delivery activity into concise, understandable summaries and answers
for managers, teams, and other business-facing stakeholders.

Do not restore content, components, routes, or styling from earlier versions unless explicitly requested.

## Required reading

Before substantive work, read `README.md`, this file, and the relevant documentation in the adjacent
`brand` repository when changing brand assets or visual rules.

## Technical Architecture

- Framework: SvelteKit with Svelte 5 in runes mode
- Styling: Tailwind CSS 4 plus global CSS
- Rendering: all routes are prerendered
- Adapter: `@sveltejs/adapter-static`
- Backend: none in this repository
- Development: Vite through `pnpm dev`
- Validation: `pnpm check`
- Production: `pnpm build` generates a deployable static site

Keep the site compatible with static hosting. Do not introduce server-only routes, runtime server dependencies, or backend state without explicit approval.

## Current Baseline

Verified on September 5, 2026:

- `FeatureShowcase` takes `caption`, `description`, and an optional card position; there is no
  separate feature label above the section title.
- `/` contains the home-page hero (headline, shared tagline), an introduction section (what
  CadenceEngineer is and who it is for), Daily and Chat feature
  showcases whose samples carry a `CitationsModal` (shared brackets `IconButton` opening the shared
  `Modal` with claim links, per the brand's Citations rule), the "Built to be checked" trust section (each card opens with a small illustration built from
  the compact input surface, `UserMessage`/`AiMessage`, and the brackets icon, clipped at the card
  edge; illustrated card wrappers inherit the card shape and hide overflow),
  connected-tool then AI-provider logo grids, a numbered "How it works" section (numbers in the
  card headings, no pills or eyebrow labels anywhere on the page) and the access `Button`, and, behind `PUBLIC_PRICING_ENABLED`, the Basic, Premium, and
  Enterprise pricing cards. These public pricing cards are a proposal and do not describe the API's
  currently implemented plans. The page sets description, Open Graph, and Twitter card metadata from
  `PUBLIC_SITE_ORIGIN` and `static/og.png`.
- `SiteBanner` announces early access and, while app links are disabled, links to
  `/contact/?topic=test_access`. `IconButton` accepts an `onclick`.
- `/contact` carries `ContactForm`, composed from the shared `FormField` (text, email, select,
  textarea, error text), `Button` (now with the documented disabled state and an `onclick` prop),
  and `Modal` (the documented modal card, ported from `web`), which shows the sent confirmation
  while the form is cleared for another message. The form posts JSON to
  the same-origin `/api/contact`; the `Caddyfile` reverse-proxies that path to the API's
  `POST /v1/contact` with the `X-Contact-Site` secret from `CONTACT_SITE_SECRET`, and
  `vite.config.ts` provides the same proxy for `pnpm dev` from `CONTACT_API_ORIGIN` and
  `CONTACT_SITE_SECRET` in `.env`. Neither value is embedded in the build. `?topic=` preselects the
  topic in the browser. The API contract is documented in `../api/docs/contact.md`.
- `/cookies`, `/imprint`, `/privacy`, and `/terms` provide the current legal pages.
- `/404/` is prerendered with the shared site layout and client rendering disabled. `Staticfile`
  disables SPA index fallback, and the root `Caddyfile` serves that document as the body of HTTP 404
  responses.
- The global layout provides the reusable announcement banner, header, main-content slot, and footer.
- The build-time `PUBLIC_APP_LINKS_ENABLED` setting controls the header Sign in link and the Basic
  and Premium Get Started links. Their destination derives from `PUBLIC_APP_ORIGIN`. When app links
  are disabled the header shows a Request access button to `/contact/?topic=test_access` instead.
- The build-time `PUBLIC_PRICING_ENABLED` setting shows the pricing section; it is hidden by default
  during early access.
- `src/routes/+layout.ts` enables prerendering and trailing slashes.
- `svelte.config.js` emits base-prefixed rather than page-relative paths so the shared 404 document
  remains valid when served for unknown URLs at any nesting depth.
- `src/routes/layout.css` contains the global brand foundation.
- `src/lib/` contains the reusable layout, feature, card, button, action-toolbar, and chat UI
  components.
- `src/lib/ProviderSection.svelte` composes provider-section copy with the shared responsive
  `LogoGrid`. `src/lib/PricingCard.svelte` owns pricing composition and plan-detail groups while
  selecting shared `FeatureCard`, `Button`, and `Pill` variants for Basic, Premium, and Enterprise.
- `src/lib/BrandLogo.svelte` is the shared logo component.
- `src/lib/assets/` contains only production assets needed by this site, copied from `brand` where applicable.
- `src/lib/assets/providers/` contains the official provider logo SVGs supplied for the home page;
  keep their artwork intact and their attribution synchronized with `THIRD_PARTY_NOTICES.md`.

Add new pages and components deliberately as the redesign progresses.

Update this section when routes, shared layout, major components, rendering behavior, or repository
responsibilities change.

## Brand Source of Truth

The adjacent `brand` repository is the source of truth for brand assets and guidance.

- Copy required production assets into this repository; do not load them from GitHub raw URLs.
- Copy only formats that the website actually uses.
- Prefer normal variable WOFF2 webfonts over complete desktop font packages.
- Do not add italic font variants; the site does not use italic typography.
- Keep each copied font license alongside its font files.
- Prefer SVG for interface logos and icons.
- Copy approved Lucide SVGs from `../brand/icon/lucide/` instead of adding the full icon package to this site.
- Do not edit files in `brand` as a side effect of site work.
- When replacing an asset with a newer brand version, verify that the copied file matches its source.
- Read and follow `../brand/components/README.md` for every reusable typography,
  button, link, input, card, modal, icon-control, or identity pattern.

## Color System

The core palette is:

- Black: `#000000`
- White: `#FFFFFF`
- Pink: `#EF406C`
- Teal: `#1CC59A`
- Red: `#FF383C`, reserved for dangerous or destructive actions
- Light grey: `#F2F2F2`

Black and white are the foundation. Pink is the primary accent. Teal is a rare secondary accent and should not compete with pink. Red is a semantic danger color, not a general accent.

Use the existing tokens rather than duplicating hex values:

- `--brand-color-black`
- `--brand-color-white`
- `--brand-color-pink`
- `--brand-color-teal`
- `--brand-color-red`
- `--brand-color-light-grey`
- `--color-background`
- `--color-foreground`
- `--color-accent`
- `--color-accent-secondary`
- `--color-danger`
- `--color-interactive-hover`

Tailwind exposes the same palette through the `brand-*` colors.

## Typography

Typography communicates who produced the content:

- Satoshi is the interface font for human-written or deterministic content, including navigation, controls, labels, metadata, headings, and ordinary website copy.
- Sentient is reserved for AI-generated content, regardless of its length.

The system uses regular and bold semantic weights, with a family-specific regular weight:

- Satoshi regular: `500` for paragraphs, links, and ordinary interface text
- Sentient regular: `400` for AI-generated paragraphs and prose
- Bold: `900` for headings and titles

Satoshi contains a true weight 900. The supplied Sentient variable font ends at 700, so a requested weight of 900 resolves to Sentient's heaviest available weight. Do not synthesize or modify the font to manufacture a weight 900.

Use the semantic global definitions:

- `--font-interface` or `.font-interface` for Satoshi
- `--font-generated`, `.font-generated`, or `.ai-generated` for Sentient
- `--font-weight-interface-regular` for regular Satoshi text
- `--font-weight-generated-regular` for regular Sentient text
- `--font-weight-regular` as the context-sensitive regular weight
- `--font-weight-bold` for headings and titles
- Tailwind `font-sans` maps to Satoshi
- Tailwind `font-serif` maps to Sentient

Do not use Sentient merely because text is long or editorial. Split mixed-origin content into separate elements when needed.

## Logo

Use `BrandLogo` from `$lib` instead of recreating or embedding the icon in page components.

- The default logo is black on transparent backgrounds.
- Use the `inverse` prop for white-on-dark presentation.
- Size it with `--brand-logo-size` or layout constraints.
- Keep its aspect ratio intact.
- Provide meaningful alternative text unless the surrounding UI already supplies the same accessible name.

## Design and Content Principles

The site should feel technical, credible, structured, and approachable.

- Create a clear hierarchy and an obvious reading flow.
- Use generous spacing and calm grouping.
- Translate engineering activity into language non-technical stakeholders can follow.
- Prefer concrete, concise copy over jargon.
- Use motion only when it improves comprehension.
- Design mobile layouts alongside desktop layouts.
- Avoid dense dashboards, code-heavy decoration, generic enterprise styling, and playful startup clichés.

## Implementation Rules

- Prefer semantic design tokens over one-off values.
- Keep global CSS responsible for brand foundations, semantic tokens, and cross-application component
  variables.
- Build reusable Svelte components for repeated patterns and keep their complete visual states in the
  owning component.
- Keep page-specific composition and layout close to the page. A page must not recreate or override
  the visual styling of typography, buttons, links, inputs, cards, modals, or icon controls.
- If requested work introduces a missing reusable pattern, first promote it into the canonical brand
  contract, semantic tokens, and a shared `src/lib/` component in the same change. Do this
  automatically; do not wait for the user to repeat the consistency requirement. Route CSS may own
  only page composition and responsive placement unless the user explicitly requests an exception.
- Favor accessible semantic HTML and visible keyboard focus.
- Respect reduced-motion preferences.
- Use Svelte 5 runes and the existing project conventions.
- Preserve `BASE_PATH` compatibility; import bundled assets through Svelte/Vite rather than hardcoding root-relative deployment URLs.
- Do not add a backend or client-side data layer for static content.

## Global Component Contract

Both the public site and web application implement the same canonical component system documented in
`../brand/components/README.md`:

- Interface typography uses Satoshi `500`; generated content uses Sentient `400`; headings use the
  semantic bold weight. Page and section titles are `2rem`, component headings/body/controls are
  `1rem`, and supporting text is `0.875rem` unless the documented display role applies.
- Buttons are `2rem` high with `1rem` horizontal padding and the shared compact squircle. Primary is
  pink/white, secondary is teal/white, danger is red/white, and focus remains visibly outlined.
- Action toolbars arrange unchanged shared controls horizontally with native toolbar semantics, an
  accessible label, and a `0.5rem` gap.
- Navigation links use the same `2rem` control rhythm, light-grey hover, pink/white active state, and
  subdued disabled state. Inline links retain a recognizable text-link affordance.
- Form controls use the shared `3rem` white input surface, `0.5rem 1rem` padding, compact-card
  squircle, black-at-10% shadow, and pink focus outline. The Chat composer is the documented `4rem`
  compound-input variant.
- Cards are white with normal `2rem` padding, `3rem` fallback radius, `6rem` squircle radius, and a
  `0 0 1rem` black-at-10% shadow. Modals use that exact card surface and differ only through the
  documented stronger shadow. Danger cards retain the card and add the semantic red treatment.
- Pills are shared `2rem` non-interactive labels with `0.5rem 1rem` padding and named primary,
  secondary, and inverse tones. Provider and partner marks use the shared maximum two-column
  responsive logo grid; routes provide only content and placement.
- People use `4rem` circles; organizations use `4rem` squircles; interface icons use approved Lucide
  geometry through `currentColor`.

Do not introduce one-off colors, sizes, radii, shadows, or states. Divergence is allowed only when the
user explicitly requests it; document the reason and scope in `README.md`. A repeated exception must
become a named shared variant or a coordinated update to the brand contract and both applications.

## Documentation ownership

- `README.md` owns verified architecture, development and build commands, deployment assumptions, and
  the inventory of brand assets copied into this repository.
- `AGENTS.md` owns local contribution constraints and the verified implementation baseline.
- `THIRD_PARTY_NOTICES.md` and notices beside distributed assets own attribution for shipped third-party
  work.
- Detailed palette, typography, logo, icon, and motion guidance belongs in
  `brand`; document only how this site consumes or adapts it.
- API contracts, persistence, application behavior, and generation design do not belong here.

Update `README.md` in the same change when routes, rendering, dependencies, scripts, hosting
requirements, copied assets, or setup steps change. Update notices in the same change as third-party
assets. Never present planned pages or behavior as implemented, and do not link to private overview
documentation as a source of implementation truth.

Before handing off implementation changes, run:

```sh
pnpm check
pnpm build
```
