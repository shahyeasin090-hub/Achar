import React, { useMemo, useState } from 'react';
import {
  Apple,
  Check,
  Fish,
  Flame,
  Gift,
  LayoutGrid,
  Plus,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data/products';
import { UI_COPY, formatBdt } from '../data/translations';
import { CategoryId, Language, Product } from '../types';
import { ResilientImage } from './ResilientImage';

interface CatalogSectionProps {
  lang: Language;
  products: Product[];
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

const CATEGORY_ICON_MAP: Record<CategoryId, React.ReactNode> = {
  all: <LayoutGrid className="h-4 w-4" />,
  pickle: <Flame className="h-4 w-4" />,
  spice: <Sparkles className="h-4 w-4" />,
  fruit: <Apple className="h-4 w-4" />,
  shutki: <Fish className="h-4 w-4" />,
  combo: <Gift className="h-4 w-4" />,
};

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  lang,
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onQuickAdd,
}) => {
  const t = UI_COPY[lang].catalog;
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'low' | 'high'>('popular');
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const popularProducts = useMemo(
    () => products.filter((p) => p.popular),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = products.filter((p) => {
      const catMatch = selectedCategory === 'all' || p.category === selectedCategory;
      if (!catMatch) return false;
      if (!q) return true;
      const haystack = [
        p.nameBn,
        p.nameEn,
        p.subtitleBn,
        p.subtitleEn,
        ...p.ingredientsBn,
        ...p.ingredientsEn,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });

    if (sortBy === 'low') {
      return [...list].sort((a, b) => a.basePrice - b.basePrice);
    }
    if (sortBy === 'high') {
      return [...list].sort((a, b) => b.basePrice - a.basePrice);
    }
    return [...list].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleCategorySwitch = (cat: CategoryId) => {
    if (cat === selectedCategory) return;
    setIsLoadingSkeleton(true);
    onSelectCategory(cat);
    window.setTimeout(() => setIsLoadingSkeleton(false), 160);
  };

  const handleQuickAddClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onQuickAdd(product);
    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === product.id ? null : prev));
    }, 1100);
  };

  return (
    <section id="menu" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Popular Picks horizontal scroll row */}
      <div>
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2A1E]">
              {t.popularTitle}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#556358]">
              {t.popularSubtitle}
            </p>
          </div>
        </div>

        <div className="flex gap-3.5 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar">
          {popularProducts.map((product) => {
            const isAdded = recentlyAddedId === product.id;
            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -2 }}
                onClick={() => onSelectProduct(product)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProduct(product);
                  }
                }}
                className="snap-start shrink-0 w-[210px] sm:w-[235px] rounded-2xl bg-white p-3 shadow-sm ring-1 ring-[#1B2A1E]/6 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6B34]"
              >
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#F5EFE4]">
                    <ResilientImage
                      src={product.image}
                      alt={lang === 'bn' ? product.nameBn : product.nameEn}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-2.5">
                    <p className="text-[11px] font-medium text-[#556358]">
                      {lang === 'bn' ? product.originBn : product.originEn} · {product.defaultWeightLabel}
                    </p>
                    <h3 className="mt-0.5 text-sm sm:text-base font-bold text-[#1B2A1E] line-clamp-1">
                      {lang === 'bn' ? product.nameBn : product.nameEn}
                    </h3>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-base font-bold text-[#2E6B34] tabular-nums">
                    {formatBdt(product.basePrice, lang)}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleQuickAddClick(e, product)}
                    aria-label={`${t.addShort} ${lang === 'bn' ? product.nameBn : product.nameEn}`}
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-all cursor-pointer active:scale-95 ${
                      isAdded
                        ? 'bg-[#E8A317] text-[#1B2A1E]'
                        : 'bg-[#2E6B34] text-white hover:bg-[#235428]'
                    }`}
                  >
                    {isAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Category Chips + Search + Full Product Grid */}
      <div className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2A1E]">
              {t.menuTitle}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#556358]">
              {t.menuSubtitle}
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative flex-1 sm:w-64">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#556358]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                aria-label={t.searchPlaceholder}
                className="w-full min-h-[42px] rounded-full bg-white pl-10 pr-8 py-2 text-sm text-[#1B2A1E] placeholder:text-[#556358]/75 ring-1 ring-[#1B2A1E]/12 focus:outline-none focus:ring-2 focus:ring-[#2E6B34]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#556358] hover:text-[#1B2A1E] cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'popular' | 'low' | 'high')}
              aria-label="Sort products"
              className="min-h-[42px] rounded-full bg-white px-4 py-2 text-xs sm:text-sm font-medium text-[#1B2A1E] ring-1 ring-[#1B2A1E]/12 focus:outline-none focus:ring-2 focus:ring-[#2E6B34] cursor-pointer"
            >
              <option value="popular">{t.sortPopular}</option>
              <option value="low">{t.sortLow}</option>
              <option value="high">{t.sortHigh}</option>
            </select>
          </div>
        </div>

        {/* Horizontal Interactive Category Chips */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar"
          role="tablist"
          aria-label="Product Categories"
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleCategorySwitch(cat.id)}
                className={`inline-flex min-h-[42px] items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  active
                    ? 'bg-[#2E6B34] text-white shadow-sm'
                    : 'bg-white text-[#1B2A1E]/80 ring-1 ring-[#1B2A1E]/10 hover:bg-[#F2E9D8]'
                }`}
              >
                {CATEGORY_ICON_MAP[cat.id]}
                <span>{lang === 'bn' ? cat.labelBn : cat.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Skeleton Loader OR Filtered Grid */}
        {isLoadingSkeleton ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse rounded-3xl bg-white p-4 ring-1 ring-black/5"
              >
                <div className="aspect-[4/3] w-full rounded-2xl bg-[#EFE6D5]" />
                <div className="mt-4 h-4 w-2/3 rounded bg-[#EFE6D5]" />
                <div className="mt-2 h-3 w-full rounded bg-[#F5EFE4]" />
                <div className="mt-4 flex justify-between items-center">
                  <div className="h-5 w-16 rounded bg-[#EFE6D5]" />
                  <div className="h-10 w-24 rounded-full bg-[#EFE6D5]" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center ring-1 ring-[#1B2A1E]/8">
            <p className="text-lg font-bold text-[#1B2A1E]">{t.emptyTitle}</p>
            <p className="mt-1 text-sm text-[#556358]">{t.emptySubtitle}</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="mt-4 min-h-[42px] rounded-full bg-[#2E6B34] px-6 py-2 text-sm font-semibold text-white hover:bg-[#235428] cursor-pointer"
            >
              {t.resetFilter}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((product) => {
              const isAdded = recentlyAddedId === product.id;
              return (
                <article
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group flex flex-col justify-between rounded-3xl bg-white p-4 shadow-sm ring-1 ring-[#1B2A1E]/6 hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer"
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#F5EFE4]">
                      <ResilientImage
                        src={product.image}
                        alt={lang === 'bn' ? product.nameBn : product.nameEn}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-3.5">
                      <div className="flex items-center justify-between gap-2 text-xs text-[#556358]">
                        <span>
                          {lang === 'bn' ? product.originBn : product.originEn} ·{' '}
                          {product.defaultWeightLabel}
                        </span>
                        {(product.tagBn || product.tagEn) && (
                          <span className="font-semibold text-[#C62828]">
                            {lang === 'bn' ? product.tagBn : product.tagEn}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-1 text-lg font-bold text-[#1B2A1E] group-hover:text-[#2E6B34] transition-colors">
                        {lang === 'bn' ? product.nameBn : product.nameEn}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-[#556358] line-clamp-2 leading-relaxed">
                        {lang === 'bn' ? product.shortDescBn : product.shortDescEn}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1B2A1E]/6 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-lg font-bold text-[#2E6B34] tabular-nums">
                        {formatBdt(product.basePrice, lang)}
                      </span>
                      <span className="ml-1.5 text-xs text-[#556358]">
                        / {product.defaultWeightLabel}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleQuickAddClick(e, product)}
                      className={`inline-flex min-h-[42px] items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer active:scale-95 whitespace-nowrap shrink-0 ${
                        isAdded
                          ? 'bg-[#E8A317] text-[#1B2A1E]'
                          : 'bg-[#2E6B34] text-white hover:bg-[#235428]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>{t.addedToast}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          <span>{t.addShort}</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
