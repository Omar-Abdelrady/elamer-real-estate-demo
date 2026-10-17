import { HeroSection } from "@/components/hero-section";
import { MotionReveal } from "@/components/motion-reveal";
import { FeaturedProperties } from "@/components/featured-properties";
import { LocationBrowser } from "@/components/location-browser";
import { ProcessSection } from "@/components/process-section";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertySearch } from "@/components/property-search";
import { TransactionPanels } from "@/components/transaction-panels";
import { OwnerCta } from "@/components/owner-cta";
import { LeadForm } from "@/components/lead-form";

export default function HomePage() {
  return (
    <div data-art-direction="brokerage-marketplace">
      <a className="skip-link" href="#main-content">تخطي إلى المحتوى</a>
      <SiteHeader />
      <span id="top" aria-hidden="true" />
      <main id="main-content">
        <HeroSection />
        <PropertySearch />
        <MotionReveal delay={40}><FeaturedProperties /></MotionReveal>
        <MotionReveal delay={60}><LocationBrowser /></MotionReveal>
        <MotionReveal delay={80}><TransactionPanels /></MotionReveal>
        <MotionReveal delay={90}><ProcessSection /></MotionReveal>
        <MotionReveal delay={100}><OwnerCta /></MotionReveal>
        <MotionReveal delay={110}><LeadForm /></MotionReveal>
      </main>
      <SiteFooter />
    </div>
  );
}
