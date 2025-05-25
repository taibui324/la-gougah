"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { newsItems } from "@/lib/news-data";

export default function NewsPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 },
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <>
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/image-8.png"
            alt="La Gougah News"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            Tin Tức
          </h1>
        </div>
      </section>

      {/* News Listing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div
            ref={contentRef}
            className="max-w-6xl mx-auto transition-all duration-1000 opacity-0 translate-y-10"
          >
            <div className="grid grid-cols-1 gap-10 mt-8">
              {newsItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row gap-8 border-b border-gray-200 pb-10"
                >
                  <div className="md:w-1/3">
                    <div className="relative h-60 w-full rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <span className="text-sm text-blue-600 mb-2 block">
                      {item.date}
                    </span>
                    <h2 className="text-2xl font-bold text-[#273572] mb-3">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <Link href={`/news/${item.slug}`}>
                      <Button className="bg-[#396CB1] hover:bg-[#273572] text-white">
                        Đọc tiếp
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Back to Home Link */}
            <div className="mt-16 text-center">
              <Link href="/">
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  Quay Lại Trang Chủ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
