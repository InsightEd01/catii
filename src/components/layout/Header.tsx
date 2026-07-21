"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import Logo from "@/components/Logo";
import LocaleSwitcher from "./LocaleSwitcher";

const NAV_ITEMS: { key: "services" | "pricing" | "about"; href: AppPathname }[] = [
  { key: "services", href: "/services" },
  { key: "pricing", href: "/pricing" },
  { key: "about", href: "/about" },
];

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line bg-cream/90 shadow-soft backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Miauu – Home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-clay ${
                pathname === item.href ? "text-clay" : "text-ink-soft"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LocaleSwitcher />
          <Link
            href="/contact"
            className="rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-cream shadow-soft transition-colors hover:bg-clay-deep"
          >
            {t("cta")}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full bg-current transition-transform ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-full bg-current transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-full bg-current transition-transform ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-cream px-4 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`rounded-xl px-3 py-3 text-base font-medium ${
                  pathname === item.href ? "bg-sand text-clay" : "text-ink"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-3 rounded-full bg-clay px-5 py-3 text-center text-base font-semibold text-cream"
            >
              {t("cta")}
            </Link>
          </nav>
          <div className="mt-4 flex justify-center">
            <LocaleSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
