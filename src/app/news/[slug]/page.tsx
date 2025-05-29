"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { getNewsBySlug, newsItems } from "@/lib/news-data";

export default function NewsDetailPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const slug = params.slug as string;

  // Find the current news item
  const newsItem = getNewsBySlug(slug);

  // If news item not found, show a 404 page
  if (!newsItem) {
    notFound();
  }

  // Get related news (other news items excluding current one)
  const relatedNews = newsItems
    .filter((item) => item.slug !== slug)
    .slice(0, 2);

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

      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={newsItem.image}
            alt={newsItem.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center text-white">
            <span className="text-sm md:text-base text-blue-200 mb-4 block">
              {newsItem.date}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {newsItem.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              {newsItem.description}
            </p>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div
            ref={contentRef}
            className="max-w-4xl mx-auto transition-all duration-1000 opacity-0 translate-y-10"
          >
            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div
                className="text-gray-700 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: newsItem.content }}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t border-gray-200">
              <Link href="/news">
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  ← Quay lại tin tức
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  Về trang chủ
                </Button>
              </Link>
            </div>

            {/* Related News */}
            {relatedNews.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-[#273572] mb-8">
                  Tin tức liên quan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedNews.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-48 w-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <span className="text-sm text-blue-600 mb-2 block">
                          {item.date}
                        </span>
                        <h4 className="text-xl font-bold text-[#273572] mb-3">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <Link href={`/news/${item.slug}`}>
                          <Button
                            variant="outline"
                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                          >
                            Đọc thêm
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
