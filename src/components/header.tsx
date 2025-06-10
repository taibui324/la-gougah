"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface MenuItem {
  id: string;
  title: string;
  baseHref: string;
  fullPageHref?: string;
}

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Fetch visible menu items from Convex
  const convexMenuItems = useQuery(api.menuItems.getVisibleMenuItems) || [];

  // Map database menu items to our component format
  // We'll split them between left and right sides of the logo
  const dbMenuItems = convexMenuItems.map((item) => ({
    id: item._id,
    title: item.title,
    baseHref: item.href,
    fullPageHref: item.href.startsWith("/") ? item.href : undefined,
  }));

  // Split menu items into left and right sides
  // First half goes to the left, second half to the right
  const middleIndex = Math.ceil(dbMenuItems.length / 2);
  const menuItems = dbMenuItems.slice(0, middleIndex);
  const rightMenuItems = dbMenuItems.slice(middleIndex);

  // Helper function to get the correct href based on current page
  const getHref = (baseHref: string, fullPageHref?: string) => {
    // Special case for news - if we have a fullPageHref and we're not on homepage, use the full page
    if (fullPageHref && !isHomePage) {
      return fullPageHref;
    }
    // If it's already a full path (starts with /) or we're on the homepage, use as is
    if (baseHref.startsWith("/") || isHomePage) {
      return baseHref;
    }
    // Otherwise, prefix with / to return to homepage
    return `/${baseHref}`;
  };

  return (
    <header className="relative top-0 left-0 right-0 z-50 bg-[#396CB1]/40">
      <div className="container mx-auto px-4">
        <div className="flex h-28 items-center justify-between">
          {/* Left Menu */}
          <nav className="hidden md:flex items-center gap-14">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={getHref(item.baseHref, item.fullPageHref)}
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
                href={getHref(item.baseHref, item.fullPageHref)}
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
              <SheetHeader>
                <SheetTitle className="sr-only">Menu Điều Hướng</SheetTitle>
              </SheetHeader>
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
                {/* Show all menu items in mobile view */}
                {[...menuItems, ...rightMenuItems].map((item) => (
                  <Link
                    key={item.id}
                    href={getHref(item.baseHref, item.fullPageHref)}
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
