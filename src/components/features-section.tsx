"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Droplets, Leaf, Shield, Award } from "lucide-react";

const features = [
  {
    id: 1,
    icon: <Droplets className="w-12 h-12 text-primary" />,
    title: "Nguồn nước tinh khiết",
    description:
      "Được khai thác từ nguồn nước ngầm tự nhiên, đảm bảo độ tinh khiết cao nhất.",
  },
  {
    id: 2,
    icon: <Leaf className="w-12 h-12 text-primary" />,
    title: "100% Tự nhiên",
    description:
      "Không chất bảo quản, không chất phụ gia, giữ nguyên vẹn hương vị tự nhiên.",
  },
  {
    id: 3,
    icon: <Shield className="w-12 h-12 text-primary" />,
    title: "An toàn & Chất lượng",
    description:
      "Đạt tiêu chuẩn an toàn thực phẩm quốc tế, quy trình sản xuất nghiêm ngặt.",
  },
  {
    id: 4,
    icon: <Award className="w-12 h-12 text-primary" />,
    title: "Thương hiệu uy tín",
    description:
      "Được tin dùng bởi hàng triệu khách hàng, khẳng định vị thế trên thị trường.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-primary mb-4">
            La Gougah
          </h2>
          <p className="text-lg text-primary/80 italic mb-8">
            (Cách phát âm: la gu-ga)
          </p>
          <p className="text-xl text-primary max-w-3xl mx-auto">
            Từ những giọt nước tinh khiết nhất của Việt Nam, chúng tôi mang đến
            trải nghiệm nước uống tuyệt vời.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="bg-card/50 backdrop-blur border-none shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-primary/80 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 