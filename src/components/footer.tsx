"use client";

import Link from "next/link";
import Image from "next/image";
import { FacebookIcon, InstagramIcon, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="text-blue-900"
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.36) 0%, #82B3F6 100%)",
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Contact Info */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <Image
                src="/images/image-copy-2.png"
                alt="La Gougah Logo"
                width={120}
                height={60}
                className="mb-4"
              />
              <div className="text-sm space-y-1 mt-4">
                <p>Địa chỉ: Thôn Phú Hòa, Xã Phú Hội, Huyện Đức Trọng</p>
                <p>Tỉnh Lâm Đồng, Việt Nam</p>
                <p>Giờ làm việc: 7h00 - 17h00, 13h00 - 17h00</p>
                <p>Hotline: 02633679979</p>
                <p>Website: www.lagougah.com</p>
              </div>
            </div>
          </div>

          {/* Tìm hiểu nước La Gougah */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-medium mb-4">
              Tìm hiểu nước La Gougah
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-blue-800 hover:text-blue-900 transition-colors"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-blue-800 hover:text-blue-900 transition-colors"
                >
                  Quy trình sản xuất
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-blue-800 hover:text-blue-900 transition-colors"
                >
                  Hồ sơ năng lực
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-blue-800 hover:text-blue-900 transition-colors"
                >
                  Bảng giá
                </Link>
              </li>
            </ul>
          </div>

          {/* Bảo vệ môi trường */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-medium mb-4">Bảo vệ môi trường</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-blue-800 hover:text-blue-900 transition-colors"
                >
                  Các sự kiện
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-blue-800 hover:text-blue-900 transition-colors"
                >
                  Phương châm
                </Link>
              </li>
            </ul>
          </div>

          {/* Về La Gougah */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-medium mb-4">Về La Gougah</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-blue-800 hover:text-blue-900 transition-colors"
                >
                  Nguồn gốc
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-blue-800 hover:text-blue-900 transition-colors"
                >
                  Khoáng chất
                </Link>
              </li>
            </ul>
          </div>

          {/* Hỗ trợ & Chính sách */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-medium mb-4">Hỗ trợ & Chính sách</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-blue-800 hover:text-blue-900 transition-colors"
                >
                  Điều khoản chung
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-blue-800 hover:text-blue-900 transition-colors"
                >
                  Chính sách thanh toán
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-blue-800 hover:text-blue-900 transition-colors"
                >
                  Chính sách giao hàng
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-blue-800 hover:text-blue-900 transition-colors"
                >
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-blue-800 hover:text-blue-900 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-400 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-blue-800">
              Copyright © 2023 La Gougah Water
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button className="bg-blue-600 p-2 rounded-full">
                <Globe className="h-5 w-5 text-white" />
                <span className="sr-only">Language</span>
              </button>
              <Link
                href="https://www.instagram.com/lagougah/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5 text-blue-800" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61574601075804"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-5 w-5 text-blue-800" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
