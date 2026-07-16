import { useTranslations } from "next-intl";

const ITEMS = [
  {
    key: "local",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    key: "gentle",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M12 20s-7.5-4.6-9.3-9.4C1.5 7.3 3.6 4.5 6.6 4.5c2 0 3.6 1.1 4.4 2.7.8-1.6 2.4-2.7 4.4-2.7 3 0 5.1 2.8 3.9 6.1C21.5 15.4 12 20 12 20Z" />
      </svg>
    ),
  },
  {
    key: "tech",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M4 9.5A11.5 11.5 0 0 1 20 9.5" />
        <path d="M7 13a7.5 7.5 0 0 1 10 0" />
        <circle cx="12" cy="17" r="1.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
] as const;

export default function WhyBand() {
  const t = useTranslations("why");

  return (
    <section className="bg-sand py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-clay">
          {t("kicker")}
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
          {t("title")}
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ITEMS.map((item) => (
            <div
              key={item.key}
              className="rounded-3xl border border-line bg-card p-7 shadow-soft"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay/10 text-clay">
                {item.icon}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">
                {t(`items.${item.key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {t(`items.${item.key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
