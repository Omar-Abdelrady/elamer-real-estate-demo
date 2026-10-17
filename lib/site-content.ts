export type PropertyType = "residential" | "commercial" | "administrative" | "villa" | "townhouse";
export type PropertyTransaction = "sale" | "rent";

export type PropertyImage = {
  src: string;
  alt: string;
};

export type PropertyListing = {
  slug: string;
  reference?: string;
  title: string;
  location: string;
  transaction: PropertyTransaction;
  type: PropertyType;
  size?: number;
  bedrooms?: number;
  bathrooms?: number;
  price?: number;
  priceLabel: string;
  image: string;
  gallery: PropertyImage[];
  alt: string;
  sourceStatus: "demo";
  description: string;
  details: string[];
  sourceHref?: string;
};

export const siteContact = {
  phoneDisplay: "010 1644 3444",
  phoneHref: "tel:+2010164434444",
  whatsappHref: "https://wa.me/2010164434444",
  email: "elamerestate@yahoo.com",
  facebookHref: "https://www.facebook.com/El3amerRealEstate/",
} as const;

export const whatsappHref = (message?: string) => {
  if (!message) return siteContact.whatsappHref;
  return `${siteContact.whatsappHref}?text=${encodeURIComponent(message)}`;
};

export const propertyListings: PropertyListing[] = [
  {
    slug: "maadi-modern-apartment",
    title: "شقة عصرية بإطلالة مفتوحة",
    location: "المعادي",
    transaction: "sale",
    type: "residential",
    size: 165,
    bedrooms: 3,
    bathrooms: 2,
    price: 2850000,
    priceLabel: "2,850,000 جنيه",
    image: "/assets/demo/properties/maadi-modern-apartment/01-cover.png",
    gallery: [
      { src: "/assets/demo/properties/maadi-modern-apartment/01-cover.png", alt: "واجهة شقة عصرية في المعادي" },
      { src: "/assets/demo/properties/maadi-modern-apartment/02-detail.png", alt: "غرفة معيشة مضيئة في شقة بالمعادي" },
      { src: "/assets/demo/properties/maadi-modern-apartment/03-detail.png", alt: "غرفة نوم هادئة في شقة بالمعادي" },
      { src: "/assets/demo/properties/maadi-modern-apartment/04-detail.png", alt: "تفصيل مطبخ عصري في شقة بالمعادي" },
    ],
    alt: "واجهة شقة عصرية في المعادي",
    sourceStatus: "demo",
    description: "شقة سكنية بتصميم عصري ومساحات عملية، مناسبة لأسرة صغيرة وتتمتع بإطلالة مفتوحة.",
    details: ["3 غرف", "2 حمام", "بلكونة", "تشطيب عصري"],
  },
  {
    slug: "zahraa-garden-apartment",
    title: "شقة بحديقة خاصة",
    location: "زهراء المعادي",
    transaction: "rent",
    type: "residential",
    size: 150,
    bedrooms: 3,
    bathrooms: 2,
    priceLabel: "32,000 جنيه شهريًا",
    image: "/assets/demo/properties/zahraa-garden-apartment/01-cover.png",
    gallery: [
      { src: "/assets/demo/properties/zahraa-garden-apartment/01-cover.png", alt: "مدخل شقة بحديقة في زهراء المعادي" },
      { src: "/assets/demo/properties/zahraa-garden-apartment/02-detail.png", alt: "غرفة معيشة تطل على حديقة خاصة" },
      { src: "/assets/demo/properties/zahraa-garden-apartment/03-detail.png", alt: "غرفة نوم في شقة بحديقة" },
      { src: "/assets/demo/properties/zahraa-garden-apartment/04-detail.png", alt: "جلسة خارجية في حديقة الشقة" },
    ],
    alt: "مدخل شقة بحديقة في زهراء المعادي",
    sourceStatus: "demo",
    description: "شقة للإيجار بحديقة خاصة ومساحات مريحة، في منطقة هادئة قريبة من الخدمات اليومية.",
    details: ["3 غرف", "2 حمام", "حديقة خاصة", "مدخل مستقل"],
  },
  {
    slug: "new-cairo-duplex",
    title: "دوبلكس بإطلالة مفتوحة",
    location: "التجمع الخامس",
    transaction: "sale",
    type: "residential",
    size: 280,
    bedrooms: 4,
    bathrooms: 3,
    priceLabel: "6,900,000 جنيه",
    image: "/assets/demo/properties/new-cairo-duplex/01-cover.png",
    gallery: [
      { src: "/assets/demo/properties/new-cairo-duplex/01-cover.png", alt: "واجهة دوبلكس حديث في التجمع الخامس" },
      { src: "/assets/demo/properties/new-cairo-duplex/02-detail.png", alt: "سلم داخلي في دوبلكس بالتجمع الخامس" },
      { src: "/assets/demo/properties/new-cairo-duplex/03-detail.png", alt: "غرفة معيشة واسعة في دوبلكس" },
      { src: "/assets/demo/properties/new-cairo-duplex/04-detail.png", alt: "تراس بإطلالة مفتوحة في دوبلكس" },
    ],
    alt: "واجهة دوبلكس حديث في التجمع الخامس",
    sourceStatus: "demo",
    description: "دوبلكس واسع بتوزيع عملي وإطلالة مفتوحة، مناسب لعائلة تبحث عن مساحات أكبر.",
    details: ["4 غرف", "3 حمام", "تراس واسع", "غرفة معيشة مزدوجة"],
  },
  {
    slug: "sheikh-zayed-villa",
    title: "فيلا مستقلة بحديقة واسعة",
    location: "الشيخ زايد",
    transaction: "sale",
    type: "villa",
    size: 420,
    bedrooms: 5,
    bathrooms: 4,
    priceLabel: "18,500,000 جنيه",
    image: "/assets/demo/properties/sheikh-zayed-villa/01-cover.png",
    gallery: [
      { src: "/assets/demo/properties/sheikh-zayed-villa/01-cover.png", alt: "واجهة فيلا مستقلة في الشيخ زايد" },
      { src: "/assets/demo/properties/sheikh-zayed-villa/02-detail.png", alt: "غرفة معيشة في فيلا بالشيخ زايد" },
      { src: "/assets/demo/properties/sheikh-zayed-villa/03-detail.png", alt: "غرفة نوم رئيسية في فيلا" },
      { src: "/assets/demo/properties/sheikh-zayed-villa/04-detail.png", alt: "حديقة واسعة أمام الفيلا" },
    ],
    alt: "واجهة فيلا مستقلة في الشيخ زايد",
    sourceStatus: "demo",
    description: "فيلا مستقلة بحديقة واسعة وتوزيع عائلي مريح، ضمن منطقة هادئة في الشيخ زايد.",
    details: ["5 غرف", "4 حمام", "حديقة واسعة", "موقف سيارات"],
  },
  {
    slug: "october-townhouse",
    title: "تاون هاوس عائلي بتصميم هادئ",
    location: "6 أكتوبر",
    transaction: "sale",
    type: "townhouse",
    size: 245,
    bedrooms: 4,
    bathrooms: 3,
    priceLabel: "9,750,000 جنيه",
    image: "/assets/demo/properties/october-townhouse/01-cover.png",
    gallery: [
      { src: "/assets/demo/properties/october-townhouse/01-cover.png", alt: "واجهة تاون هاوس عائلي في 6 أكتوبر" },
      { src: "/assets/demo/properties/october-townhouse/02-detail.png", alt: "مساحة معيشة مفتوحة في تاون هاوس" },
      { src: "/assets/demo/properties/october-townhouse/03-detail.png", alt: "غرفة نوم في تاون هاوس عائلي" },
      { src: "/assets/demo/properties/october-townhouse/04-detail.png", alt: "حديقة خلفية لتاون هاوس" },
    ],
    alt: "واجهة تاون هاوس عائلي في 6 أكتوبر",
    sourceStatus: "demo",
    description: "تاون هاوس عملي بتصميم هادئ ومساحات مناسبة للحياة العائلية اليومية.",
    details: ["4 غرف", "3 حمام", "حديقة خلفية", "غرفة تخزين"],
  },
  {
    slug: "new-cairo-office",
    title: "مكتب إداري جاهز للعمل",
    location: "التجمع الخامس",
    transaction: "rent",
    type: "administrative",
    size: 135,
    bathrooms: 2,
    priceLabel: "45,000 جنيه شهريًا",
    image: "/assets/demo/properties/new-cairo-office/01-cover.png",
    gallery: [
      { src: "/assets/demo/properties/new-cairo-office/01-cover.png", alt: "واجهة مكتب إداري حديث في التجمع الخامس" },
      { src: "/assets/demo/properties/new-cairo-office/02-detail.png", alt: "مساحة عمل مفتوحة في مكتب إداري" },
      { src: "/assets/demo/properties/new-cairo-office/03-detail.png", alt: "غرفة اجتماعات في مكتب إداري" },
      { src: "/assets/demo/properties/new-cairo-office/04-detail.png", alt: "منطقة استقبال مكتب إداري" },
    ],
    alt: "واجهة مكتب إداري حديث في التجمع الخامس",
    sourceStatus: "demo",
    description: "مكتب إداري جاهز للعمل بمساحات مرنة وتشطيب عملي في موقع مناسب بالتجمع الخامس.",
    details: ["2 حمام", "مكتب جاهز", "غرفة اجتماعات", "شارع هادئ"],
  },
  {
    slug: "maadi-new-retail",
    title: "محل تجاري بواجهة واضحة",
    location: "المعادي الجديدة",
    transaction: "sale",
    type: "commercial",
    size: 95,
    bathrooms: 1,
    priceLabel: "4,200,000 جنيه",
    image: "/assets/demo/properties/maadi-new-retail/01-cover.png",
    gallery: [
      { src: "/assets/demo/properties/maadi-new-retail/01-cover.png", alt: "واجهة محل تجاري في المعادي الجديدة" },
      { src: "/assets/demo/properties/maadi-new-retail/02-detail.png", alt: "المساحة الداخلية لمحل تجاري" },
      { src: "/assets/demo/properties/maadi-new-retail/03-detail.png", alt: "واجهة عرض داخل محل تجاري" },
      { src: "/assets/demo/properties/maadi-new-retail/04-detail.png", alt: "تفصيل تشطيب داخل محل تجاري" },
    ],
    alt: "واجهة محل تجاري في المعادي الجديدة",
    sourceStatus: "demo",
    description: "محل تجاري بواجهة واضحة ومساحة قابلة للتقسيم، مناسب لنشاط خدمي أو retail صغير.",
    details: ["1 حمام", "واجهة زجاجية", "مساحة قابلة للتقسيم", "دور أرضي"],
  },
  {
    slug: "ain-sokhna-chalet",
    title: "شاليه بإطلالة بحرية",
    location: "العين السخنة",
    transaction: "rent",
    type: "residential",
    size: 120,
    bedrooms: 2,
    bathrooms: 2,
    priceLabel: "18,000 جنيه شهريًا",
    image: "/assets/demo/properties/ain-sokhna-chalet/01-cover.png",
    gallery: [
      { src: "/assets/demo/properties/ain-sokhna-chalet/01-cover.png", alt: "واجهة شاليه بإطلالة بحرية في العين السخنة" },
      { src: "/assets/demo/properties/ain-sokhna-chalet/02-detail.png", alt: "غرفة معيشة بإطلالة بحرية" },
      { src: "/assets/demo/properties/ain-sokhna-chalet/03-detail.png", alt: "غرفة نوم في شاليه ساحلي" },
      { src: "/assets/demo/properties/ain-sokhna-chalet/04-detail.png", alt: "تراس شاليه على البحر" },
    ],
    alt: "واجهة شاليه بإطلالة بحرية في العين السخنة",
    sourceStatus: "demo",
    description: "شاليه هادئ بإطلالة بحرية ومساحات مريحة لقضاء وقت قصير أو إقامة موسمية.",
    details: ["2 غرف", "2 حمام", "إطلالة بحرية", "تراس"],
  },
];

export const findPropertyBySlug = (slug: string) => propertyListings.find((listing) => listing.slug === slug);

export const areas = [
  { name: "زهراء المعادي", detail: "بيوت قريبة وخيارات تناسب الحياة اليومية", index: "01" },
  { name: "المعادي", detail: "موقع مميز وشوارع لها طابع خاص", index: "02" },
  { name: "المناطق المجاورة", detail: "اختيارات حسب المتاح واحتياج كل عميل", index: "03" },
] as const;

export const services = [
  { number: "01", title: "بيع وشراء", text: "نساعدك تختار وتوصل للقرار المناسب بثقة." },
  { number: "02", title: "تأجير الوحدات", text: "اختيارات عملية وتواصل مباشر من أول سؤال." },
  { number: "03", title: "تسويق عقاري", text: "نقدّم وحدتك بشكل واضح ونوصلها للمهتمين." },
  { number: "04", title: "استشارة ومتابعة", text: "خبرة محلية تخلّي الخطوات أبسط وأهدى." },
] as const;

export const processSteps = [
  { number: "01", title: "قولنا بتدور على إيه", text: "ابعت لنا احتياجك والميزانية والمنطقة اللي في بالك." },
  { number: "02", title: "نرتب لك الاختيارات", text: "نفلتر الخيارات ونقرب لك الأنسب بدل اللف الكتير." },
  { number: "03", title: "تشوف وتقرر", text: "معاينة واضحة ومعلومات مباشرة قبل أي خطوة." },
  { number: "04", title: "نكمل معاك", text: "متابعة من أول اتفاق لحد ما تخلص وأنت مطمّن." },
] as const;
