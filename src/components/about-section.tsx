"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  const features = [
    {
      id: "source",
      title: "Nguồn nước tinh khiết",
      description:
        "Được lấy từ mạch nước ngầm tự nhiên, không chạm tay con người và giữ nguyên hương vị tự nhiên.",
      icon: "💧",
    },
    {
      id: "minerals",
      title: "Giàu khoáng chất",
      description:
        "Chứa các khoáng chất tự nhiên cần thiết cho cơ thể, tạo nên sự cân bằng hoàn hảo.",
      icon: "✨",
    },
    {
      id: "sustainable",
      title: "Phát triển bền vững",
      description:
        "Cam kết với môi trường và cộng đồng thông qua các hoạt động bảo vệ nguồn nước.",
      icon: "🌱",
    },
    {
      id: "quality",
      title: "Chất lượng hàng đầu",
      description:
        "Được kiểm định nghiêm ngặt, đạt tiêu chuẩn quốc tế về nước uống đóng chai cao cấp.",
      icon: "🏆",
    },
  ];

  return (
    <section id="about" className="relative min-h-screen overflow-hidden">
      {/* Background gradient and overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-white z-0" />

      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
        <Image
          src="/images/image-10.png"
          alt="Water Hand Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-20 right-20 w-64 h-64 rounded-full border-2 border-blue-100 opacity-20" />
        <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full border-2 border-blue-100 opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto min-h-screen flex flex-col items-center justify-center px-4">
        {/* Title and Pronunciation */}
        <div className="text-center mb-8">
          <h2 className="text-[#273572] text-6xl md:text-7xl lg:text-8xl font-light mb-4">
            La Gougah
          </h2>
          <p className="text-[#273572] text-xl md:text-2xl font-light tracking-wide">
            (Cách phát âm: la gu-ga)
          </p>
        </div>

        {/* Description Box */}
        <div className="bg-[#273572]/20 backdrop-blur-sm rounded-[32px] max-w-4xl mx-auto p-8 mb-12">
          <p className="text-[#273572] text-center text-lg md:text-xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit
            amet neque eget nisi placerat rutrum. Phasellus vehicula, metus id
            sagittis posuere, enim ipsum pharetra lectus, eu interdum urna magna
            quis dolor.
          </p>
        </div>

        {/* Button */}
        <button className="bg-[#273572] text-white px-12 py-4 rounded-full text-lg font-medium hover:bg-[#273572]/90 transition-colors">
          Nguồn Gốc
        </button>
      </div>
    </section>
  );
}
