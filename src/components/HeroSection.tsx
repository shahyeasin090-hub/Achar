import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_AND_STORY_IMAGES } from '../data/products';
import { UI_COPY, formatBdt } from '../data/translations';
import { Language, Product } from '../types';
import { BrandLogo } from './BrandLogo';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  lang: Language;
  shelfProducts: Product[];
  onOrderNow: () => void;
  onViewCombos: () => void;
  onSelectProduct: (product: Product) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  shelfProducts,
  onOrderNow,
  onViewCombos,
  onSelectProduct,
}) => {
  const t = UI_COPY[lang].hero;

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#1D4625]"
      aria-labelledby="hero-headline"
    >
      {/* Mountain & river atmospheric background */}
      <div className="absolute inset-0">
        <ResilientImage
          src={HERO_AND_STORY_IMAGES.heroMountainRiver}
          alt={
            lang === 'bn'
              ? 'সবুজ পাহাড়ি প্রকৃতি ও আঁকাবাঁকা নদী'
              : 'Misty green hills and winding river'
          }
          loading="eager"
          className="h-full w-full object-cover object-center"
        />
        {/* Measured scrim for crisp WCAG AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E2916]/65 via-[#13351D]/55 to-[#1B2A1E]/90" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-6 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14 lg:pb-10">
        {/* Centered / balanced editorial hero */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-5 flex flex-col items-center gap-3"
          >
            <BrandLogo variant="badge" />
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#FFF8EC]/90">
              {t.badge}
            </p>
          </motion.div>

          <motion.h1
            id="hero-headline"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.22] text-white tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            {t.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mx-auto mt-3.5 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-[#FFF8EC]/90"
          >
            {t.subline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              type="button"
              onClick={onOrderNow}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#E8A317] px-7 py-3 text-sm sm:text-base font-bold text-[#1B2A1E] shadow-lg shadow-black/20 hover:bg-[#f2b12c] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{t.primaryCta}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onViewCombos}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm sm:text-base font-semibold text-white ring-1 ring-white/30 backdrop-blur-md hover:bg-white/25 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="h-4 w-4 text-[#E8A317]" />
              <span>{t.secondaryCta}</span>
            </button>
          </motion.div>
        </div>

        {/* Row of product jars floating on a natural stone shelf */}
        <div className="mt-10 sm:mt-12">
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="text-xs sm:text-sm font-medium text-[#FFF8EC]/85">
              {t.shelfLabel}
            </span>
            <span className="text-xs text-[#E8A317] font-medium hidden sm:inline">
              {lang === 'bn' ? 'বিস্তারিত দেখতে বয়ামে ট্যাপ করুন' : 'Tap any jar to customize'}
            </span>
          </div>

          <div className="relative">
            {/* Shelf cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 relative z-10">
              {shelfProducts.map((product, idx) => (
                <motion.button
                  key={product.id}
                  type="button"
                  onClick={() => onSelectProduct(product)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12 + idx * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="group text-left rounded-2xl bg-[#FFF8EC] p-2.5 shadow-xl shadow-black/25 ring-1 ring-black/5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A317] cursor-pointer"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#F2E9D8]">
                    <ResilientImage
                      src={product.image}
                      alt={lang === 'bn' ? product.nameBn : product.nameEn}
                      loading="eager"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-2 px-0.5">
                    <h2
                      className="text-xs sm:text-sm font-bold text-[#1B2A1E] truncate"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {lang === 'bn' ? product.nameBn : product.nameEn}
                    </h2>
                    <div className="mt-0.5 flex items-center justify-between text-xs">
                      <span className="font-bold text-[#2E6B34] tabular-nums">
                        {formatBdt(product.basePrice, lang)}
                      </span>
                      <span className="text-[11px] text-[#556358]">
                        {product.defaultWeightLabel}
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Stone shelf base bar */}
            <div
              aria-hidden="true"
              className="mx-auto -mt-3 h-6 w-[98%] rounded-b-2xl bg-gradient-to-b from-[#B9AE9A] via-[#9C907C] to-[#746958] shadow-inner border-t border-white/40"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
