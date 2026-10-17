import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyDetails } from "@/components/property-details";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { findPropertyBySlug, propertyListings } from "@/lib/site-content";

type PropertyPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return propertyListings.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const listing = findPropertyBySlug((await params).slug);
  if (!listing) return { title: "العقار غير موجود | العامر للتسويق العقاري" };
  return {
    title: `${listing.title} | العامر للتسويق العقاري`,
    description: listing.description,
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const listing = findPropertyBySlug((await params).slug);
  if (!listing) notFound();

  const related = propertyListings.filter((item) => item.slug !== listing.slug).slice(0, 2);
  return (
    <>
      <a className="skip-link" href="#main-content">تخطي إلى المحتوى</a>
      <SiteHeader />
      <main id="main-content"><PropertyDetails listing={listing} related={related} /></main>
      <SiteFooter />
    </>
  );
}
