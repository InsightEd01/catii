import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SERVICES } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/services", "services");
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const tNav = await getTranslations("nav");

  return (
    <div className="pt-16">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <span className="text-xs font-semibold uppercase tracking-widest text-clay">
          {t("kicker")}
        </span>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {t("intro")}
        </p>
      </section>

      {SERVICES.map((svc, i) => {
        const features = t.raw(`${svc.key}.features`) as string[];
        return (
          <section
            key={svc.key}
            id={svc.key}
            className={`scroll-mt-20 py-16 sm:py-20 ${i % 2 === 1 ? "bg-sand" : ""}`}
          >
            <div
              className={`mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="overflow-hidden rounded-3xl shadow-lift">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={svc.image}
                  alt={t(`${svc.key}.title`)}
                  loading="lazy"
                  className="aspect-[4/3] h-full w-full object-cover object-[62%_center]"
                />
              </div>
              <div>
                <h2 className="font-display text-3xl font-semibold leading-tight">
                  {t(`${svc.key}.title`)}
                </h2>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  {t(`${svc.key}.description`)}
                </p>
                <ul className="mt-6 space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-moss/15 text-moss">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3 w-3">
                          <path d="m3 8.5 3.2 3L13 4.5" />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-8 inline-block rounded-full bg-clay px-7 py-3 text-sm font-semibold text-cream shadow-soft transition-colors hover:bg-clay-deep"
                >
                  {tNav("cta")}
                </Link>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
