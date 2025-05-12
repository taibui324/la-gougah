"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewsSection() {
  // Sample news data - this could be fetched from an API in a real application
  const newsItems = [
    {
      id: 1,
      slug: "ra-mat-san-pham-moi",
      title: "Ra mắt sản phẩm mới",
      date: "15/04/2025",
      description: "La Gougah vừa ra mắt dòng sản phẩm nước khoáng mới với thiết kế chai thân thiện với môi trường.",
      image: "/images/image-6.png",
    },
    {
      id: 2,
      slug: "chuong-trinh-bao-ve-moi-truong",
      title: "Chương trình bảo vệ môi trường",
      date: "28/03/2025",
      description: "La Gougah khởi động chiến dịch bảo vệ nguồn nước sạch tại các vùng núi cao Việt Nam.",
      image: "/images/image-7.png",
    },
    {
      id: 3,
      slug: "hop-tac-cung-phat-trien",
      title: "Hợp tác cùng phát triển",
      date: "10/03/2025",
      description: "La Gougah ký kết hợp tác với các đối tác chiến lược để mở rộng thị trường trong nước và quốc tế.",
      image: "/images/image-8.png",
    },
  ];

  return (
    <section id="news" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-white z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full border-2 border-blue-200 opacity-30" />
        <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full border-2 border-blue-200 opacity-30" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-light text-center text-[#273572] mb-4">TIN TỨC</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Cập nhật những thông tin mới nhất về La Gougah và các hoạt động của chúng tôi
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Card key={item.id} className="overflow-hidden border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-blue-600">{item.date}</span>
                </div>
                <CardTitle className="text-xl text-[#273572]">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {item.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link href={`/news/${item.slug}`}>
                  <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                    Xem thêm
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/news">
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              Xem tất cả tin tức
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
