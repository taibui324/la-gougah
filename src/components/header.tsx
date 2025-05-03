"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  const menuItems = [
    { id: "about", title: "Giới thiệu", href: "#about" },
    { id: "products", title: "Sản Phẩm", href: "#products" },
    { id: "technology", title: "Công Nghệ", href: "#technology" },
  ];

  const rightMenuItems = [
    { id: "team", title: "Đội Ngũ", href: "#team" },
    { id: "news", title: "Tin Tức", href: "#news" },
    { id: "contact", title: "Liên Hệ", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#396CB1]/40">
      <div className="container mx-auto px-4">
        <div className="flex h-28 items-center justify-between">
          {/* Left Menu */}
          <nav className="hidden md:flex items-center gap-14">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-[#273572] hover:text-[#273572]/80 transition-colors text-base font-medium tracking-wide"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Center Logo */}
          <Link href="/" className="relative w-44 h-20">
            <Image
              src="/images/image-copy-2.png"
              alt="La Gougah Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Right Menu */}
          <nav className="hidden md:flex items-center gap-14">
            {rightMenuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-[#273572] hover:text-[#273572]/80 transition-colors text-base font-medium tracking-wide"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-[#273572]">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white/95 border-none">
              <div className="flex justify-center mb-8 mt-4">
                <div className="relative w-36 h-16">
                  <Image
                    src="/images/image-copy-2.png"
                    alt="La Gougah Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <nav className="flex flex-col gap-6 mt-8">
                {[...menuItems, ...rightMenuItems].map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="text-[#273572] hover:text-[#273572]/80 transition-colors text-lg font-medium tracking-wide text-center"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
