"use client";

import Image from "next/image";

export default function TeamSection() {
  return (
    <section id="team" className="relative py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-l from-blue-50 to-blue-100 z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full border-2 border-blue-200 opacity-30" />
        <div className="absolute top-40 -left-20 w-80 h-80 rounded-full border-2 border-blue-200 opacity-30" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl order-2 lg:order-1">
            <Image
              src="/images/image-9.png"
              alt="La Gougah Team"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 text-right">
            <h2 className="text-4xl lg:text-5xl font-medium text-primary mb-6">
              <span className="relative inline-block">
                Đội Ngũ La Gougah
                <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-blue-500"></span>
              </span>
            </h2>
            <p className="text-lg text-primary/80 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit
              amet neque eget nisi placerat rutrum. Mauris ac ex id nulla
              volutpat tincidunt.
            </p>
            <div className="flex justify-end">
              <button
                className="px-8 py-3 bg-blue-800 hover:bg-blue-700 transition-colors rounded-full text-white font-medium"
              >
                Tìm Hiểu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 