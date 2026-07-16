import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CatMark } from "@/components/Logo";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-16 text-center">
      <CatMark className="h-16 w-16 text-clay/40" />
      <h1 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-3 text-ink-soft">{t("text")}</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-clay px-7 py-3 text-sm font-semibold text-cream shadow-soft transition-colors hover:bg-clay-deep"
      >
        {t("back")}
      </Link>
    </div>
  );
}
