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
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewsPage() {
  const posts = useQuery(api.posts.getPublishedPosts);

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-light text-center text-[#273572] mb-6">
            Tin Tức
          </h1>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Cập nhật những thông tin mới nhất về La Gougah và các hoạt động của
            chúng tôi
          </p>

          {!posts ? (
            // Loading state
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
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
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
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
            // No posts state
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Chưa có tin tức nào được đăng.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
