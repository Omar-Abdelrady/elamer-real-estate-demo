import Image from "next/image";
import { WhatsAppLink } from "./whatsapp-link";

export function HeroSection() {
  return (
    <section className="hero-stage page-shell" aria-labelledby="hero-title">
      <div className="hero-stage__copy">
        <div className="eyebrow">
          <span>العامر للتسويق العقاري</span>
          <span className="eyebrow__dot" aria-hidden="true" />
          <span>زهراء المعادي</span>
        </div>
        <h1 id="hero-title">عقارك المناسب أقرب مما تتخيل</h1>
        <p className="hero-section__lead">
          اكتشف عقارات للبيع والإيجار، وقارن بين الخيارات المتاحة، وخد الخطوة المناسبة مع العامر للتسويق العقاري.
        </p>
        <div className="hero-section__actions">
          <a className="hero-catalog-link" href="/units">
            <span>تصفح العقارات</span>
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
              <path d="M5 10h9M10 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <WhatsAppLink label="تواصل مع مستشار" message="مساء الخير، بدور على وحدة وعاوز أعرف الاختيارات المناسبة." variant="outline" />
        </div>
        <div className="hero-section__contact-line">
          <span>تواصل مباشر</span>
          <a href="tel:+2010164434444" dir="ltr">010 1644 3444</a>
        </div>
      </div>

      <div className="hero-stage__visual">
        <div className="hero-stage__frame">
          <Image
            src="/assets/ai/hero-compound-exterior.png"
            alt="تصور بصري لمجمع سكني حديث"
            width={1536}
            height={1024}
            priority
            loading="eager"
            className="hero-stage__image"
          />
          <span className="hero-stage__image-note">تصور بصري غير مرتبط بعقار معروض</span>
        </div>
        <div className="hero-stage__floating-card">
          <span>خبرة محلية في المعادي</span>
          <strong>اختيارات حقيقية ومتابعة مباشرة من أول سؤال لحد المعاينة.</strong>
        </div>
      </div>
    </section>
  );
}
