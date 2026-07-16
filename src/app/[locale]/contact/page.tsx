import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/contact", "contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

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

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_320px]">
          <div className="rounded-3xl border border-line bg-card p-7 shadow-soft sm:p-9">
            <ContactForm />
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-sand p-7">
              <h2 className="font-display text-lg font-semibold">
                {t("info.title")}
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-ink-soft">
                    {t("info.addressLabel")}
                  </dt>
                  <dd className="mt-1 whitespace-pre-line leading-relaxed">
                    {t("info.address")}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink-soft">
                    {t("info.emailLabel")}
                  </dt>
                  <dd className="mt-1">
                    <a href={`mailto:${t("info.email")}`} className="text-clay hover:text-clay-deep">
                      {t("info.email")}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink-soft">
                    {t("info.hoursLabel")}
                  </dt>
                  <dd className="mt-1">{t("info.hours")}</dd>
                </div>
              </dl>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/frames/lg/frame-138.webp"
                alt=""
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
