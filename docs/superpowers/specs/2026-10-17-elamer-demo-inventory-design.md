# العامر للتسويق العقاري — Demo Inventory Gallery Design

## Goal

تحويل كتالوج الـprototype الحالي من ثلاثة إعلانات حقيقية محفوظة إلى inventory تجريبي منظم يوضح شكل منصة عقارات كاملة. النسخة الجديدة تستخدم ٨ وحدات dummy data، وكل وحدة لها أربع صور AI واقعية، مع الحفاظ على هوية العامر، اللوجو، الهاتف، WhatsApp، البريد، والـnavigation الحالية.

هذه بيانات demo للعرض فقط داخل الـprototype. لن تظهر أي شارة أو عبارة «بيانات تجريبية» داخل الواجهة حسب طلب المستخدم، ولن تُعرض الإعلانات الحقيقية الحالية في الكتالوج.

## Art direction

- نفس هوية العامر الحالية: off-white canvas، forest green، copper accent، Alexandria للعناوين وIBM Plex Sans Arabic للنصوص.
- صور عقارية طبيعية editorial real-estate photography، بدون نصوص داخل الصورة، logos، watermarks، أو عناصر تشبه إعلانات السوشيال.
- لكل وحدة أربع لقطات متسقة في الإضاءة والخامات والهوية البصرية: exterior/entrance، living/work area، bedroom أو private area عند الحاجة، وdetail/amenity view.
- الصور متناسقة مع نوع الوحدة: residential، villa، townhouse، commercial، administrative، وchalet.
- أول صورة هي cover للكروت والـfeatured collection، وباقي الصور تظهر في صفحة التفاصيل داخل gallery.

## Demo inventory

سيتم إنشاء ثماني وحدات موزعة على للبيع والإيجار وعلى أنواع مختلفة، مع أسعار ومساحات ومواصفات تجريبية منطقية للعرض فقط:

1. شقة عصرية في المعادي — سكني، للبيع.
2. شقة بحديقة في زهراء المعادي — سكني، للإيجار.
3. دوبلكس بإطلالة مفتوحة في التجمع الخامس — سكني، للبيع.
4. فيلا مستقلة بحديقة في الشيخ زايد — فيلا، للبيع.
5. تاون هاوس عائلي في 6 أكتوبر — تاون هاوس، للبيع.
6. مكتب إداري جاهز في التجمع الخامس — إداري، للإيجار.
7. محل تجاري بواجهة واضحة في المعادي الجديدة — تجاري، للبيع.
8. شاليه بإطلالة بحرية في العين السخنة — سكني، للإيجار.

الأسعار والمواصفات ستكون صريحة داخل data adapter كـdemo values، وليست منسوبة لمنشورات العامر أو للواقع.

## Data and component design

- توسيع `PropertyListing` بإضافة `gallery: PropertyImage[]`، مع إبقاء `image` كـcover compatibility field مشتق من أول صورة.
- تحديث كل listing إلى `sourceStatus: "demo"` داخليًا، وعدم عرضه كـ«منشور موثق» في الكارت أو صفحة التفاصيل.
- الاحتفاظ بـ`sourceHref` اختياريًا وعدم وضع روابط Facebook على الوحدات التجريبية.
- تحديث `property-filters` لاستخدام الأنواع والمناطق الجديدة تلقائيًا من dataset.
- تعديل `PropertyCard` لعرض النوع، المعاملة، السعر، المساحة، المواصفات المتاحة، وزر التفاصيل بدون أي claim عن مصدر حقيقي.
- إنشاء `PropertyGallery` client component لعرض الصورة الرئيسية وthumbnail controls مع keyboard focus وalt text.
- تحديث صفحة التفاصيل metadata وWhatsApp message ليشيرا إلى اسم الوحدة التجريبية فقط.
- إبقاء contact form وWhatsApp على بيانات العامر الحقيقية.

## Image asset plan

تُحفظ الصور داخل:

`public/assets/demo/properties/<slug>/01-cover.png` إلى `04-detail.png`

سيتم توليد ٣٢ asset منفصلًا باستخدام image generation، مع prompts منفصلة لكل وحدة وكل زاوية، ثم فحصها بصريًا والتأكد من عدم وجود نص أو watermark أو تشوهات واضحة قبل ربطها بالكود.

## UX behavior

- الكتالوج يعرض الوحدات الثماني في نفس نظام الفلاتر الحالي.
- الصفحة الرئيسية تعرض مجموعة مختارة من الوحدات، مع رابط واضح للكتالوج الكامل.
- صفحة التفاصيل تعرض gallery من أربع صور، بيانات الوحدة، السعر، المواصفات، CTA للتواصل، والوحدات ذات الصلة.
- الفلاتر تظل قابلة للمشاركة عبر URL وتدعم البيع/الإيجار، النوع، المنطقة، المساحة، الغرف، والبحث.
- لا توجد حالة empty مضللة طالما dataset يحتوي وحدات لكل transaction مستخدمة.

## Verification

- اختبارات data adapter تتأكد من وجود ٨ وحدات و٤ صور لكل وحدة، وأن cover يساوي أول صورة في gallery.
- اختبارات page rendering تتأكد من ظهور gallery، النوع، السعر، والـWhatsApp contact.
- Playwright على 1440px و768px و390px لكل من الصفحة الرئيسية والكتالوج وصفحة التفاصيل.
- التحقق من عدم وجود horizontal overflow، ومن عمل filter URL وthumbnail switching وmobile menu.
- تشغيل test، typecheck، lint، build، و`git diff --check` قبل التسليم.
