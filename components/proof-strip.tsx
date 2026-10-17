const proofItems = [
  { value: "01", title: "بيع وشراء", detail: "اختيارات سكنية حسب احتياجك" },
  { value: "02", title: "تأجير", detail: "تواصل مباشر وترتيب للمعاينة" },
  { value: "03", title: "تسويق عقاري", detail: "عرض الوحدة ومتابعة المهتمين" },
  { value: "04", title: "زهراء المعادي", detail: "معرفة بالسوق والمناطق القريبة" },
];

export function ProofStrip() {
  return (
    <section className="proof-strip" aria-label="لماذا العامر">
      <div className="proof-strip__inner page-shell">
        {proofItems.map((item) => (
          <div className="proof-item" key={item.value}>
            <span className="proof-item__number">{item.value}</span>
            <div>
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
