import type { PropertyListing } from "@/lib/site-content";
import { sitePath } from "@/lib/site-paths";
import { PropertyCard } from "./property-card";
import { PropertyGallery } from "./property-gallery";
import { WhatsAppLink } from "./whatsapp-link";

const transactionLabels = { sale: "للبيع", rent: "للإيجار" } as const;

export function PropertyDetails({ listing, related = [] }: { listing: PropertyListing; related?: PropertyListing[] }) {
  const message = `مساء الخير، حابب أعرف تفاصيل ${listing.title} في ${listing.location}.`;

  return (
    <>
      <article className="property-details page-shell">
        <nav className="property-details__breadcrumbs" aria-label="مسار التنقل">
          <a href={sitePath("/")}>الرئيسية</a><span aria-hidden="true">/</span><a href={sitePath("/units")}>العقارات</a><span aria-hidden="true">/</span><span>{listing.title}</span>
        </nav>

        <div className="property-details__layout">
          <PropertyGallery listing={listing} />

          <div className="property-details__content">
            <div className="property-details__badges">
              <span>{transactionLabels[listing.transaction]}</span>
              {listing.reference ? <span dir="ltr">REF {listing.reference}</span> : null}
            </div>
            <p className="property-details__location">{listing.location}</p>
            <h1>{listing.title}</h1>
            <p className="property-details__description">{listing.description}</p>
            <strong className="property-details__price">{listing.priceLabel}</strong>

            <dl>
              <div><dt>المنطقة</dt><dd>{listing.location}</dd></div>
              {listing.size ? <div><dt>المساحة</dt><dd>{listing.size} م²</dd></div> : null}
              {listing.bedrooms ? <div><dt>غرف النوم</dt><dd>{listing.bedrooms} غرف</dd></div> : null}
              {listing.bathrooms ? <div><dt>الحمامات</dt><dd>{listing.bathrooms} حمام</dd></div> : null}
              {listing.details.filter((detail) => !detail.match(/^\d+ (غرف|حمام)$/)).map((detail) => <div key={detail}><dt>تفصيل موثق</dt><dd>{detail}</dd></div>)}
            </dl>

            <div className="property-details__actions">
              <WhatsAppLink label="اسأل عن العقار" message={message} />
            </div>
            <p className="property-details__notice">التوفر والسعر النهائي بيتأكدوا وقت التواصل مع العامر.</p>
          </div>
        </div>
      </article>

      {related.length ? (
        <section className="related-properties page-shell" aria-labelledby="related-title">
          <div className="related-properties__heading"><span className="section-kicker">اختيارات تانية</span><h2 id="related-title">عقارات ممكن تناسبك</h2></div>
          <div className="collection-grid">{related.map((item) => <PropertyCard key={item.slug} listing={item} />)}</div>
        </section>
      ) : null}
    </>
  );
}
