import React from 'react';
import { Clock, MessageCircle, PackageCheck, X } from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND_CONFIG } from '../data/products';
import { UI_COPY, formatBdt } from '../data/translations';
import { Language, OrderRecord } from '../types';

interface ProfileOrdersSheetProps {
  isOpen: boolean;
  lang: Language;
  orders: OrderRecord[];
  onClose: () => void;
  onToggleLang: (lang: Language) => void;
}

export const ProfileOrdersSheet: React.FC<ProfileOrdersSheetProps> = ({
  isOpen,
  lang,
  orders,
  onClose,
  onToggleLang,
}) => {
  if (!isOpen) return null;
  const t = UI_COPY[lang].profile;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-sheet-title"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-[#FFF8EC] p-5 shadow-2xl max-h-[85vh] overflow-y-auto space-y-5"
      >
        <div className="flex items-center justify-between">
          <h2
            id="profile-sheet-title"
            className="text-lg font-bold text-[#1B2A1E]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {t.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1B2A1E] ring-1 ring-[#1B2A1E]/10 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Language Quick Switch */}
        <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 ring-1 ring-[#1B2A1E]/8">
          <span className="text-xs font-semibold text-[#556358]">
            {lang === 'bn' ? 'ভাষা নির্বাচন করুন' : 'Preferred Language'}
          </span>
          <div className="inline-flex rounded-full bg-[#F2E9D8] p-0.5">
            <button
              type="button"
              onClick={() => onToggleLang('bn')}
              className={`px-3 py-1 text-xs font-bold rounded-full cursor-pointer ${
                lang === 'bn' ? 'bg-[#2E6B34] text-white' : 'text-[#1B2A1E]'
              }`}
            >
              বাংলা
            </button>
            <button
              type="button"
              onClick={() => onToggleLang('en')}
              className={`px-3 py-1 text-xs font-bold rounded-full cursor-pointer ${
                lang === 'en' ? 'bg-[#2E6B34] text-white' : 'text-[#1B2A1E]'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Order History */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#556358]">
            {t.savedOrdersTitle}
          </h3>
          {orders.length === 0 ? (
            <div className="rounded-2xl bg-white p-5 text-center ring-1 ring-[#1B2A1E]/8">
              <Clock className="mx-auto h-6 w-6 text-[#556358]/60 mb-1.5" />
              <p className="text-xs text-[#556358]">{t.noOrders}</p>
            </div>
          ) : (
            <ul className="space-y-2.5">
              {orders.map((ord) => (
                <li
                  key={ord.id}
                  className="rounded-2xl bg-white p-3.5 ring-1 ring-[#1B2A1E]/8 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="inline-flex items-center gap-1.5 text-[#2E6B34] tabular-nums">
                      <PackageCheck className="h-4 w-4" />
                      #{ord.id}
                    </span>
                    <span className="text-[#1B2A1E] tabular-nums">
                      {formatBdt(ord.total, lang)}
                    </span>
                  </div>
                  <p className="text-xs text-[#556358]">
                    {ord.items
                      .map((i) => `${lang === 'bn' ? i.nameBn : i.nameEn} ×${i.quantity}`)
                      .join(', ')}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Direct Help */}
        <div className="rounded-2xl bg-[#2E6B34] p-4 text-white space-y-3">
          <div>
            <h3 className="text-sm font-bold">{t.helpTitle}</h3>
            <p className="text-xs text-[#FFF8EC]/85 mt-0.5">{t.helpDesc}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[40px] items-center justify-center gap-1.5 rounded-full bg-[#25D366] text-[#0E2916] text-xs font-bold"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href={BRAND_CONFIG.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[40px] items-center justify-center gap-1.5 rounded-full bg-white text-[#1B2A1E] text-xs font-bold"
            >
              <MessageCircle className="h-4 w-4 text-[#0084FF]" />
              <span>Messenger</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
