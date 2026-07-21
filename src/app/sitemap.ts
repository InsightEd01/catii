import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";

const BASE_URL = "https://miauu.ch";

const PAGES: AppPathname[] = [
  "/",
  "/services",
  "/pricing",
  "/about",
  "/contact",
  "/imprint",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: BASE_URL + getPathname({ locale, href }),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, BASE_URL + getPathname({ locale: l, href })])
        ),
      },
    }))
  );
}
