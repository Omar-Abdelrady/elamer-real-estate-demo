import { siteContact } from "@/lib/site-content";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer id="footer" className="site-footer">
      <div className="site-footer__inner page-shell">
        <div className="site-footer__brand"><Image src="/assets/reference/alamer-logo-transparent.png" alt="العامر للتسويق العقاري" width={88} height={68} /><p>العامر للتسويق العقاري — عقارات موثقة وتواصل مباشر في المعادي وزهراء المعادي.</p></div>
        <nav className="site-footer__nav" aria-label="روابط الموقع"><a href="/">الرئيسية</a><a href="/units">العقارات</a><a href="/units?transaction=sale">للبيع</a><a href="/units?transaction=rent">للإيجار</a></nav>
        <div className="site-footer__contact">
          <span>تواصل مباشر</span>
          <a href={siteContact.phoneHref}>{siteContact.phoneDisplay}</a>
          <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
        </div>
        <div className="site-footer__links">
          <a href={siteContact.facebookHref} target="_blank" rel="noreferrer">فيسبوك</a>
          <a href={siteContact.whatsappHref} target="_blank" rel="noreferrer">واتساب</a>
          <a href="/#top">العودة للأعلى ↑</a>
        </div>
      </div>
      <div className="site-footer__bottom page-shell">
        <span>© 2026 شركة العامر للتسويق العقاري</span>
        <span>التوفر والأسعار تُؤكد عند التواصل</span>
      </div>
    </footer>
  );
}
