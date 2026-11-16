import React, { useState } from 'react';
import { Mountain } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  loading?: 'eager' | 'lazy';
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
  loading = 'lazy',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F2E9D8] via-[#E8DFC8] to-[#DCE8DA] p-4 text-center text-[#2E6B34] ${className}`}
      >
        <Mountain className="h-8 w-8 opacity-60 mb-1.5" />
        <span className="text-xs font-medium text-[#1B2A1E]/75 line-clamp-2">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};
