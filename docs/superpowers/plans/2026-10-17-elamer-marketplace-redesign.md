# Elamer Marketplace Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing Elamer prototype into a truthful, Arabic-first brokerage marketplace with shareable search, real listing details, and WhatsApp conversion flows.

**Architecture:** Keep the Next.js App Router project and typed local content source. Add a pure property query adapter shared by the homepage and catalog, keep interactive search/filter/form components client-side, and statically generate one details route per verified listing. Preserve the existing logo, phone, WhatsApp, email, Facebook source, and authentic listing assets.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Next Image, Lenis, Vitest, Playwright, CSS, static local data.

## Global Constraints

- Company name is `العامر للتسويق العقاري`; never use Al Taher or الطاهر.
- Preserve verified phone `010 1644 3444`, WhatsApp `2010164434444`, email `elamerestate@yahoo.com`, and Facebook page.
- Use only the three saved Facebook-backed listings; do not invent prices, rent inventory, locations, dates, reviews, or achievements.
- Colors: forest `#19342D`, off-white `#F5F4F0`, white `#FFFFFF`, copper `#B77B56`, text `#242824`, secondary `#66706A`, border `#E3E5DF`.
- Headings use Alexandria; body and controls use IBM Plex Sans Arabic.
- Maximum content width is 1200px; desktop section spacing 80–96px; mobile 48–64px; spacing follows an 8px rhythm.
- Cards use 12px radius; buttons use 8px radius; transitions stay between 150–250ms and respect reduced motion.
- Full Arabic RTL, WCAG AA contrast, visible focus, semantic headings, and 44px minimum interactive targets.
- Preserve unrelated `lead-crm` changes and do not modify files outside this project.

---

### Task 1: Verified property model and query adapter

**Files:**
- Modify: `lib/site-content.ts`
- Modify: `lib/property-filters.ts`
- Test: `tests/site-content.test.ts`
- Test: `tests/property-catalog.test.tsx`

**Interfaces:**
- Produces: `PropertyTransaction`, `PropertyListing`, `findPropertyBySlug(slug)`, `FilterState`, `parsePropertyQuery(params)`, `serializePropertyQuery(filters)`, `filterListings(listings, filters)`, `getListingLocations(listings)`.
- Consumes: the three existing verified Facebook references and `siteContact`.

- [ ] **Step 1: Write failing tests for verified fields and URL query behavior**

```ts
expect(propertyListings.every((listing) => listing.transaction === "sale")).toBe(true);
expect(propertyListings.map((listing) => listing.reference)).toEqual(["S15592", "S17003", "S17004"]);
expect(findPropertyBySlug("zahraa-maadi-230")?.size).toBe(230);
expect(parsePropertyQuery(new URLSearchParams("transaction=sale&location=%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D8%AF%D9%8A"))).toMatchObject({
  transaction: "sale",
  location: "المعادي",
});
expect(serializePropertyQuery({ query: "", transaction: "rent", type: "all", location: "all", size: "all" })).toBe("transaction=rent");
```

- [ ] **Step 2: Run focused tests and confirm the new API is missing**

Run: `npm test -- --run tests/site-content.test.ts tests/property-catalog.test.tsx`

Expected: FAIL because `transaction`, `reference`, and query adapter exports do not exist.

- [ ] **Step 3: Extend the data model without fabricating fields**

```ts
export type PropertyTransaction = "sale" | "rent";

export type PropertyListing = {
  slug: string;
  reference?: string;
  title: string;
  location: string;
  transaction: PropertyTransaction;
  type: PropertyType;
  size?: number;
  bedrooms?: number;
  bathrooms?: number;
  price?: number;
  priceLabel: string;
  image: string;
  alt: string;
  sourceStatus: "منشور موثق من الصفحة";
  description: string;
  details: string[];
  sourceHref: string;
};

export const findPropertyBySlug = (slug: string) => propertyListings.find((listing) => listing.slug === slug);
```

Set all three current listings to `transaction: "sale"` because each saved asset explicitly says `للبيع`. Add the documented references and only the bedrooms/bathrooms visible in the 230m source image. Leave unknown numeric fields undefined.

- [ ] **Step 4: Implement pure query parsing, serialization, filtering, and location counts**

```ts
export type FilterState = {
  query: string;
  transaction: "all" | PropertyTransaction;
  type: "all" | PropertyType;
  location: "all" | string;
  size: "all" | "compact" | "mid" | "wide";
};

export function parsePropertyQuery(params: URLSearchParams): FilterState;
export function serializePropertyQuery(filters: FilterState): string;
export function filterListings(listings: readonly PropertyListing[], filters: FilterState): PropertyListing[];
export function getListingLocations(listings: readonly PropertyListing[]): Array<{ name: string; count: number }>;
```

Ignore invalid values, omit default values from serialized URLs, include title/location/details/reference in text search, and preserve a valid `rent` filter even when it returns no results.

- [ ] **Step 5: Run focused tests**

Run: `npm test -- --run tests/site-content.test.ts tests/property-catalog.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit the data foundation**

```bash
git add lib/site-content.ts lib/property-filters.ts tests/site-content.test.ts tests/property-catalog.test.tsx
git commit -m "feat(elamer): add verified property queries"
```

---

### Task 2: Marketplace header, hero, and homepage search

**Files:**
- Modify: `components/site-header.tsx`
- Modify: `components/hero-section.tsx`
- Create: `components/property-search.tsx`
- Modify: `app/page.tsx`
- Modify: `components/landing-sections.test.tsx`

**Interfaces:**
- Consumes: `propertyListings`, `getListingLocations`, `serializePropertyQuery`, `siteContact`.
- Produces: `PropertySearch({ variant?: "hero" | "catalog" })` and navigation links for home, catalog, sale, rent, about, and contact.

- [ ] **Step 1: Write failing semantic and content tests**

```ts
const markup = renderToStaticMarkup(<HomePage />);
expect(markup).toContain("عقارك المناسب أقرب مما تتخيل");
expect(markup).toContain("تصفح العقارات");
expect(markup).toContain("تواصل مع مستشار");
expect(markup).toContain('aria-label="ابحث في العقارات"');
expect(markup).toContain('href="/units?transaction=sale"');
expect(markup).toContain('href="/units?transaction=rent"');
```

- [ ] **Step 2: Run the landing tests and confirm failure**

Run: `npm test -- --run components/landing-sections.test.tsx components/page-smoke.test.tsx`

Expected: FAIL on the approved hero copy and search landmark.

- [ ] **Step 3: Rebuild the header and hero structure**

Use a 76px sticky header with the existing transparent logo on the right, compact links, the real phone, and one forest contact button. The mobile `<details>` menu retains native keyboard behavior and the existing minimum target size.

```tsx
<h1>عقارك المناسب أقرب مما تتخيل</h1>
<p>اكتشف عقارات للبيع والإيجار، وقارن بين الخيارات المتاحة، وخد الخطوة المناسبة مع العامر للتسويق العقاري.</p>
<Link href="/units" className="button button--primary">تصفح العقارات</Link>
<WhatsAppLink label="تواصل مع مستشار" message="مساء الخير، محتاج مساعدة في اختيار عقار مناسب." variant="outline" />
```

Use an existing project asset for the hero and label it honestly when it is illustrative.

- [ ] **Step 4: Build the functional homepage search**

```tsx
<form className="property-search" aria-label="ابحث في العقارات" onSubmit={handleSubmit}>
  <select name="transaction" aria-label="نوع المعاملة">
    <option value="sale">للبيع</option>
    <option value="rent">للإيجار</option>
  </select>
  <select name="type" aria-label="نوع العقار">
    <option value="all">كل الأنواع</option>
    <option value="residential">سكني</option>
  </select>
  <select name="location" aria-label="المنطقة">
    <option value="all">كل المناطق</option>
    <option value="زهراء المعادي">زهراء المعادي</option>
    <option value="المعادي">المعادي</option>
  </select>
  <button type="submit">ابحث عن عقار</button>
</form>
```

Derive type/location options from real listings. Render a disabled budget control labeled `الميزانية — السعر عند التواصل` because no numeric prices are verified. On submit, navigate to `/units?${serializePropertyQuery(filters)}`.

- [ ] **Step 5: Run landing tests**

Run: `npm test -- --run components/landing-sections.test.tsx components/page-smoke.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit the conversion entry point**

```bash
git add app/page.tsx components/site-header.tsx components/hero-section.tsx components/property-search.tsx components/landing-sections.test.tsx
git commit -m "feat(elamer): rebuild hero and property search"
```

---

### Task 3: Shareable catalog and marketplace cards

**Files:**
- Modify: `app/units/page.tsx`
- Modify: `components/units-explorer.tsx`
- Modify: `components/property-filter.tsx`
- Modify: `components/property-card.tsx`
- Test: `tests/property-catalog.test.tsx`

**Interfaces:**
- Consumes: Task 1 query adapter and `PropertyListing` optional fields.
- Produces: catalog URL state, conditional metadata cards, resettable empty states, sale/rent/location/type links.

- [ ] **Step 1: Add failing tests for conditional card data and URL state**

```ts
const card = renderToStaticMarkup(<PropertyCard listing={propertyListings[0]} />);
expect(card).toContain("للبيع");
expect(card).toContain("S15592");
expect(card).toContain("3 غرف");
expect(card).not.toContain("0 حمام");

const rentResults = filterListings(propertyListings, { ...initialFilters, transaction: "rent" });
expect(rentResults).toEqual([]);
```

- [ ] **Step 2: Run focused tests and confirm failure**

Run: `npm test -- --run tests/property-catalog.test.tsx`

Expected: FAIL because cards and filters do not expose transaction/reference data.

- [ ] **Step 3: Make `PropertyCard` a real marketplace card**

Render sale/rent badge, title, location, price label, optional size/bedrooms/bathrooms/reference, a details link to `/units/${slug}`, and a property-specific WhatsApp action. Omit absent fields entirely.

```tsx
{listing.bedrooms ? <span>{listing.bedrooms} غرف</span> : null}
{listing.bathrooms ? <span>{listing.bathrooms} حمام</span> : null}
<Link href={`/units/${listing.slug}`}>شوف التفاصيل</Link>
```

- [ ] **Step 4: Synchronize filters with URL search parameters**

Wrap `UnitsExplorer` in `Suspense` from the server page. Read initial filters with `useSearchParams`, update them with `router.replace`, preserve the existing accessible mobile modal lifecycle, and derive visible options from inventory.

```ts
const nextQuery = serializePropertyQuery(nextFilters);
router.replace(nextQuery ? `/units?${nextQuery}` : "/units", { scroll: false });
```

The price select remains disabled with visible helper text. Do not display a newest sort because dates are unavailable.

- [ ] **Step 5: Add a useful empty state**

For rent or unmatched filters, show the active intent, reset action, and WhatsApp CTA without suggesting unavailable inventory.

```tsx
<h2>مفيش عقارات مطابقة منشورة حاليًا.</h2>
<p>سيب لنا طلبك، ولما يبقى فيه اختيار مناسب نقدر نكمل معاك.</p>
```

- [ ] **Step 6: Run catalog tests and production build**

Run: `npm test -- --run tests/property-catalog.test.tsx && npm run build`

Expected: PASS and static routes render without a missing Suspense boundary.

- [ ] **Step 7: Commit the catalog**

```bash
git add app/units/page.tsx components/units-explorer.tsx components/property-filter.tsx components/property-card.tsx tests/property-catalog.test.tsx
git commit -m "feat(elamer): add shareable property catalog"
```

---

### Task 4: Static property detail routes

**Files:**
- Create: `app/units/[slug]/page.tsx`
- Create: `components/property-details.tsx`
- Create: `tests/property-details.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `propertyListings`, `findPropertyBySlug`, `siteContact`, `WhatsAppLink`.
- Produces: statically generated `/units/[slug]` routes with dynamic Arabic metadata and not-found handling.

- [ ] **Step 1: Write failing tests for every detail route**

```ts
expect(propertyListings.map(({ slug }) => slug)).toEqual([
  "zahraa-maadi-230",
  "maadi-160",
  "zahraa-maadi-ground-floor",
]);
const markup = renderToStaticMarkup(<PropertyDetails listing={propertyListings[0]} />);
expect(markup).toContain("S15592");
expect(markup).toContain("السعر عند التواصل");
expect(markup).toContain("المنشور الأصلي");
```

- [ ] **Step 2: Run the detail test and confirm failure**

Run: `npm test -- --run tests/property-details.test.tsx`

Expected: FAIL because the component and route do not exist.

- [ ] **Step 3: Implement details composition**

```tsx
export function PropertyDetails({ listing }: { listing: PropertyListing }) {
  return (
    <article className="property-details">
      <Image src={listing.image} alt={listing.alt} width={1536} height={1024} priority />
      <h1>{listing.title}</h1>
      <p>{listing.description}</p>
      <dl>
        <div><dt>المنطقة</dt><dd>{listing.location}</dd></div>
        {listing.size ? <div><dt>المساحة</dt><dd>{listing.size} م²</dd></div> : null}
        {listing.bedrooms ? <div><dt>غرف النوم</dt><dd>{listing.bedrooms}</dd></div> : null}
        {listing.bathrooms ? <div><dt>الحمامات</dt><dd>{listing.bathrooms}</dd></div> : null}
      </dl>
    </article>
  );
}
```

Use the single authentic composite image as the available gallery; do not duplicate it to simulate multiple gallery images.

- [ ] **Step 4: Add static params, dynamic metadata, and not-found behavior**

```ts
export const dynamicParams = false;
export function generateStaticParams() {
  return propertyListings.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: PageProps<"/units/[slug]">): Promise<Metadata> {
  const listing = findPropertyBySlug((await params).slug);
  return { title: listing ? `${listing.title} | العامر` : "العقار غير موجود | العامر" };
}
```

Await the Next.js 16 `params` promise and call `notFound()` for unknown slugs.

- [ ] **Step 5: Run tests and build**

Run: `npm test -- --run tests/property-details.test.tsx && npm run build`

Expected: PASS with three statically generated detail paths.

- [ ] **Step 6: Commit the detail routes**

```bash
git add 'app/units/[slug]/page.tsx' components/property-details.tsx tests/property-details.test.tsx app/globals.css
git commit -m "feat(elamer): add property detail routes"
```

---

### Task 5: Discovery sections and WhatsApp lead generation

**Files:**
- Replace: `components/concept-collection.tsx` with `components/featured-properties.tsx`
- Replace: `components/areas-section.tsx` with `components/location-browser.tsx`
- Create: `components/transaction-panels.tsx`
- Create: `components/owner-cta.tsx`
- Create: `components/lead-form.tsx`
- Modify: `components/process-section.tsx`
- Modify: `components/site-footer.tsx`
- Modify: `app/page.tsx`
- Modify: `components/landing-sections.test.tsx`
- Create: `tests/lead-message.test.ts`

**Interfaces:**
- Consumes: `propertyListings`, `getListingLocations`, `whatsappHref`, `siteContact`.
- Produces: `buildLeadMessage(fields)` and all homepage brokerage/discovery sections.

- [ ] **Step 1: Write failing copy, truthfulness, and message tests**

```ts
expect(buildLeadMessage({ transaction: "sale", location: "المعادي", type: "residential", budget: "غير محدد", notes: "دور هادئ" })).toBe(
  "مساء الخير، بدور على عقار للبيع. المنطقة المفضلة: المعادي. النوع: سكني. الميزانية: غير محدد. ملاحظات: دور هادئ.",
);
expect(getListingLocations(propertyListings)).toEqual([
  { name: "زهراء المعادي", count: 2 },
  { name: "المعادي", count: 1 },
]);
```

Assert the homepage contains `عقارات تستحق تشوفها`, `اختار المنطقة اللي تناسبك`, `بتدور على عقار للشراء؟`, `محتاج عقار للإيجار؟`, `عندك عقار وعايز تبيعه أو تأجره؟`, and `مش لاقي العقار المناسب؟`.

- [ ] **Step 2: Run tests and confirm failure**

Run: `npm test -- --run components/landing-sections.test.tsx tests/lead-message.test.ts`

Expected: FAIL because the new sections and message builder do not exist.

- [ ] **Step 3: Build inventory-derived discovery sections**

Featured cards use only `propertyListings.slice(0, 6)`. Location tiles use `getListingLocations` and link to encoded URLs such as `/units?location=%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D8%AF%D9%8A`. Sale links to `transaction=sale`; rent links to `transaction=rent` and lands on the honest empty state.

- [ ] **Step 4: Implement the owner and seeker WhatsApp flows**

```ts
export type LeadFields = {
  transaction: "sale" | "rent";
  location: string;
  type: string;
  budget: string;
  notes: string;
};

export function buildLeadMessage(fields: LeadFields): string;
```

The owner CTA message is `مساء الخير، عندي عقار وعايز أعرضه للبيع أو الإيجار مع العامر.` The lead form validates required transaction, location, and type fields, then opens the encoded verified WhatsApp URL in a new tab. It does not submit to a fake backend.

- [ ] **Step 5: Update process and footer content**

Use the four approved steps: فهم الاحتياج، اختيار العقارات، مراجعة التفاصيل والمعاينة، التواصل والمتابعة. Footer contains only verified logo, description, navigation, phone, email, Facebook, WhatsApp, and copyright.

- [ ] **Step 6: Run section and message tests**

Run: `npm test -- --run components/landing-sections.test.tsx tests/lead-message.test.ts`

Expected: PASS.

- [ ] **Step 7: Commit the complete homepage flow**

```bash
git add app/page.tsx components/featured-properties.tsx components/location-browser.tsx components/transaction-panels.tsx components/owner-cta.tsx components/lead-form.tsx components/process-section.tsx components/site-footer.tsx components/landing-sections.test.tsx tests/lead-message.test.ts
git rm components/concept-collection.tsx components/areas-section.tsx
git commit -m "feat(elamer): add brokerage discovery flows"
```

---

### Task 6: Apply the approved responsive visual system

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `components/motion-reveal.tsx`
- Modify: `components/motion-reveal.test.tsx`
- Modify: `README.md`

**Interfaces:**
- Consumes: semantic class names from Tasks 2–5.
- Produces: consistent typography, layout, responsive behavior, focus states, and reduced-motion treatment across all routes.

- [ ] **Step 1: Add failing checks for brand tokens and font roles**

```ts
const css = readFileSync("app/globals.css", "utf8");
expect(css).toContain("--forest: #19342d");
expect(css).toContain("--canvas: #f5f4f0");
expect(css).toContain('"IBM Plex Sans Arabic"');
expect(css).toContain("@media (prefers-reduced-motion: reduce)");
```

- [ ] **Step 2: Run the style smoke test and confirm failure**

Run: `npm test -- --run components/page-smoke.test.tsx components/motion-reveal.test.tsx`

Expected: FAIL on the new token/font requirements.

- [ ] **Step 3: Replace the current page styling with the approved system**

```css
:root {
  --forest: #19342d;
  --canvas: #f5f4f0;
  --surface: #ffffff;
  --accent: #b77b56;
  --ink: #242824;
  --muted: #66706a;
  --line: #e3e5df;
  --radius-card: 12px;
  --radius-control: 8px;
  --shell: min(1200px, calc(100% - 64px));
  --section-space: clamp(80px, 7vw, 96px);
  --heading-font: "Alexandria", sans-serif;
  --body-font: "IBM Plex Sans Arabic", sans-serif;
}
```

Use a 40/60 hero split at 1440px, three/two/one listing columns, horizontal/stacked search layouts, 48–64px mobile sections, restrained 1px borders, small shadows, and no background grid or ornamental gradients.

- [ ] **Step 4: Verify accessibility behavior in source**

Keep visible focus, minimum 44px controls, semantic landmarks, logical inset/padding properties, reduced motion, and the existing inert/focus-trapped filter drawer.

- [ ] **Step 5: Update README with routes, verified data limits, and QA command**

Document `/`, `/units`, `/units/[slug]`, URL filter keys, the three Facebook-backed listings, missing numeric prices/dates/rent inventory, and `npm run qa:visual`.

- [ ] **Step 6: Run all automated checks**

Run: `npm test && npm run typecheck && npm run lint && npm run build`

Expected: all checks pass.

- [ ] **Step 7: Commit the visual system**

```bash
git add app/globals.css app/layout.tsx components/motion-reveal.tsx components/motion-reveal.test.tsx components/page-smoke.test.tsx README.md
git commit -m "style(elamer): apply brokerage marketplace UI"
```

---

### Task 7: Production interaction and visual QA

**Files:**
- Modify: `scripts/capture-visual-qa.mjs`
- Modify: `docs/qa-checklist.md`
- Generate: `artifacts/qa/*-final.png`

**Interfaces:**
- Consumes: production routes and final UI.
- Produces: reproducible Playwright assertions and final 390px, 768px, and 1440px screenshots.

- [ ] **Step 1: Extend QA routes and viewports**

```js
const viewports = [
  { name: "desktop-1440", width: 1440, height: 1100 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844 },
];
const routes = [
  { name: "home", path: "/" },
  { name: "units", path: "/units" },
  { name: "property", path: "/units/zahraa-maadi-230" },
];
```

- [ ] **Step 2: Add interaction assertions before screenshots**

Use Playwright to submit homepage search, confirm URL parameters and filtered results, open a details route, exercise sale/rent/location filters, verify empty/reset behavior, test mobile menu and filter modal, verify lead-form WhatsApp href, assert all internal links resolve, and fail on horizontal overflow.

- [ ] **Step 3: Run production QA round 1**

Run:

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3011
QA_BASE_URL=http://127.0.0.1:3011 npm run qa:visual
```

Expected: screenshots generated for all three routes and widths, with zero overflow and passing interaction assertions.

- [ ] **Step 4: Review screenshots and fix the largest visual issues**

Inspect hierarchy, empty space, repeated compositions, image crops, Arabic line breaks, focus overlays, footer balance, and mobile card/filter layout. Make targeted CSS/component fixes only, then rerun tests and QA.

- [ ] **Step 5: Run QA rounds 2–3 only when the previous review found issues**

Repeat the production screenshot review no more than three total rounds. Keep the final images and remove superseded generated captures.

- [ ] **Step 6: Record final evidence**

Update `docs/qa-checklist.md` with command results, overflow metrics, routes, viewports, interaction flows, remaining real-data gaps, and image-permission warning.

- [ ] **Step 7: Run final verification**

Run: `npm test && npm run typecheck && npm run lint && npm run build && git diff --check`

Expected: PASS with no whitespace errors.

- [ ] **Step 8: Commit QA automation and evidence**

```bash
git add scripts/capture-visual-qa.mjs docs/qa-checklist.md artifacts/qa
git commit -m "test(elamer): verify marketplace experience"
```
