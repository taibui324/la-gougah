"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';

export default function StorySection() {
  const contentBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (contentBoxRef.current) {
      observer.observe(contentBoxRef.current);
    }
    
    return () => {
      if (contentBoxRef.current) {
        observer.unobserve(contentBoxRef.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden -mt-1">
        {/* Background Image with Blur */}
        <div className="absolute inset-0">
          <Image
            src="/images/image-10.png"
            alt="Story Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-32 flex items-center justify-center min-h-screen">
          <div 
            ref={contentBoxRef}
            className="max-w-3xl mx-auto text-center text-white bg-blue-900/40 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-2xl transition-all duration-1000 opacity-0 translate-y-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">La Gougah</h2>
            <p className="text-sm md:text-base opacity-80 mb-2">(Cách phát âm: la gu-ga)</p>
            
            <p className="text-lg leading-relaxed my-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet neque eget nisi placerat rutrum. Phasellus vehicula, metus id sagittis posuere, enim ipsum pharetra lectus, eu interdum urna magna quis dolor.
            </p>
            
            <Link 
              href="#about" 
              className="inline-block bg-blue-800 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300 mt-4"
            >
              Nguồn Gốc
            </Link>
          </div>
        </div>
    </section>
  );
}
