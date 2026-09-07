"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/slices/productSlice";

export function ProductsSection() {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".rv, .rvl, .rvr").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [products]);

  return (
    <section id="products" className="sp" style={{ background: "var(--sf2)" }}>
      <div className="container">
        <div className="sr">
          <div>
            <div className="lbl">Developer Shop</div>
            <h2 className="stitle rv" style={{ fontSize: "clamp(22px,2.5vw,32px)", marginBottom: 0 }}>
              Featured Digital Assets
            </h2>
          </div>
          <Link href="/products" className="va">View All Shop →</Link>
        </div>

        {loading ? (
          <div className="pdg animate-pulse" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="pdc rv" style={{ background: "var(--sf)", minHeight: "260px", opacity: 0.6 }} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No products in store yet.</p>
        ) : (
          <div className="pdg" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
            {products.map((p) => {
              const price = p.discountPrice || p.price;
              const rawImg = p.coverImage || (p as any).image;
              
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
                <Link key={p._id} href={`/products/${p.slug}`} className="pdc rv">
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
                        {p.type ? p.type.toUpperCase() : "TEMPLATE"}
                      </span>
                    </div>
                    <div className="pdn">{p.title}</div>
                    <div className="pdt">{p.subtitle || p.description.substring(0, 75)}…</div>
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
  );
}
