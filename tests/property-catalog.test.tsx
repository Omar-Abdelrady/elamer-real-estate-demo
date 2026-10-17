import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import UnitsPage from "@/app/units/page";
import { UnitsExplorer } from "@/components/units-explorer";
import { PropertyCard } from "@/components/property-card";
import { filterListings, getAvailablePropertyTypes, getListingLocations, parsePropertyQuery, serializePropertyQuery } from "@/lib/property-filters";
import { propertyListings } from "@/lib/site-content";

describe("El3amer property catalog", () => {
  it("publishes eight demo listings with four images each", () => {
    expect(propertyListings).toHaveLength(8);
    expect(propertyListings.every((item) => item.sourceStatus === "demo")).toBe(true);
    expect(propertyListings.every((item) => item.gallery.length === 4)).toBe(true);
    expect(propertyListings.every((item) => item.gallery.length === 4)).toBe(true);
  });

  it("exposes the units route with a filter landmark", () => {
    const markup = renderToStaticMarkup(<UnitsPage />);

    expect(markup).toContain("كل الوحدات");
    expect(markup).toContain('aria-label="فلترة الوحدات"');
  });

  it("renders the filter controls and result count", () => {
    const markup = renderToStaticMarkup(<UnitsExplorer />);

    expect(markup).toContain("فلترة النتائج");
    expect(markup).toContain("8 وحدات");
    expect(markup).toContain('aria-label="إغلاق الفلتر"');
    expect(markup).toContain("سكنية");
    expect(markup).toContain("تاون هاوس");
  });

  it("renders marketplace cards with transaction, price, and property data", () => {
    const markup = renderToStaticMarkup(<PropertyCard listing={propertyListings[0]} />);

    expect(markup).toContain("للبيع");
    expect(markup).toContain("شقة عصرية بإطلالة مفتوحة");
    expect(markup).toContain("3 غرف");
    expect(markup).toContain("2 حمام");
    expect(markup).toContain('href="/units/maadi-modern-apartment"');
    expect(markup).not.toContain("0 حمام");
    expect(markup).not.toContain("منشور موثق من الصفحة");
    expect(markup).not.toContain(">demo<");
  });

  it("combines query, location, transaction, type, and size filters against verified inventory", () => {
    expect(filterListings(propertyListings, {
      query: "مكتب جاهز",
      transaction: "rent",
      type: "administrative",
      location: "التجمع الخامس",
      size: "compact",
      bedrooms: "all",
    }).map((listing) => listing.slug)).toEqual(["new-cairo-office"]);

    expect(getAvailablePropertyTypes(propertyListings)).toEqual(["residential", "villa", "townhouse", "administrative", "commercial"]);
  });

  it("parses valid shareable filters and ignores unsupported values", () => {
    expect(parsePropertyQuery(new URLSearchParams("transaction=sale&location=%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D8%AF%D9%8A&type=invalid"))).toEqual({
      query: "",
      transaction: "sale",
      type: "all",
      location: "المعادي",
      size: "all",
      bedrooms: "all",
    });
  });

  it("serializes only active filters and preserves an honest empty rent intent", () => {
    expect(serializePropertyQuery({ query: "", transaction: "rent", type: "all", location: "all", size: "all", bedrooms: "all" })).toBe("transaction=rent");
    expect(filterListings(propertyListings, { query: "", transaction: "rent", type: "all", location: "all", size: "all", bedrooms: "all" }).length).toBeGreaterThan(0);
  });

  it("filters only by bedroom counts present in verified data", () => {
    expect(filterListings(propertyListings, { query: "", transaction: "all", type: "all", location: "all", size: "all", bedrooms: "3" }).map(({ slug }) => slug)).toEqual(["maadi-modern-apartment", "zahraa-garden-apartment"]);
    expect(parsePropertyQuery(new URLSearchParams("bedrooms=7")).bedrooms).toBe("all");
  });

  it("derives truthful location counts from the listing dataset", () => {
    expect(getListingLocations(propertyListings)).toEqual([
      { name: "المعادي", count: 1 },
      { name: "زهراء المعادي", count: 1 },
      { name: "التجمع الخامس", count: 2 },
      { name: "الشيخ زايد", count: 1 },
      { name: "6 أكتوبر", count: 1 },
      { name: "المعادي الجديدة", count: 1 },
      { name: "العين السخنة", count: 1 },
    ]);
  });

  it("keeps the neutral empty state copy in the client component", () => {
    expect(readFileSync("components/units-explorer.tsx", "utf8")).toContain("مفيش وحدات مطابقة دلوقتي");
  });
});
