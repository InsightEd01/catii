import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

type ValueItem = { title: string; text: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/about", "about");
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const values = t.raw("values.items") as ValueItem[];

  return (
    <div className="pt-16">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <span className="text-xs font-semibold uppercase tracking-widest text-clay">
          {t("kicker")}
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
          {t("title")}
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>{t("story1")}</p>
            <p>{t("story2")}</p>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-lift">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/frames/lg/frame-046.webp"
              alt=""
              loading="lazy"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            {t("values.title")}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl border border-line bg-card p-7 shadow-soft"
              >
                <h3 className="font-display text-lg font-semibold">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          {t("region.title")}
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
          {t("region.text")}
        </p>
      </section>
    </div>
  );
}
