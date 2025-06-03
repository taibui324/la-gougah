"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Menu,
  ImageIcon,
  LogOut,
  Mail,
} from "lucide-react";
import { useConvexAuth } from "convex/react";

export function CMSSidebar() {
  const pathname = usePathname();
  const { isAuthenticated } = useConvexAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:block hidden">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-[#273572]">La Gougah CMS</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          <Link
            href="/cms"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/cms"
                ? "bg-[#396CB1] text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-[#273572]"
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          
          <Link
            href="/cms/posts"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname.includes("/cms/posts")
                ? "bg-[#396CB1] text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-[#273572]"
            )}
          >
            <FileText className="h-4 w-4" />
            Posts
          </Link>
          
          <Link
            href="/cms/menu"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname.includes("/cms/menu")
                ? "bg-[#396CB1] text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-[#273572]"
            )}
          >
            <Menu className="h-4 w-4" />
            Menu Items
          </Link>
          
          <Link
            href="/cms/contact"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname.includes("/cms/contact")
                ? "bg-[#396CB1] text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-[#273572]"
            )}
          >
            <Mail className="h-4 w-4" />
            Contact Settings
          </Link>
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-200 p-4">
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-[#273572]"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
