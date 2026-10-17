# El3amer Real Estate Demo

موقع عربي RTL لشركة العامر للتسويق العقاري، مبني كمنصة وساطة عقارية خفيفة للبحث في العقارات والتواصل المباشر.

## محتويات الفولدر

- `assets/reference/` — اللوجو المصدر، نسخة PNG بخلفية شفافة، وصور مرجعية محفوظة من صفحة Facebook.
- `public/assets/demo/properties/` — 32 صورة AI طبيعية لثماني وحدات تجريبية، أربع صور لكل وحدة.
- `assets/ai/` — صور Concept مولدة بالـAI محفوظة كمرجع بصري، وليست عروضًا عقارية.
- `docs/facebook-research.md` — المعلومات العامة التي تم جمعها من صفحة Facebook.
- `docs/asset-notes.md` — تقسيم الصور وملاحظات الاستخدام.
- `docs/superpowers/specs/2026-10-16-elamer-editorial-design.md` — الـdesign spec المعتمد.
- `docs/superpowers/plans/2026-10-16-elamer-demo.md` — خطة التنفيذ.
- `docs/superpowers/specs/2026-10-16-property-catalog-design.md` — تصميم صفحة الوحدات وتبسيط الـlanding.
- `docs/superpowers/plans/2026-10-16-property-catalog.md` — خطة تنفيذ الكتالوج والفلترة.
- `docs/qa-checklist.md` — نتائج الاختبارات والمراجعة.

## تشغيل الـDemo

```bash
npm install
npm run dev -- --hostname 127.0.0.1 --port 3010
```

افتح `http://127.0.0.1:3010` للصفحة الرئيسية، أو `/units` للكتالوج، أو `/units/[slug]` لتفاصيل كل عقار.

## صفحة الوحدات

صفحة `/units` تستخدم inventory محلي typed داخل `lib/site-content.ts`. الفلاتر بتتخزن في الرابط وتدعم `transaction` و`type` و`location` و`size` و`bedrooms` و`q`، وبالتالي ينفع مشاركة نتيجة البحث نفسها.

الكتالوج الحالي يحتوي على 8 وحدات تجريبية موزعة بين البيع والإيجار والسكني والفلل والتاون هاوس والإداري والتجاري. بيانات الأسعار والمساحات والمواصفات والصور مخصصة للـprototype فقط، وليست عروضًا منسوبة لصفحة العامر أو أسعارًا نهائية.

## ملاحظة مهمة

صور `assets/ai/` محفوظة كأرشيف بصري للهيرو، بينما كل كارت تجريبي يستخدم gallery من أربع صور داخل `public/assets/demo/properties/`. لا تظهر للمستخدم أي شارات source أو demo داخل الواجهة.

## Visual QA

```bash
npm run qa:visual
```

يحفظ الأمر لقطات للصفحة الرئيسية والكتالوج وصفحة التفاصيل بعروض 1440px و768px و390px داخل `artifacts/qa/`، ويختبر الفلاتر والقائمة والموبايل وعدم وجود horizontal overflow.

المصدر الأساسي: https://www.facebook.com/El3amerRealEstate/
