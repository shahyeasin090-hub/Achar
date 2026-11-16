import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Gift, Truck } from 'lucide-react';
import { UI_COPY } from '../data/translations';
import { Language } from '../types';

interface OfferCarouselProps {
  lang: Language;
  onSelectComboOffer: () => void;
  onBrowseMenu: () => void;
}

export const OfferCarousel: React.FC<OfferCarouselProps> = ({
  lang,
  onSelectComboOffer,
  onBrowseMenu,
}) => {
  const offers = UI_COPY[lang].offers;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % offers.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [offers.length]);

  const current = offers[activeIndex];
  const isComboSlide = current.id === 'combo-save';

  return (
    <section id="offers" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2E6B34] via-[#265A2B] to-[#1D4625] p-5 sm:p-7 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3.5 max-w-2xl">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E8A317] text-[#1B2A1E]">
              {isComboSlide ? <Gift className="h-5 w-5" /> : <Truck className="h-5 w-5" />}
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#E8A317]">
                {current.kicker}
              </p>
              <h2
                className="mt-0.5 text-lg sm:text-xl font-bold text-white leading-snug"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {current.title}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#FFF8EC]/85">
                {current.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={isComboSlide ? onSelectComboOffer : onBrowseMenu}
              className="min-h-[42px] rounded-full bg-[#FFF8EC] px-5 py-2 text-xs sm:text-sm font-bold text-[#1B2A1E] hover:bg-white active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              {current.cta}
            </button>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((prev) => (prev - 1 + offers.length) % offers.length)
                }
                aria-label="Previous offer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((prev) => (prev + 1) % offers.length)}
                aria-label="Next offer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Minimal slide dots */}
        <div className="mt-4 flex items-center gap-1.5" role="tablist" aria-label="Offers">
          {offers.map((offer, idx) => (
            <button
              key={offer.id}
              type="button"
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={offer.title}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === activeIndex ? 'w-6 bg-[#E8A317]' : 'w-2 bg-white/35 hover:bg-white/55'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
