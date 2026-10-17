import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PropertyDetails } from "@/components/property-details";
import { propertyListings } from "@/lib/site-content";

describe("Elamer property details", () => {
  it("covers every verified property slug", () => {
    expect(propertyListings.map(({ slug }) => slug)).toEqual([
      "maadi-modern-apartment",
      "zahraa-garden-apartment",
      "new-cairo-duplex",
      "sheikh-zayed-villa",
      "october-townhouse",
      "new-cairo-office",
      "maadi-new-retail",
      "ain-sokhna-chalet",
    ]);
  });

  it("shows a four-image gallery and direct conversion actions", () => {
    const markup = renderToStaticMarkup(<PropertyDetails listing={propertyListings[0]} />);

    expect(markup).toContain("شقة عصرية بإطلالة مفتوحة");
    expect(markup).toContain("2,850,000 جنيه");
    expect(markup).toContain("3 غرف");
    expect(markup).toContain("2 حمام");
    expect(markup.match(/aria-label="عرض صورة/g)).toHaveLength(4);
    expect(markup).toContain("01-cover.png");
    expect(markup).toContain("04-detail.png");
    expect(markup).toContain("اسأل عن العقار");
    expect(markup).not.toContain("المنشور الأصلي");
    expect(markup).not.toContain(">demo<");
  });
});
