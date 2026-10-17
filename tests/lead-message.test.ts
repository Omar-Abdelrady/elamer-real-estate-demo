import { describe, expect, it } from "vitest";
import { buildLeadMessage } from "@/lib/lead-message";

describe("Elamer lead message", () => {
  it("builds a natural Arabic WhatsApp enquiry from the form fields", () => {
    expect(buildLeadMessage({ transaction: "sale", location: "المعادي", type: "residential", budget: "غير محدد", notes: "دور هادئ" })).toBe(
      "مساء الخير، بدور على عقار للبيع. المنطقة المفضلة: المعادي. النوع: سكني. الميزانية: غير محدد. ملاحظات: دور هادئ.",
    );
  });
});
