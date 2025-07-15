'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  showSkeleton?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  threshold?: number;
  rootMargin?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  width,
  height,
  fill = false,
  priority = false,
  quality = 75,
  sizes,
  placeholder = 'empty',
  blurDataURL,
  showSkeleton = true,
  onLoad,
  onError,
  objectFit = 'cover',
  threshold = 0.1,
  rootMargin = '50px'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Si priority=true, charger immédiatement
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Gérer l'événement de chargement
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  // Gérer l'événement d'erreur
  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(false);
    onError?.();
  }, [onError]);

  // Intersection Observer pour le lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold,
        rootMargin
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, threshold, rootMargin]);

  // Générer un placeholder blur par défaut si nécessaire
  const getBlurDataURL = () => {
    if (blurDataURL) return blurDataURL;
    if (placeholder === 'blur') {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmM2Y0ZjYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlNWU3ZWIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+';
    }
    return undefined;
  };

  // Composant skeleton
  const SkeletonLoader = () => (
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
    </div>
  );

  // Composant d'erreur
  const ErrorFallback = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500">
      <div className="text-2xl mb-2">📷</div>
      <div className="text-sm text-center px-2">
        Erreur de chargement
      </div>
    </div>
  );

  // Optimiser les tailles d'image automatiquement
  const getOptimizedSizes = () => {
    if (sizes) return sizes;
    
    // Tailles responsives par défaut
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  };

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Skeleton pendant le chargement */}
      {showSkeleton && !isLoaded && isInView && !hasError && (
        <SkeletonLoader />
      )}

      {/* Placeholder avant que l'image soit en vue */}
      {!isInView && !priority && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-gray-400 text-4xl">📷</div>
        </div>
      )}

      {/* Image principale */}
      {isInView && !hasError && (
        <Image
          src={src}
          alt={alt || 'Image'}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          priority={priority}
          quality={quality}
          sizes={getOptimizedSizes()}
          placeholder={placeholder}
          blurDataURL={getBlurDataURL()}
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } object-${objectFit}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}

      {/* Fallback en cas d'erreur */}
      {hasError && <ErrorFallback />}
    </div>
  );
};

export default LazyImage;