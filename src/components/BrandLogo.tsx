import React from 'react';

interface BrandLogoProps {
  variant?: 'header' | 'badge';
  className?: string;
}

export const BrandBadgeSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 44,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="40" cy="40" r="38" fill="#FFF8EC" stroke="#2E6B34" strokeWidth="2.5" />
    <circle cx="40" cy="40" r="34" fill="url(#skyGrad)" />
    {/* Distant misty mountain */}
    <path
      d="M10 47L26 27L38 40L52 24L70 47V58H10V47Z"
      fill="#4D8B55"
      opacity="0.72"
    />
    {/* Foreground lush green hills */}
    <path
      d="M7 51L23 35L39 48L55 33L73 51C71 63 57 74 40 74C23 74 9 63 7 51Z"
      fill="#2E6B34"
    />
    {/* Sun */}
    <circle cx="56" cy="22" r="5" fill="#E8A317" />
    {/* Winding river */}
    <path
      d="M42 46C35 50 47 56 38 61C31 65 27 69 30 73C35 74 43 74 46 73C44 68 51 64 53 59C55 54 45 50 47 46H42Z"
      fill="#8AD4EB"
    />
    {/* Subtle serif ring accent */}
    <circle cx="40" cy="40" r="34" stroke="#E8A317" strokeOpacity="0.45" strokeWidth="1" />
    <defs>
      <linearGradient id="skyGrad" x1="40" y1="6" x2="40" y2="54" gradientUnits="userSpaceOnUse">
        <stop stopColor="#BEE6F7" />
        <stop offset="1" stopColor="#ECF8FB" />
      </linearGradient>
    </defs>
  </svg>
);

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'header', className = '' }) => {
  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-3 rounded-full bg-[#FFF8EC]/95 px-3.5 py-2 shadow-md ring-1 ring-[#2E6B34]/20 backdrop-blur-sm ${className}`}
      >
        <BrandBadgeSvg size={44} className="shrink-0" />
        <div className="leading-tight text-left">
          <span
            className="block text-base sm:text-lg font-bold tracking-tight text-[#1B2A1E]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Pahari Shad
          </span>
          <span className="block text-[11px] font-medium tracking-wide text-[#2E6B34]">
            by Kakoli
          </span>
        </div>
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <BrandBadgeSvg size={34} className="shrink-0" />
      <span
        className="text-base sm:text-lg font-bold tracking-tight text-[#1B2A1E]"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        Pahari Shad <span className="font-normal italic text-[#2E6B34]">by Kakoli</span>
      </span>
    </span>
  );
};
