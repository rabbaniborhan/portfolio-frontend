"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { useCartStore } from "@/store/cart-store";

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // eBook Sample Preview Modal States
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [samplePageIndex, setSamplePageIndex] = useState(0);

  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/slug/${slug}`);
        if (res.data.success) {
          setProduct(res.data.product);
          const allRes = await api.get("/products");
          if (allRes.data.success) {
            const rel = allRes.data.products.filter((p: any) => p._id !== res.data.product._id).slice(0, 3);
            setRelatedProducts(rel);
          }
        } else {
          router.push("/products");
        }
      } catch (err) {
        console.error(err);
        router.push("/products");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug, router]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      itemId: product._id,
      itemType: "Product",
      title: product.title,
      price: product.discountPrice || product.price,
      emoji: product.coverImage,
    });
    router.push("/cart");
  };

  if (loading) {
    return (
      <div style={{ paddingTop: "140px", textAlign: "center", minHeight: "80vh" }}>
        <div style={{ display: "inline-block", width: "42px", height: "42px", border: "3px solid rgba(124,106,247,0.2)", borderTopColor: "var(--ac2, #7c6af7)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <p style={{ marginTop: "16px", color: "var(--tx2)", fontSize: "15px" }}>Loading product details...</p>
      </div>
    );
  }

  if (!product) return null;

  const currentPrice = product.discountPrice || product.price;
  const isFree = Number(currentPrice) === 0;
  const discountPercent = product.discountPrice && product.price
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const isEbookOrBook =
    product.type?.toLowerCase().includes("ebook") ||
    product.type?.toLowerCase().includes("book") ||
    product.type?.toLowerCase().includes("pdf") ||
    product.type?.toLowerCase().includes("guide") ||
    true; // Enable preview for all digital products

  const samplePages = [
    {
      title: "Chapter 1: Core Fundamentals & Principles",
      pageNumber: 1,
      content: `Welcome to "${product.title}". In this sample chapter, we break down essential concepts and real-world architectures.\n\nKey Concepts Covered:\n• Modular Component Architecture & Clean Code\n• Performance Optimization & Caching Strategies\n• Production-Grade API Design & Error Handling\n\n"Mastering engineering principles requires both theoretical understanding and hands-on production code experience."`
    },
    {
      title: "Chapter 2: Production Code Blueprint",
      pageNumber: 2,
      content: `Section 2.1 - Clean Code Standards:\nWhen engineering production software, consistency and strict type-safety are paramount.\n\nSample Implementation Schema:\n\`\`\`typescript\nexport interface SystemArchitecture {\n  id: string;\n  serviceName: string;\n  status: "ACTIVE" | "MAINTENANCE";\n  clusterSize: number;\n}\n\`\`\`\n\nEstablishing strict type definitions early eliminates runtime bugs and guarantees maintainability.`
    },
    {
      title: "Chapter 3: Advanced Strategies & Best Practices",
      pageNumber: 3,
      content: `Section 3.4 - Performance Benchmarking:\nOptimizing application response times and resource consumption ensures an exceptional user experience across all client devices.\n\nProduction Checklist:\n✔ Implement Multi-Layer Caching\n✔ Minimize Client Bundle Overhead\n✔ Enforce End-to-End Security Standards\n\nUnlock the full book to get complete access to all chapters, source code repositories, and exercises!`
    }
  ];

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

  const imgData = formatImg(product.coverImage);

  return (
    <div style={{ paddingTop: "64px", paddingBottom: "80px", minHeight: "90vh" }}>
      {/* ═══ TOP OFFER BANNER ═══ */}
      <div style={{
        position: "sticky",
        top: "64px",
        zIndex: 40,
        background: "linear-gradient(90deg, #7c3aed, #db2777, #06b6d4, #7c3aed)",
        backgroundSize: "300% auto",
        animation: "ilbarmove 7s linear infinite",
        borderBottom: "1px solid rgba(255,255,255,.14)"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "9px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
          flexWrap: "wrap",
          color: "#fff",
          fontSize: "13.5px",
          fontWeight: 600
        }}>
          <div>🔥 <span style={{ background: "rgba(0,0,0,.22)", padding: "1px 8px", borderRadius: "6px" }}>SPECIAL OFFER</span> Digital Asset &amp; Instant Access</div>
          <button
            onClick={handleAddToCart}
            style={{
              background: "#fff",
              color: "#5b21b6",
              fontWeight: 800,
              fontSize: "13px",
              padding: "7px 18px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer"
            }}
          >
            ⚡ {isFree ? "Free Download" : "Instant Purchase"}
          </button>
        </div>
      </div>

      {/* ═══ HERO SECTION ═══ */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        padding: "60px 0 48px",
        background: "radial-gradient(ellipse at 25% 30%, rgba(124,106,247,0.18), transparent 55%), radial-gradient(ellipse at 85% 10%, rgba(34,211,238,0.10), transparent 50%), var(--bg)",
        borderBottom: "1px solid var(--bd)"
      }}>
        <div className="container">
          <Link
            href="/products"
            style={{
              color: "var(--ac2, #a78bfa)",
              fontSize: "13px",
              fontWeight: "700",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "28px",
              textDecoration: "none",
              background: "rgba(124,106,247,0.12)",
              padding: "6px 16px",
              borderRadius: "100px",
              border: "1px solid rgba(124,106,247,0.3)"
            }}
          >
            ← Back to Store Catalog
          </Link>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "48px",
            alignItems: "start"
          }} className="pdetail-grid">
            
            {/* Left Column: Product Details */}
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", marginBottom: "18px" }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(124,106,247,0.15)",
                  border: "1px solid rgba(124,106,247,0.35)",
                  color: "var(--ac2, #a78bfa)",
                  fontSize: "12px",
                  padding: "5px 14px",
                  borderRadius: "20px",
                  fontWeight: "600",
                  letterSpacing: ".06em",
                  textTransform: "uppercase"
                }}>
                  📦 {product.type?.toUpperCase() || "DIGITAL ASSET"}
                </span>

                {isFree && (
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(52,211,153,0.15)",
                    border: "1px solid rgba(52,211,153,0.35)",
                    color: "var(--gr, #34d399)",
                    fontSize: "12px",
                    padding: "5px 14px",
                    borderRadius: "20px",
                    fontWeight: "600"
                  }}>
                    ✨ 100% FREE DOWNLOAD
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 style={{
                fontSize: "clamp(30px, 4.5vw, 48px)",
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: "20px",
                color: "var(--tx)"
              }}>
                {product.title}
              </h1>

              {/* Subtitle */}
              {product.subtitle && (
                <p style={{
                  fontSize: "17px",
                  color: "var(--tx2)",
                  lineHeight: 1.85,
                  marginBottom: "24px",
                  maxWidth: "640px"
                }}>
                  {product.subtitle}
                </p>
              )}

              {/* Stats & Trust Chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "28px" }}>
                <div style={{
                  padding: "6px 14px",
                  border: "1px solid var(--bd)",
                  borderRadius: "20px",
                  background: "rgba(124,106,247,0.06)",
                  fontSize: "13px",
                  color: "var(--tx2)"
                }}>
                  📕 <strong>Format:</strong> {product.type?.toUpperCase()}
                </div>
                <div style={{
                  padding: "6px 14px",
                  border: "1px solid var(--bd)",
                  borderRadius: "20px",
                  background: "rgba(251,191,36,0.06)",
                  fontSize: "13px",
                  color: "var(--tx2)"
                }}>
                  ⭐ <strong>4.9</strong> Rating
                </div>
                <div style={{
                  padding: "6px 14px",
                  border: "1px solid var(--bd)",
                  borderRadius: "20px",
                  background: "rgba(56,189,248,0.06)",
                  fontSize: "13px",
                  color: "var(--tx2)"
                }}>
                  ♾️ <strong>Lifetime</strong> Access
                </div>
              </div>

              {/* Price Breakdown & Buy CTA Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "28px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    {product.discountPrice && (
                      <span style={{ fontSize: "16px", color: "var(--tx3)", textDecoration: "line-through" }}>
                        ${product.price}
                      </span>
                    )}
                    <span style={{ fontSize: "36px", fontWeight: "800", color: "var(--tx)", fontFamily: "'JetBrains Mono', monospace" }}>
                      {isFree ? "Free" : `$${currentPrice}`}
                    </span>
                    {discountPercent > 0 && (
                      <span style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        color: "var(--gr, #34d399)",
                        background: "rgba(52,211,153,0.12)",
                        padding: "3px 9px",
                        borderRadius: "20px"
                      }}>
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--tx3)", marginTop: "2px" }}>One-time payment · Instant digital access</div>
                </div>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <button
                    onClick={handleAddToCart}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      background: "linear-gradient(135deg, var(--ac, #7c6af7), #6254d8)",
                      color: "#fff",
                      padding: "15px 32px",
                      borderRadius: "12px",
                      fontSize: "15px",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 0 32px rgba(124,106,247,0.4)"
                    }}
                  >
                    🚀 {isFree ? "Get Free Access" : "Add to Cart & Checkout"}
                  </button>

                  {isEbookOrBook && (
                    <button
                      onClick={() => {
                        setSamplePageIndex(0);
                        setIsPreviewModalOpen(true);
                      }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "rgba(124,106,247,0.15)",
                        color: "var(--ac2, #a78bfa)",
                        padding: "15px 24px",
                        borderRadius: "12px",
                        fontSize: "15px",
                        fontWeight: 700,
                        border: "1px solid rgba(124,106,247,0.4)",
                        cursor: "pointer"
                      }}
                    >
                      📖 Preview Sample
                    </button>
                  )}
                </div>
              </div>

              {/* Trust badges */}
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", fontSize: "13px", color: "var(--tx3)" }}>
                <span>✅ Instant Digital Delivery</span>
                <span>🔒 Secure bKash / Card Payment</span>
                <span>📱 Access on any device</span>
              </div>
            </div>

            {/* Right Column: Sticky Purchase Sidebar Card */}
            <aside style={{
              background: "var(--bg2)",
              border: "1px solid rgba(124,106,247,0.3)",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
              position: "sticky",
              top: "100px"
            }}>
              <div style={{
                width: "100%",
                height: "220px",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid var(--bd)",
                marginBottom: "20px",
                background: "linear-gradient(135deg, rgba(124,106,247,0.2), rgba(34,211,238,0.1))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {imgData.isUrl ? (
                  <img src={imgData.src} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontSize: "64px" }}>{imgData.emoji}</span>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px" }}>
                {product.discountPrice && (
                  <span style={{ fontSize: "15px", color: "var(--tx3)", textDecoration: "line-through" }}>
                    ${product.price}
                  </span>
                )}
                <span style={{ fontSize: "30px", fontWeight: "800", color: "var(--tx)", fontFamily: "'JetBrains Mono', monospace" }}>
                  {isFree ? "Free" : `$${currentPrice}`}
                </span>
              </div>

              {/* Sidebar Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "12px 0 8px" }}>
                <button
                  onClick={handleAddToCart}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: "linear-gradient(135deg, #7c6af7, #6254d8)",
                    color: "#fff",
                    padding: "14px",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontWeight: "700",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  🚀 {isFree ? "Download Now" : "Buy Product Now"}
                </button>

                {/* PROMINENT RIGHT-SIDE PREVIEW SAMPLE BUTTON */}
                {isEbookOrBook && (
                  <button
                    onClick={() => {
                      setSamplePageIndex(0);
                      setIsPreviewModalOpen(true);
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      background: "rgba(124,106,247,0.15)",
                      color: "var(--ac2, #a78bfa)",
                      padding: "12px",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: "700",
                      border: "1px solid rgba(124,106,247,0.4)",
                      cursor: "pointer"
                    }}
                  >
                    📖 Preview Sample
                  </button>
                )}
              </div>

              <div style={{ fontSize: "12px", color: "var(--tx3)", textAlign: "center", marginBottom: "16px" }}>
                Instant Access · 100% Guaranteed Quality
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "var(--tx2)", paddingTop: "16px", borderTop: "1px solid var(--bd)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}><span>♾️</span> Lifetime access</div>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}><span>📱</span> Access on all devices</div>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}><span>🔄</span> Free lifetime updates</div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ═══ WHAT YOU GET SECTION ═══ */}
      <section style={{ padding: "60px 0", background: "var(--bg2)", borderBottom: "1px solid var(--bd)" }}>
        <div className="container">
          <div style={{ fontSize: "11px", color: "var(--ac2)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "8px" }}>
            What You Get
          </div>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: "800", color: "var(--tx)", marginBottom: "28px" }}>
            What&apos;s Inside This Product
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "14px"
          }}>
            {product.features && product.features.length > 0 ? (
              product.features.map((feat: string, idx: number) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "16px", background: "rgba(124,106,247,0.06)", border: "1px solid rgba(124,106,247,0.12)", borderRadius: "10px" }}>
                  <span style={{ color: "var(--gr, #34d399)", fontSize: "16px", marginTop: "1px" }}>✓</span>
                  <span style={{ fontSize: "14px", color: "var(--tx2)", lineHeight: 1.55 }}>{feat}</span>
                </div>
              ))
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "16px", background: "rgba(124,106,247,0.06)", border: "1px solid rgba(124,106,247,0.12)", borderRadius: "10px" }}>
                  <span style={{ color: "var(--gr, #34d399)", fontSize: "16px", marginTop: "1px" }}>✓</span>
                  <span style={{ fontSize: "14px", color: "var(--tx2)", lineHeight: 1.55 }}>Full source code, template assets, or comprehensive eBook content.</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "16px", background: "rgba(124,106,247,0.06)", border: "1px solid rgba(124,106,247,0.12)", borderRadius: "10px" }}>
                  <span style={{ color: "var(--gr, #34d399)", fontSize: "16px", marginTop: "1px" }}>✓</span>
                  <span style={{ fontSize: "14px", color: "var(--tx2)", lineHeight: 1.55 }}>Step-by-step setup guides &amp; installation documentation.</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "16px", background: "rgba(124,106,247,0.06)", border: "1px solid rgba(124,106,247,0.12)", borderRadius: "10px" }}>
                  <span style={{ color: "var(--gr, #34d399)", fontSize: "16px", marginTop: "1px" }}>✓</span>
                  <span style={{ fontSize: "14px", color: "var(--tx2)", lineHeight: 1.55 }}>Production-tested architecture and modern clean code practices.</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "16px", background: "rgba(124,106,247,0.06)", border: "1px solid rgba(124,106,247,0.12)", borderRadius: "10px" }}>
                  <span style={{ color: "var(--gr, #34d399)", fontSize: "16px", marginTop: "1px" }}>✓</span>
                  <span style={{ fontSize: "14px", color: "var(--tx2)", lineHeight: 1.55 }}>Lifetime access &amp; future version updates included at zero extra cost.</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ═══ TABLE OF CONTENTS / DESCRIPTION ═══ */}
      {(product.tableOfContents || product.description) && (
        <section style={{ padding: "60px 0", background: "var(--bg2)", borderTop: "1px solid var(--bd)" }}>
          <div className="container" style={{ maxWidth: "900px" }}>
            <div style={{ fontSize: "11px", color: "var(--ac2)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "8px" }}>
              Syllabus / Details
            </div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: "800", color: "var(--tx)", marginBottom: "20px" }}>
              Full Product Specifications
            </h2>

            <div style={{ background: "var(--bg)", border: "1px solid var(--bd)", borderRadius: "16px", padding: "32px" }}>
              {product.tableOfContents ? (
                <>
                  <h3 style={{ fontSize: "18px", fontWeight: "700", color: "var(--tx)", marginBottom: "16px" }}>
                    Table of Contents / Syllabus
                  </h3>
                  <pre style={{ whiteSpace: "pre-wrap", fontFamily: "var(--ff)", fontSize: "14px", color: "var(--tx2)", lineHeight: 1.75 }}>
                    {product.tableOfContents}
                  </pre>
                </>
              ) : (
                <p style={{ whiteSpace: "pre-wrap", fontSize: "15px", color: "var(--tx2)", lineHeight: 1.8 }}>
                  {product.description}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══ RELATED PRODUCTS SECTION ═══ */}
      {relatedProducts.length > 0 && (
        <section style={{ padding: "60px 0", background: "var(--bg)", borderTop: "1px solid var(--bd)" }}>
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
              <div>
                <div style={{ fontSize: "11px", color: "var(--ac2)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "4px" }}>
                  More Assets
                </div>
                <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: "800", color: "var(--tx)" }}>
                  Related Digital Products
                </h2>
              </div>
              <Link href="/products" style={{ color: "var(--ac2)", fontSize: "13px", fontWeight: "bold", textDecoration: "none" }}>
                Browse All Products →
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
              {relatedProducts.map((rp: any) => {
                const rpPrice = rp.discountPrice || rp.price;
                const rpIsFree = Number(rpPrice) === 0;
                const rpImgData = formatImg(rp.coverImage);

                return (
                  <Link key={rp._id} href={`/products/${rp.slug || rp._id}`} style={{ textDecoration: "none" }}>
                    <div style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "16px", padding: "20px", transition: "all 0.3s ease", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                      <div>
                        <div style={{ width: "100%", height: "160px", borderRadius: "12px", background: "var(--sf)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                          {rpImgData.isUrl ? (
                            <img src={rpImgData.src} alt={rp.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          ) : (
                            <span style={{ fontSize: "48px" }}>{rpImgData.emoji}</span>
                          )}
                        </div>

                        <span style={{ fontSize: "10px", fontWeight: 800, padding: "3px 10px", borderRadius: "12px", background: "rgba(124,106,247,0.12)", color: "var(--ac2)", textTransform: "uppercase", letterSpacing: ".05em", display: "inline-block", marginBottom: "8px" }}>
                          {rp.type || "Asset"}
                        </span>

                        <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--tx)", marginBottom: "6px", lineHeight: 1.35 }}>
                          {rp.title}
                        </h3>

                        <p style={{ fontSize: "12px", color: "var(--tx3)", lineHeight: 1.6, marginBottom: "16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {rp.subtitle || rp.description}
                        </p>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid var(--bd)" }}>
                        <span style={{ fontSize: "18px", fontWeight: "800", color: "var(--tx)", fontFamily: "'JetBrains Mono', monospace" }}>
                          {rpIsFree ? "Free" : `$${rpPrice}`}
                        </span>
                        <span style={{ fontSize: "12px", fontWeight: "bold", color: "var(--ac2)" }}>
                          View Details →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ EBOOK SAMPLE PREVIEW MODAL ═══ */}
      {isPreviewModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
        >
          <div
            style={{
              background: "var(--bg2)",
              border: "1px solid rgba(124,106,247,0.4)",
              borderRadius: "24px",
              maxWidth: "760px",
              width: "100%",
              maxHeight: "88vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
              overflow: "hidden"
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "20px 28px",
                borderBottom: "1px solid var(--bd)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "var(--sf)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "24px" }}>📖</span>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "var(--tx)" }}>
                    Book Sample Preview
                  </h3>
                  <span style={{ fontSize: "12px", color: "var(--tx3)", fontFamily: "'JetBrains Mono', monospace" }}>
                    {product.title}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsPreviewModalOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--tx2)",
                  fontSize: "24px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  padding: "4px"
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body / Book Reader */}
            <div style={{ padding: "32px 36px", overflowY: "auto", flex: 1, background: "var(--bg)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span style={{ fontSize: "12px", fontWeight: "800", color: "var(--ac2)", textTransform: "uppercase", letterSpacing: ".08em" }}>
                  {samplePages[samplePageIndex].title}
                </span>
                <span style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: "var(--tx3)", background: "var(--sf)", padding: "4px 10px", borderRadius: "10px", border: "1px solid var(--bd)" }}>
                  Sample Page {samplePageIndex + 1} of {samplePages.length}
                </span>
              </div>

              <div
                style={{
                  background: "var(--sf)",
                  border: "1px solid var(--bd)",
                  borderRadius: "16px",
                  padding: "28px 32px",
                  fontSize: "15px",
                  color: "var(--tx)",
                  lineHeight: 1.85,
                  whiteSpace: "pre-wrap",
                  boxShadow: "inset 0 2px 10px rgba(0,0,0,0.15)",
                  minHeight: "260px"
                }}
              >
                {samplePages[samplePageIndex].content}
              </div>
            </div>

            {/* Modal Footer / Navigation Controls */}
            <div
              style={{
                padding: "20px 28px",
                borderTop: "1px solid var(--bd)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "var(--sf)",
                gap: "16px",
                flexWrap: "wrap"
              }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  disabled={samplePageIndex === 0}
                  onClick={() => setSamplePageIndex((prev) => Math.max(0, prev - 1))}
                  style={{
                    padding: "9px 18px",
                    borderRadius: "10px",
                    background: samplePageIndex === 0 ? "var(--bd)" : "var(--bg2)",
                    color: samplePageIndex === 0 ? "var(--tx3)" : "var(--tx)",
                    border: "1px solid var(--bd2)",
                    fontWeight: "bold",
                    fontSize: "13px",
                    cursor: samplePageIndex === 0 ? "not-allowed" : "pointer"
                  }}
                >
                  ← Previous Page
                </button>

                <button
                  disabled={samplePageIndex === samplePages.length - 1}
                  onClick={() => setSamplePageIndex((prev) => Math.min(samplePages.length - 1, prev + 1))}
                  style={{
                    padding: "9px 18px",
                    borderRadius: "10px",
                    background: samplePageIndex === samplePages.length - 1 ? "var(--bd)" : "var(--bg2)",
                    color: samplePageIndex === samplePages.length - 1 ? "var(--tx3)" : "var(--tx)",
                    border: "1px solid var(--bd2)",
                    fontWeight: "bold",
                    fontSize: "13px",
                    cursor: samplePageIndex === samplePages.length - 1 ? "not-allowed" : "pointer"
                  }}
                >
                  Next Page →
                </button>
              </div>

              <button
                onClick={() => {
                  setIsPreviewModalOpen(false);
                  handleAddToCart();
                }}
                style={{
                  padding: "10px 24px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, var(--ac), #6366f1)",
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: "13px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(0,184,219,0.3)"
                }}
              >
                🚀 Buy Full Book Now (${currentPrice})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation & Responsive Styles */}
      <style>{`
        @keyframes ilbarmove {
          to { background-position: 300% center; }
        }
        @media (max-width: 900px) {
          .pdetail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
