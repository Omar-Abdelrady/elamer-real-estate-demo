import type { PropertyType } from "@/lib/site-content";
import type { FilterState } from "@/lib/property-filters";

type PropertyFilterProps = {
  filters: FilterState;
  onChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClear: () => void;
  onClose: () => void;
  resultCount: number;
  mobileOpen: boolean;
  availableTypes: PropertyType[];
  locations: string[];
  bedroomOptions: number[];
};

const typeOptions: Array<{ value: FilterState["type"]; label: string }> = [
  { value: "all", label: "كل الوحدات" },
  { value: "residential", label: "سكنية" },
  { value: "commercial", label: "تجارية" },
  { value: "administrative", label: "إدارية" },
  { value: "villa", label: "فلل" },
  { value: "townhouse", label: "تاون هاوس" },
];

export function PropertyFilter({ filters, onChange, onClear, onClose, resultCount, mobileOpen, availableTypes, locations, bedroomOptions }: PropertyFilterProps) {
  const visibleTypeOptions = typeOptions.filter((option) => option.value === "all" || availableTypes.includes(option.value));

  return (
    <aside
      id="property-filter"
      className={`property-filter ${mobileOpen ? "is-open" : ""}`}
      aria-label="فلترة الوحدات"
      role={mobileOpen ? "dialog" : undefined}
      aria-modal={mobileOpen || undefined}
    >
      <div className="property-filter__header">
        <div>
          <span className="section-kicker">رتّب اختياراتك</span>
          <h2>فلترة النتائج</h2>
        </div>
        <div className="property-filter__header-actions">
          <span className="property-filter__count">{resultCount} نتيجة</span>
          <button className="property-filter__close" type="button" onClick={onClose} aria-label="إغلاق الفلتر">×</button>
        </div>
      </div>

      <label className="property-filter__search">
        <span>دور على منطقة أو وحدة</span>
        <input type="search" value={filters.query} onChange={(event) => onChange("query", event.target.value)} placeholder="مثال: المعادي" />
      </label>

      <fieldset>
        <legend>الغرض</legend>
        {([
          { value: "all", label: "الكل" },
          { value: "sale", label: "للبيع" },
          { value: "rent", label: "للإيجار" },
        ] as const).map((option) => (
          <label className="filter-option" key={option.value}>
            <input type="radio" name="transaction" checked={filters.transaction === option.value} onChange={() => onChange("transaction", option.value)} />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>نوع الوحدة</legend>
        {visibleTypeOptions.map((option) => (
          <label className="filter-option" key={option.value}>
            <input type="radio" name="property-type" checked={filters.type === option.value} onChange={() => onChange("type", option.value)} />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="property-filter__selects">
        <label>
          <span>المنطقة</span>
          <select value={filters.location} onChange={(event) => onChange("location", event.target.value)}>
            <option value="all">كل المناطق</option>
            {locations.map((location) => <option key={location} value={location}>{location}</option>)}
          </select>
        </label>
        <label>
          <span>المساحة</span>
          <select value={filters.size} onChange={(event) => onChange("size", event.target.value as FilterState["size"])}>
            <option value="all">كل المساحات</option>
            <option value="compact">لحد 160 م²</option>
            <option value="mid">من 161 لـ 299 م²</option>
            <option value="wide">300 م² أو أكثر</option>
          </select>
        </label>
        <label>
          <span>عدد الغرف</span>
          <select value={filters.bedrooms} onChange={(event) => onChange("bedrooms", event.target.value)}>
            <option value="all">كل الخيارات</option>
            {bedroomOptions.map((count) => <option key={count} value={String(count)}>{count} غرف</option>)}
          </select>
        </label>
      </div>

      <button className="property-filter__clear" type="button" onClick={onClear}>مسح كل الفلاتر <span>×</span></button>
    </aside>
  );
}
