"use client";

import React, { useState } from "react";
import PricingCard3D from "@/components/pricing/PricingCard3D";

const PRICING_OPTIONS = [
  { id: 1, title: "Standard Daily Visit", price: "40 CHF", description: "One visit per day to cover all basic needs.", imageSrc: "/ezgif-587232ffed87d54a-jpg/ezgif-frame-001.jpg" },
  { id: 2, title: "Double Daily Visit", price: "60 CHF", description: "Two visits per day for cats who need extra attention.", imageSrc: "/ezgif-587232ffed87d54a-jpg/ezgif-frame-015.jpg" },
  { id: 3, title: "Basic Grooming", price: "20 CHF", description: "Gentle combing to remove loose fur and prevent matting.", imageSrc: "/ezgif-587232ffed87d54a-jpg/ezgif-frame-030.jpg" },
  { id: 4, title: "Advanced Grooming", price: "50 CHF", description: "Deep trimming for longer coats or active shedding seasons.", imageSrc: "/ezgif-587232ffed87d54a-jpg/ezgif-frame-045.jpg" },
  { id: 5, title: "Full Shave", price: "250 CHF", description: "For severe matting. Handled gently with professional care.", imageSrc: "/ezgif-587232ffed87d54a-jpg/ezgif-frame-060.jpg" },
  { id: 6, title: "Free Spa Add-ons", price: "Included", description: "Nail clipping, eye care, and ear care included with any paid visit.", imageSrc: "/ezgif-587232ffed87d54a-jpg/ezgif-frame-075.jpg" },
  { id: 7, title: "Medical Admin", price: "Included", description: "Pills administered safely by a trained veterinary assistant.", imageSrc: "/ezgif-587232ffed87d54a-jpg/ezgif-frame-090.jpg" },
  { id: 8, title: "Injection Services", price: "Included", description: "Insulin and other injections handled professionally and calmly.", imageSrc: "/ezgif-587232ffed87d54a-jpg/ezgif-frame-105.jpg" },
  { id: 9, title: "Special Care", price: "Included", description: "Diabetic, epileptic, and behaviorally challenged cats warmly welcome.", imageSrc: "/ezgif-587232ffed87d54a-jpg/ezgif-frame-120.jpg" },
  { id: 10, title: "Consulting Session", price: "40 CHF", description: "Unlimited time per session. Behavior, nutrition, and habitat advice.", imageSrc: "/ezgif-587232ffed87d54a-jpg/ezgif-frame-135.jpg" },
];

export default function PricingClient() {
  const [selectedOption, setSelectedOption] = useState<{title: string, price: string} | null>(null);
  
  const handleBook = (option: {title: string, price: string}) => {
    setSelectedOption(option);
  };

  const closeBook = () => {
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen bg-[#060b14] px-6 py-24 sm:px-10 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-7xl text-center">
        <span className="inline-flex w-fit items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-sky-300">
          Our Services
        </span>
        <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
          Transparent, <span className="text-sky-300">professional care</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
          From basic visits to medical administration, every service is delivered with a decade of veterinary experience. Hover over an option to explore.
        </p>
      </div>

      <div className="mx-auto mt-20 grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {PRICING_OPTIONS.map((opt) => (
          <PricingCard3D
            key={opt.id}
            title={opt.title}
            price={opt.price}
            description={opt.description}
            imageSrc={opt.imageSrc}
            onBook={() => handleBook(opt)}
          />
        ))}
      </div>

      <div className="mx-auto mt-24 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl">
        <h2 className="font-display text-3xl font-bold text-white">Prefer to talk directly?</h2>
        <p className="mt-4 text-slate-300">Sijana is available to answer any questions about pricing or your cat's specific needs.</p>
        <a
          href="tel:+41799160496"
          className="mt-8 inline-flex items-center justify-center rounded-full border-2 border-sky-400 px-8 py-4 text-lg font-bold text-sky-400 shadow-xl shadow-sky-400/10 transition-all duration-300 hover:bg-sky-400 hover:text-[#060b14]"
        >
          Call 079 916 04 96
        </a>
      </div>

      {/* Booking Modal */}
      {selectedOption && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#080f1c] shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-bold text-white">Book Service</h3>
                <button onClick={closeBook} className="text-slate-400 hover:text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-6 rounded-xl bg-white/5 p-4">
                <p className="text-sm text-slate-400">Selected Service:</p>
                <p className="font-bold text-sky-300">{selectedOption.title} - {selectedOption.price}</p>
              </div>

              <form className="mt-6 flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert('Booking requested!'); closeBook(); }}>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Your Name</label>
                  <input required type="text" className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Cat's Name</label>
                  <input required type="text" className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400" placeholder="Luna" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Phone Number</label>
                  <input required type="tel" className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400" placeholder="+41 79 000 00 00" />
                </div>
                <button type="submit" className="mt-4 w-full rounded-full bg-sky-400 py-4 font-bold text-[#060b14] hover:bg-sky-300 transition-colors">
                  Confirm Booking Request
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
