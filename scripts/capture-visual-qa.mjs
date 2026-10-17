import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3010";
const outputDir = fileURLToPath(new URL("../artifacts/qa/", import.meta.url));
const viewports = [
  { name: "desktop-1440", width: 1440, height: 1100 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844 },
];
const routes = [
  { name: "home", path: "/", expectedSections: 8 },
  { name: "units", path: "/units", expectedSections: 1 },
  { name: "property", path: "/units/maadi-modern-apartment", expectedSections: 1 },
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });

try {
  for (const route of routes) {
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport });
      await page.goto(new URL(route.path, baseUrl).toString(), { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 90));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForFunction(() => window.scrollY < 2, { timeout: 3000 });
      await page.evaluate(() => {
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      });
      await page.waitForTimeout(250);

      const metrics = await page.evaluate(() => ({
        viewport: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        visibleSections: [...document.querySelectorAll("main section")].filter((section) => {
          const style = getComputedStyle(section);
          return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
        }).length,
      }));

      if (metrics.scrollWidth > metrics.viewport) {
        throw new Error(`${route.name}-${viewport.name}: horizontal overflow ${metrics.scrollWidth - metrics.viewport}px`);
      }
      if (metrics.visibleSections !== route.expectedSections) {
        throw new Error(`${route.name}-${viewport.name}: expected ${route.expectedSections} visible sections, found ${metrics.visibleSections}`);
      }

      await page.screenshot({ path: resolve(outputDir, `${route.name}-${viewport.name}-final.png`), fullPage: true });

      if (route.name === "home") {
        const internalLinks = await page.locator('main a[href^="/"]').evaluateAll((links) => links.map((link) => link.getAttribute("href")));
        if (!internalLinks.some((href) => href?.startsWith("/units/"))) throw new Error(`${viewport.name}: no property details link found`);

        const locationNext = page.getByRole("button", { name: "عرض المناطق التالية", exact: true });
        await locationNext.click();
        await page.waitForFunction(() => document.querySelector(".location-browser__grid")?.getAttribute("style")?.includes("--location-index: 1"));

        if (viewport.width <= 880) {
          const menuButton = page.getByRole("button", { name: "فتح قائمة التنقل" });
          await menuButton.click();
          const mobileNavigation = page.getByRole("navigation", { name: "التنقل للموبايل" });
          await mobileNavigation.waitFor();
          if (viewport.width === 390) {
            await page.screenshot({ path: resolve(outputDir, "home-mobile-390-menu-final.png"), fullPage: false });
          }
          await mobileNavigation.getByRole("link", { name: /اعرض عقارك/ }).click();
          await page.waitForURL((url) => url.hash === "#owner");
          if (await page.locator("#mobile-navigation").count()) throw new Error(`${viewport.name}: mobile menu stayed open after navigation`);
          await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "networkidle" });
          await page.getByRole("button", { name: "فتح قائمة التنقل" }).click();
          await page.keyboard.press("Escape");
          if (await page.locator("#mobile-navigation").count()) throw new Error(`${viewport.name}: mobile menu stayed open after Escape`);
        }

        await page.locator('.property-search select[name="transaction"]').selectOption("rent");
        await Promise.all([
          page.waitForURL((url) => url.pathname === "/units" && url.searchParams.get("transaction") === "rent"),
          page.locator(".property-search button").click(),
        ]);
        await page.getByText("3 وحدات", { exact: true }).waitFor();
        await page.goBack({ waitUntil: "networkidle" });
        await page.evaluate(() => window.scrollTo(0, 0));
      }

      if (route.name === "units") {
        if (viewport.width <= 880) await page.locator(".filter-toggle").click();
        await page.locator('.filter-option input[name="transaction"]').nth(2).check();
        await page.getByText("3 وحدات", { exact: true }).waitFor();
        if (!new URL(page.url()).searchParams.has("transaction", "rent")) throw new Error(`${viewport.name}: filters did not update URL`);
        await page.getByRole("button", { name: /مسح كل الفلاتر/ }).click();
        await page.getByText("8 وحدات", { exact: true }).waitFor();
        const detailsHref = await page.locator(".listing-card__details").first().getAttribute("href");
        if (detailsHref !== "/units/maadi-modern-apartment") throw new Error(`${viewport.name}: details route mismatch`);
      }

      if (route.name === "property") {
        await page.getByRole("heading", { name: "شقة عصرية بإطلالة مفتوحة" }).waitFor();
        await page.getByRole("button", { name: "عرض صورة 4", exact: true }).waitFor();
        const firstImage = await page.locator(".property-gallery__main img").getAttribute("src");
        await page.getByRole("button", { name: "عرض صورة 2", exact: true }).click();
        const secondImage = await page.locator(".property-gallery__main img").getAttribute("src");
        if (!firstImage || firstImage === secondImage) throw new Error(`${viewport.name}: gallery thumbnail did not change the main image`);
        if (await page.getByText("المنشور الأصلي", { exact: true }).count()) throw new Error(`${viewport.name}: source link is visible on demo detail`);
      }

      if (route.name === "units" && viewport.width === 390) {
        await page.locator(".filter-toggle").click();
        await page.locator("#property-filter.is-open").waitFor({ state: "visible" });
        await page.waitForTimeout(320);
        await page.screenshot({ path: resolve(outputDir, "units-mobile-390-filter-final.png"), fullPage: false });
        const closeButton = page.getByRole("button", { name: "إغلاق الفلتر", exact: true });
        const clearButton = page.getByRole("button", { name: /مسح كل الفلاتر/ });
        await closeButton.focus();
        await page.keyboard.press("Shift+Tab");
        if (!(await clearButton.evaluate((element) => document.activeElement === element))) {
          throw new Error("units-mobile-390: Shift+Tab escaped the filter dialog");
        }
        await page.keyboard.press("Tab");
        if (!(await closeButton.evaluate((element) => document.activeElement === element))) {
          throw new Error("units-mobile-390: Tab escaped the filter dialog");
        }
        const bodyOverflow = await page.evaluate(() => getComputedStyle(document.body).overflow);
        if (bodyOverflow !== "hidden") {
          throw new Error("units-mobile-390: background scroll is not locked");
        }
        await page.locator(".filter-backdrop").click({ position: { x: 6, y: 100 } });
        await page.waitForFunction(() => !document.querySelector("#property-filter")?.classList.contains("is-open"));
        await page.locator(".filter-toggle").click();
        await page.locator("#property-filter select").nth(1).selectOption("compact");
        await page.getByText("4 وحدات", { exact: true }).waitFor();
        await page.getByRole("button", { name: /مسح كل الفلاتر/ }).click();
        await page.waitForFunction(() => !document.querySelector("#property-filter")?.classList.contains("is-open"));
        await page.getByText("8 وحدات", { exact: true }).waitFor();
        await page.locator(".filter-toggle").click();
        await page.keyboard.press("Escape");
        await page.waitForFunction(() => !document.querySelector("#property-filter")?.classList.contains("is-open"));
        await page.locator(".filter-toggle").waitFor({ state: "visible" });
      }

      console.log(`${route.name}-${viewport.name}: ${JSON.stringify(metrics)}`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
