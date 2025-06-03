"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewsSection() {
  const posts = useQuery(api.posts.getPublishedPosts);
  
  // Take only the first 3 posts for the homepage section
  const recentPosts = posts?.slice(0, 3);

  // Loading skeleton state
  if (!posts) {
    return (
      <section id="news" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-white z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-light text-center text-[#273572] mb-4">
            TIN TỨC
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Cập nhật những thông tin mới nhất về La Gougah và các hoạt động của
            chúng tôi
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden border border-blue-100">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-white z-0" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full border-2 border-blue-200 opacity-30" />
        <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full border-2 border-blue-200 opacity-30" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-light text-center text-[#273572] mb-4">
          TIN TỨC
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Cập nhật những thông tin mới nhất về La Gougah và các hoạt động của
          chúng tôi
        </p>

        {recentPosts && recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card
                key={post._id}
                className="overflow-hidden border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 w-full">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-blue-50 flex items-center justify-center">
                      <span className="text-blue-300">No image</span>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-blue-600">
                      {post.publishedAt 
                        ? formatDistanceToNow(post.publishedAt, { addSuffix: true, locale: vi }) 
                        : "Mới đăng"}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-[#273572]">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {post.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href={`/news/${post.slug}`}>
                    <Button
                      variant="outline"
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      Xem thêm
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">Chưa có tin tức nào được đăng.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/news">
            <Button
              variant="outline"
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              Xem tất cả tin tức
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
