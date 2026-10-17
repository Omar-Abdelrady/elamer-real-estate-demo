# El3amer Editorial Real Estate Demo Design

## Goal

Create a modern bilingual-ready real-estate landing demo for El3amer that feels like a refined property editorial, converts visitors into WhatsApp conversations, and uses the collected brand/logo assets without presenting AI-generated images as real listings.

## Audience and outcome

- Primary audience: people looking to buy, sell, rent, or market a home in Zahraa El Maadi, Maadi, and nearby Cairo areas.
- Primary conversion: WhatsApp inquiry.
- Secondary conversion: browse the curated demo collection and understand El3amer's services.
- Demo rule: every AI image is labeled as an illustrative concept and carries no fabricated price, availability, or property specification.

## Recommended visual direction

Use an editorial real-estate showcase rather than a marketplace template or a dark SaaS dashboard. The page uses a warm ivory canvas, ink-brown typography, restrained bronze accents, oversized photography, asymmetrical magazine-like composition, and calm card surfaces. The logo remains the recognizable brand anchor while the surrounding UI is more polished than the source social posts.

### Tokens

- Canvas: `#F7F3EC`
- Ink: `#211E1A`
- Brand brown: `#60452F`
- Bronze accent: `#A87945`
- Muted text: `#756D64`
- Soft border: `#DED5C9`
- Surface: `#FFFCF7`
- Success/WhatsApp: `#267A53`

### Typography

- Arabic UI and body: Noto Sans Arabic, 400/500/600/700.
- Arabic editorial display: Noto Naskh Arabic, 600/700, only for short hero/section statements.
- Latin labels and numerals: Manrope, 500/600/700.
- All Arabic text must use adequate line-height and no forced clipping or fixed-height text boxes.

## Information architecture

1. Header: logo, anchor navigation, language toggle placeholder, WhatsApp CTA.
2. Hero: editorial statement, supporting copy, two CTAs, large concept image, trust note.
3. Proof strip: services and local coverage.
4. Curated collection: six visual concept cards with category and illustrative label.
5. Areas: Zahraa El Maadi, Maadi, New Cairo, and nearby areas.
6. Services: sale, purchase, rental, and property marketing.
7. Process: tell us what you need, shortlist, viewing, close.
8. Trust CTA: short brand statement and WhatsApp action.
9. Footer: contact details and source/social links.

## Interaction and motion

- Use Lenis for smooth scrolling with a native-scroll fallback when reduced motion is enabled.
- Use GSAP or lightweight CSS for enter reveals, with 300–600ms ease-out motion and small 8–24px offsets.
- Use a restrained image parallax on decorative/background layers only.
- Cards use a 1.02 hover scale, bronze border/overlay shift, and no perpetual decorative animation.
- Header becomes compact after the first viewport while preserving a visible WhatsApp CTA.
- No content is hidden from SEO or assistive technology just because animation has not run.

## Responsive behavior

- 375px: single-column flow, compact header, horizontal overflow-free cards, 44px minimum touch targets.
- 768px: two-column collection grid and split hero with reduced image height.
- 1024px: editorial two-column composition with wider content gutters.
- 1440px: 12-column max-width layout, large hero media, generous whitespace.

## Accessibility and content rules

- WCAG AA contrast target for all body and CTA text.
- Visible keyboard focus rings and semantic headings in order.
- Icon buttons have accessible labels; icons use inline SVG/Lucide-style shapes rather than emoji.
- Every image has meaningful alt text; decorative images use empty alt text.
- WhatsApp links use `https://wa.me/2010164434444`.
- Real Facebook reference photos remain reference-only until usage permission is confirmed.

## Success criteria

- The first viewport communicates what El3amer does, where it operates, and how to contact it within five seconds.
- The page feels clearly different from the previous S Clinics website.
- Arabic copy is readable at 375px without clipped diacritics or overlapping glyphs.
- The visual collection is rich enough to sell the concept while clearly labeling AI imagery.
- `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` pass.
