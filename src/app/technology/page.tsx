"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/scroll-to-top';

export default function TechnologyPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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
    
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    
    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }
    
    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  return (
    <>
      <Header />
      
      {/* Hero Banner */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/image-3.png"
            alt="La Gougah Technology"
            fill
            sizes="100vw"
            quality={80}
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMD/B7DwAEBAJDOiDPjgAAAABJRU5ErkJggg=="
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center">Công Nghệ</h1>
        </div>
      </section>
      
      {/* Technology Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div 
            ref={contentRef}
            className="max-w-4xl mx-auto transition-all duration-1000 opacity-0 translate-y-10"
          >
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold text-[#273572] mb-6">Dây Chuyền Sản Xuất Hiện Đại</h2>
              <div className="w-24 h-1 bg-[#396CB1] mx-auto"></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
              <p>
                Tại La Gougah, chúng tôi đặt niềm tin vào việc kết hợp giữa công nghệ hiện đại và sự tinh khiết của thiên nhiên. Dây chuyền sản xuất của chúng tôi được thiết kế và lắp đặt bởi các chuyên gia hàng đầu trong ngành công nghiệp nước đóng chai, đảm bảo mỗi giọt nước đến tay người tiêu dùng đều giữ nguyên vẹn chất lượng và độ tinh khiết tự nhiên.
              </p>
              
              <figure className="my-12">
                <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/production-line-1.png"
                    alt="La Gougah Production Line"
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    quality={80}
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <figcaption className="text-center text-gray-500 mt-4">Dây chuyền sản xuất hiện đại của La Gougah</figcaption>
              </figure>
              
              <p>
                Nhà máy sản xuất của La Gougah tọa lạc tại vị trí lý tưởng gần với nguồn nước tự nhiên tại cao nguyên Lâm Đồng, giúp giảm thiểu thời gian và quãng đường vận chuyển, đồng thời bảo toàn tối đa chất lượng nước nguyên bản. Với diện tích hơn 10,000m², nhà máy được trang bị hệ thống máy móc hiện đại, tự động hóa cao, đáp ứng tiêu chuẩn quốc tế về an toàn thực phẩm.
              </p>
              
              <p>
                Nguồn nước La Gougah được xử lý qua hệ thống thẩm thấu ngược – RO hiện đại từ Mỹ. Nước sẽ đi qua các bộ lọc tiên tiến để loại bỏ các tạp chất, virus, vi sinh và kim loại nặng; cuối cùng được tiệt trùng bằng UV và Ozone để đảm bảo nước không bị nhiễm khuẩn và đạt độ an toàn vi sinh.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                <div>
                  <div className="relative h-[250px] w-full rounded-xl overflow-hidden">
                    <Image
                      src="/images/production-line-2.png"
                      alt="La Gougah Bottling Process"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      quality={75}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-center text-gray-500 mt-2">Quy trình đóng chai tự động</p>
                </div>
                <div>
                  <div className="relative h-[250px] w-full rounded-xl overflow-hidden">
                    <Image
                      src="/images/production-line-3.png"
                      alt="La Gougah Quality Control"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      quality={75}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-center text-gray-500 mt-2">Kiểm soát chất lượng</p>
                </div>
              </div>
              
              <p>
                Công đoạn đóng chai được thực hiện trong phòng sạch vô trùng, với hệ thống máy đóng chai tự động hiện đại, có công suất lên đến 24,000 chai mỗi giờ. Mỗi chai nước trước khi được đóng đều trải qua quy trình rửa và khử trùng nghiêm ngặt, đảm bảo không có bất kỳ tạp chất nào ảnh hưởng đến chất lượng sản phẩm.
              </p>
              
              <p>
                Nước sau khi xử lý sẽ được đưa vào dây chuyền đóng chiết rót tự động được nhập khẩu 100% từ Đài Loan. Trước khi đưa vào chiết rót, nước sẽ qua thêm một lớp lọc 1 micromet để loại bỏ lớp cặn có thể phát sinh trong quá trình tồn trữ, đảm bảo độ trong của nước khi đóng chai.
              </p>
              
              <p>
                La Gougah tự hào áp dụng các tiêu chuẩn quốc tế trong quản lý chất lượng, bao gồm ISO 9001:2015 về hệ thống quản lý chất lượng, ISO 22000:2018 về an toàn thực phẩm, và HACCP (Hệ thống phân tích mối nguy và điểm kiểm soát tới hạn). Mỗi lô sản phẩm đều được kiểm tra nghiêm ngặt ở phòng thí nghiệm nội bộ và định kỳ gửi mẫu đến các trung tâm kiểm nghiệm độc lập để đảm bảo sản phẩm luôn đạt tiêu chuẩn chất lượng cao nhất.
              </p>
            </div>
            
            {/* Production Process Timeline */}
            <div 
              ref={timelineRef}
              className="mt-20 transition-all duration-1000 delay-300 opacity-0 translate-y-10"
            >
              <h3 className="text-2xl font-bold text-[#273572] mb-12 text-center">Quy Trình Sản Xuất</h3>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#396CB1]/20"></div>
                
                {/* Timeline items */}
                <div className="space-y-20">
                  {/* 1. Khai thác */}
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-[#396CB1] z-10 shadow-md"></div>
                    <div className="grid grid-cols-12">
                      <div className="col-span-5 text-right pr-10">
                        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100 inline-block min-h-[100px]">
                          <h4 className="text-lg font-bold text-[#273572] mb-2">Khai thác</h4>
                          <p className="text-gray-700">Nước được khai thác từ độ sâu hơn 250m dưới lòng đất.</p>
                        </div>
                      </div>
                      <div className="col-span-2"></div>
                      <div className="col-span-5"></div>
                    </div>
                  </div>
                  
                  {/* 2. Lọc tự nhiên */}
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-[#396CB1] z-10 shadow-md"></div>
                    <div className="grid grid-cols-12">
                      <div className="col-span-5"></div>
                      <div className="col-span-2"></div>
                      <div className="col-span-5 pl-10">
                        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100 inline-block min-h-[100px]">
                          <h4 className="text-lg font-bold text-[#273572] mb-2">Hệ thống RO</h4>
                          <p className="text-gray-700">Nước được xử lý qua hệ thống thẩm thấu ngược (RO) hiện đại từ Mỹ, loại bỏ tạp chất, virus, và kim loại nặng.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 3. Khử trùng UV */}
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-[#396CB1] z-10 shadow-md"></div>
                    <div className="grid grid-cols-12">
                      <div className="col-span-5 text-right pr-10">
                        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100 inline-block min-h-[100px]">
                          <h4 className="text-lg font-bold text-[#273572] mb-2">Tiệt trùng UV và Ozone</h4>
                          <p className="text-gray-700">Nước được tiệt trùng bằng UV và Ozone để đảm bảo không bị nhiễm khuẩn và đạt độ an toàn vi sinh.</p>
                        </div>
                      </div>
                      <div className="col-span-2"></div>
                      <div className="col-span-5"></div>
                    </div>
                  </div>
                  
                  {/* 4. Đóng chai */}
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-[#396CB1] z-10 shadow-md"></div>
                    <div className="grid grid-cols-12">
                      <div className="col-span-5"></div>
                      <div className="col-span-2"></div>
                      <div className="col-span-5 pl-10">
                        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100 inline-block min-h-[100px]">
                          <h4 className="text-lg font-bold text-[#273572] mb-2">Lọc vi mét và Chiết rót</h4>
                          <p className="text-gray-700">Nước qua lớp lọc 1 micromet để loại bỏ cặn và đưa vào dây chuyền chiết rót tự động từ Đài Loan.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 5. Kiểm tra chất lượng */}
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-[#396CB1] z-10 shadow-md"></div>
                    <div className="grid grid-cols-12">
                      <div className="col-span-5 text-right pr-10">
                        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100 inline-block min-h-[100px]">
                          <h4 className="text-lg font-bold text-[#273572] mb-2">Kiểm tra chất lượng</h4>
                          <p className="text-gray-700">Mỗi lô sản phẩm đều được kiểm tra nghiêm ngặt về lý hóa và vi sinh trước khi xuất xưởng.</p>
                        </div>
                      </div>
                      <div className="col-span-2"></div>
                      <div className="col-span-5"></div>
                    </div>
                  </div>
                  
                  {/* 6. Phân phối */}
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-[#396CB1] z-10 shadow-md"></div>
                    <div className="grid grid-cols-12">
                      <div className="col-span-5"></div>
                      <div className="col-span-2"></div>
                      <div className="col-span-5 pl-10">
                        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100 inline-block min-h-[100px]">
                          <h4 className="text-lg font-bold text-[#273572] mb-2">Phân phối</h4>
                          <p className="text-gray-700">Sản phẩm được bảo quản trong kho lạnh và phân phối đến người tiêu dùng trong điều kiện tối ưu.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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