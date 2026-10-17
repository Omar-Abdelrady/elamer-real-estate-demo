"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { filterListings, formatListingCount, getAvailablePropertyTypes, getListingLocations, initialFilters, parsePropertyQuery, serializePropertyQuery, type FilterState } from "@/lib/property-filters";
import { propertyListings } from "@/lib/site-content";
import { sitePath } from "@/lib/site-paths";
import { PropertyCard } from "./property-card";
import { PropertyFilter } from "./property-filter";

export function UnitsExplorer() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [mobileOpen, setMobileOpen] = useState(false);
  const filterToggleRef = useRef<HTMLButtonElement>(null);
  const availableTypes = useMemo(() => getAvailablePropertyTypes(propertyListings), []);
  const locations = useMemo(() => getListingLocations(propertyListings).map(({ name }) => name), []);
  const bedroomOptions = useMemo(() => [...new Set(propertyListings.flatMap((listing) => listing.bedrooms ? [listing.bedrooms] : []))], []);

  const commitFilters = useCallback((nextFilters: FilterState) => {
    setFilters(nextFilters);
    const query = serializePropertyQuery(nextFilters);
    window.history.replaceState(null, "", sitePath(query ? `/units?${query}` : "/units"));
  }, []);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    commitFilters({ ...filters, [key]: value });
  };

  const filteredListings = useMemo(() => filterListings(propertyListings, filters), [filters]);

  const closeDrawer = useCallback(() => {
    setMobileOpen(false);
    window.requestAnimationFrame(() => filterToggleRef.current?.focus());
  }, []);

  useEffect(() => {
    const syncFromUrl = () => setFilters(parsePropertyQuery(new URLSearchParams(window.location.search)));
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const drawer = document.querySelector<HTMLElement>("#property-filter");
    const inertTargets = [
      document.querySelector<HTMLElement>(".site-header"),
      document.querySelector<HTMLElement>(".catalog-page__intro"),
      document.querySelector<HTMLElement>(".units-explorer__toolbar"),
      document.querySelector<HTMLElement>(".listing-results"),
      document.querySelector<HTMLElement>(".site-footer"),
    ].filter((element): element is HTMLElement => Boolean(element));
    const previousOverflow = document.body.style.overflow;
    inertTargets.forEach((element) => { element.inert = true; });
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
      if (event.key !== "Tab" || !drawer) return;

      const focusable = [...drawer.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      )].filter((element) => element.offsetParent !== null);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    window.requestAnimationFrame(() => document.querySelector<HTMLInputElement>("#property-filter input")?.focus());
    return () => {
      document.removeEventListener("keydown", handleEscape);
      inertTargets.forEach((element) => { element.inert = false; });
      document.body.style.overflow = previousOverflow;
    };
  }, [closeDrawer, mobileOpen]);

  const clearFilters = () => {
    commitFilters(initialFilters);
    if (mobileOpen) closeDrawer();
  };

  return (
    <section className="units-explorer" aria-label="استكشاف الوحدات">
      {mobileOpen ? <button className="filter-backdrop" type="button" tabIndex={-1} aria-label="إغلاق الفلتر من الخلفية" onClick={closeDrawer} /> : null}
      <div className="units-explorer__toolbar page-shell">
        <p aria-live="polite" aria-atomic="true">{formatListingCount(filteredListings.length)}</p>
        <button ref={filterToggleRef} className="filter-toggle" type="button" aria-controls="property-filter" aria-expanded={mobileOpen} onClick={() => (mobileOpen ? closeDrawer() : setMobileOpen(true))}>
          {mobileOpen ? "اقفل الفلتر" : "افتح الفلتر"}
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      </div>
      <div className="units-explorer__layout page-shell">
        <PropertyFilter filters={filters} onChange={updateFilter} onClear={clearFilters} onClose={closeDrawer} resultCount={filteredListings.length} mobileOpen={mobileOpen} availableTypes={availableTypes} locations={locations} bedroomOptions={bedroomOptions} />
        <div className="listing-results">
          {filteredListings.length ? filteredListings.map((listing) => <PropertyCard key={listing.slug} listing={listing} headingLevel="h2" />) : (
            <div className="listing-empty">
              <span>لا توجد نتائج مطابقة</span>
              <h2>مفيش وحدات مطابقة دلوقتي.</h2>
              <p>سيب لنا طلبك، ولما يبقى فيه اختيار مناسب نقدر نكمل معاك.</p>
              <button type="button" onClick={clearFilters}>اعرض كل الوحدات</button>
              <a className="listing-empty__whatsapp" href="https://wa.me/2010164434444?text=%D9%85%D8%B3%D8%A7%D8%A1%20%D8%A7%D9%84%D8%AE%D9%8A%D8%B1%D8%8C%20%D9%85%D8%B4%20%D9%84%D8%A7%D9%82%D9%8A%20%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%20%D8%A7%D9%84%D9%85%D9%86%D8%A7%D8%B3%D8%A8%20%D9%88%D9%85%D8%AD%D8%AA%D8%A7%D8%AC%20%D9%85%D8%B3%D8%A7%D8%B9%D8%AF%D8%A9." target="_blank" rel="noreferrer">سيب لنا طلبك على واتساب</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
