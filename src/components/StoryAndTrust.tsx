import React from 'react';
import { HandHeart, Leaf, ShieldCheck, Truck } from 'lucide-react';
import { HERO_AND_STORY_IMAGES } from '../data/products';
import { UI_COPY } from '../data/translations';
import { Language } from '../types';
import { ResilientImage } from './ResilientImage';

interface StoryAndTrustProps {
  lang: Language;
}

const PILLAR_ICONS = [
  <Leaf key="leaf" className="h-5 w-5 text-[#2E6B34]" />,
  <HandHeart key="hand" className="h-5 w-5 text-[#E8A317]" />,
  <ShieldCheck key="shield" className="h-5 w-5 text-[#2E6B34]" />,
  <Truck key="truck" className="h-5 w-5 text-[#C62828]" />,
];

export const StoryAndTrust: React.FC<StoryAndTrustProps> = ({ lang }) => {
  const t = UI_COPY[lang].story;

  return (
    <section id="story" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
      {/* "আমাদের গল্প" Split Section with Photo Collage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-white p-5 sm:p-8 lg:p-10 shadow-sm ring-1 ring-[#1B2A1E]/6">
        {/* Photo Collage */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
          <div className="col-span-2 aspect-[16/10] overflow-hidden rounded-2xl bg-[#F2E9D8]">
            <ResilientImage
              src={HERO_AND_STORY_IMAGES.storyKitchen}
              alt={lang === 'bn' ? 'কাকলির হাতে তৈরি আচার' : 'Kakoli sun-curing handmade pickles'}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#F2E9D8]">
            <ResilientImage
              src={HERO_AND_STORY_IMAGES.storySpices}
              alt={lang === 'bn' ? 'খাঁটি পাহাড়ি মশলা' : 'Pure hill spices'}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#F2E9D8]">
            <ResilientImage
              src={HERO_AND_STORY_IMAGES.storyHarvest}
              alt={lang === 'bn' ? 'পাহাড়ি ফলের সংগ্রহ' : 'Fresh hill fruit harvest'}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Story Copy */}
        <div className="lg:col-span-6 space-y-4">
          <p className="text-xs font-bold tracking-wider uppercase text-[#2E6B34]">
            {t.kicker}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1B2A1E] leading-snug">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#556358]">
            {t.p1}
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-[#556358]">
            {t.p2}
          </p>

          <blockquote className="rounded-2xl bg-[#FFF8EC] p-4 text-sm sm:text-base font-medium italic text-[#1B2A1E] ring-1 ring-[#E8A317]/30">
            {t.highlight}
          </blockquote>
        </div>
      </div>

      {/* Why Choose Us 4-pillar grid */}
      <div className="space-y-5">
        <h3 className="text-xl sm:text-2xl font-bold text-center text-[#1B2A1E]">
          {t.whyTitle}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="rounded-3xl bg-white p-5 ring-1 ring-[#1B2A1E]/6 shadow-xs flex flex-col gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF8EC] ring-1 ring-[#1B2A1E]/8">
                {PILLAR_ICONS[idx]}
              </div>
              <div>
                <h4
                  className="text-base font-bold text-[#1B2A1E]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {pillar.title}
                </h4>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#556358]">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
