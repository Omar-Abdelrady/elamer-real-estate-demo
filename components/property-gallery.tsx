"use client";

import Image from "next/image";
import { useState } from "react";
import type { PropertyListing } from "@/lib/site-content";

export function PropertyGallery({ listing }: { listing: PropertyListing }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = listing.gallery[activeIndex] ?? listing.gallery[0];

  if (!activeImage) return null;

  return (
    <div className="property-gallery">
      <div className="property-gallery__main">
        <Image src={activeImage.src} alt={activeImage.alt} fill priority sizes="(max-width: 980px) 100vw, 58vw" />
        <span className="property-gallery__count" dir="ltr">{String(activeIndex + 1).padStart(2, "0")} / {String(listing.gallery.length).padStart(2, "0")}</span>
      </div>
      <div className="property-gallery__thumbs" aria-label="صور العقار">
        {listing.gallery.map((image, index) => (
          <button
            key={image.src}
            className={`property-gallery__thumb ${activeIndex === index ? "is-active" : ""}`}
            type="button"
            aria-label={`عرض صورة ${index + 1}`}
            aria-pressed={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          >
            <Image src={image.src} alt="" fill sizes="96px" />
          </button>
        ))}
      </div>
    </div>
  );
}
