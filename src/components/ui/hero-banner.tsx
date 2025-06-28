"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { BannerSlider } from "./banner-slider";

type PageType = "homepage" | "technology" | "story";

interface HeroBannerProps {
  pageType: PageType;
  fallbackImage?: string;
  className?: string;
  layout?: "homepage" | "standard";
}

export function HeroBanner({
  pageType,
  fallbackImage = "/images/splash.png",
  className = "h-[600px]",
  layout = "standard",
}: HeroBannerProps) {
  const [imageError, setImageError] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");
  
  // Get hero banner for the specified page
  const heroBanner = useQuery(api.banners.getHeroBannerByPage, {
    pageType,
  });

  // Check if there are slider banners for this page
  const sliderBanners = useQuery(api.banners.getActiveSlidersByGroup, {
    pageType,
  });

  // Debug information
  useEffect(() => {
    if (heroBanner) {
      const info = `Hero banner found for ${pageType}: ${heroBanner.title || "Untitled"}`;
      console.log(info);
      console.log("Hero banner details:", {
        id: heroBanner._id,
        title: heroBanner.title,
        hasImage: !!heroBanner.image,
        hasStorageId: !!heroBanner.imageStorageId,
        imageStorageId: heroBanner.imageStorageId,
        isActive: heroBanner.isActive,
        position: heroBanner.position,
      });
      setDebugInfo(info);
    } else {
      console.log(`Loading hero banner for ${pageType}...`);
      setDebugInfo(`Loading hero banner for ${pageType}...`);
    }

    if (sliderBanners) {
      console.log(`Found ${sliderBanners.length} slider banners for ${pageType}`);
    }
  }, [heroBanner, sliderBanners, pageType]);

  // If there are slider banners, use the BannerSlider component
  if (sliderBanners && sliderBanners.length > 0) {
    console.log(`Using slider for ${pageType} with ${sliderBanners.length} banners`);
    return (
      <BannerSlider
        pageType={pageType}
        fallbackImage={fallbackImage}
        className={className}
        showControls={true}
        autoSlideInterval={5000}
      />
    );
  }

  // Only use image from banner data, no text
  let image = fallbackImage;
  if (heroBanner?.imageStorageId && !imageError) {
    image = `/api/storage/${heroBanner.imageStorageId}`;
    console.log(`Using storage image: ${image}`);
  } else if (heroBanner?.image) {
    image = heroBanner.image;
    console.log(`Using direct image URL: ${image}`);
  } else {
    console.log(`Using fallback image: ${fallbackImage}`);
  }

  // Handle image error
  const handleImageError = () => {
    console.error("Error loading banner image from storage");
    setImageError(true);
  };

  return (
    <div
      className={`relative w-full ${className} flex items-center justify-center overflow-hidden bg-blue-50`}
    >
      {/* Background Image */}
      <img
        src={image}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover"
        onError={handleImageError}
        key={heroBanner?.imageStorageId || heroBanner?.image || 'fallback'}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Link handling */}
      {heroBanner?.link && (
        <a
          href={heroBanner.link}
          className="absolute inset-0 z-20 cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Banner link"
        />
      )}

      {/* Debug info in development */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="absolute bottom-4 right-4 bg-black/70 text-white p-2 text-xs rounded z-40">
          {heroBanner ? 
            `Hero banner: ${heroBanner.title}${heroBanner.imageStorageId ? ` (StorageID: ${heroBanner.imageStorageId.substring(0, 8)}...)` : ''}` : 
            `No hero banner found for ${pageType}`
          }
          <br />
          {imageError ? "⚠️ Image Error" : "✅ Image OK"}
        </div>
      )}
    </div>
  );
}

export default HeroBanner;
