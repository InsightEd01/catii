import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import ServiceStorySection, { StoryBeat } from "@/components/landing/ServiceStorySection";
import RingMarquee from "@/components/landing/RingMarquee";

const STORY_BEATS: StoryBeat[] = [
  {
    title: "MIAUU",
    emphasis: true,
    side: "left",
    frameRange: [0, 0],
  },
  {
    kicker: "Everyday Care",
    title: "One visit, everything covered",
    price: "40 CHF / visit · 60 CHF for two a day",
    text: "Fresh food, fresh water, a clean litter box, and real one-on-one attention — once or twice a day, on schedule.",
    side: "right",
    frameRange: [1, 39],
  },
  {
    kicker: "While We're There",
    title: "The little things, covered too",
    text: "We bring in your mail, air out the apartment, water your plants, and vacuum up the cat hair — all before you're home.",
    side: "right",
    frameRange: [40, 77],
  },
  {
    kicker: "Grooming",
    title: "A gentle brush, trim, or bath",
    price: "20–50 CHF combing & trimming · 250 CHF full shave",
    text: "Kämmen, Trimmen, or a full wash when they've gotten into something messy — handled calmly, at their pace. Nail, eye, and ear care are always free.",
    side: "right",
    frameRange: [78, 114],
  },
  {
    kicker: "Consulting",
    title: "Guidance for a calmer home",
    price: "40 CHF / session · unlimited time",
    text: "Behavior, nutrition, and habitat advice (Beratung: Haltung, Verhalten) to help your cat feel settled, wherever they live.",
    side: "left",
    frameRange: [115, 147],
  },
  {
    kicker: "For Every Occasion",
    title: "Whenever you can't be there",
    text: "Holidays, hospital stays, or a long day at the office — Miauu is there so your cat never has to be.",
    side: "left",
    frameRange: [148, 200],
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Miauu | Comfort, wherever they roam",
    description: "Miauu reimagines everyday cat care — gentle, intelligent, and always by their side.",
  };
}

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-[#060b14] text-slate-100 selection:bg-sky-400 selection:text-[#060b14]">
      {/* Desktop / tablet hero: full-bleed cat photo, text overlaid on the open snow to its left */}
      <section className="relative hidden lg:flex lg:min-h-screen lg:items-center">
        <Image
          src="/ChatGPT Image Jul 11, 2026, 01_49_24 PM (1).png"
          alt="Miauu cat, desktop hero"
          fill
          className="object-cover object-center"
          priority
        />

        <div className="relative z-10 flex flex-col gap-8 px-16 xl:px-24 lg:max-w-xl xl:max-w-2xl">
          <span className="inline-flex w-fit items-center rounded-full border border-slate-900/15 bg-white/40 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-sky-700 backdrop-blur-sm">
            Introducing Miauu
          </span>

          <h1
            className="font-display text-6xl font-bold leading-[1.05] tracking-tight text-[#0b1220] xl:text-7xl"
            style={{ textShadow: "0 2px 24px rgba(255,255,255,0.85)" }}
          >
            Comfort, wherever <span className="text-sky-700">they</span> roam
          </h1>

          <p
            className="max-w-md text-lg leading-relaxed text-slate-800"
            style={{ textShadow: "0 2px 16px rgba(255,255,255,0.85)" }}
          >
            Miauu reimagines everyday cat care — gentle, intelligent, and always by their side.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full bg-sky-400 px-9 py-4 text-lg font-semibold text-[#060b14] shadow-xl shadow-sky-400/20 transition-all duration-300 hover:scale-105 hover:bg-sky-300"
            >
              Explore Miauu
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border-2 border-slate-900/30 px-9 py-4 text-lg font-semibold text-[#0b1220] backdrop-blur-sm transition-all duration-300 hover:border-slate-900/60 hover:bg-white/30"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile hero: cat above, text below */}
      <section className="flex flex-col lg:hidden">
        <div className="relative h-[48vh] w-full min-h-[320px]">
          <Image
            src="/ChatGPT Image Jul 11, 2026, 01_52_40 PM.png"
            alt="Miauu cat, mobile hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#060b14] to-transparent" />
        </div>

        <div className="flex flex-col items-center gap-6 px-6 py-14 text-center">
          <span className="inline-flex w-fit items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-sky-300">
            Introducing Miauu
          </span>

          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Comfort, wherever <span className="text-sky-300">they</span> roam
          </h1>

          <p className="max-w-md text-base leading-relaxed text-slate-300 sm:text-lg">
            Miauu reimagines everyday cat care — gentle, intelligent, and always by their side.
          </p>

          <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full bg-sky-400 px-8 py-3.5 text-base font-semibold text-[#060b14] shadow-xl shadow-sky-400/20 transition-all duration-300 hover:bg-sky-300"
            >
              Explore Miauu
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/20 px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/5"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* The Core Service */}
      <section className="bg-cream px-6 py-24 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <span className="inline-flex w-fit items-center rounded-full border border-sky-600/25 bg-sky-50 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-sky-700">
              The Core Service
            </span>
            <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              Give your cat a <span className="text-sky-600">Miauu</span> touch.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Whether you&apos;re away on holiday, in hospital, or just stuck at work late, Miauu carers visit your
              cat in your home. No carriers, no car rides, no unfamiliar cages — cats are happiest surrounded by
              their own scents, sounds, and routines, so that&apos;s exactly where we care for them.
            </p>
          </div>

          <RingMarquee />
        </div>
      </section>

      {/* Services, told as a scroll-scrubbed story: one continuous video background, each service fading in and out in turn */}
      <ServiceStorySection beats={STORY_BEATS} />

      {/* Medical & Special Needs Care */}
      <section className="border-t border-white/10 bg-[#080f1c] px-6 py-24 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <span className="inline-flex w-fit items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-sky-300">
              Medical &amp; Special Needs
            </span>
            <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              More than a pet sitter — a trained professional.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Thanks to her background as a veterinary practice assistant, Sijana is fully equipped to give pills,
              administer injections like insulin, and care for cats who are sick or recovering. No case is
              &ldquo;too much&rdquo; — diabetic cats, epileptic cats, and cats with behavioral challenges are always
              welcome.
            </p>

            <ul className="mt-6 flex flex-col gap-3">
              {[
                "Pills & injections, including insulin",
                "Diabetic and epileptic cats welcome",
                "Recovery & post-op care",
                "Behavioral support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-200">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mt-0.5 h-5 w-5 shrink-0 text-sky-400"
                  >
                    <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="relative aspect-[4/3]"
            style={{
              maskImage: "radial-gradient(ellipse 68% 68% at center, black 55%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 68% 68% at center, black 55%, transparent 100%)",
            }}
          >
            <Image
              src="/ezgif-587232ffed87d54a-jpg/ezgif-frame-100.jpg"
              alt="Gentle at-home health check"
              fill
              className="object-cover object-[70%_center]"
            />
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="px-6 py-24 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <span className="inline-flex w-fit items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-sky-300">
            Pricing
          </span>
          <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Simple, transparent pricing.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            Explore our clear, straightforward options for everyday care, grooming, medical needs, and consulting.
          </p>
          <div className="mt-10">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full bg-sky-400 px-8 py-4 text-lg font-semibold text-[#060b14] shadow-xl shadow-sky-400/20 transition-all duration-300 hover:scale-105 hover:bg-sky-300"
            >
              See How much we charge
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="border-t border-white/10 bg-[#080f1c] px-6 py-24 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <span className="inline-flex w-fit items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-sky-300">
              Contact Us
            </span>
            <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              We&apos;re just <span className="text-sky-300">one call</span> away.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Questions about a visit, pricing, or your cat&apos;s specific routine? Reach out and a real person — not
              a bot — will get back to you within 24 hours.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-sky-400 px-6 py-2.5 text-base font-semibold text-[#060b14] shadow-xl shadow-sky-400/20 transition-all duration-300 hover:scale-105 hover:bg-sky-300"
              >
                Get in Touch
              </Link>
              <a
                href="tel:+41799160496"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/20 px-6 py-2.5 text-base font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/5"
              >
                079 916 04 96
              </a>
              <a
                href="mailto:hallo@miauu.ch"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/20 px-6 py-2.5 text-base font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/5"
              >
                hallo@miauu.ch
              </a>
              <a
                href="https://instagram.com/malaa_i_malii"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/20 px-6 py-2.5 text-base font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/5"
              >
                @malaa_i_malii
              </a>
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-sky-300/70">
              Trust is my top priority.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div
              className="relative aspect-[4/3] w-full"
              style={{
                maskImage: "radial-gradient(ellipse 68% 68% at center, black 55%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 68% 68% at center, black 55%, transparent 100%)",
              }}
            >
              <Image
                src="/ChatGPT Image Jul 21, 2026, 10_09_08 AM.png"
                alt="Miauu cat answering a phone call"
                fill
                className="object-cover object-[center_20%]"
              />
            </div>
            <p className="max-w-md text-center text-sm leading-relaxed text-slate-400">
              Based in 9200 Gossau, serving St. Gallen and all of Eastern Switzerland. Traveling further? Just ask —
              pricing is arranged fairly by distance and travel time.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Your Carer */}
      <section className="border-t border-white/10 px-6 py-24 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div
            className="relative order-2 aspect-[4/3] lg:order-1"
            style={{
              maskImage: "radial-gradient(ellipse 68% 68% at center, black 55%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 68% 68% at center, black 55%, transparent 100%)",
            }}
          >
            <Image src="/linde-big3.webp" alt="Sijana Klipic" fill className="object-cover object-[center_20%]" />
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-flex w-fit items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-sky-300">
              Meet Your Carer
            </span>
            <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Ten years of veterinary experience, now just for cats.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Before Miauu, Sijana Klipic spent a decade as a Veterinary Practice Assistant (TPA) — an intensive
              education in the needs of pets, and the people who love them. Somewhere along the way she discovered a
              particular gift for handling cats: a calm, gentle touch that even the most anxious cats seem to trust.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-300">
              That background means she can run a general health check right in your home — for cats who dread the
              carrier, that can mean delaying a stressful annual vet visit altogether.
            </p>

            <blockquote className="mt-8 border-l-2 border-sky-400/40 pl-5">
              <p className="font-display text-xl italic text-white">
                &ldquo;Your house tiger is in loving and professional hands with me.&rdquo;
              </p>
              <footer className="mt-2 text-sm text-slate-400">— Sijana Klipic</footer>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}
