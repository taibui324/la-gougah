"use client";

import Image from "next/image";
import Link from "next/link";

export default function TechnologySection() {
  return (
    <section id="technology" className="relative py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-100 z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full border-2 border-blue-200 opacity-30" />
        <div className="absolute bottom-40 -right-20 w-80 h-80 rounded-full border-2 border-blue-200 opacity-30" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-medium text-primary mb-6">
              Công Nghệ Sản Xuất
            </h2>
            <p className="text-lg text-primary/80 mb-8">
              La Gougah tự hào áp dụng công nghệ lọc nước tiên tiến nhất từ châu Âu, với hệ thống lọc RO 7 cấp độ và đèn UV diệt khuẩn. Nguồn nước khoáng thiên nhiên được khai thác từ độ sâu 120m, giữ nguyên các khoáng chất có lợi cho sức khỏe như Magie, Canxi và Kali. Quy trình sản xuất khép kín đạt chuẩn ISO 22000 và HACCP đảm bảo chất lượng nước tinh khiết nhất.
            </p>
            <Link
              href="/technology"
              className="inline-block px-8 py-3 bg-blue-800 hover:bg-blue-700 transition-colors rounded-full text-white font-medium"
            >
              Tìm Hiểu
            </Link>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/production-line-1.png"
              alt="Manufacturing Technology"
              fill
              className="object-cover"
            />
          </div>
        </div>


      </div>
    </section>
  );
} 