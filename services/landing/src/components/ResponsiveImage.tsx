import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

/**
 * ResponsiveImage Component
 * 
 * Implements AVIF/WebP support with fallback
 * Usage of <picture> element for optimal browser support
 * 
 * Asset naming convention:
 * - image.avif (primary)
 * - image.webp (fallback)
 * - image.jpg (legacy fallback)
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  priority = false,
}) => {
  // Generate source paths based on input
  const basePath = src.replace(/\.(jpg|jpeg|png|webp|avif)$/, '');
  
  const avifSrc = `${basePath}.avif`;
  const webpSrc = `${basePath}.webp`;
  const fallbackSrc = src.endsWith('.avif') || src.endsWith('.webp') 
    ? `${basePath}.jpg` 
    : src;

  return (
    <picture>
      {/* AVIF - Primary format */}
      <source 
        srcSet={avifSrc} 
        type="image/avif" 
      />
      {/* WebP - Fallback */}
      <source 
        srcSet={webpSrc} 
        type="image/webp" 
      />
      {/* Legacy fallback */}
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        decoding={priority ? 'sync' : 'async'}
      />
    </picture>
  );
};

export default ResponsiveImage;
