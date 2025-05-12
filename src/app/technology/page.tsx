"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

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
            src="/images/image-7.png"
            alt="La Gougah Technology"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center">Công Nghệ Tiên Tiến</h1>
        </div>
      </section>
      
      {/* Technology Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div 
            ref={contentRef}
            className="max-w-4xl mx-auto transition-all duration-1000 opacity-0 translate-y-10"
          >
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold text-[#273572] mb-6">Quy Trình Sản Xuất</h2>
              <div className="w-24 h-1 bg-[#396CB1] mx-auto"></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
              <p>
                Với nền tảng công nghệ hiện đại và tiêu chuẩn khắt khe, La Gougah mang đến một quy trình sản xuất hoàn hảo, đảm bảo mỗi giọt nước đến tay người tiêu dùng đều giữ trọn vẹn giá trị tinh túy từ thiên nhiên.
              </p>
              
              <p>
                Nhà máy sản xuất La Gougah được đặt tại vị trí chiến lược gần nguồn nước, giúp tối ưu hóa quá trình khai thác và bảo quản chất lượng nguyên bản của nguồn nước. Với diện tích hơn 10.000m², nhà máy được thiết kế theo tiêu chuẩn quốc tế với các dây chuyền sản xuất tự động hóa cao, đảm bảo năng suất và chất lượng sản phẩm.
              </p>
              
              <figure className="my-12">
                <div className="relative h-[500px] w-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/production-line-1.png"
                    alt="La Gougah Production Facility"
                    fill
                    className="object-cover"
                  />
                </div>
                <figcaption className="text-center text-gray-500 mt-3">Nhà máy sản xuất hiện đại của La Gougah với hệ thống thiết bị tiên tiến</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Process Timeline */}
      <section className="py-16 bg-[#f8f8f8]">
        <div className="container mx-auto px-4">
          <div 
            ref={timelineRef}
            className="max-w-5xl mx-auto transition-all duration-1000 opacity-0 translate-y-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#273572] mb-12 text-center">Quy Trình Công Nghệ</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold text-[#396CB1] mb-4">Khai Thác Và Lọc Sơ Bộ</h3>
                <p className="text-gray-700">
                  Nguồn nước từ độ sâu hơn 250m được khai thác thông qua hệ thống giếng khoan tiên tiến. Ngay sau khi khai thác, nước được đưa qua hệ thống lọc sơ bộ để loại bỏ các tạp chất có kích thước lớn. Quy trình này được thực hiện trong môi trường kín và vô trùng, bảo đảm nguồn nước không bị nhiễm bẩn.
                </p>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/production-line-2.png"
                  alt="La Gougah Water Filtration System"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
              <div className="order-2 md:order-1 relative aspect-video rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/production-line-3.png"
                  alt="La Gougah Advanced Purification System"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold text-[#396CB1] mb-4">Xử Lý Và Làm Tinh Khiết</h3>
                <p className="text-gray-700">
                  Sau khi lọc sơ bộ, nước được đưa vào hệ thống xử lý đa tầng với các lớp lọc tự nhiên. Quá trình này loại bỏ tối đa các tạp chất vi sinh mà vẫn giữ nguyên các khoáng chất tự nhiên có lợi cho sức khỏe. La Gougah áp dụng công nghệ khử trùng bằng tia UV thay vì sử dụng hóa chất, đảm bảo nước hoàn toàn tinh khiết và an toàn.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-2xl font-bold text-[#396CB1] mb-4">Đóng Chai Và Kiểm Soát Chất Lượng</h3>
                <p className="text-gray-700">
                  Nước sau khi đã xử lý được đưa vào dây chuyền đóng chai hiện đại, được vận hành trong môi trường vô trùng. Mỗi chai nước đều trải qua quy trình kiểm tra chất lượng nghiêm ngặt với công nghệ quang học hiện đại, đảm bảo không có bất kỳ tạp chất hay khiếm khuyết nào. Hệ thống kiểm soát chất lượng tự động sẽ loại bỏ ngay lập tức những sản phẩm không đạt tiêu chuẩn.
                </p>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/production-line-1.png"
                  alt="La Gougah Bottling Process"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sustainability Commitments */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#273572] mb-12 text-center">Cam Kết Phát Triển Bền Vững</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#f8f8f8] p-8 rounded-xl">
              <h3 className="text-xl font-bold text-[#273572] mb-4">Năng Lượng Tái Tạo</h3>
              <p className="text-gray-700">Nhà máy sản xuất La Gougah ứng dụng hệ thống năng lượng mặt trời, giúp giảm thiểu lượng khí thải carbon và tiết kiệm tài nguyên thiên nhiên.</p>
            </div>
            
            <div className="bg-[#f8f8f8] p-8 rounded-xl">
              <h3 className="text-xl font-bold text-[#273572] mb-4">Bảo Vệ Nguồn Nước</h3>
              <p className="text-gray-700">Chúng tôi áp dụng chiến lược khai thác bền vững, đảm bảo không làm cạn kiệt hay ảnh hưởng tiêu cực đến nguồn nước ngầm quý giá.</p>
            </div>
            
            <div className="bg-[#f8f8f8] p-8 rounded-xl">
              <h3 className="text-xl font-bold text-[#273572] mb-4">Bao Bì Thân Thiện</h3>
              <p className="text-gray-700">La Gougah cam kết sử dụng vật liệu bao bì có thể tái chế và giảm thiểu tác động đến môi trường trong toàn bộ chuỗi cung ứng.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quality Assurance */}
      <section className="py-16 bg-[#f8f8f8]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#273572] mb-8">Chứng Nhận Chất Lượng</h2>
            <p className="text-lg text-gray-700 mb-12">
              La Gougah tự hào đạt được các chứng nhận chất lượng quốc tế, khẳng định cam kết của chúng tôi với tiêu chuẩn cao nhất về an toàn thực phẩm và chất lượng sản phẩm.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="p-4">
                <div className="h-20 flex items-center justify-center">
                  <span className="text-5xl text-[#396CB1] font-light">ISO</span>
                </div>
                <p className="font-medium text-gray-700">ISO 9001:2015</p>
              </div>
              <div className="p-4">
                <div className="h-20 flex items-center justify-center">
                  <span className="text-5xl text-[#396CB1] font-light">HACCP</span>
                </div>
                <p className="font-medium text-gray-700">HACCP</p>
              </div>
              <div className="p-4">
                <div className="h-20 flex items-center justify-center">
                  <span className="text-5xl text-[#396CB1] font-light">FDA</span>
                </div>
                <p className="font-medium text-gray-700">FDA Approved</p>
              </div>
              <div className="p-4">
                <div className="h-20 flex items-center justify-center">
                  <span className="text-5xl text-[#396CB1] font-light">GMP</span>
                </div>
                <p className="font-medium text-gray-700">Good Manufacturing Practice</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Back to Home */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/"
            className="inline-block bg-[#396CB1] hover:bg-[#273572] text-white font-medium py-3 px-8 rounded-full transition-colors duration-300"
          >
            Quay Lại Trang Chủ
          </Link>
        </div>
      </section>
      
      <Footer />
    </>
  );
} 