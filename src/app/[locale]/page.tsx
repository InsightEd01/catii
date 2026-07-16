import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ScrollStory from "@/components/hero/ScrollStory";
import ServicesTeaser from "@/components/sections/ServicesTeaser";
import WhyBand from "@/components/sections/WhyBand";
import CtaBand from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/", "home");
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ScrollStory />
      <ServicesTeaser />
      <WhyBand />
      <CtaBand />
    </>
  );
}
