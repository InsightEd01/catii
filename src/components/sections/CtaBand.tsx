import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CatMark } from "@/components/Logo";

export default function CtaBand() {
  const t = useTranslations("ctaBand");

  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-clay px-8 py-14 text-center shadow-lift sm:px-14">
          <CatMark className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 text-cream/10" />
          <CatMark className="pointer-events-none absolute -bottom-10 -left-10 h-52 w-52 text-cream/10" />
          <h2 className="relative font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl">
            {t("title")}
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-base leading-relaxed text-cream/85">
            {t("text")}
          </p>
          <Link
            href="/contact"
            className="relative mt-8 inline-block rounded-full bg-cream px-8 py-3.5 text-sm font-semibold text-clay-deep transition-transform hover:scale-[1.03]"
          >
            {t("button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
