"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

type PageType = "homepage" | "technology" | "story" | "news" | "general";

interface HeroBannerProps {
  pageType: PageType;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackImage?: string;
  className?: string;
  layout?: "default" | "homepage";
}

export function HeroBanner({
  pageType,
  fallbackTitle = "Welcome to La Gougah",
  fallbackDescription = "Discover amazing experiences and stories",
  fallbackImage = "/images/hero-fallback.jpg",
  className = "",
  layout = "default",
}: HeroBannerProps) {
  const heroBanner = useQuery(api.banners.getHeroBannerByPage, { pageType });

  // Use banner data if available, otherwise fallback
  const title = heroBanner?.title || fallbackTitle;
  const description = heroBanner?.description || fallbackDescription;
  const image =
    heroBanner?.image ||
    (heroBanner?.imageStorageId
      ? `/api/storage/${heroBanner.imageStorageId}`
      : fallbackImage);
  const link = heroBanner?.link;
  const linkText = heroBanner?.linkText || "Learn More";

  // Special layout for homepage to match original design
  if (layout === "homepage" || pageType === "homepage") {
    return (
      <section className={`relative min-h-screen overflow-hidden ${className}`}>
        {/* Background gradient base */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-50/30 to-white"></div>

        {/* Background image with blend effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt="Background"
            fill
            className="object-cover mix-blend-soft-light"
            priority
            style={{
              filter: "blur(5px) brightness(110%)",
              opacity: 0.8,
            }}
          />
          <div className="absolute inset-0 bg-[#e8f4ff]/40 mix-blend-multiply"></div>
        </div>

        {/* Content container */}
        <div className="relative z-10 container mx-auto min-h-screen flex flex-col items-center justify-between px-4 py-16 md:py-24">
          {/* Top Title */}
          <div className="w-full text-center mt-8 md:mt-20">
            <h1 className="text-[#273572] text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[0.1em] xs:tracking-[0.15em] md:tracking-[0.25em] leading-normal">
              {title}
            </h1>
          </div>

          {/* Centered Water Bottle (if no custom content) */}
          {!heroBanner && (
            <div className="relative flex-1 w-full flex items-center justify-center my-4 md:my-8">
              <div className="relative z-10 h-[380px] w-[150px] sm:h-[450px] sm:w-[170px] md:h-[550px] md:w-[180px] lg:h-[650px] lg:w-[200px]">
                <Image
                  src="/images/LGG_Bottle.png"
                  alt="La Gougah Water Bottle"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-blue-100/30 blur-3xl rounded-full w-2/3 h-2/3 mx-auto my-auto"></div>
            </div>
          )}

          {/* Custom content from CMS banner */}
          {heroBanner && (
            <div className="relative flex-1 w-full flex items-center justify-center my-4 md:my-8">
              <div className="text-center text-[#273572] max-w-4xl">
                {description && (
                  <p className="text-xl md:text-2xl mb-8 opacity-80">
                    {description}
                  </p>
                )}
                {link && (
                  <Button
                    size="lg"
                    className="bg-[#396CB1] hover:bg-[#273572] text-white transition-colors duration-300"
                    onClick={() => window.open(link, "_blank")}
                  >
                    {linkText}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Bottom Title */}
          <div className="w-full text-center mb-8 md:mb-20">
            <h2 className="text-[#273572] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[0.15em] md:tracking-[0.25em] leading-normal">
              {description || "TINH HOA CHẤT VIỆT"}
            </h2>
          </div>
        </div>
      </section>
    );
  }

  // Standard layout for other pages
  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src={image} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {title}
        </h1>

        {description && (
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            {description}
          </p>
        )}

        {link && (
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-100 transition-colors duration-300"
            onClick={() => window.open(link, "_blank")}
          >
            {linkText}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </section>
  );
}

export default HeroBanner;
