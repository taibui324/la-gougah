import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Generate static params for all published posts
export async function generateStaticParams() {
  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      console.warn("CONVEX_URL not found, returning empty params");
      return [];
    }

    const convex = new ConvexHttpClient(convexUrl);
    const posts = await convex.query(api.posts.getPublishedPosts, {});

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      console.error("CONVEX_URL not found");
      notFound();
    }

    const convex = new ConvexHttpClient(convexUrl);
    const post = await convex.query(api.posts.getPostBySlug, { slug });

    // Handle not found case
    if (!post) {
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
                    <ChevronLeft className="mr-2 h-4 w-4" /> Quay lại tất cả tin
                    tức
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
                    <span className="text-blue-300 text-lg">
                      No image available
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center mb-6">
                <span className="text-sm text-blue-600">
                  {post.publishedAt
                    ? formatDistanceToNow(post.publishedAt, {
                        addSuffix: true,
                        locale: vi,
                      })
                    : "Mới đăng"}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-medium text-[#273572] mb-6">
                {post.title}
              </h1>

              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Custom styling for markdown elements
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-[#273572] mt-8 mb-4">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-semibold text-[#273572] mt-6 mb-3">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-medium text-[#273572] mt-4 mb-2">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-blue-600 hover:text-blue-800 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-200 pl-4 italic text-gray-600 my-4">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className;
                      if (isInline) {
                        return (
                          <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code className="block bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                          {children}
                        </code>
                      );
                    },
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-2 mb-4">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-2 mb-4">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-gray-700">{children}</li>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound();
  }
}
