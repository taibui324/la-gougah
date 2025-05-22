import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={beVietnamPro.className}>
      <head>
        <title>La Gougah - Nước uống thiên nhiên</title>
        <meta
          name="description"
          content="La Gougah - Thương hiệu nước uống cao cấp từ nguồn nước khoáng thiên nhiên Việt Nam"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
