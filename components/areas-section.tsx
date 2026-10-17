import Image from "next/image";
import { areas } from "@/lib/site-content";
import { siteAsset } from "@/lib/site-paths";

export function AreasSection() {
  return (
    <section id="areas" className="areas-section" aria-labelledby="areas-title">
      <div className="areas-section__inner page-shell">
        <div className="areas-section__visual">
          <Image src={siteAsset("/assets/ai/gated-community-aerial.png")} alt="تصور بصري لمنطقة سكنية متكاملة" fill sizes="(max-width: 820px) 100vw, 44vw" />
          <span>صورة توضيحية للمناطق السكنية</span>
        </div>
        <div className="areas-section__content">
          <span className="section-kicker section-kicker--light">نطاق العمل</span>
          <h2 id="areas-title">المكان الصح بيفرق في كل يوم.</h2>
          <p>نبدأ بالمنطقة اللي تناسب يومك، وبعدها نرتب لك المتاح حسب المساحة وطبيعة الاستخدام.</p>
          <div className="areas-list">
            {areas.map((area) => (
              <a className="area-row" href="/units" key={area.name}>
                <span className="area-row__number">{area.index}</span>
                <span className="area-row__name">{area.name}</span>
                <span className="area-row__detail">{area.detail}</span>
                <span className="area-row__arrow" aria-hidden="true">←</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
