import Image from "next/image";
import { siteAsset } from "@/lib/site-paths";
import { WhatsAppLink } from "./whatsapp-link";

export function TrustCta() {
  return (
    <section className="trust-cta" aria-labelledby="trust-title">
      <div className="trust-cta__inner page-shell">
        <div className="trust-cta__copy">
          <span className="section-kicker section-kicker--light">جاهز تبدأ؟</span>
          <h2 id="trust-title">قولنا بتدور على إيه، ونرتب لك البداية.</h2>
          <p>ابعت المنطقة، المساحة، والميزانية التقريبية. هنرجع لك بالمتاح والخطوة اللي بعدها.</p>
          <div className="trust-cta__actions">
            <WhatsAppLink label="كلّمنا على واتساب" message="مساء الخير، حابب أبدأ معاكم وأعرف الاختيارات المناسبة." />
            <a href="tel:+2010164434444" className="trust-cta__phone" dir="ltr">010 1644 3444</a>
          </div>
        </div>
        <div className="trust-cta__visual">
          <Image src={siteAsset("/assets/ai/rooftop-terrace.png")} alt="تصور بصري لتراس واسع بإطلالة مفتوحة" fill sizes="(max-width: 760px) 100vw, 38vw" />
          <span>صورة توضيحية</span>
        </div>
      </div>
    </section>
  );
}
