const processSteps = [
  { number: "01", title: "فهم الاحتياج", text: "نحدد المنطقة ونوع العقار والميزانية اللي تناسبك." },
  { number: "02", title: "اختيار العقارات", text: "نرتب الاختيارات المتاحة من غير تضييع وقتك." },
  { number: "03", title: "مراجعة التفاصيل والمعاينة", text: "تراجع البيانات وتشوف العقار قبل أي قرار." },
  { number: "04", title: "التواصل والمتابعة", text: "نكمل معاك في الخطوة المناسبة ونتابع التواصل." },
] as const;

export function ProcessSection() {
  return (
    <section id="process" className="content-section process-section page-shell" aria-labelledby="process-title">
      <div className="process-section__heading">
        <span className="section-kicker">طريقة شغلنا</span>
        <h2 id="process-title">خطوات واضحة من البحث للتواصل</h2>
        <p>مسار بسيط يساعدك ترتّب قرارك من غير معلومات زيادة أو وعود غير مؤكدة.</p>
      </div>
      <div className="process-timeline">
        {processSteps.map((step) => (
          <div className="process-step" key={step.number}>
            <div className="process-step__marker">{step.number}</div>
            <div className="process-step__body">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
