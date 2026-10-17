# El3amer Property Catalog Design

## Goal

Turn the El3amer prototype from a decorative one-page landing page into a clearer real-estate experience: a calmer hero and navigation, plus a dedicated /units catalog where visitors can browse and filter illustrative residential, commercial, administrative, villa, and townhouse units.

## Design direction

The previous architectural grid was useful as a brand cue but became visually noisy. The revised direction is **quiet editorial catalog**:

- Remove the repeated full-page background grid and most decorative rectangles.
- Use one warm ivory canvas, deep ink typography, and one restrained terracotta accent.
- Keep only purposeful dividers around navigation, the catalog filter, and card metadata.
- Use a short Arabic hero message with one strong image composition and one primary CTA.
- Use a compact horizontal navbar: logo, two or three high-value links, one clear contact action, and a mobile drawer.
- Keep the brand mark in its original proportions and never recreate it as text-only artwork.

## Routes and page responsibilities

### /

The landing page communicates trust and directs the visitor to the catalog. The hero should not try to explain every service. The existing editorial sections remain, but their headings and spacing are simplified so the catalog becomes the main action.

### /units

The catalog is a client-side prototype backed by typed local data. It includes:

- A page intro with result count and a search field.
- A filter rail on desktop and an accessible drawer trigger on small screens.
- Filters for unit type, transaction, area, bedrooms, and budget range.
- A clear-filters action and active filter summary.
- A responsive result grid with image, illustrative badge, type, area, bedrooms, size, price label, and a WhatsApp CTA.
- A friendly empty state when a combination has no matches.

All prices and unit details are demo content. The UI must make that clear and must not imply these are confirmed listings.

## Interaction and accessibility

- Filter controls use native checkboxes, radios, and a labeled search input.
- The results update immediately without a network request.
- The mobile filter drawer exposes aria-expanded and closes after applying or clearing filters.
- Every image has meaningful Arabic alt text.
- Focus rings remain visible and all interactive targets are at least 44px tall.
- Reduced motion disables reveal transforms and drawer transitions.

## Technical boundaries

- Keep data in lib/site-content.ts; do not add a database or localStorage.
- Make only the catalog filter client-side; keep the landing page statically rendered.
- Reuse WhatsAppLink, MotionReveal, Next Image, and the existing Lenis wrapper.
- Preserve the existing / content tests and add focused catalog filtering tests.
- Preserve unrelated CRM files and project assets.

## Success criteria

1. The hero and navbar read clearly at desktop and 375px mobile widths.
2. No decorative background grid overwhelms the content.
3. /units renders all local demo units on first load.
4. Applying multiple filters returns only matching cards; clearing restores all cards.
5. A no-results combination renders an accessible empty state.
6. npm test, npm run typecheck, npm run lint, and npm run build pass.
