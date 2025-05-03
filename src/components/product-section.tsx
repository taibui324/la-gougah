"use client";

import Image from "next/image";

const products = [
  {
    id: 1,
    name: "La Gougah 330ml",
    image: "/images/water-bottle.png",
    scale: 0.7,
  },
  {
    id: 2,
    name: "La Gougah 500ml",
    image: "/images/water-bottle.png",
    scale: 0.85,
  },
  {
    id: 3,
    name: "La Gougah 1.5L",
    image: "/images/water-bottle.png",
    scale: 1,
  },
];

export default function ProductSection() {
  return (
    <section id="products" className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-light text-primary text-center mb-16">
          Sản phẩm
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative aspect-[3/4] transition-transform hover:scale-105"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div style={{ transform: `scale(${product.scale})` }} className="relative w-4/5 h-4/5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 text-center p-4">
                <h3 className="text-xl font-light text-primary">
                  {product.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
