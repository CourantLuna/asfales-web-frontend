import React from 'react';
import Image from 'next/image';

export interface AdItem {
  id: string;
  src: string;
  alt: string;
  href: string;
  title?: string;
  width?: number;
  height?: number;
}

interface AdsProps {
  ads: AdItem[];
  direction?: 'row' | 'col' | 'wrap';
  gap?: number;
  containerClassName?: string;
}

export default function Ads({ 
  ads, 
  direction = 'col', 
  gap = 4,
  containerClassName = ''
}: AdsProps) {
  if (!ads || ads.length === 0) {
    return null;
  }

  // Generar clase de gap según la dirección
  const getGapClass = () => {
    const validGap = Math.max(0, Math.min(12, gap));
    switch (direction) {
      case 'row':
        return `space-x-${validGap}`;
      case 'col':
        return `space-y-${validGap}`;
      case 'wrap':
        return `gap-${validGap}`;
      default:
        return `space-y-${validGap}`;
    }
  };

  // Generar clase de dirección
  const getDirectionClass = () => {
    switch (direction) {
      case 'row':
        return 'flex-row';
      case 'col':
        return 'flex-col';
      case 'wrap':
        return 'flex-wrap';
      default:
        return 'flex-col';
    }
  };

  return (
    <div className={`flex ${getDirectionClass()} ${getGapClass()} ${containerClassName}`}>
      {ads.map((ad) => (
        <a
          key={ad.id}
          href={ad.href}
          target="_blank"
          rel="noopener noreferrer"
          title={ad.title}
          className="block overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
        >
          <Image
            src={ad.src}
            alt={ad.alt}
            width={ad.width || 300}
            height={ad.height || 200}
            className="object-cover w-full h-full"
            quality={90}
          />
        </a>
      ))}
    </div>
  );
}