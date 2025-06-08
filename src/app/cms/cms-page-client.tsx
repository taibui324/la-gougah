"use client";

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { SignInForm } from "@/components/cms/auth/sign-in-form";
import { CMSLayout } from "@/components/cms/layout/cms-layout";
import { CMSDashboard } from "@/components/cms/dashboard/cms-dashboard";

export default function CMSPageClient() {
  return (
    <>
      <AuthLoading>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#396CB1]"></div>
        </div>
      </AuthLoading>

      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>

      <Authenticated>
        <CMSLayout>
          <CMSDashboard />
        </CMSLayout>
      </Authenticated>
    </>
  );
}