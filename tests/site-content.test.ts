import { describe, expect, it } from "vitest";
import { findPropertyBySlug, propertyListings, siteContact } from "@/lib/site-content";

describe("El3amer demo content", () => {
  it("provides the eight demo listings with complete gallery data", () => {
    expect(propertyListings).toHaveLength(8);
    expect(propertyListings.every((item) => item.gallery.length === 4)).toBe(true);
    expect(propertyListings.every((item) => new Set(item.gallery.map((image) => image.src)).size === 4)).toBe(true);
    expect(propertyListings.every((item) => item.image === item.gallery[0].src)).toBe(true);
    expect(new Set(propertyListings.map((item) => item.transaction))).toEqual(new Set(["sale", "rent"]));
    expect(new Set(propertyListings.map((item) => item.type))).toEqual(new Set(["residential", "villa", "townhouse", "administrative", "commercial"]));
  });

  it("uses the demo inventory slugs and avoids real-post source claims", () => {
    expect(propertyListings.map((listing) => listing.slug)).toEqual([
      "maadi-modern-apartment",
      "zahraa-garden-apartment",
      "new-cairo-duplex",
      "sheikh-zayed-villa",
      "october-townhouse",
      "new-cairo-office",
      "maadi-new-retail",
      "ain-sokhna-chalet",
    ]);
    expect(propertyListings.every((listing) => listing.sourceStatus === "demo")).toBe(true);
    expect(propertyListings.every((listing) => !listing.sourceHref)).toBe(true);
    expect(findPropertyBySlug("maadi-modern-apartment")?.size).toBe(165);
    expect(findPropertyBySlug("missing-listing")).toBeUndefined();
  });

  it("keeps the WhatsApp contact in international format", () => {
    expect(siteContact.whatsappHref).toBe("https://wa.me/2010164434444");
  });
});
