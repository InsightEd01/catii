import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SERVICES } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

type PriceRow = { name: string; price: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/pricing", "pricing");
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricing");
  const tCta = await getTranslations("ctaBand");

  return (
    <div className="pt-16">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <span className="text-xs font-semibold uppercase tracking-widest text-clay">
          {t("kicker")}
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {t("intro")}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SERVICES.map((svc) => {
            const rows = t.raw(`groups.${svc.key}.rows`) as PriceRow[];
            return (
              <div
                key={svc.key}
                className="rounded-3xl border border-line bg-card p-7 shadow-soft"
              >
                <h2 className="font-display text-xl font-semibold">
                  {t(`groups.${svc.key}.title`)}
                </h2>
                <ul className="mt-5 divide-y divide-line">
                  {rows.map((row) => (
                    <li
                      key={row.name}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <span className="text-sm text-ink-soft">{row.name}</span>
                      <span className="shrink-0 text-sm font-semibold">
                        {t("from")} CHF {row.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-ink-soft">{t("note")}</p>

        <div className="mt-12 rounded-3xl bg-sand p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-semibold">{tCta("title")}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            {tCta("text")}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-clay px-7 py-3 text-sm font-semibold text-cream shadow-soft transition-colors hover:bg-clay-deep"
          >
            {tCta("button")}
          </Link>
        </div>
      </section>
    </div>
  );
}
