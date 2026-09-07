export type Product = {
  slug: string;
  title: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  emoji?: string;
  includes?: { icon: string; label: string }[];
};

const products: Record<string, Product> = {
  "ai-starter-kit": {
    slug: "ai-starter-kit",
    emoji: "🤖",
    title: "AI Integration Starter Kit",
    price: "$19",
    originalPrice: "$49",
    discount: "61% OFF",
    includes: [
      { icon: "♾️", label: "Lifetime access" },
      { icon: "📁", label: "Full source code" },
      { icon: "🔄", label: "Free updates" },
    ],
  },
  "mern-stack-guide": {
    slug: "mern-stack-guide",
    emoji: "📘",
    title: "MERN Stack Complete Guide",
    price: "$9",
    originalPrice: "$29",
    discount: "69% OFF",
    includes: [
      { icon: "♾️", label: "Lifetime access" },
      { icon: "📦", label: "Source code included" },
    ],
  },
};

export function getProduct(slug: string): Product | null {
  return products[slug] || null;
}
