"use client";

import { useParams } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = useQuery(api.posts.getPostBySlug, { slug });
  
  // Show loading state while fetching
  if (post === undefined) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-20 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <Link href="/news">
                  <Button variant="ghost" className="text-blue-600 pl-0">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Quay lại tất cả tin tức
                  </Button>
                </Link>
              </div>
              
              <Skeleton className="h-96 w-full mb-8 rounded-lg" />
              <Skeleton className="h-6 w-32 mb-6" />
              <Skeleton className="h-10 w-3/4 mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  // Handle not found case
  if (post === null) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link href="/news">
                <Button variant="ghost" className="text-blue-600 pl-0">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Quay lại tất cả tin tức
                </Button>
              </Link>
            </div>
            
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
              {post.image || post.imageStorageId ? (
                <Image 
                  src={post.image || `/api/storage/${post.imageStorageId}`} 
                  alt={post.title} 
                  fill 
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="h-full w-full bg-blue-50 flex items-center justify-center">
                  <span className="text-blue-300 text-lg">No image available</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center mb-6">
              <span className="text-sm text-blue-600">
                {post.publishedAt 
                  ? formatDistanceToNow(post.publishedAt, { addSuffix: true, locale: vi }) 
                  : "Mới đăng"}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-medium text-[#273572] mb-6">
              {post.title}
            </h1>
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
