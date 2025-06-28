"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

type PageType = "homepage" | "technology" | "story";

interface BannerSliderProps {
  pageType: PageType;
  fallbackImage?: string;
  className?: string;
  autoSlideInterval?: number; // in milliseconds
  showControls?: boolean;
}

export function BannerSlider({
  pageType,
  fallbackImage = "/images/splash.png",
  className = "h-[600px]",
  autoSlideInterval = 5000, // 5 seconds default
  showControls = true,
}: BannerSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [isHovering, setIsHovering] = useState(false);
  
  // Get all active slider banners for the specified page
  const sliderBanners = useQuery(api.banners.getActiveSlidersByGroup, {
    pageType,
  });

  // Debug information
  useEffect(() => {
    if (sliderBanners) {
      const info = `Found ${sliderBanners.length} slider banners for ${pageType}`;
      console.log(info);
      setDebugInfo(info);
      
      // Log details of each banner
      sliderBanners.forEach((banner, index) => {
        console.log(`Banner ${index + 1}:`, {
          id: banner._id,
          title: banner.title,
          hasImage: !!banner.image,
          hasStorageId: !!banner.imageStorageId,
          imageStorageId: banner.imageStorageId,
          isActive: banner.isActive,
          isSlider: banner.isSlider,
          order: banner.order,
        });
      });
    } else {
      console.log(`Loading slider banners for ${pageType}...`);
      setDebugInfo(`Loading slider banners for ${pageType}...`);
    }
  }, [sliderBanners, pageType]);

  // Reset current index when banners change or when we reach the end
  useEffect(() => {
    if (sliderBanners && sliderBanners.length > 0) {
      setCurrentIndex(prev => (prev >= sliderBanners.length ? 0 : prev));
    }
  }, [sliderBanners]);

  // Auto-slide functionality
  useEffect(() => {
    if (!sliderBanners || sliderBanners.length <= 1 || isHovering) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % sliderBanners.length);
    }, autoSlideInterval);
    
    return () => clearInterval(interval);
  }, [sliderBanners, autoSlideInterval, isHovering]);

  const goToNext = useCallback(() => {
    if (!sliderBanners || sliderBanners.length === 0) return;
    setCurrentIndex(prev => (prev + 1) % sliderBanners.length);
  }, [sliderBanners]);

  const goToPrevious = useCallback(() => {
    if (!sliderBanners || sliderBanners.length === 0) return;
    setCurrentIndex(prev => (prev - 1 + sliderBanners.length) % sliderBanners.length);
  }, [sliderBanners]);

  // Handle image error
  const handleImageError = (bannerId: string) => {
    console.error(`Error loading banner image for ID: ${bannerId}`);
    setImageErrors(prev => ({ ...prev, [bannerId]: true }));
  };

  // If no banners or loading, show fallback
  if (!sliderBanners || sliderBanners.length === 0) {
    return (
      <div className={`relative w-full ${className} bg-blue-50`}>
        <img
          src={fallbackImage}
          alt="Fallback banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        {process.env.NODE_ENV !== 'production' && (
          <div className="absolute bottom-4 right-4 bg-black/70 text-white p-2 text-xs rounded">
            {debugInfo || `No slider banners found for ${pageType}`}
          </div>
        )}
      </div>
    );
  }

  // Sort banners by order if available
  const sortedBanners = [...sliderBanners].sort((a, b) => {
    // If both have order, sort by order
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    // If only one has order, prioritize the one with order
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    // If neither has order, keep original order
    return 0;
  });

  const currentBanner = sortedBanners[currentIndex];
  
  // Determine image source, handling errors
  let imageSource = fallbackImage;
  if (currentBanner?.imageStorageId && !imageErrors[currentBanner._id]) {
    imageSource = `/api/storage/${currentBanner.imageStorageId}`;
    console.log(`Using storage image: ${imageSource} for banner ${currentBanner.title}`);
  } else if (currentBanner?.image) {
    imageSource = currentBanner.image;
    console.log(`Using direct image URL: ${imageSource} for banner ${currentBanner.title}`);
  } else {
    console.log(`Using fallback image: ${fallbackImage} for banner ${currentBanner?.title || 'unknown'}`);
  }

  return (
    <div 
      className={`relative w-full ${className} overflow-hidden bg-blue-50`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Banner Image */}
      <img
        src={imageSource}
        alt={currentBanner?.title || "Banner"}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        onError={() => currentBanner && handleImageError(currentBanner._id)}
        key={currentBanner?.imageStorageId || currentBanner?.image || 'fallback'}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Navigation Controls */}
      {showControls && sortedBanners.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-30"
            aria-label="Previous banner"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-30"
            aria-label="Next banner"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
        </>
      )}

      {/* Pagination Indicators */}
      {sortedBanners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {sortedBanners.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-white w-6" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Link handling */}
      {currentBanner?.link && (
        <a
          href={currentBanner.link}
          className="absolute inset-0 z-20 cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Banner link: ${currentBanner.title || "Banner"}`}
        />
      )}

      {/* Debug info in development */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="absolute bottom-4 right-4 bg-black/70 text-white p-2 text-xs rounded z-40">
          Banner {currentIndex + 1}/{sortedBanners.length}: {currentBanner?.title || 'Untitled'}
          {currentBanner?.imageStorageId ? ` (StorageID: ${currentBanner.imageStorageId.substring(0, 8)}...)` : ''}
          <br />
          {imageErrors[currentBanner?._id] ? "⚠️ Image Error" : "✅ Image OK"}
        </div>
      )}
    </div>
  );
}

export default BannerSlider; 