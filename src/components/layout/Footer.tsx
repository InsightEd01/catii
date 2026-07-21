"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import Logo from "@/components/Logo";
import { SERVICES } from "@/lib/services";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const PAGE_LINKS: {
  key: "home" | "services" | "pricing" | "about" | "contact";
  href: AppPathname;
}[] = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "pricing", href: "/pricing" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tServices = useTranslations("services");
  const tContact = useTranslations("contact.info");
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const columns = card.querySelectorAll<HTMLElement>("[data-reveal]");
    const mark = card.querySelector<HTMLElement>("[data-wordmark]");
    gsap.set(columns, { autoAlpha: 0, y: 28 });
    if (mark) gsap.set(mark, { autoAlpha: 0, y: 40 });

    const trigger = ScrollTrigger.create({
      trigger: card,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(columns, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "power2.out",
        });
        if (mark) {
          gsap.to(mark, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            delay: 0.15,
          });
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <footer className="bg-[#060b14] px-4 pb-6 pt-4 sm:px-6">
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b1220] text-slate-300"
      >
        <div className="relative z-10 grid grid-cols-2 gap-x-6 gap-y-10 px-8 pt-12 sm:grid-cols-4 sm:px-12 sm:pt-16 md:grid-cols-6">
          <div data-reveal className="col-span-2 sm:col-span-4 md:col-span-2">
            <Link href="/" aria-label="Miauu – Home">
              <Logo inverted />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              {t("tagline")}
            </p>
          </div>

          <div data-reveal>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-300/70">
              {t("navTitle")}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {PAGE_LINKS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-300/70">
              {tServices("kicker")}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((svc) => (
                <li key={svc.key}>
                  <Link
                    href={{ pathname: "/services", hash: svc.key }}
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {tServices(`${svc.key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-300/70">
              {t("legalTitle")}
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/imprint"
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {t("imprint")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </div>

          <div data-reveal>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-300/70">
              {t("contactTitle")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              <li className="whitespace-pre-line leading-relaxed">
                {tContact("address")}
              </li>
              <li>
                <a
                  href={`mailto:${tContact("email")}`}
                  className="transition-colors hover:text-white"
                >
                  {tContact("email")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          data-reveal
          className="relative z-10 mt-12 flex flex-col gap-2 border-t border-white/10 px-8 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-12 md:mt-16"
        >
          <span>
            © {new Date().getFullYear()} Miauu, St. Gallen. {t("rights")}
          </span>
          <span>St. Gallen, Schweiz</span>
        </div>

        <div
          className="relative -mb-[7vw] select-none text-center leading-none sm:-mb-[3.5vw]"
          aria-hidden="true"
        >
          <span
            data-wordmark
            className="inline-block animate-[miauu-shimmer_7s_ease-in-out_infinite] bg-gradient-to-r from-sky-500 via-sky-200 to-sky-500 bg-[length:200%_100%] bg-clip-text font-display text-[26vw] font-bold tracking-tight text-transparent sm:text-[14vw]"
          >
            Miauu
          </span>
        </div>
      </div>
    </footer>
  );
}
