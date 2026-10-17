"use client";

import { useState } from "react";
import { getListingLocations } from "@/lib/property-filters";
import { propertyListings } from "@/lib/site-content";

export function LocationBrowser() {
  const locations = getListingLocations(propertyListings);
  const visibleCount = 3;
  const maxIndex = Math.max(0, locations.length - visibleCount);
  const [activeIndex, setActiveIndex] = useState(0);
  const showingLastSet = activeIndex === maxIndex;

  return (
    <section id="areas" className="location-browser">
      <div className="location-browser__inner page-shell">
        <div className="location-browser__heading">
          <span className="section-kicker section-kicker--light">ابحث بالمكان</span>
          <h2>اختار المنطقة اللي تناسبك</h2>
          <p>اختار المنطقة اللي تهمك وشوف الوحدات المتاحة في الكتالوج بكل تفاصيلها.</p>
        </div>
        <div className="location-browser__carousel" data-location-carousel="true">
          <div className="location-browser__viewport" aria-live="polite">
            <div className="location-browser__grid" style={{ "--location-index": activeIndex } as React.CSSProperties}>
              {locations.map(({ name, count }, index) => {
                const visible = index >= activeIndex && index < activeIndex + visibleCount;
                return (
                  <a
                    key={name}
                    href={`/units?location=${encodeURIComponent(name)}`}
                    className="location-tile"
                    aria-hidden={!visible}
                    tabIndex={visible ? undefined : -1}
                  >
                    <span>0{index + 1}</span>
                    <div><h3>{name}</h3><p>{count === 1 ? "وحدة واحدة" : `${count} وحدات`}</p></div>
                    <b aria-hidden="true">←</b>
                  </a>
                );
              })}
            </div>
          </div>
          <div className="location-browser__controls">
            <span className="location-browser__progress" aria-live="polite">{activeIndex + 1} / {maxIndex + 1}</span>
            <button
              type="button"
              className="location-browser__next"
              aria-label={showingLastSet ? "الرجوع لبداية المناطق" : "عرض المناطق التالية"}
              onClick={() => setActiveIndex(showingLastSet ? 0 : activeIndex + 1)}
            >
              <span>{showingLastSet ? "ارجع للبداية" : "شوف مناطق أكتر"}</span>
              <b aria-hidden="true">{showingLastSet ? "↑" : "↓"}</b>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
