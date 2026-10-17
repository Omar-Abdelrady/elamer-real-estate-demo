"use client";

import type { FormEvent } from "react";
import { buildLeadMessage } from "@/lib/lead-message";
import { whatsappHref } from "@/lib/site-content";

export function LeadForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = buildLeadMessage({
      transaction: data.get("transaction") as "sale" | "rent",
      location: String(data.get("location") ?? ""),
      type: String(data.get("type") ?? ""),
      budget: String(data.get("budget") || "غير محدد"),
      notes: String(data.get("notes") ?? ""),
    });
    window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="lead-section page-shell" aria-labelledby="lead-title">
      <div className="lead-section__intro"><span className="section-kicker">طلب مخصص</span><h2 id="lead-title">مش لاقي العقار المناسب؟</h2><p>قولنا احتياجك في أقل من دقيقة، والرسالة هتتجه مباشرة لواتساب العامر.</p></div>
      <form className="lead-form" onSubmit={handleSubmit}>
        <label><span>عايز تشتري ولا تستأجر؟</span><select name="transaction" required defaultValue="sale"><option value="sale">شراء</option><option value="rent">إيجار</option></select></label>
        <label><span>المنطقة المفضلة</span><input name="location" required placeholder="مثال: المعادي" /></label>
        <label><span>نوع العقار</span><select name="type" required defaultValue="residential"><option value="residential">سكني</option><option value="commercial">تجاري</option><option value="administrative">إداري</option><option value="villa">فيلا</option></select></label>
        <label><span>الميزانية التقريبية</span><input name="budget" placeholder="اختياري" /></label>
        <label className="lead-form__notes"><span>تفاصيل إضافية</span><textarea name="notes" rows={3} placeholder="المساحة، عدد الغرف، أو أي أولوية عندك" /></label>
        <button type="submit">ابعت طلبك على واتساب <span aria-hidden="true">←</span></button>
      </form>
    </section>
  );
}
