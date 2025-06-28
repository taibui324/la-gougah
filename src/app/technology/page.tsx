"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import HeroBanner from "@/components/ui/hero-banner";

export default function TechnologyPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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
      <HeroBanner
        pageType="technology"
        fallbackImage="/images/image-3.png"
        className="h-[60vh]"
      />

      {/* Technology Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div
            ref={contentRef}
            className="max-w-4xl mx-auto transition-all duration-1000 opacity-0 translate-y-10"
          >
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold text-[#273572] mb-6">
                Quy trình sản xuất nước La Gougah – Kết tinh từ thiên nhiên,
                tinh lọc bằng công nghệ quốc tế
              </h2>
              <div className="w-24 h-1 bg-[#396CB1] mx-auto"></div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
              <p>
                La Gougah là thương hiệu nước uống đóng chai được khai sinh từ
                sự giao thoa giữa thiên nhiên nguyên sơ và công nghệ hiện đại.
                Với cam kết đem lại sản phẩm nước thanh khiết, an toàn và giàu
                giá trị - La Gougah được đầu tư bài bản từ khâu khai thác đến xử
                lý và đóng chai, đảm bảo mang đến cho người tiêu dùng một sản
                phẩm đạt chuẩn chất lượng quốc tế.
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
                <figcaption className="text-center text-gray-500 mt-4">
                  Dây chuyền sản xuất hiện đại của La Gougah
                </figcaption>
              </figure>

              <h3 className="text-2xl font-bold text-[#273572] mb-4">
                Nguồn nước quý giá từ lòng đất sâu 250 mét
              </h3>
              <p>
                La Gougah sử dụng nguồn nước ngầm được khai thác từ độ sâu hơn
                250 mét, nơi tích tụ dòng nước nguyên sinh đã trải qua hàng
                triệu năm lọc qua các tầng địa chất tự nhiên từ kỷ Creta muộn.
                Đây là thời kỳ địa chất cổ đại – khoảng hơn 65 triệu năm trước –
                thời điểm mà nước mưa, băng tuyết và các yếu tố tự nhiên bắt đầu
                tích tụ vào lòng đất và được bảo tồn đến tận ngày nay.
              </p>

              <p>
                Chính nhờ nguồn gốc đặc biệt này, nước La Gougah sở hữu độ tinh
                khiết tự nhiên cao, chứa các khoáng chất có lợi rất tốt cho sức
                khỏe và phù hợp để sử dụng hàng ngày.
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
                  <p className="text-center text-gray-500 mt-2">
                    Quy trình đóng chai tự động
                  </p>
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
                  <p className="text-center text-gray-500 mt-2">
                    Kiểm soát chất lượng
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#273572] mb-4">
                Công nghệ thẩm thấu ngược RO – Công nghệ lọc nước hiện đại từ Mỹ
              </h3>
              <p>
                Trái tim của quy trình xử lý nước tại La Gougah chính là công
                nghệ thẩm thấu ngược RO (Reverse Osmosis) tiên tiến đến từ Hoa
                Kỳ. Đây là công nghệ hiện đại trong ngành xử lý nước uống, sử
                dụng các màng lọc có kích thước nhỏ cho đến siêu nhỏ.
              </p>

              <p>
                Công nghệ RO giúp loại bỏ vi khuẩn, kim loại nặng, các tạp chất
                hữu cơ và vô cơ, mang lại nguồn nước tinh khiết mà vẫn giữ lại
                được các khoáng chất vi lượng có lợi cho sức khỏe. Với hệ thống
                lọc nhiều tầng, nước La Gougah đạt chuẩn chất lượng khắt khe về
                vệ sinh an toàn thực phẩm QCVN 6-1:2010/BYT và chất lượng ISO
                22000:2018.
              </p>

              <h3 className="text-2xl font-bold text-[#273572] mb-4">
                Dây chuyền chiết rót hiện đại nhập khẩu 100% từ Đài Loan
              </h3>
              <p>
                Không chỉ chú trọng vào quy trình lọc nước, La Gougah còn đầu tư
                mạnh mẽ vào hệ thống chiết rót và đóng chai tự động, được nhập
                khẩu trực tiếp 100% từ Đài Loan – quốc gia nổi tiếng với công
                nghệ sản xuất máy móc ngành thực phẩm và đồ uống.
              </p>

              <p>
                Dây chuyền chiết rót của La Gougah hoạt động tự động hóa hoàn
                toàn từ khâu tráng rửa chai, chiết rót đến đóng nắp và dán nhãn.
                Điều này không chỉ giúp tăng năng suất, giảm thiểu tối đa sự can
                thiệp của con người mà còn đảm bảo tính vệ sinh, ngăn ngừa nguy
                cơ nhiễm khuẩn chéo trong quá trình sản xuất.
              </p>

              <p>
                Toàn bộ quy trình đều được giám sát chặt chẽ bởi đội ngũ kỹ
                thuật viên có chuyên môn cao và hệ thống kiểm tra chất lượng
                nghiêm ngặt, đảm bảo mỗi chai nước La Gougah đến tay người tiêu
                dùng đều đạt chuẩn về độ tinh khiết, an toàn và ổn định.
              </p>
            </div>

            {/* Production Process Timeline */}
            <div
              ref={timelineRef}
              className="mt-20 transition-all duration-1000 delay-300 opacity-0 translate-y-10"
            >
              <h3 className="text-2xl font-bold text-[#273572] mb-12 text-center">
                Quy Trình Sản Xuất
              </h3>

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
                          <h4 className="text-lg font-bold text-[#273572] mb-2">
                            Khai thác
                          </h4>
                          <p className="text-gray-700">
                            Nước được khai thác từ độ sâu hơn 250m dưới lòng
                            đất, nơi tích tụ dòng nước nguyên sinh qua hàng
                            triệu năm.
                          </p>
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
                          <h4 className="text-lg font-bold text-[#273572] mb-2">
                            Hệ thống RO
                          </h4>
                          <p className="text-gray-700">
                            Nước được xử lý qua hệ thống thẩm thấu ngược (RO)
                            tiên tiến từ Hoa Kỳ, loại bỏ vi khuẩn, kim loại nặng
                            và các tạp chất.
                          </p>
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
                          <h4 className="text-lg font-bold text-[#273572] mb-2">
                            Tiệt trùng UV và Ozone
                          </h4>
                          <p className="text-gray-700">
                            Nước được tiệt trùng bằng UV và Ozone để đảm bảo
                            không bị nhiễm khuẩn và đạt độ an toàn vi sinh.
                          </p>
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
                          <h4 className="text-lg font-bold text-[#273572] mb-2">
                            Chiết rót tự động
                          </h4>
                          <p className="text-gray-700">
                            Dây chuyền chiết rót tự động nhập khẩu 100% từ Đài
                            Loan thực hiện quy trình từ tráng rửa chai đến đóng
                            nắp và dán nhãn.
                          </p>
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
                          <h4 className="text-lg font-bold text-[#273572] mb-2">
                            Kiểm tra chất lượng
                          </h4>
                          <p className="text-gray-700">
                            Mỗi lô sản phẩm đều được kiểm tra nghiêm ngặt về lý
                            hóa và vi sinh trước khi xuất xưởng.
                          </p>
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
                          <h4 className="text-lg font-bold text-[#273572] mb-2">
                            Phân phối
                          </h4>
                          <p className="text-gray-700">
                            Sản phẩm được bảo quản trong kho lạnh và phân phối
                            đến người tiêu dùng trong điều kiện tối ưu.
                          </p>
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
