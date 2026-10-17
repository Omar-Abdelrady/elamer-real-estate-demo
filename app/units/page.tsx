import type { Metadata } from "next";
import { UnitsExplorer } from "@/components/units-explorer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "كل الوحدات | العامر للتسويق العقاري",
  description: "استكشف وحدات متنوعة من كتالوج العامر للتسويق العقاري، وقارن التفاصيل قبل التواصل.",
};

export default function UnitsPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">تخطي إلى المحتوى</a>
      <SiteHeader />
      <main id="main-content" className="catalog-page" aria-labelledby="catalog-title">
        <div className="catalog-page__intro page-shell">
          <span className="section-kicker">عقارات العامر</span>
          <h1 id="catalog-title">كل الوحدات</h1>
          <p>فلتر حسب احتياجك وافتح تفاصيل كل وحدة. قارن الصور والمساحة والمنطقة والسعر قبل ما تتواصل مع العامر.</p>
        </div>
        <UnitsExplorer />
      </main>
      <SiteFooter />
    </>
  );
}
