import { propertyListings } from "@/lib/site-content";
import { PropertyCard } from "./property-card";

import { sitePath } from "@/lib/site-paths";

export function ConceptCollection() {
  return (
    <section id="collection" className="content-section collection-section page-shell" aria-labelledby="collection-title">
      <div className="collection-section__heading">
        <div>
          <span className="section-kicker">اختيارات من الكتالوج</span>
          <h2 id="collection-title">وحدات تستحق تشوفها</h2>
        </div>
        <div className="collection-section__intro">
          <p>تفاصيل مرتبة وصور متعددة تساعدك تاخد فكرة واضحة قبل التواصل.</p>
          <a className="text-link" href={sitePath("/units")}>شوف كل الوحدات <span aria-hidden="true">←</span></a>
        </div>
      </div>

      <div className="collection-grid">
        {propertyListings.map((listing) => <PropertyCard key={listing.slug} listing={listing} />)}
      </div>
    </section>
  );
}
