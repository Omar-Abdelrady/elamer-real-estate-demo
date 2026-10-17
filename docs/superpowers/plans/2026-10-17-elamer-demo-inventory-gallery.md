# Elamer Demo Inventory Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current three real listings in the existing Alamer prototype with eight demo listings, each backed by four natural-looking AI property images and a usable detail-page gallery.

**Architecture:** Keep the existing Next.js App Router, typed local inventory, URL-driven filters, and contact flows. Add a gallery array to the listing model, store generated assets under `public/assets/demo/properties`, and render a reusable client gallery on static detail routes while cards use each listing’s first gallery image.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Next Image, Vitest, Playwright, built-in image generation.

## Global Constraints

- Work in the existing project at `projects/elamer-real-estate-demo`; do not create a new project.
- Keep the company name, logo, phone, WhatsApp, email, and existing brand palette unchanged.
- The catalog must contain exactly 8 demo listings and each listing must contain exactly 4 gallery images.
- Do not show demo/source labels, Facebook references, or “منشور موثق من الصفحة” on the new listings.
- Use AI-generated natural real-estate photography with no text, logos, watermarks, or social-media overlays.
- Preserve Arabic RTL, Alexandria headings, IBM Plex Sans Arabic body text, responsive behavior, accessibility, and URL-synchronized filters.
- Keep all verified Alamer contact links real; demo property details and prices are prototype-only values.
- Do not modify unrelated dirty files under `lead-crm/` or the old unreferenced section components.

---

### Task 1: Replace the inventory model with demo listings

**Files:**
- Modify: `lib/site-content.ts`
- Modify: `lib/property-filters.ts` only if the new dataset exposes a missing supported type/value
- Test: `tests/site-content.test.ts`
- Test: `tests/property-catalog.test.tsx`

**Interfaces:**
- `PropertyListing` gains `gallery: PropertyImage[]` and uses the first gallery item as `image`.
- `PropertyImage` is `{ src: string; alt: string }`.
- `sourceStatus` changes from the real-post status to an internal demo value that is not rendered.

- [ ] **Step 1: Write failing data tests**

Add tests that assert `propertyListings` has length 8, every listing has four unique gallery `src` values, `image === gallery[0].src`, and the set includes residential, villa, townhouse, administrative, and commercial types with both sale and rent transactions.

- [ ] **Step 2: Run the focused tests and verify the expected failure**

Run `npm test -- tests/site-content.test.ts tests/property-catalog.test.tsx`.
Expected: FAIL because the current dataset has 3 listings and no gallery field.

- [ ] **Step 3: Implement the minimal typed demo dataset**

Add eight slugs and their verified-by-shape demo fields:

```ts
const demoListings = [
  "maadi-modern-apartment",
  "zahraa-garden-apartment",
  "new-cairo-duplex",
  "sheikh-zayed-villa",
  "october-townhouse",
  "new-cairo-office",
  "maadi-new-retail",
  "ain-sokhna-chalet",
] as const;
```

Use realistic but clearly prototype-only titles, prices, sizes, room counts, locations, and descriptions. Use only `/assets/demo/properties/<slug>/01-cover.png` through `04-detail.png` as gallery paths. Remove real Facebook source links and make `sourceHref` optional for demo records.

- [ ] **Step 4: Run the focused tests and verify they pass**

Run the same focused command. Expected: PASS, with the filter adapter still deriving locations/types from the dataset.

- [ ] **Step 5: Commit**

```bash
git add lib/site-content.ts lib/property-filters.ts tests/site-content.test.ts tests/property-catalog.test.tsx
git commit -m "feat(elamer): add demo property inventory"
```

### Task 2: Generate and install the 32 gallery assets

**Files:**
- Create: `public/assets/demo/properties/<slug>/01-cover.png` through `04-detail.png` for all eight slugs
- Create: `assets/demo/properties/<slug>/...` only if an editable archive is needed; the app consumes `public/`

**Interfaces:**
- Every path referenced by Task 1 must exist in `public/assets/demo/properties`.
- Each four-image set must depict the same property identity, material palette, and time-of-day family across its views.

- [ ] **Step 1: Generate one four-view set per listing using built-in image generation**

Generate four separate natural editorial real-estate photos per listing. Prompts must specify the listing type, location mood, architectural materials, camera framing, and the view role. Every prompt must include: no visible text, no logos, no watermark, no collage borders, no people as the focal subject, and no distorted architecture.

- [ ] **Step 2: Inspect each generated set**

Check that rooms and exteriors read as natural photography, that no generation artifacts dominate the image, and that there is no in-image copy. Regenerate only the failed asset with a targeted prompt.

- [ ] **Step 3: Copy the final assets into the project and verify paths**

Use explicit project paths under `public/assets/demo/properties`. Run `find public/assets/demo/properties -type f | sort` and confirm exactly 32 PNG files.

- [ ] **Step 4: Commit**

```bash
git add public/assets/demo/properties
git commit -m "feat(elamer): add demo property galleries"
```

### Task 3: Add the responsive property gallery

**Files:**
- Create: `components/property-gallery.tsx`
- Modify: `components/property-details.tsx`
- Test: `tests/property-details.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- `PropertyGallery({ listing }: { listing: PropertyListing })` renders one main image and four accessible thumbnail buttons.
- Clicking a thumbnail changes the main image without navigation; the active thumbnail has `aria-pressed="true"`.

- [ ] **Step 1: Write failing gallery rendering tests**

Assert that a detail page renders four image sources, four thumbnail buttons, the listing title, and a WhatsApp link containing the listing title.

- [ ] **Step 2: Run the focused test and verify failure**

Run `npm test -- tests/property-details.test.tsx`. Expected: FAIL because details currently render one image.

- [ ] **Step 3: Implement the gallery and detail integration**

Use a client component with `useState(0)`, semantic buttons, `aria-label` based on the image role, keyboard focus styles, and a responsive layout that becomes a horizontal thumbnail strip on mobile. Keep the existing metadata, contact CTA, related listing section, and no-source-label requirement.

- [ ] **Step 4: Add CSS and rerun focused tests**

Add gallery styles without changing the established brand tokens. Run `npm test -- tests/property-details.test.tsx` and expect PASS.

- [ ] **Step 5: Commit**

```bash
git add components/property-gallery.tsx components/property-details.tsx tests/property-details.test.tsx app/globals.css
git commit -m "feat(elamer): add property image galleries"
```

### Task 4: Update cards, featured content, and source copy

**Files:**
- Modify: `components/property-card.tsx`
- Modify: `components/featured-properties.tsx`
- Modify: `components/location-browser.tsx` only where copy/counts assume three listings
- Modify: `components/units-explorer.tsx` only where copy assumes verified Facebook listings
- Test: `components/landing-sections.test.tsx`
- Test: `tests/property-catalog.test.tsx`

**Interfaces:**
- Cards use `listing.gallery[0]` through the compatibility `image` field.
- No card or homepage text may claim that demo units are verified Facebook posts.
- The homepage and catalog must render the new eight-listing counts and locations without hardcoded real-listing assumptions.

- [ ] **Step 1: Write failing copy and count tests**

Assert that the catalog count is 8, no new card contains `منشور موثق من الصفحة` or `REF S15592`, and the homepage still exposes a working `/units` CTA with the new inventory.

- [ ] **Step 2: Run focused tests and verify failure**

Run `npm test -- components/landing-sections.test.tsx tests/property-catalog.test.tsx`. Expected: FAIL on old count/source copy.

- [ ] **Step 3: Remove real-source presentation and update card semantics**

Render price and demo details without source claims, keep available fields conditional, and ensure all eight cards remain readable in 3/2/1-column layouts.

- [ ] **Step 4: Run focused tests and then the full unit suite**

Run `npm test -- components/landing-sections.test.tsx tests/property-catalog.test.tsx`, then `npm test`. Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/property-card.tsx components/featured-properties.tsx components/location-browser.tsx components/units-explorer.tsx components/landing-sections.test.tsx tests/property-catalog.test.tsx
git commit -m "feat(elamer): present demo inventory across catalog"
```

### Task 5: Full verification and visual QA

**Files:**
- Modify: `scripts/capture-visual-qa.mjs`
- Modify: `docs/qa-checklist.md`
- Create/replace: `artifacts/qa/*-final.png`

- [ ] **Step 1: Extend Playwright coverage**

Add checks for exactly eight catalog cards, a detail page with four gallery thumbnails, and thumbnail switching at 390px and 1440px.

- [ ] **Step 2: Run the complete verification suite**

Run:

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm run qa:visual
git diff --check
```

Expected: all commands pass, all routes render, no horizontal overflow exists at 1440/768/390, and the 32 referenced assets load.

- [ ] **Step 3: Review screenshots and fix only material issues**

Inspect the homepage, catalog, detail gallery, and mobile menu screenshots. Fix any unreadable text, broken RTL alignment, image cropping issue, or excessive whitespace, then rerun the relevant checks.

- [ ] **Step 4: Update QA documentation and commit**

Document the eight-unit demo inventory, 32 gallery assets, thumbnail interaction, and the fact that demo data is not real company inventory. Commit with:

```bash
git add scripts/capture-visual-qa.mjs docs/qa-checklist.md artifacts/qa
git commit -m "test(elamer): verify demo inventory gallery"
```
