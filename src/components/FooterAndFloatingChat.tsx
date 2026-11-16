import React, { useState } from 'react';
import {
  Clock,
  Facebook,
  Gift,
  Home,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Phone,
  ShoppingBag,
  User,
  Video,
  X,
  Youtube,
} from 'lucide-react';
import { BRAND_CONFIG } from '../data/products';
import { UI_COPY, toBengaliDigits } from '../data/translations';
import { Language } from '../types';
import { BrandLogo } from './BrandLogo';

interface FooterAndFloatingChatProps {
  lang: Language;
  cartCount: number;
  activeMobileTab: 'home' | 'menu' | 'cart' | 'offers' | 'profile';
  onMobileTabClick: (tab: 'home' | 'menu' | 'cart' | 'offers' | 'profile') => void;
}

export const FooterAndFloatingChat: React.FC<FooterAndFloatingChatProps> = ({
  lang,
  cartCount,
  activeMobileTab,
  onMobileTabClick,
}) => {
  const f = UI_COPY[lang].footer;
  const nav = UI_COPY[lang].nav;
  const mob = UI_COPY[lang].mobileNav;
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {/* Footer */}
      <footer
        id="contact"
        className="mt-10 border-t border-[#2E6B34]/15 bg-[#1B2A1E] text-[#FFF8EC] pb-24 md:pb-10"
      >
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Brand summary */}
            <div className="md:col-span-5 space-y-3.5">
              <BrandLogo variant="badge" />
              <p className="text-xs sm:text-sm leading-relaxed text-[#FFF8EC]/80 max-w-sm">
                {f.tagline}
              </p>
              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href={BRAND_CONFIG.facebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-[#1877F2] transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={BRAND_CONFIG.youtubeVlogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Jk Kakoli Vlog"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-[#C62828] transition-colors"
                >
                  <Youtube className="h-4 w-4" />
                </a>
                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-[#25D366] hover:text-[#0E2916] transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href={BRAND_CONFIG.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-[#1B2A1E] transition-colors"
                >
                  <Video className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-2.5">
              <h3
                className="text-sm font-bold text-[#E8A317]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {f.quickLinks}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#FFF8EC]/80">
                <li>
                  <a href="#home" className="hover:text-white transition-colors">
                    {nav.home}
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-white transition-colors">
                    {nav.menu}
                  </a>
                </li>
                <li>
                  <a href="#story" className="hover:text-white transition-colors">
                    {nav.story}
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-white transition-colors">
                    {nav.reviews}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Placeholders */}
            <div className="md:col-span-4 space-y-2.5">
              <h3
                className="text-sm font-bold text-[#E8A317]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {f.contactTitle}
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#FFF8EC]/80">
                <li className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-[#E8A317] shrink-0 mt-0.5" />
                  <span className="tabular-nums">{BRAND_CONFIG.displayPhone} (WhatsApp)</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-[#E8A317] shrink-0 mt-0.5" />
                  <span>{f.address}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-[#E8A317] shrink-0 mt-0.5" />
                  <span>{f.hours}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-[#FFF8EC]/60">
            {f.copyright}
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp / Messenger Quick Chat Button */}
      <div className="fixed right-4 bottom-20 md:bottom-6 z-40 flex flex-col items-end gap-2">
        {chatOpen && (
          <div className="w-56 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-[#1B2A1E]/10 space-y-2">
            <p className="text-xs font-bold text-[#1B2A1E]">
              {lang === 'bn' ? 'সরাসরি কথা বলুন' : 'Chat with Kakoli'}
            </p>
            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                lang === 'bn'
                  ? 'আসসালামু আলাইকুম, Pahari Swad by Kakoli থেকে অর্ডার সম্পর্কে জানতে চাই।'
                  : 'Hello! I would like to inquire about an order from Pahari Swad by Kakoli.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[40px] items-center gap-2 rounded-xl bg-[#25D366] px-3 py-2 text-xs font-bold text-[#0E2916]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Chat</span>
            </a>
            <a
              href={BRAND_CONFIG.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[40px] items-center gap-2 rounded-xl bg-[#0084FF] px-3 py-2 text-xs font-bold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Messenger Inbox</span>
            </a>
          </div>
        )}

        <button
          type="button"
          onClick={() => setChatOpen((v) => !v)}
          aria-label="Open quick chat"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-[#0E2916] shadow-lg ring-2 ring-white hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          {chatOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Floating Bottom Navigation Bar (Home, Menu, Cart, Offers, Profile) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-2.5 left-3 right-3 z-40 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl ring-1 ring-[#1B2A1E]/10"
      >
        <div className="grid grid-cols-5 items-center h-14 px-1">
          <button
            type="button"
            onClick={() => onMobileTabClick('home')}
            className={`flex flex-col items-center justify-center min-h-[44px] cursor-pointer ${
              activeMobileTab === 'home' ? 'text-[#2E6B34]' : 'text-[#556358]'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-[10px] font-semibold mt-0.5 whitespace-nowrap">
              {mob.home}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onMobileTabClick('menu')}
            className={`flex flex-col items-center justify-center min-h-[44px] cursor-pointer ${
              activeMobileTab === 'menu' ? 'text-[#2E6B34]' : 'text-[#556358]'
            }`}
          >
            <LayoutGrid className="h-5 w-5" />
            <span className="text-[10px] font-semibold mt-0.5 whitespace-nowrap">
              {mob.menu}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onMobileTabClick('cart')}
            className={`relative flex flex-col items-center justify-center min-h-[44px] cursor-pointer ${
              activeMobileTab === 'cart' ? 'text-[#2E6B34]' : 'text-[#556358]'
            }`}
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#C62828] px-1 text-[9px] font-bold text-white tabular-nums">
                  {lang === 'bn' ? toBengaliDigits(cartCount) : cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold mt-0.5 whitespace-nowrap">
              {mob.cart}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onMobileTabClick('offers')}
            className={`flex flex-col items-center justify-center min-h-[44px] cursor-pointer ${
              activeMobileTab === 'offers' ? 'text-[#2E6B34]' : 'text-[#556358]'
            }`}
          >
            <Gift className="h-5 w-5" />
            <span className="text-[10px] font-semibold mt-0.5 whitespace-nowrap">
              {mob.offers}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onMobileTabClick('profile')}
            className={`flex flex-col items-center justify-center min-h-[44px] cursor-pointer ${
              activeMobileTab === 'profile' ? 'text-[#2E6B34]' : 'text-[#556358]'
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-[10px] font-semibold mt-0.5 whitespace-nowrap">
              {mob.profile}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
