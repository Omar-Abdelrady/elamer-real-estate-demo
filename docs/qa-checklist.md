# QA Checklist — العامر للتسويق العقاري

تاريخ المراجعة: 2026-10-17

## Automated verification

- [x] `npm test` — 7 ملفات / 27 اختبار ناجح.
- [x] `npm run typecheck` — ناجح.
- [x] `npm run lint` — ناجح.
- [x] `npm run build` — ناجح للصفحة الرئيسية والكتالوج وثماني صفحات تفاصيل static.
- [x] `npm run qa:visual` — ناجح على build إنتاجي من `next start`.

## Routes and interaction coverage

- [x] `/` — الهيرو، البحث، العقارات المميزة، المناطق، الشراء/الإيجار، خطوات العمل، مسار المالك، ونموذج الطلب.
- [x] `/units` — فلترة مرتبطة بالـURL للغرض والنوع والمنطقة والمساحة والغرف والبحث النصي.
- [x] `/units/maadi-modern-apartment` — صفحة تفاصيل مع gallery من أربع صور، بيانات الوحدة، وWhatsApp مخصص.
- [x] إرسال بحث إيجار من الصفحة الرئيسية ينتقل للكتالوج ويعرض وحدات الإيجار.
- [x] الفلاتر تحدث الرابط، وإعادة الضبط ترجع الثماني وحدات.
- [x] قائمة الموبايل ودرج الفلاتر قابلان للاستخدام بالكيبورد.
- [x] قائمة الموبايل تقفل بعد اختيار الرابط، وبالـEscape، وبالضغط خارجها مع استعادة التركيز للزر.
- [x] درج الفلاتر يقفل بالـEscape والخلفية، يحبس الـfocus، ويمنع scroll الخلفية.

## Visual review — three rounds

- [x] 1440px: container ثابت 1200px، hierarchy واضح، وكروت العقارات متوازنة في ثلاثة أعمدة.
- [x] 768px: الأقسام تنزل تدريجيًا من عمودين لعمود واحد بدون قص أو تزاحم.
- [x] 390px: الهيرو، البحث، الكروت، النموذج، والفوتر كلهم عمود واحد ومقروءين.
- [x] لا يوجد horizontal overflow في أي route أو viewport.
- [x] تم استبدال صورة الهيرو ذات الكتابة الكثيفة بصورة concept نظيفة مع وسم واضح أنها تصور بصري.
- [x] محتوى الـreveal يظل ظاهرًا دائمًا؛ الحركة لا تعتمد على opacity يخفي المحتوى.
- [x] تم تقليل الفراغات الرأسية واستخدام تكوينات مختلفة بدل تكرار نفس شكل الكروت.

## Measured output

| Route | 1440px | 768px | 390px | Overflow |
|---|---:|---:|---:|---:|
| Home | 4348px | 6656px | 7768px | 0px |
| Units | 1787px | 2231px | 3153px | 0px |
| Property | 2421px | 3499px | 3563px | 0px |

## Final screenshots

- `artifacts/qa/home-desktop-1440-final.png`
- `artifacts/qa/home-tablet-768-final.png`
- `artifacts/qa/home-mobile-390-final.png`
- `artifacts/qa/home-mobile-390-menu-final.png`
- `artifacts/qa/units-desktop-1440-final.png`
- `artifacts/qa/units-tablet-768-final.png`
- `artifacts/qa/units-mobile-390-final.png`
- `artifacts/qa/units-mobile-390-filter-final.png`
- `artifacts/qa/property-desktop-1440-final.png`
- `artifacts/qa/property-tablet-768-final.png`
- `artifacts/qa/property-mobile-390-final.png`

## Content safety and remaining data gaps

- [x] الاسم هو «العامر للتسويق العقاري» في كل المسارات.
- [x] الهاتف وWhatsApp والبريد وفيسبوك هي البيانات المحفوظة نفسها.
- [x] كل وحدة تجريبية لها أربع صور gallery، ولا تظهر أي source/demo label للمستخدم.
- [x] بيانات الوحدات والأسعار والمواصفات مصنفة داخليًا كبيانات prototype وليست ادعاءات حقيقية.
- [x] يوجد تنوع واضح في البيع والإيجار وأنواع العقارات لتجربة الكتالوج والفلترة.
- [ ] قبل النشر العام، يجب تأكيد إذن استخدام صور منشورات Facebook والـconcept hero مع صاحب النشاط.
