import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/imprint", "imprint");
}

export default async function ImprintPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.imprint");

  return (
    <div className="pt-16">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="font-display text-4xl font-semibold leading-tight">
          {t("title")}
        </h1>
        <p className="mt-8 whitespace-pre-line leading-relaxed text-ink-soft">
          {t("body")}
        </p>
      </section>
    </div>
  );
}
