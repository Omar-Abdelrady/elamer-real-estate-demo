import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { readFileSync } from "node:fs";

describe("El3amer page shell", () => {
  it("exposes accessible landmarks and a WhatsApp CTA", () => {
    const markup = renderToStaticMarkup(<HomePage />);

    expect(markup).toContain("<main");
    expect(markup).toContain("<nav");
    expect(markup).toContain('href="/units"');
    expect(markup).toContain("تصفح كل العقارات");
    expect(markup).not.toContain("REAL ESTATE / CAIRO");
    expect(markup).toContain("https://wa.me/2010164434444");
    expect(markup).toContain('data-art-direction="brokerage-marketplace"');
    expect(markup).toContain('href="#main-content"');
  });

  it("uses the approved brand tokens and accessible motion fallback", () => {
    const css = readFileSync("app/globals.css", "utf8").toLowerCase();

    expect(css).toContain("--forest: #19342d");
    expect(css).toContain("--canvas: #f5f4f0");
    expect(css).toContain('"ibm plex sans arabic"');
    expect(css).toContain("font-size: clamp(3rem, 4vw, 3.5rem)");
    expect(css).toContain("font-size: 2.25rem");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });
});
