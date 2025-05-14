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
              Nguồn nước La Gougah được xử lý qua hệ thống thẩm thấu ngược – RO hiện đại từ Mỹ. Nước sẽ đi qua các bộ lọc tiên tiến để loại bỏ các tạp chất, virus, vi sinh và kim loại nặng; cuối cùng được tiệt trùng bằng UV và Ozone để đảm bảo nước không bị nhiễm khuẩn và đạt độ an toàn vi sinh.
            </p>
            <p className="text-lg text-primary/80 mb-8">
              Nước sau khi xử lý sẽ được đưa vào dây chuyền đóng chiết rót tự động được nhập khẩu 100% từ Đài Loan. Trước khi đưa vào chiết rót, nước sẽ qua thêm một lớp lọc 1 micromet để loại bỏ lớp cặn có thể phát sinh trong quá trình tồn trữ, đảm bảo độ trong của nước khi đóng chai.
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