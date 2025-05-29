import { getAllNewsSlugs } from "@/lib/news-data";

// This function generates static paths for all news articles
export async function generateStaticParams() {
  const slugs = getAllNewsSlugs();
  return slugs.map((item) => ({
    slug: item.params.slug,
  }));
}

export default function NewsSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
