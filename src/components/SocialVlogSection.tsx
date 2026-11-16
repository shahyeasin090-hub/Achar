import React from 'react';
import { ExternalLink, Facebook, MessageCircle, Play, Video, Youtube } from 'lucide-react';
import { BRAND_CONFIG, HERO_AND_STORY_IMAGES } from '../data/products';
import { UI_COPY } from '../data/translations';
import { Language } from '../types';
import { BrandBadgeSvg } from './BrandLogo';
import { ResilientImage } from './ResilientImage';

interface SocialVlogSectionProps {
  lang: Language;
}

export const SocialVlogSection: React.FC<SocialVlogSectionProps> = ({ lang }) => {
  const t = UI_COPY[lang].social;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Jk Kakoli Vlog & Social Links Card */}
        <div className="lg:col-span-7 rounded-3xl bg-[#1B2A1E] p-6 sm:p-8 text-white flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs font-bold tracking-wider uppercase text-[#E8A317]">
              {t.kicker}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold leading-snug text-white">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#FFF8EC]/80 max-w-xl">
              {t.subtitle}
            </p>
          </div>

          {/* Vlog Preview Thumbnail Banner */}
          <a
            href={BRAND_CONFIG.youtubeVlogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[16/8] overflow-hidden rounded-2xl bg-[#2E6B34]/40 ring-1 ring-white/15"
          >
            <ResilientImage
              src={HERO_AND_STORY_IMAGES.storyKitchen}
              alt="Jk Kakoli Vlog hill kitchen video"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex items-end justify-between p-4">
              <div>
                <p className="text-xs font-semibold text-[#E8A317]">Jk Kakoli Vlog</p>
                <p className="text-sm sm:text-base font-bold text-white">
                  {lang === 'bn'
                    ? 'পাহাড়ি বাগান থেকে আচারের বয়াম — পুরো গল্প'
                    : 'From Bandarban Hills to Homemade Pickle Jars'}
                </p>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C62828] text-white shadow-lg group-hover:scale-105 transition-transform">
                <Play className="h-5 w-5 fill-current ml-0.5" />
              </span>
            </div>
          </a>

          {/* 4 Social Platforms */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <a
              href={BRAND_CONFIG.youtubeVlogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-white/10 px-3 py-2.5 text-xs font-semibold text-white hover:bg-[#C62828] transition-colors"
            >
              <Youtube className="h-4 w-4" />
              <span>YouTube</span>
            </a>

            <a
              href={BRAND_CONFIG.facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-white/10 px-3 py-2.5 text-xs font-semibold text-white hover:bg-[#1877F2] transition-colors"
            >
              <Facebook className="h-4 w-4" />
              <span>Facebook</span>
            </a>

            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-white/10 px-3 py-2.5 text-xs font-semibold text-white hover:bg-[#25D366] hover:text-[#0E2916] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>

            <a
              href={BRAND_CONFIG.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-white/10 px-3 py-2.5 text-xs font-semibold text-white hover:bg-white hover:text-[#1B2A1E] transition-colors"
            >
              <Video className="h-4 w-4" />
              <span>TikTok</span>
            </a>
          </div>
        </div>

        {/* Facebook Page Embed Placeholder Card */}
        <div className="lg:col-span-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#1B2A1E]/8 flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#1B2A1E]/8">
              <div className="flex items-center gap-3">
                <BrandBadgeSvg size={44} />
                <div>
                  <h3
                    className="text-base font-bold text-[#1B2A1E]"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {t.fbPageTitle}
                  </h3>
                  <p className="text-xs text-[#556358]">
                    {lang === 'bn' ? 'অফিশিয়াল ফেসবুক পেইজ' : 'Official Facebook Page'}
                  </p>
                </div>
              </div>
              <Facebook className="h-5 w-5 text-[#1877F2]" />
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl bg-[#FFF8EC] ring-1 ring-[#1B2A1E]/8">
              <div className="aspect-[16/9] w-full overflow-hidden">
                <ResilientImage
                  src={HERO_AND_STORY_IMAGES.heroMountainRiver}
                  alt="Facebook page cover"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <p className="text-xs sm:text-sm leading-relaxed text-[#556358]">
                  {t.fbPageDesc}
                </p>
                <p className="text-[11px] text-[#556358]/80">
                  {lang === 'bn'
                    ? 'নোট: লাইভ সাইটে এখানে অফিশিয়াল Facebook Page Plugin iframe যুক্ত করা যাবে।'
                    : 'Note: Replaceable with official Facebook Page Plugin embed on production domain.'}
                </p>
              </div>
            </div>
          </div>

          <a
            href={BRAND_CONFIG.facebookPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#1877F2] px-5 py-2.5 text-sm font-bold text-white hover:brightness-95 transition-all"
          >
            <Facebook className="h-4 w-4" />
            <span>{t.fbFollow}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
