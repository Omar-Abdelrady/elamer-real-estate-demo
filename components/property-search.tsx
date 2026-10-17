import { getAvailablePropertyTypes, getListingLocations } from "@/lib/property-filters";
import { propertyListings } from "@/lib/site-content";

const typeLabels = {
  residential: "سكنية",
  commercial: "تجارية",
  administrative: "إدارية",
  villa: "فيلا",
  townhouse: "تاون هاوس",
} as const;

export function PropertySearch() {
  const types = getAvailablePropertyTypes(propertyListings);
  const locations = getListingLocations(propertyListings);

  return (
    <section className="property-search-wrap page-shell" aria-label="ابحث في العقارات">
      <form className="property-search" action="/units" method="get">
        <label>
          <span>الغرض</span>
          <select name="transaction" defaultValue="sale">
            <option value="sale">للبيع</option>
            <option value="rent">للإيجار</option>
          </select>
        </label>

        <label>
          <span>نوع العقار</span>
          <select name="type" defaultValue="all">
            <option value="all">كل الأنواع</option>
            {types.map((type) => <option key={type} value={type}>{typeLabels[type]}</option>)}
          </select>
        </label>

        <label>
          <span>المنطقة</span>
          <select name="location" defaultValue="all">
            <option value="all">كل المناطق</option>
            {locations.map(({ name }) => <option key={name} value={name}>{name}</option>)}
          </select>
        </label>

        <label className="property-search__disabled">
          <span>الميزانية</span>
          <select disabled aria-label="الميزانية">
            <option>اختار بعد تحديد الوحدة</option>
          </select>
        </label>

        <button type="submit">
          <span>ابحث عن عقار</span>
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
            <path d="m7 5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>
    </section>
  );
}
