"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { WhatsAppLink } from "./whatsapp-link";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/units", label: "العقارات" },
  { href: "/units?transaction=sale", label: "للبيع" },
  { href: "/units?transaction=rent", label: "للإيجار" },
  { href: "/#owner", label: "اعرض عقارك" },
  { href: "/#contact", label: "تواصل معنا" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const closeAndRestoreFocus = () => {
      setMobileOpen(false);
      window.requestAnimationFrame(() => mobileToggleRef.current?.focus());
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!mobileMenuRef.current?.contains(event.target as Node)) closeAndRestoreFocus();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAndRestoreFocus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header className="site-header">
      <div className="site-header__inner page-shell">
        <a className="brand-lockup" href="/" aria-label="العامر للتسويق العقاري - الرئيسية">
          <Image
            src="/assets/reference/alamer-logo-transparent.png"
            alt="العامر للتسويق العقاري"
            width={150}
            height={116}
            priority
            className="brand-lockup__logo"
          />
          <span className="brand-lockup__meta">
            <strong>العامر</strong>
            <span>للتسويق العقاري</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="التنقل الرئيسي">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a className="header-phone" href="tel:+2010164434444" dir="ltr">010 1644 3444</a>
          <WhatsAppLink
            label="ابدأ محادثة"
            variant="solid"
            message="مساء الخير، حابب أعرف أكتر عن الوحدات المتاحة مع العامر."
          />
        </div>

        <div ref={mobileMenuRef} className={`mobile-menu${mobileOpen ? " is-open" : ""}`}>
          <button
            ref={mobileToggleRef}
            className="mobile-menu__toggle"
            type="button"
            aria-label={mobileOpen ? "إغلاق قائمة التنقل" : "فتح قائمة التنقل"}
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
          {mobileOpen ? <nav id="mobile-navigation" className="mobile-menu__panel" aria-label="التنقل للموبايل" onClickCapture={(event) => {
            if ((event.target as HTMLElement).closest("a")) setMobileOpen(false);
          }}>
            <div className="mobile-menu__topline">
              <span>القائمة</span>
              <span>01 — 06</span>
            </div>
            {links.map((link, index) => (
              <a key={link.href} href={link.href}>
                <small>0{index + 1}</small>
                {link.label}
              </a>
            ))}
            <WhatsAppLink label="واتساب" message="مساء الخير، حابب أعرف أكتر عن الوحدات المتاحة مع العامر." />
          </nav> : null}
        </div>
      </div>
    </header>
  );
}
