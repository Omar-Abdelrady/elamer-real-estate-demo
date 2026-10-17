# Elamer Real Estate Marketplace Redesign

## Status

Approved for implementation on 2026-10-17. The user confirmed that the existing **العامر للتسويق العقاري** project, identity, logo, contact details, listings, and assets are the source of truth. The earlier “Al Taher” name was a prompt error and must not appear in the product.

## Objective

Transform the current editorial prototype into a credible Arabic-first real-estate brokerage platform. The experience must help buyers and tenants discover inventory, help property owners start a sales or rental inquiry, and make contacting Elamer effortless without inventing inventory, prices, locations, achievements, testimonials, or business details.

## Considered directions

### A. Marketplace-first brokerage — selected

Lead with search, real listing cards, shareable filters, and dedicated property pages. Support this with compact trust and owner-conversion sections. This best matches a brokerage whose value is discovery, evaluation, and direct contact.

### B. Editorial brand story

Prioritize large photography and brand storytelling, with listings as a secondary section. Visually distinctive but slower for visitors who arrive ready to browse.

### C. Dense property portal

Use a highly compact, data-heavy catalog similar to a mature classifieds product. Efficient at scale, but too dense for the current three-property dataset and likely to expose empty controls.

## Information architecture

### `/`

1. Compact sticky header with logo, primary navigation, phone, and contact CTA.
2. Split hero using an existing project image, approved headline and supporting copy, browse CTA, and advisor CTA.
3. Functional search panel immediately below the hero.
4. Up to six real featured listings; currently all three verified Facebook listings.
5. Location discovery generated from listing data with truthful counts.
6. Purchase and rental discovery panels. Purchase routes to available sale inventory; rental routes to a valid empty filtered state until verified rental inventory is added.
7. Four-step brokerage journey without fabricated proof points.
8. Property-owner CTA using the verified WhatsApp number.
9. Lead-generation form that formats the visitor’s criteria into a WhatsApp message.
10. Footer with verified contact information and existing Facebook page only.

### `/units`

Catalog page with query-parameter-backed filters for transaction, type, location, and size. Price/budget controls appear disabled with a clear explanation because no numeric prices are verified. Sorting is omitted because reliable listing dates are unavailable. Empty states keep the current filters visible and provide reset/contact actions.

### `/units/[slug]`

Dedicated details route for each real listing. It uses the saved authentic source image, verified title, location, size, known specifications, source link, reference when available, and a property-specific WhatsApp message. Missing fields are omitted rather than rendered as zero or placeholders.

## Verified data model

Each property supports:

- `slug`
- `title`
- `location`
- `transaction` when verified (`sale` for the three saved listings)
- `type`
- `size`
- optional bedrooms and bathrooms
- optional source reference
- price label (`السعر عند التواصل` until a real price exists)
- image and alt text
- verified details and source URL

Search/filter options are derived from this dataset. Unavailable property types and locations are not shown. The rental route is allowed to return a purposeful empty state; it must not synthesize rental listings.

## Visual system

- Primary forest: `#19342D`
- Warm off-white: `#F5F4F0`
- Surface: `#FFFFFF`
- Muted copper: `#B77B56`
- Primary text: `#242824`
- Secondary text: `#66706A`
- Borders: `#E3E5DF`
- Headings: Alexandria
- Body/UI: IBM Plex Sans Arabic
- Maximum content width: 1200px
- Desktop section rhythm: 80–96px
- Mobile section rhythm: 48–64px
- 8px spacing base, 12px card radius, 8px controls

The design is practical and trustworthy rather than luxurious. It avoids giant display text, ornamental grids, unnecessary gradients, repetitive card walls, and empty whitespace. Motion is limited to 150–250ms state transitions and modest reveal/hover behavior, with reduced-motion support.

## Key components

- `SiteHeader`: compact desktop navigation and accessible mobile menu.
- `HeroSection`: approved brokerage message, authentic project image, and two conversion paths.
- `PropertySearch`: URL-aware controls with only supported filters enabled.
- `PropertyCard`: real marketplace card with conditional metadata.
- `LocationBrowser`: listing-derived locations and counts.
- `TransactionPanels`: honest sale and rental entry points.
- `ProcessSection`: four-step customer journey.
- `OwnerCta`: prefilled owner WhatsApp inquiry.
- `LeadForm`: client-side criteria collection and formatted WhatsApp handoff.
- `UnitsExplorer`: shareable query filters, responsive drawer, result count, and empty state.
- `PropertyDetails`: semantic gallery/details/contact composition.

## Data and interaction flow

1. `lib/site-content.ts` remains the verified content source.
2. A small query adapter parses URL search parameters into validated filter state.
3. Homepage search and discovery links navigate to `/units` with those parameters.
4. Catalog changes update the URL without a backend request.
5. Listing details resolve by slug; unknown slugs return the framework’s not-found route.
6. Lead and property CTAs create encoded `wa.me` URLs using the existing verified number.

## Accessibility and resilience

- Full RTL semantics and logical CSS properties.
- One `h1` per page and ordered heading levels.
- Native labels, visible focus, minimum 44px targets, and keyboard-operable menus/drawers.
- Mobile modal filters trap focus, block background interaction, restore focus, and close with Escape.
- Empty states for unsupported or unmatched filters.
- All body and action text targets WCAG AA contrast.
- Images use meaningful alt text; no image is described as cleaned or authentic beyond its documented source.

## SEO

- Arabic metadata for the homepage, catalog, and each property detail route.
- Descriptive titles based only on verified property information.
- Semantic links between homepage, catalog filters, and details.

## Testing and visual QA

- Unit tests for data truthfulness, query parsing/serialization, filtering, WhatsApp formatting, and property lookup.
- Component/static tests for semantic landmarks, headings, real listing content, and honest disabled controls.
- Production build verification with test, typecheck, lint, and build commands.
- Playwright at 390px, 768px, and 1440px for homepage, catalog, details, mobile menu/filter, search, URL filters, empty states, and contact actions.
- Up to three screenshot review/fix rounds, retaining final evidence only.

## Explicit non-goals

- No database, CMS, accounts, favorites, checkout, maps, analytics, or fake backend.
- No fabricated listings, rent inventory, price ranges, dates, reviews, social profiles, address, or achievements.
- No framework migration.

## Success criteria

1. Visitors understand within the first viewport that Elamer handles property sales and rentals in its documented operating area.
2. Every visible listing is backed by the saved Facebook references.
3. Search and shareable filters behave consistently across homepage and catalog.
4. Every listing has a useful dedicated detail route and property-specific contact action.
5. Property owners and unmatched seekers can start meaningful WhatsApp inquiries.
6. No horizontal overflow or RTL defects at 390px, 768px, or 1440px.
7. Automated checks and production visual QA pass.
