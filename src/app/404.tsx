"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // If we're on a specific page, check if adding a trailing slash would help
    const path = window.location.pathname;
    if (path !== '/404' && !path.endsWith('/')) {
      // Try redirecting to the page with a trailing slash
      router.replace(`${path}/`);
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
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
  );
} 