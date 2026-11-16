import React, { useEffect, useState } from 'react';
import { Check, MapPin, Minus, Plus, ShieldCheck, X } from 'lucide-react';
import { motion } from 'motion/react';
import { UI_COPY, formatBdt, toBengaliDigits } from '../data/translations';
import { Language, Product, WeightOption } from '../types';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: Product | null;
  lang: Language;
  onClose: () => void;
  onAddToCart: (product: Product, weight: WeightOption, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  lang,
  onClose,
  onAddToCart,
}) => {
  const t = UI_COPY[lang].pdp;
  const [selectedWeightId, setSelectedWeightId] = useState<string>('500g');
  const [quantity, setQuantity] = useState<number>(1);
  const [expandedDesc, setExpandedDesc] = useState<boolean>(false);

  useEffect(() => {
    if (!product) return;
    // Match default option based on basePrice or default to middle option
    const match =
      product.weightOptions.find((w) => w.price === product.basePrice) ||
      product.weightOptions[0];
    setSelectedWeightId(match.id);
    setQuantity(1);
    setExpandedDesc(false);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;

  const activeWeight =
    product.weightOptions.find((w) => w.id === selectedWeightId) ||
    product.weightOptions[0];
  const lineTotal = activeWeight.price * quantity;

  const handleConfirmAdd = () => {
    onAddToCart(product, activeWeight, quantity);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-xs p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl bg-[#FFF8EC] shadow-2xl"
      >
        {/* Top Close Bar */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#1B2A1E] shadow-md hover:bg-white cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            {/* Large Product Image */}
            <div className="aspect-[4/3] md:aspect-square w-full overflow-hidden rounded-2xl bg-[#EFE6D5]">
              <ResilientImage
                src={product.image}
                alt={lang === 'bn' ? product.nameBn : product.nameEn}
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Purchase & Story Module */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#556358]">
                  <MapPin className="h-3.5 w-3.5 text-[#2E6B34]" />
                  <span>
                    {t.originLabel}: {lang === 'bn' ? product.originBn : product.originEn}
                  </span>
                </div>

                <h2
                  id="pdp-title"
                  className="mt-1.5 text-2xl sm:text-3xl font-bold text-[#1B2A1E] leading-snug"
                >
                  {lang === 'bn' ? product.nameBn : product.nameEn}
                </h2>
                <p className="mt-1 text-sm text-[#556358]">
                  {lang === 'bn' ? product.subtitleBn : product.subtitleEn}
                </p>
              </div>

              {/* Price Pill + Quantity Stepper */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-3.5 ring-1 ring-[#1B2A1E]/8">
                <div className="inline-flex items-baseline gap-1.5 rounded-full bg-[#2E6B34]/10 px-4 py-1.5">
                  <span className="text-xl font-bold text-[#2E6B34] tabular-nums">
                    {formatBdt(activeWeight.price, lang)}
                  </span>
                  <span className="text-xs font-medium text-[#2E6B34]/80">
                    / {lang === 'bn' ? activeWeight.labelBn : activeWeight.labelEn}
                  </span>
                </div>

                <div className="flex items-center gap-2" aria-label={t.qtyLabel}>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2E9D8] text-[#1B2A1E] hover:bg-[#E5DAC4] cursor-pointer active:scale-95"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-7 text-center text-base font-bold text-[#1B2A1E] tabular-nums">
                    {lang === 'bn' ? toBengaliDigits(quantity) : quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    aria-label="Increase quantity"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2E6B34] text-white hover:bg-[#235428] cursor-pointer active:scale-95"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Weight Selector */}
              <div>
                <p className="text-xs font-semibold text-[#556358] mb-2">{t.weightLabel}</p>
                <div className="grid grid-cols-3 gap-2">
                  {product.weightOptions.map((opt) => {
                    const selected = opt.id === activeWeight.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedWeightId(opt.id)}
                        className={`min-h-[48px] rounded-2xl px-2 py-2 text-center transition-all cursor-pointer ${
                          selected
                            ? 'bg-[#2E6B34] text-white shadow-sm'
                            : 'bg-white text-[#1B2A1E] ring-1 ring-[#1B2A1E]/10 hover:bg-[#F2E9D8]'
                        }`}
                      >
                        <span className="block text-xs font-bold">
                          {lang === 'bn' ? opt.labelBn : opt.labelEn}
                        </span>
                        <span
                          className={`block text-[11px] tabular-nums ${
                            selected ? 'text-[#FFF8EC]/90' : 'text-[#556358]'
                          }`}
                        >
                          {formatBdt(opt.price, lang)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description with Read More */}
              <div className="text-sm leading-relaxed text-[#1B2A1E]/85">
                <p>{lang === 'bn' ? product.shortDescBn : product.shortDescEn}</p>
                {expandedDesc && (
                  <p className="mt-2 text-[#1B2A1E]/80">
                    {lang === 'bn' ? product.longDescBn : product.longDescEn}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setExpandedDesc((v) => !v)}
                  className="mt-1.5 text-xs font-bold text-[#2E6B34] underline underline-offset-4 hover:text-[#235428] cursor-pointer"
                >
                  {expandedDesc ? t.readLess : t.readMore}
                </button>
              </div>

              {/* Ingredients */}
              <div>
                <p className="text-xs font-semibold text-[#556358] mb-1.5">
                  {t.ingredientsTitle}
                </p>
                <ul className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-[#1B2A1E]/85">
                  {(lang === 'bn' ? product.ingredientsBn : product.ingredientsEn).map(
                    (ing) => (
                      <li key={ing} className="inline-flex items-center gap-1">
                        <Check className="h-3.5 w-3.5 text-[#2E6B34]" />
                        <span>{ing}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#556358] pt-1">
                <ShieldCheck className="h-4 w-4 text-[#2E6B34] shrink-0" />
                <span>{t.codNote}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Snack-shop style dark rounded sticky bottom bar */}
        <div className="p-3 sm:p-4 bg-[#FFF8EC] border-t border-[#1B2A1E]/8">
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#1B2A1E] px-4 py-3 text-white shadow-lg">
            <div>
              <span className="block text-[11px] text-[#FFF8EC]/70">{t.totalLabel}</span>
              <span className="text-lg sm:text-xl font-bold text-[#E8A317] tabular-nums">
                {formatBdt(lineTotal, lang)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleConfirmAdd}
              className="min-h-[44px] rounded-full bg-[#2E6B34] hover:bg-[#387F3F] px-6 py-2.5 text-sm font-bold text-white shadow-sm active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              {t.addToCart}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
