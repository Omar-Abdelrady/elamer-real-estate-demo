import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { SiteHeader } from "@/components/site-header";
import { TransactionPanels } from "@/components/transaction-panels";

describe("El3amer landing sections", () => {
  it("includes the discovery sections and verified listing preview", () => {
    const markup = renderToStaticMarkup(<HomePage />);

    expect(markup).toContain('id="collection"');
    expect(markup).toContain('id="areas"');
    expect(markup).toContain('id="services"');
    expect(markup).toContain('id="process"');
    expect(markup).toContain("اختيارات جاهزة للعرض");
    expect(markup).toContain("165 م²");
    expect(markup.indexOf("skip-link")).toBeLessThan(markup.indexOf("site-header"));
    expect(markup).toContain("<h3>شقة عصرية بإطلالة مفتوحة</h3>");
    expect(markup).toContain("تصور بصري غير مرتبط بعقار معروض");
  });

  it("keeps the service promise visible in the page copy", () => {
    const markup = renderToStaticMarkup(<HomePage />);

    expect(markup).toContain("شوف عقارات للبيع");
    expect(markup).toContain("محتاج عقار للإيجار");
    expect(markup).toContain("اعرض عقارك مع العامر");
    expect(markup).toContain("الرسالة هتتجه مباشرة لواتساب العامر");
  });

  it("leads with the approved brokerage message and a functional property search", () => {
    const markup = renderToStaticMarkup(<HomePage />);

    expect(markup).toContain("عقارك المناسب أقرب مما تتخيل");
    expect(markup).toContain("تصفح العقارات");
    expect(markup).toContain("تواصل مع مستشار");
    expect(markup).toContain('aria-label="ابحث في العقارات"');
    expect(markup).toContain("الميزانية");
  });

  it("exposes direct sale and rent navigation without inventing inventory", () => {
    const markup = renderToStaticMarkup(<TransactionPanels />);

    expect(markup).toContain('href="/units?transaction=sale"');
    expect(markup).toContain('href="/units?transaction=rent"');
    expect(markup).toContain("وحدات للإيجار متاحة في الكتالوج");
  });

  it("labels the owner conversion link honestly", () => {
    const markup = renderToStaticMarkup(<SiteHeader />);

    expect(markup).toContain('href="/#owner"');
    expect(markup).toContain("اعرض عقارك");
    expect(markup).not.toContain("من نحن");
  });

  it("builds a complete brokerage discovery and conversion journey", () => {
    const markup = renderToStaticMarkup(<HomePage />);

    expect(markup).toContain("عقارات تستحق تشوفها");
    expect(markup).toContain("اختار المنطقة اللي تناسبك");
    expect(markup).toContain("بتدور على عقار للشراء؟");
    expect(markup).toContain("محتاج عقار للإيجار؟");
    expect(markup).toContain("عندك عقار وعايز تبيعه أو تأجره؟");
    expect(markup).toContain("مش لاقي العقار المناسب؟");
  });
});
