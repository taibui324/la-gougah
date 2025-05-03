"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background gradient base */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-50/20 to-white"></div>
      
      {/* Background splash with blur effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/splash.png"
          alt="Water Splash Background"
          fill
          className="object-cover mix-blend-soft-light"
          priority
          style={{ 
            filter: 'blur(5px) brightness(110%)', 
            opacity: 0.75
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto min-h-screen flex flex-col items-center justify-between py-32">
        {/* Top Title */}
        <h1 className="text-[#273572] text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[0.25em] leading-normal whitespace-nowrap mt-20">
          NƯỚC UỐNG THIÊN NHIÊN
        </h1>
        
        {/* Centered Water Bottle */}
        <div className="relative flex-1 w-full flex items-center justify-center">
          {/* Bottle */}
          <div className="relative z-10 h-[500px] w-[180px] md:h-[600px] md:w-[200px] lg:h-[700px] lg:w-[220px]">
            <Image
              src="/images/water-bottle.png"
              alt="La Gougah Water Bottle"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Bottom Title */}
        <h2 className="text-[#273572] text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[0.25em] leading-normal whitespace-nowrap mb-20">
          TINH HOA CHẤT VIỆT
        </h2>
      </div>
    </section>
  );
}
