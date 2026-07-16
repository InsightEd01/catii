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
    <footer className="bg-cream px-4 pb-6 pt-4 sm:px-6">
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-[2.5rem] bg-ink text-cream/80"
      >
        <div className="relative z-10 grid grid-cols-2 gap-x-6 gap-y-10 px-8 pt-12 sm:grid-cols-4 sm:px-12 sm:pt-16 md:grid-cols-6">
          <div data-reveal className="col-span-2 sm:col-span-4 md:col-span-2">
            <Link href="/" aria-label="catii – Home">
              <Logo inverted />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              {t("tagline")}
            </p>
          </div>

          <div data-reveal>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cream/40">
              {t("navTitle")}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {PAGE_LINKS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/75 transition-colors hover:text-cream"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cream/40">
              {tServices("kicker")}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((svc) => (
                <li key={svc.key}>
                  <Link
                    href={{ pathname: "/services", hash: svc.key }}
                    className="text-sm text-cream/75 transition-colors hover:text-cream"
                  >
                    {tServices(`${svc.key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cream/40">
              {t("legalTitle")}
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/imprint"
                  className="text-sm text-cream/75 transition-colors hover:text-cream"
                >
                  {t("imprint")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-cream/75 transition-colors hover:text-cream"
                >
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </div>

          <div data-reveal>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cream/40">
              {t("contactTitle")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/75">
              <li className="whitespace-pre-line leading-relaxed">
                {tContact("address")}
              </li>
              <li>
                <a
                  href={`mailto:${tContact("email")}`}
                  className="transition-colors hover:text-cream"
                >
                  {tContact("email")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          data-reveal
          className="relative z-10 mt-12 flex flex-col gap-2 border-t border-cream/10 px-8 py-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between sm:px-12 md:mt-16"
        >
          <span>
            © {new Date().getFullYear()} catii, St. Gallen. {t("rights")}
          </span>
          <span>St. Gallen, Schweiz</span>
        </div>

        <div
          className="relative -mb-[7vw] select-none text-center leading-none sm:-mb-[3.5vw]"
          aria-hidden="true"
        >
          <span
            data-wordmark
            className="inline-block animate-[catii-shimmer_7s_ease-in-out_infinite] bg-gradient-to-r from-clay via-moss to-clay bg-[length:200%_100%] bg-clip-text font-display text-[26vw] font-bold tracking-tight text-transparent sm:text-[14vw]"
          >
            catii
          </span>
        </div>
      </div>
    </footer>
  );
}
