import { WhatsAppLink } from "./whatsapp-link";

export function OwnerCta() {
  return (
    <section id="owner" className="owner-cta">
      <div className="owner-cta__inner page-shell">
        <div><span className="section-kicker section-kicker--light">للملّاك</span><h2>عندك عقار وعايز تبيعه أو تأجره؟</h2></div>
        <div><p>ابعت بيانات العقار وصوره، وفريق العامر يتواصل معاك عشان يرتّب الخطوة المناسبة.</p><WhatsAppLink label="اعرض عقارك مع العامر" message="مساء الخير، عندي عقار وعايز أعرضه للبيع أو الإيجار مع العامر." /></div>
      </div>
    </section>
  );
}
