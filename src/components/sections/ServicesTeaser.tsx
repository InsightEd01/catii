import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SERVICES } from "@/lib/services";

export default function ServicesTeaser() {
  const t = useTranslations("servicesTeaser");
  const tServices = useTranslations("services");

  return (
    <section className="relative z-10 bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-clay">
          {t("kicker")}
        </span>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl">
          {t("title")}
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {SERVICES.map((svc) => (
            <Link
              key={svc.key}
              href={{ pathname: "/services", hash: svc.key }}
              className="group overflow-hidden rounded-3xl border border-line bg-card shadow-soft transition-shadow hover:shadow-lift"
            >
              <div className="aspect-[16/9] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={svc.image}
                  alt={tServices(`${svc.key}.title`)}
                  loading="lazy"
                  className="h-full w-full object-cover object-[62%_center] transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold">
                  {tServices(`${svc.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {tServices(`${svc.key}.teaser`)}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-clay transition-colors group-hover:text-clay-deep">
                  {t("more")} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
