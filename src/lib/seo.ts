import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";

type MetaKey =
  | "home"
  | "services"
  | "pricing"
  | "about"
  | "contact"
  | "imprint"
  | "privacy";

/** Title/description plus canonical + hreflang alternates for a page. */
export async function pageMetadata(
  locale: string,
  href: AppPathname,
  key: MetaKey
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, getPathname({ locale: l, href })])
  );

  return {
    title: t(`${key}.title`),
    description: t.has(`${key}.description`)
      ? t(`${key}.description`)
      : undefined,
    alternates: {
      canonical: getPathname({ locale, href }),
      languages,
    },
    openGraph: {
      title: t(`${key}.title`),
      images: ["/og.jpg"],
    },
  };
}
