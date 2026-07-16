import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/services": {
      de: "/leistungen",
      en: "/services",
    },
    "/pricing": {
      de: "/preise",
      en: "/pricing",
    },
    "/about": {
      de: "/ueber-uns",
      en: "/about",
    },
    "/contact": {
      de: "/kontakt",
      en: "/contact",
    },
    "/imprint": {
      de: "/impressum",
      en: "/imprint",
    },
    "/privacy": {
      de: "/datenschutz",
      en: "/privacy",
    },
  },
});

export type AppPathname = keyof typeof routing.pathnames;
