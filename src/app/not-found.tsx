"use client";

import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-[#273572] mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#396CB1] hover:bg-[#273572] text-white font-medium py-3 px-8 rounded-full transition-colors duration-300"
          >
            Quay Lại Trang Chủ
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
