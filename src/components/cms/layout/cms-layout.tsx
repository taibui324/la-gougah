"use client";

import type { ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { CMSSidebar } from "./cms-sidebar";
import { CMSHeader } from "./cms-header";

interface CMSLayoutProps {
  children: ReactNode;
}

export function CMSLayout({ children }: CMSLayoutProps) {
  const user = useQuery(api.users.getCurrentUserInfo);

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#396CB1]"></div>
      </div>
    );
  }

  if (!user) {
    return null; // This will be handled by the auth wrapper
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CMSSidebar userRole={user.role} />
      <div className="lg:pl-64">
        <CMSHeader user={user} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
