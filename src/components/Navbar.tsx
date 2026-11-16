import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Language } from '../types';
import { UI_COPY, toBengaliDigits } from '../data/translations';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  lang: Language;
  onToggleLang: (lang: Language) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  cartCount,
  onOpenCart,
}) => {
  const t = UI_COPY[lang].nav;

  return (
    <header className="sticky top-0 z-30 border-b border-[#2E6B34]/10 bg-[#FFF8EC]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 md:h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line brand mark */}
        <a
          href="#home"
          className="whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6B34] rounded-lg"
          aria-label="Pahari Shad by Kakoli Home"
        >
          <BrandLogo variant="header" />
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#1B2A1E]/80"
          aria-label="Primary Navigation"
        >
          <a
            href="#home"
            className="whitespace-nowrap shrink-0 hover:text-[#2E6B34] transition-colors py-1"
          >
            {t.home}
          </a>
          <a
            href="#menu"
            className="whitespace-nowrap shrink-0 hover:text-[#2E6B34] transition-colors py-1"
          >
            {t.menu}
          </a>
          <a
            href="#story"
            className="whitespace-nowrap shrink-0 hover:text-[#2E6B34] transition-colors py-1"
          >
            {t.story}
          </a>
          <a
            href="#reviews"
            className="whitespace-nowrap shrink-0 hover:text-[#2E6B34] transition-colors py-1"
          >
            {t.reviews}
          </a>
          <a
            href="#contact"
            className="whitespace-nowrap shrink-0 hover:text-[#2E6B34] transition-colors py-1"
          >
            {t.contact}
          </a>
        </nav>

        {/* Zone 3: Language Switcher + Primary Cart Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div
            className="inline-flex items-center rounded-full bg-[#F2E9D8] p-0.5 border border-[#2E6B34]/15"
            role="group"
            aria-label="Language toggle"
          >
            <button
              type="button"
              onClick={() => onToggleLang('bn')}
              className={`min-h-[32px] px-2.5 py-1 text-xs font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lang === 'bn'
                  ? 'bg-[#2E6B34] text-white shadow-xs'
                  : 'text-[#1B2A1E]/75 hover:text-[#1B2A1E]'
              }`}
            >
              বাং
            </button>
            <button
              type="button"
              onClick={() => onToggleLang('en')}
              className={`min-h-[32px] px-2.5 py-1 text-xs font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#2E6B34] text-white shadow-xs'
                  : 'text-[#1B2A1E]/75 hover:text-[#1B2A1E]'
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2 min-h-[40px] px-3.5 py-2 rounded-full bg-[#2E6B34] text-white text-xs sm:text-sm font-semibold hover:bg-[#235428] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
            aria-label={`${t.cart} (${cartCount})`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">{t.cart}</span>
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[#E8A317] text-[#1B2A1E] text-[11px] font-bold tabular-nums">
              {lang === 'bn' ? toBengaliDigits(cartCount) : cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
