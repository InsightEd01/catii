import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import PricingClient from "./PricingClient";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/pricing", "pricing");
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PricingClient />;
}
