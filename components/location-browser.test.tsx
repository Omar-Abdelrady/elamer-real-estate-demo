import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { LocationBrowser } from "@/components/location-browser";

describe("LocationBrowser", () => {
  it("keeps the location list compact with vertical carousel controls", () => {
    const markup = renderToStaticMarkup(<LocationBrowser />);

    expect(markup).toContain('data-location-carousel="true"');
    expect(markup).toContain('aria-label="عرض المناطق التالية"');
    expect(markup).toContain('aria-live="polite"');
    expect(markup).toContain("المعادي");
  });
});
