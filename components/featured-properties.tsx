import { propertyListings } from "@/lib/site-content";
import { PropertyCard } from "./property-card";

export function FeaturedProperties() {
  return (
    <section id="collection" className="content-section collection-section page-shell" aria-labelledby="featured-title">
      <div className="section-heading">
        <div>
          <span className="section-kicker">اختيارات جاهزة للعرض</span>
          <h2 id="featured-title">عقارات تستحق تشوفها</h2>
        </div>
        <div className="section-heading__aside">
          <p>مجموعة متنوعة من الوحدات، مع تفاصيل واضحة تساعدك تبدأ المقارنة وتوصل للاختيار المناسب.</p>
          <a className="text-link" href="/units">تصفح كل العقارات <span aria-hidden="true">←</span></a>
        </div>
      </div>
      <div className="collection-grid">{propertyListings.slice(0, 6).map((listing) => <PropertyCard key={listing.slug} listing={listing} />)}</div>
    </section>
  );
}
