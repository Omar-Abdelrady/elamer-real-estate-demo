import Image from "next/image";
import type { PropertyListing } from "@/lib/site-content";
import { WhatsAppLink } from "./whatsapp-link";

const typeLabels = {
  residential: "سكني",
  commercial: "تجاري",
  administrative: "إداري",
  villa: "فيلا",
  townhouse: "تاون هاوس",
} as const;

const transactionLabels = { sale: "للبيع", rent: "للإيجار" } as const;

export function PropertyCard({ listing, headingLevel = "h3" }: { listing: PropertyListing; headingLevel?: "h2" | "h3" }) {
  const message = `مساء الخير، حابب أعرف تفاصيل عن ${listing.title} في ${listing.location}.`;
  const Heading = headingLevel;

  return (
    <article className="listing-card">
      <div className="listing-card__media">
        <Image src={listing.image} alt={listing.alt} fill sizes="(max-width: 680px) 100vw, (max-width: 1020px) 50vw, 33vw" />
        <span className="listing-card__badge">{transactionLabels[listing.transaction]}</span>
        <span className="listing-card__type">{typeLabels[listing.type]}</span>
      </div>
      <div className="listing-card__body">
        <div className="listing-card__heading">
          <div>
          <span className="listing-card__eyebrow">{listing.location}</span>
            <Heading>{listing.title}</Heading>
          </div>
          {listing.size ? <span className="listing-card__area">{listing.size} م²</span> : null}
        </div>
        <div className="listing-card__meta">
          {listing.bedrooms ? <span>{listing.bedrooms} غرف</span> : null}
          {listing.bathrooms ? <span>{listing.bathrooms} حمام</span> : null}
          {listing.details.filter((detail) => !detail.match(/^\d+ (غرف|حمام)$/)).map((detail) => <span key={detail}>{detail}</span>)}
          <strong>{listing.priceLabel}</strong>
        </div>
        <div className="listing-card__actions">
          <a className="listing-card__details" href={`/units/${listing.slug}`}>شوف التفاصيل</a>
          <WhatsAppLink label="اسأل عنها" message={message} variant="outline" />
        </div>
      </div>
    </article>
  );
}
