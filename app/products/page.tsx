"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

const categories = ["All", "ebook", "book", "template", "source_code", "developer_tool", "other"];

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const catQuery = selectedCategory !== "All" ? `?category=${selectedCategory}` : "";
        const res = await api.get(`/products${catQuery}`);
        if (res.data.success) {
          setProducts(res.data.products);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  return (
    <div style={{ paddingTop: "64px" }}>
      <section className="sp">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="lbl" style={{ justifyContent: "center" }}>Digital Store</div>
            <h1 className="stitle">Developer Shop</h1>
            <p className="sdesc" style={{ maxWidth: "580px", margin: "0 auto" }}>
              eBooks, programming templates, boilerplates, and developer resources to boost your productivity.
            </p>
          </div>

          {/* Category filter */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "48px" }}>
            {categories.map((c) => (
              <span
                key={c}
                onClick={() => setSelectedCategory(c)}
                style={{
                  padding: "6px 18px", borderRadius: "20px", border: "1px solid var(--bd2)",
                  background: c === selectedCategory ? "var(--ac)" : "var(--sf)",
                  color: c === selectedCategory ? "#fff" : "var(--tx2)",
                  fontSize: "12px", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", transition: "all .2s"
                }}
              >
                {c.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Products grid */}
          {loading ? (
            <p style={{ textAlign: "center" }}>Loading store items...</p>
          ) : products.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--tx3)" }}>No products found in this category.</p>
          ) : (
            <div className="pdg" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
              {products.map((p) => {
                const price = p.discountPrice || p.price;
                const rawImg = p.coverImage || (Array.isArray(p.images) && p.images[0]) || p.image;

                const formatImg = (str?: string) => {
                  if (!str) return { isUrl: false, src: "", emoji: "📦" };
                  const t = str.trim();
                  if (t.startsWith("http://") || t.startsWith("https://") || t.startsWith("data:") || t.startsWith("/") || t.startsWith("uploads/") || t.includes("/") || t.includes(".")) {
                    let src = t;
                    if (t.startsWith("/uploads/") || t.startsWith("uploads/")) {
                      const host = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:5000";
                      src = t.startsWith("/") ? `${host}${t}` : `${host}/${t}`;
                    }
                    return { isUrl: true, src, emoji: "📦" };
                  }
                  return { isUrl: false, src: "", emoji: t || "📦" };
                };

                const imgData = formatImg(rawImg);

                return (
                  <Link key={p._id} href={`/products/${p.slug}`} className="pdc">
                    <div className="pdcv" style={{ background: `linear-gradient(135deg, var(--sf), var(--bd))`, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {imgData.isUrl ? (
                        <img src={imgData.src} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <span style={{ fontSize: "42px" }}>{imgData.emoji}</span>
                      )}
                    </div>
                    <div className="pdb">
                      <div style={{ marginBottom: "4px" }}>
                        <span style={{
                          fontSize: "9px", padding: "2px 8px", borderRadius: "20px",
                          background: "rgba(124,106,247,.12)", color: "var(--ac2)",
                          fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, letterSpacing: ".04em"
                        }}>
                          {p.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="pdn">{p.title}</div>
                      <div className="pdt">{p.subtitle || p.description.substring(0, 70)}…</div>
                      <div className="pdf" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
                        <span>
                          {p.discountPrice && (
                            <span style={{ fontSize: ".8em", color: "var(--tx3)", textDecoration: "line-through", marginRight: "6px" }}>
                              ${p.price}
                            </span>
                          )}
                          <span className="pdp">${price}</span>
                        </span>
                        <span className="buyb" style={{ fontSize: "11px", padding: "6px 12px" }}>Details</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
