"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Image as ImageIcon,
  Menu as MenuIcon,
  Mail,
  Eye,
} from "lucide-react";

type Role = "admin" | "editor" | "user";

interface CMSSidebarProps {
  userRole: Role;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: Role[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/cms",
    icon: LayoutDashboard,
    roles: ["admin", "editor", "user"],
  },
  {
    title: "Posts",
    href: "/cms/posts",
    icon: FileText,
    roles: ["admin", "editor"],
  },
  {
    title: "Banners",
    href: "/cms/banners",
    icon: ImageIcon,
    roles: ["admin", "editor"],
  },
  {
    title: "Menu Items",
    href: "/cms/menu",
    icon: MenuIcon,
    roles: ["admin", "editor"],
  },
  {
    title: "Users",
    href: "/cms/users",
    icon: Users,
    roles: ["admin"],
  },
  {
    title: "Contact Settings",
    href: "/cms/contact",
    icon: Mail,
    roles: ["admin"],
  },
  {
    title: "Settings",
    href: "/cms/settings",
    icon: Settings,
    roles: ["admin"],
  },
  {
    title: "View Website",
    href: "/",
    icon: Eye,
    roles: ["admin", "editor", "user"],
  },
];

export function CMSSidebar({ userRole }: CMSSidebarProps) {
  const pathname = usePathname();

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(userRole),
  );

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:block hidden">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-[#273572]">La Gougah CMS</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#396CB1] text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-[#273572]",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Role Badge */}
        <div className="border-t border-gray-200 p-4">
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Role
            </p>
            <p className="text-sm font-semibold text-[#273572] capitalize">
              {userRole}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
