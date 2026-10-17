# El3amer Property Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Simplify the El3amer landing page and add a polished /units property catalog with local typed data and responsive client-side filtering.

**Architecture:** Keep the existing static landing page and shared shell. Add a typed property inventory in lib/site-content.ts, a client-only UnitsExplorer for filter state, and small presentational components for the filter rail and property cards. Use one shared light editorial token system; remove the noisy global grid and make the catalog the main conversion path.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Vitest, Next Image, Lenis, CSS via app/globals.css.

## Global Constraints

- Keep the project Arabic-first with short English micro-labels only where they help orientation.
- Use local typed constants; no API, database, or localStorage.
- Keep every demo listing visibly labeled as illustrative.
- Preserve the existing WhatsApp number and WhatsAppLink behavior.
- Do not modify lead-crm or unrelated project files.
- Respect prefers-reduced-motion, keyboard focus, 44px interaction targets, and 4.5:1 body-text contrast.

---

### Task 1: Property inventory and route contract

**Files:**
- Modify: lib/site-content.ts
- Create: app/units/page.tsx
- Test: tests/property-catalog.test.ts

**Interfaces:**
- Produces PropertyListing, PropertyType, TransactionType, and propertyListings for the catalog UI.
- app/units/page.tsx renders UnitsExplorer and sets the page heading/metadata shell.

- [ ] Step 1: Write failing data and route tests.

~~~ts
it("has a mixed illustrative inventory", () => {
  expect(propertyListings.length).toBeGreaterThanOrEqual(8);
  expect(new Set(propertyListings.map((item) => item.type))).toEqual(
    new Set(["residential", "commercial", "administrative", "villa", "townhouse"]),
  );
});

it("exposes the units route with a filter landmark", () => {
  const markup = renderToStaticMarkup(<UnitsPage />);
  expect(markup).toContain("كل الوحدات");
  expect(markup).toContain('aria-label="فلترة الوحدات"');
});
~~~

- [ ] Step 2: Run the focused test and verify it fails.

Run: npm test -- tests/property-catalog.test.ts

Expected: FAIL because propertyListings, UnitsPage, and the /units route do not exist.

- [ ] Step 3: Add the typed inventory and route shell.

Add at least eight local records using existing AI/reference assets, with the exact fields slug, title, location, type, transaction, bedrooms, size, priceLabel, image, alt, and badge. Keep badge equal to "صورة توضيحية" on every record. Render a heading, filter landmark placeholder, and UnitsExplorer import from the next task.

- [ ] Step 4: Run focused tests and verify the route contract.

Run: npm test -- tests/property-catalog.test.ts

Expected: PASS for inventory shape and route landmark.

- [ ] Step 5: Commit the catalog data contract.

~~~bash
git add lib/site-content.ts app/units/page.tsx tests/property-catalog.test.ts
git commit -m "feat: add property catalog data contract"
~~~

### Task 2: Filter state and catalog UI

**Files:**
- Create: components/units-explorer.tsx
- Create: components/property-filter.tsx
- Create: components/property-card.tsx
- Modify: tests/property-catalog.test.ts

**Interfaces:**
- UnitsExplorer owns query, type, transaction, area, bedrooms, and budget state and derives filteredListings from propertyListings.
- PropertyFilter receives current filter state, change callbacks, resultCount, and onClear.
- PropertyCard receives one PropertyListing and renders an illustrative card plus WhatsApp CTA.

- [ ] Step 1: Add failing filter behavior tests.

~~~ts
it("renders the filter controls and result count", () => {
  const markup = renderToStaticMarkup(<UnitsExplorer />);
  expect(markup).toContain("فلتر الوحدات");
  expect(markup).toContain("كل الوحدات");
});

it("keeps the empty state copy in the client component", () => {
  expect(readFileSync("components/units-explorer.tsx", "utf8")).toContain("مفيش وحدات مطابقة");
});
~~~

- [ ] Step 2: Run the focused test and verify it fails.

Run: npm test -- tests/property-catalog.test.ts

Expected: FAIL because the explorer and card components do not exist.

- [ ] Step 3: Implement the filter model and card grid.

Use a "use client" explorer. Derive matches with case-insensitive title/location search and exact type, transaction, area, bedroom, and budget predicates. Render native controls in the filter component, a count, active filter chips, a clear button, and an empty state. Use PropertyCard for every result and pass a contextual WhatsApp message using the listing title.

- [ ] Step 4: Run focused tests and verify the UI contract.

Run: npm test -- tests/property-catalog.test.ts

Expected: PASS, including markup for the filter, result count, clear control, card badges, and empty state.

- [ ] Step 5: Commit the catalog interaction.

~~~bash
git add components/units-explorer.tsx components/property-filter.tsx components/property-card.tsx tests/property-catalog.test.ts
git commit -m "feat: add filterable property catalog"
~~~

### Task 3: Landing page simplification and shared visual system

**Files:**
- Modify: app/globals.css
- Modify: components/site-header.tsx
- Modify: components/hero-section.tsx
- Modify: components/concept-collection.tsx
- Modify: app/page.tsx
- Modify: components/page-smoke.test.tsx

**Interfaces:**
- Landing navigation links to #collection, #areas, #services, and /units.
- Hero primary CTA links to /units; the secondary action remains a WhatsApp CTA.
- Shared tokens serve both the landing page and catalog.

- [ ] Step 1: Add failing landing contract assertions.

~~~ts
expect(markup).toContain('href="/units"');
expect(markup).toContain("شوف كل الوحدات");
expect(markup).not.toContain("REAL ESTATE / CAIRO");
~~~

- [ ] Step 2: Run the focused test and verify it fails.

Run: npm test -- components/page-smoke.test.tsx

Expected: FAIL because the old hero copy and route links are still present.

- [ ] Step 3: Replace the decorative grid and simplify the shell.

Remove the fixed body grid and the hero rail/orbit decoration. Use a clean canvas, a single section divider system, and a short Arabic hero message with clear line-height. Change the navbar to a balanced logo/nav/CTA row, add a direct /units link, and keep the mobile drawer within the viewport. Change the main hero action to "شوف كل الوحدات".

- [ ] Step 4: Run focused tests and inspect desktop/mobile.

Run: npm test -- components/page-smoke.test.tsx && npm run typecheck && npm run lint

Expected: PASS. Verify / at 1440px, 1024px, and 375px: no clipped Arabic glyphs, no background grid, no overflow, and the primary CTA visibly leads to /units.

- [ ] Step 5: Commit the landing refinement.

~~~bash
git add app/globals.css components/site-header.tsx components/hero-section.tsx components/concept-collection.tsx app/page.tsx components/page-smoke.test.tsx
git commit -m "refactor: simplify real estate landing shell"
~~~

### Task 4: Responsive QA and production verification

**Files:**
- Modify: docs/qa-checklist.md
- Modify: README.md

- [ ] Step 1: Run the complete automated suite.

Run: npm test && npm run typecheck && npm run lint && npm run build && git diff --check

Expected: all tests pass, Next production build succeeds, and git diff --check has no output.

- [ ] Step 2: Exercise the live catalog.

Open http://127.0.0.1:3010/units, choose a type and transaction, enter a search term, clear filters, and choose a combination with zero matches. Verify that the result count, chips, card grid, and empty state update without a reload.

- [ ] Step 3: Verify responsive behavior and reduced motion.

Use browser viewport checks at 375x844, 768x1024, and the default desktop viewport. Confirm the desktop filter rail becomes a mobile drawer, controls remain keyboard reachable, and prefers-reduced-motion leaves content visible without transform transitions.

- [ ] Step 4: Update project docs.

Document /units, local inventory editing, the illustrative-content disclaimer, and filter behavior in README.md and docs/qa-checklist.md.

- [ ] Step 5: Final review.

Inspect the final diff, confirm only projects/elamer-real-estate-demo changed, and report the local preview URL plus verification results.
