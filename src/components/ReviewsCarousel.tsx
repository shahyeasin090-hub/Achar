import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { REVIEWS } from '../data/products';
import { UI_COPY } from '../data/translations';
import { Language } from '../types';

interface ReviewsCarouselProps {
  lang: Language;
}

export const ReviewsCarousel: React.FC<ReviewsCarouselProps> = ({ lang }) => {
  const t = UI_COPY[lang].reviews;
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollByCards = (direction: 'prev' | 'next') => {
    const el = scrollRef.current;
    if (!el) return;
    const offset = direction === 'next' ? 320 : -320;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section id="reviews" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          <p className="text-xs font-bold tracking-wider uppercase text-[#2E6B34]">
            {t.kicker}
          </p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-[#1B2A1E]">
            {t.title}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#556358]">{t.subtitle}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollByCards('prev')}
            aria-label="Previous review"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1B2A1E] ring-1 ring-[#1B2A1E]/12 hover:bg-[#F2E9D8] cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards('next')}
            aria-label="Next review"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1B2A1E] ring-1 ring-[#1B2A1E]/12 hover:bg-[#F2E9D8] cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar"
      >
        {REVIEWS.map((rev) => (
          <article
            key={rev.id}
            className="snap-start shrink-0 w-[290px] sm:w-[340px] rounded-3xl bg-white p-5 shadow-xs ring-1 ring-[#1B2A1E]/6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 text-[#E8A317]" aria-label={`${rev.rating} out of 5 stars`}>
                {Array.from({ length: rev.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#1B2A1E]/90">
                “{lang === 'bn' ? rev.commentBn : rev.commentEn}”
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1B2A1E]/8">
              <p className="text-sm font-bold text-[#1B2A1E]">
                {lang === 'bn' ? rev.nameBn : rev.nameEn}
              </p>
              <p className="text-xs text-[#556358]">
                {lang === 'bn' ? rev.cityBn : rev.cityEn} ·{' '}
                {lang === 'bn' ? rev.productBn : rev.productEn}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
