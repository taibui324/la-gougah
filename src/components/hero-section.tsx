"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background gradient base */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-50/30 to-white"></div>
      
      {/* Background water splash effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/splash.png"
          alt="Water Splash Background"
          fill
          className="object-cover mix-blend-soft-light"
          priority
          style={{ 
            filter: 'blur(5px) brightness(110%)', 
            opacity: 0.8
          }}
        />
        
        {/* Additional watercolor effect */}
        <div className="absolute inset-0 bg-[#e8f4ff]/40 mix-blend-multiply"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto min-h-screen flex flex-col items-center justify-between px-4 py-16 md:py-24">
        {/* Top Title - Responsive for all screens */}
        <div className="w-full text-center mt-8 md:mt-20">
          <h1 className="text-[#273572] text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[0.1em] xs:tracking-[0.15em] md:tracking-[0.25em] leading-normal">
            NƯỚC UỐNG THIÊN NHIÊN
          </h1>
        </div>
        
        {/* Centered Water Bottle */}
        <div className="relative flex-1 w-full flex items-center justify-center my-4 md:my-8">
          <div className="relative z-10 h-[380px] w-[150px] sm:h-[450px] sm:w-[170px] md:h-[550px] md:w-[180px] lg:h-[650px] lg:w-[200px]">
            <Image
              src="/images/water-bottle.png"
              alt="La Gougah Water Bottle"
              fill
              className="object-contain"
              priority
            
            />
          </div>
          
          {/* Subtle highlight effect behind bottle */}
          <div className="absolute inset-0 bg-blue-100/30 blur-3xl rounded-full w-2/3 h-2/3 mx-auto my-auto"></div>
        </div>

        {/* Bottom Title - Responsive for all screens */}
        <div className="w-full text-center mb-8 md:mb-20">
          <h2 className="text-[#273572] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[0.15em] md:tracking-[0.25em] leading-normal">
            TINH HOA CHẤT VIỆT
          </h2>
        </div>
      </div>
    </section>
  );
}
