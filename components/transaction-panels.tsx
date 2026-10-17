import { WhatsAppLink } from "./whatsapp-link";
import { sitePath } from "@/lib/site-paths";

export function TransactionPanels() {
  return (
    <section id="services" className="transaction-panels page-shell" aria-label="خدمات البحث عن العقارات">
      <article className="transaction-panel transaction-panel--sale">
        <span>01 / شراء</span>
        <h2>بتدور على عقار للشراء؟</h2>
        <p>قارن المساحة والمنطقة والتفاصيل المتاحة، وبعدها تواصل مع العامر للخطوة التالية.</p>
        <div className="transaction-panel__actions">
          <a href={sitePath("/units?transaction=sale")}>شوف عقارات للبيع <b aria-hidden="true">←</b></a>
        </div>
      </article>
      <article className="transaction-panel transaction-panel--rent">
        <span>02 / إيجار</span>
        <h2>محتاج عقار للإيجار؟</h2>
        <p>وحدات للإيجار متاحة في الكتالوج، ولو احتياجك مختلف ابعته لنا ونبدأ منه مباشرة.</p>
        <div className="transaction-panel__actions">
          <a href={sitePath("/units?transaction=rent")}>شوف عقارات للإيجار <b aria-hidden="true">←</b></a>
          <WhatsAppLink label="ابعت احتياجك" message="مساء الخير، بدور على عقار للإيجار ومحتاج أعرف المتاح." variant="text" />
        </div>
      </article>
    </section>
  );
}
