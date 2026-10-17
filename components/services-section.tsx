import Image from "next/image";
import { services } from "@/lib/site-content";

export function ServicesSection() {
  return (
    <section id="services" className="content-section services-section page-shell" aria-labelledby="services-title">
      <div className="services-section__visual">
        <Image src="/assets/ai/bright-living-room.png" alt="تصور بصري لمساحة داخلية سكنية" fill sizes="(max-width: 820px) 100vw, 42vw" />
        <span>صورة توضيحية</span>
      </div>
      <div className="services-section__content">
        <span className="section-kicker">خدمات العامر</span>
        <h2 id="services-title">دعم عقاري واضح من أول خطوة.</h2>
        <p className="services-section__lead">مش مجرد عرض وحدات؛ بنساعدك تفهم الاختيارات وتوصل للخطوة المناسبة من غير تعقيد.</p>
        <div className="services-list">
          {services.map((service) => (
            <article className="service-row" key={service.number}>
              <span>{service.number}</span>
              <div><h3>{service.title}</h3><p>{service.text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
