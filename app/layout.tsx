import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "العامر | للتسويق العقاري",
  description: "اختيارات عقارية أوضح في زهراء المعادي والمناطق القريبة مع العامر للتسويق العقاري.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body><SmoothScroll>{children}</SmoothScroll></body>
    </html>
  );
}
