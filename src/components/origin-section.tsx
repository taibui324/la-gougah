"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';

export default function OriginSection() {
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
    <section id="origin" className="relative min-h-screen w-full overflow-hidden -mt-1">
        {/* Background Image with Blur */}
        <div className="absolute inset-0">
          <Image
            src="/images/image-10.png"
            alt="Origin Background"
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
            Từ mạch nước ngầm tích tụ từ kỷ Creata muộn (cuối kỷ Phấn Trắng) trải qua hàng triệu năm trên cao nguyên Lâm Đồng. Nguồn nước của La Gougah được khai thác ở độ sâu hơn 250m của nguồn nước này, qua hệ thống xử lý nước hiện đại RO của Mỹ và hệ thống chiết rót tự động được nhập khẩu 100% từ Đài Loan, để trao đến người tiêu dùng sản phẩm nước uống đóng chai thanh khiết, an toàn và đảm bảo các thành phần tốt cho sức khoẻ. 
            </p>
            
            <Link 
              href="/story" 
              className="inline-block bg-blue-800 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300 mt-4"
            >
              Nguồn Gốc
            </Link>
          </div>
        </div>
    </section>
  );
}
