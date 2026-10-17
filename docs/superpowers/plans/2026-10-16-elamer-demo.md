# El3amer Editorial Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished Arabic-first, bilingual-ready Next.js real-estate landing demo for El3amer using the approved editorial ivory/bronze design direction and the prepared asset pack.

**Architecture:** Create a self-contained Next.js app inside `projects/elamer-real-estate-demo`. Keep content in typed local data, render the page through focused section components, and keep motion in one client-side hook so the page remains readable with JavaScript disabled or reduced motion enabled.

**Tech Stack:** Next.js 16, React 19, TypeScript, global CSS, Vitest, Lenis, local public assets.

## Global Constraints

- Use the prepared brand assets from `assets/reference/` and `assets/ai/`.
- Label every AI image as `صورة توضيحية` and never invent availability, price, or real-unit claims.
- Use the approved palette: `#F7F3EC`, `#211E1A`, `#60452F`, `#A87945`, `#756D64`, `#DED5C9`.
- Use Noto Sans Arabic/Noto Naskh Arabic for Arabic and Manrope for Latin labels.
- Keep the main page Arabic-first with `dir="rtl"`; expose an English toggle placeholder without implementing translation content yet.
- Preserve unrelated `lead-crm/` changes in the dirty worktree.
- Verify at 375px, 768px, 1024px, and 1440px before declaring completion.

---

### Task 1: Scaffold the isolated demo app and test harness

**Files:**
- Create: `projects/elamer-real-estate-demo/package.json`
- Create: `projects/elamer-real-estate-demo/tsconfig.json`
- Create: `projects/elamer-real-estate-demo/next-env.d.ts`
- Create: `projects/elamer-real-estate-demo/next.config.ts`
- Create: `projects/elamer-real-estate-demo/eslint.config.mjs`
- Create: `projects/elamer-real-estate-demo/vitest.config.ts`
- Create: `projects/elamer-real-estate-demo/tests/site-content.test.ts`

**Interfaces:**
- Produces the Next.js scripts `dev`, `build`, `start`, `lint`, `typecheck`, and `test`.
- Produces Vitest path alias support for `@/*`.

- [ ] **Step 1: Add a failing content contract test**

```ts
import { describe, expect, it } from "vitest";
import { propertyConcepts, siteContact } from "@/lib/site-content";

describe("El3amer demo content", () => {
  it("keeps the concept collection useful and clearly labeled", () => {
    expect(propertyConcepts).toHaveLength(6);
    expect(propertyConcepts.every((item) => item.badge === "صورة توضيحية")).toBe(true);
  });

  it("keeps the WhatsApp contact in international format", () => {
    expect(siteContact.whatsappHref).toBe("https://wa.me/2010164434444");
  });
});
```

- [ ] **Step 2: Run the focused test and confirm the expected missing-module failure**

Run: `npm test -- tests/site-content.test.ts`

Expected: FAIL because `@/lib/site-content` does not exist yet.

- [ ] **Step 3: Add the minimal app configuration and test scripts**

Use Next 16, React 19, TypeScript 5.9, Vitest 5, `lenis`, and `gsap`. Configure `@/*` to resolve from the project root and use an ESLint flat config with Next core web vitals rules.

- [ ] **Step 4: Run the focused test again**

Run: `npm test -- tests/site-content.test.ts`

Expected: the test still fails on the missing content module, confirming the test is red for the intended reason.

---

### Task 2: Add typed content and reusable link helpers

**Files:**
- Create: `projects/elamer-real-estate-demo/lib/site-content.ts`
- Create: `projects/elamer-real-estate-demo/lib/site-content.test.ts`

**Interfaces:**
- Export `propertyConcepts`, `areas`, `services`, `processSteps`, `siteContact`, and `whatsappHref(message?: string): string`.
- `propertyConcepts` items expose `slug`, `title`, `location`, `type`, `image`, `badge`, `alt`, and `tone`.

- [ ] **Step 1: Add helper tests for URL encoding and stable content fields**

```ts
import { describe, expect, it } from "vitest";
import { propertyConcepts, whatsappHref } from "@/lib/site-content";

describe("site content helpers", () => {
  it("encodes a WhatsApp message without losing Arabic text", () => {
    expect(whatsappHref("عاوز أعرف الوحدات المتاحة")).toBe(
      "https://wa.me/2010164434444?text=%D8%B9%D8%A7%D9%88%D8%B2%20%D8%A3%D8%B9%D8%B1%D9%81%20%D8%A7%D9%84%D9%88%D8%AD%D8%AF%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D8%AA%D8%A7%D8%AD%D8%A9",
    );
  });

  it("uses assets that exist in the project public directory", () => {
    expect(propertyConcepts.map((item) => item.image)).toEqual([
      "/assets/ai/hero-compound-exterior.png",
      "/assets/ai/bright-living-room.png",
      "/assets/ai/pool-villa-exterior.png",
      "/assets/ai/city-view-apartment.png",
      "/assets/ai/modern-townhouse-exterior.png",
      "/assets/ai/marble-kitchen.png",
    ]);
  });
});
```

- [ ] **Step 2: Run the helper tests and confirm they fail before implementation**

Run: `npm test -- lib/site-content.test.ts`

Expected: FAIL because the exported data and helper do not exist yet.

- [ ] **Step 3: Implement typed local content**

Use only verified public facts from `docs/facebook-research.md`: El3amer sells, rents, and markets units around Zahraa El Maadi and nearby areas; contact is `01016443444`; email is `elamerestate@yahoo.com`. Keep AI property data conceptual and do not add fake prices.

- [ ] **Step 4: Run both content test files**

Run: `npm test -- tests/site-content.test.ts lib/site-content.test.ts`

Expected: PASS.

---

### Task 3: Build the visual foundation and shell

**Files:**
- Create: `projects/elamer-real-estate-demo/app/layout.tsx`
- Create: `projects/elamer-real-estate-demo/app/page.tsx`
- Create: `projects/elamer-real-estate-demo/app/globals.css`
- Create: `projects/elamer-real-estate-demo/components/site-header.tsx`
- Create: `projects/elamer-real-estate-demo/components/whatsapp-link.tsx`
- Create: `projects/elamer-real-estate-demo/components/page-smoke.test.tsx`

**Interfaces:**
- `SiteHeader` renders semantic navigation and accepts `contactHref: string`.
- `WhatsAppLink` accepts `href`, `label`, `variant`, and optional `className`.

- [ ] **Step 1: Add a page smoke test for landmarks and the main CTA**

Test that the rendered page exposes one `main`, a navigation landmark, the Arabic hero heading, and a WhatsApp link whose href starts with `https://wa.me/2010164434444`.

- [ ] **Step 2: Run the smoke test and confirm the missing page output failure**

Run: `npm test -- components/page-smoke.test.tsx`

Expected: FAIL because the page and components are not implemented.

- [ ] **Step 3: Implement the app layout and global tokens**

Set `lang="ar"`, `dir="rtl"`, metadata title/description, font imports, CSS variables, selection color, focus ring, responsive container, and reduced-motion fallback. Copy `assets/` into `public/assets/` using a filesystem copy so Next can serve the existing images without remote URLs.

- [ ] **Step 4: Implement the header and contact link**

Use the transparent logo, a compact anchor nav, an English placeholder toggle, and an orange/bronze WhatsApp CTA with an SVG arrow. The mobile menu is a native `<details>` pattern or a controlled disclosure with `aria-expanded`, not a hover-only menu.

- [ ] **Step 5: Run typecheck, lint, and the smoke test**

Run: `npm run typecheck && npm run lint && npm test -- components/page-smoke.test.tsx`

Expected: PASS with no TypeScript or accessibility lint errors.

---

### Task 4: Implement the editorial landing sections

**Files:**
- Create: `projects/elamer-real-estate-demo/components/hero-section.tsx`
- Create: `projects/elamer-real-estate-demo/components/proof-strip.tsx`
- Create: `projects/elamer-real-estate-demo/components/concept-collection.tsx`
- Create: `projects/elamer-real-estate-demo/components/areas-section.tsx`
- Create: `projects/elamer-real-estate-demo/components/services-section.tsx`
- Create: `projects/elamer-real-estate-demo/components/process-section.tsx`
- Create: `projects/elamer-real-estate-demo/components/trust-cta.tsx`
- Create: `projects/elamer-real-estate-demo/components/site-footer.tsx`
- Create: `projects/elamer-real-estate-demo/components/landing-sections.test.tsx`
- Modify: `projects/elamer-real-estate-demo/app/page.tsx`
- Modify: `projects/elamer-real-estate-demo/app/globals.css`

**Interfaces:**
- Each section owns its heading, semantic landmark, and layout styles.
- `ConceptCollection` consumes `propertyConcepts` and renders six cards with an explicit illustrative badge.

- [ ] **Step 1: Add section contract tests**

Assert the page includes the section IDs `collection`, `areas`, `services`, and `process`; six concept cards; the four listed services; and a final WhatsApp CTA.

- [ ] **Step 2: Run the section tests and confirm they fail**

Run: `npm test -- components/landing-sections.test.tsx`

Expected: FAIL because the sections are not implemented.

- [ ] **Step 3: Implement the hero and proof strip**

Use the compound image as the hero media, a readable display heading with sufficient line-height, a short Arabic paragraph, two CTAs, and three proof facts: local coverage, direct WhatsApp, and sale/rent/marketing.

- [ ] **Step 4: Implement the concept collection and areas**

Use an asymmetric CSS grid at desktop, two columns at tablet, and one column at mobile. Include image overlays with category/location and the exact `صورة توضيحية` badge. Do not show fake listing prices.

- [ ] **Step 5: Implement services, process, trust CTA, and footer**

Use concise copy, icon shapes built from inline SVG, and real contact values from the research doc. Keep the footer useful on mobile rather than repeating decorative text.

- [ ] **Step 6: Run section tests and static checks**

Run: `npm test -- components/landing-sections.test.tsx && npm run typecheck && npm run lint`

Expected: PASS.

---

### Task 5: Add Lenis and restrained scroll motion

**Files:**
- Create: `projects/elamer-real-estate-demo/components/smooth-scroll.tsx`
- Create: `projects/elamer-real-estate-demo/components/motion-reveal.tsx`
- Create: `projects/elamer-real-estate-demo/components/motion-reveal.test.tsx`
- Modify: `projects/elamer-real-estate-demo/app/layout.tsx`
- Modify: `projects/elamer-real-estate-demo/app/globals.css`

**Interfaces:**
- `SmoothScroll` wraps children and disables Lenis when `prefers-reduced-motion: reduce` matches.
- `MotionReveal` accepts `children`, `className`, `delay`, and `as` while preserving semantic markup.

- [ ] **Step 1: Add reduced-motion behavior tests**

Test the motion helper's class contract and that content is not hidden by default when the motion preference is reduced.

- [ ] **Step 2: Run the motion tests before implementation**

Run: `npm test -- components/motion-reveal.test.tsx`

Expected: FAIL because the motion components are not implemented.

- [ ] **Step 3: Implement Lenis lifecycle and reveal behavior**

Initialize Lenis once on mount, cancel the RAF on unmount, and use `IntersectionObserver`/CSS transitions for simple reveal behavior. Keep the implementation lightweight; no pinned sections or text splitting.

- [ ] **Step 4: Run motion tests and static checks**

Run: `npm test -- components/motion-reveal.test.tsx && npm run typecheck && npm run lint`

Expected: PASS.

---

### Task 6: Responsive and visual QA

**Files:**
- Modify: `projects/elamer-real-estate-demo/app/globals.css`
- Create: `projects/elamer-real-estate-demo/docs/qa-checklist.md`

- [ ] **Step 1: Run the full automated verification**

Run: `npm test && npm run typecheck && npm run lint && npm run build`

Expected: all commands exit with code 0.

- [ ] **Step 2: Start the production-like dev server**

Run: `npm run dev -- --hostname 127.0.0.1 --port 3010`

Expected: the demo is reachable at `http://127.0.0.1:3010`.

- [ ] **Step 3: Visually inspect the four target widths**

Check 375px, 768px, 1024px, and 1440px for overflow, clipped Arabic glyphs, image loading, focus visibility, mobile menu usability, CTA tap size, and stable section spacing.

- [ ] **Step 4: Run the final checklist and document findings**

Record any fixes in `docs/qa-checklist.md`, including the viewport checked, issue, fix, and verification result. Only call the demo ready after all four widths have no blocking issues.
