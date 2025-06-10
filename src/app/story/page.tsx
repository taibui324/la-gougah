"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import { HeroBanner } from "@/components/ui/hero-banner";

export default function StoryPage() {
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
      <HeroBanner
        pageType="story"
        fallbackTitle="Câu Chuyện"
        fallbackDescription="Hành trình của thương hiệu La Gougah"
        fallbackImage="/images/image-10.png"
        className="h-[60vh]"
      />

      {/* Story Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div
            ref={contentRef}
            className="max-w-4xl mx-auto transition-all duration-1000 opacity-0 translate-y-10"
          >
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold text-[#273572] mb-6">
                La Gougah
              </h2>
              <div className="w-24 h-1 bg-[#396CB1] mx-auto"></div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
              <p>
                Từ cao nguyên Lâm Đồng, có một dòng chảy ẩn mình dưới những lớp
                đá cổ từ kỷ Creta muộn. Trải qua hàng triệu năm, dòng nước ấy
                vẫn giữ lại trong mình hàm lượng cao các khoáng chất quý giá,
                cần thiết cho sức khoẻ.
              </p>

              <figure className="my-12">
                <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/image-5.png"
                    alt="La Gougah Water Source"
                    fill
                    className="object-cover"
                  />
                </div>
              </figure>

              <p>
                Khai thác ở độ sâu hơn 250m, La Gougah áp dụng công nghệ hiện
                đại, thân thiện với môi trường để xử lý nguồn nước, không dùng
                các hoá chất độc hại, sử dụng các lớp lọc tự nhiên, và khử trùng
                bằng tia UV để đảm bảo sự tinh khiết của vị nước nhưng vẫn giữ
                được các khoáng chất tự nhiên có lợi cho cơ thể.
              </p>

              <p>
                La Gougah ra đời với sứ mệnh mang nguồn nước nguyên bản và thanh
                khiết nhất cho cuộc sống hiện đại. Mỗi giọt nước là kết tinh của
                thiên nhiên, là tâm huyết và cam kết đồng hành cùng sức khoẻ và
                sự hạnh phúc của người tiêu dùng. Một cuộc sống sạch, khỏe mạnh
                và năng động luôn là ưu tiên hàng đầu trong hành trình phát
                triển của thương hiệu.
              </p>

              <div className="text-center my-12">
                <blockquote className="italic text-2xl font-light text-[#396CB1]">
                  "La Gougah - Tinh hoa chất Việt"
                </blockquote>
              </div>
            </div>

            {/* Feature Boxes (similar to Voss sustainability sections) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              <div className="bg-[#f8f8f8] p-8 rounded-xl">
                <h3 className="text-xl font-bold text-[#273572] mb-4">
                  Nguồn Nước Quý Giá
                </h3>
                <p className="text-gray-700">
                  Nguồn nước từ độ sâu hơn 250m, giàu khoáng chất tự nhiên có
                  lợi cho sức khỏe.
                </p>
              </div>

              <div className="bg-[#f8f8f8] p-8 rounded-xl">
                <h3 className="text-xl font-bold text-[#273572] mb-4">
                  Công Nghệ Hiện Đại
                </h3>
                <p className="text-gray-700">
                  Áp dụng công nghệ hiện đại, thân thiện với môi trường, không
                  sử dụng hóa chất độc hại.
                </p>
              </div>

              <div className="bg-[#f8f8f8] p-8 rounded-xl">
                <h3 className="text-xl font-bold text-[#273572] mb-4">
                  Cam Kết Chất Lượng
                </h3>
                <p className="text-gray-700">
                  Cam kết mang đến sản phẩm nước uống tinh khiết và an toàn cho
                  sức khỏe người tiêu dùng.
                </p>
              </div>
            </div>

            {/* Back to Home Link */}
            <div className="mt-16 text-center">
              <Link
                href="/"
                className="inline-block bg-[#396CB1] hover:bg-[#273572] text-white font-medium py-3 px-8 rounded-full transition-colors duration-300"
              >
                Quay Lại Trang Chủ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
