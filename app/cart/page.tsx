"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const user = useAuthStore((s) => s.user);

  const formatCartImg = (raw?: string) => {
    if (!raw) return { isUrl: false, src: "", emoji: "📦" };
    const t = raw.trim();
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

  const totalAmount = getTotal();

  return (
    <div
      style={{
        paddingTop: "100px",
        paddingBottom: "80px",
        minHeight: "90vh",
        background: "radial-gradient(ellipse 80% 50% at 50% 10%, rgba(0, 184, 219, 0.08), transparent 80%), var(--bg)"
      }}
    >
      <div className="container" style={{ maxWidth: "1060px" }}>
        {/* Navigation Link */}
        <Link
          href="/products"
          style={{
            color: "var(--ac2)",
            fontSize: "13px",
            fontWeight: "700",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
            textDecoration: "none",
            background: "var(--sf)",
            padding: "8px 16px",
            borderRadius: "10px",
            border: "1px solid var(--bd)"
          }}
        >
          ← Continue Shopping
        </Link>

        {/* Section Title */}
        <h1 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, color: "var(--tx)", marginBottom: "32px" }}>
          🛒 Shopping Cart ({items.length})
        </h1>

        {items.length === 0 ? (
          <div
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--bd)",
              borderRadius: "24px",
              padding: "64px 32px",
              textAlign: "center",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)"
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🛒</div>
            <h3 style={{ fontSize: "22px", fontWeight: "bold", color: "var(--tx)", marginBottom: "8px" }}>
              Your shopping cart is empty
            </h3>
            <p style={{ fontSize: "15px", color: "var(--tx2)", marginBottom: "32px", maxWidth: "480px", margin: "0 auto 32px" }}>
              Explore developer templates, source code packages, and expert-led engineering courses.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/products"
                style={{
                  padding: "12px 28px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, var(--ac), #0096b8)",
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: "14px",
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(0,184,219,0.3)"
                }}
              >
                Browse Digital Products
              </Link>
              <Link
                href="/courses"
                style={{
                  padding: "12px 28px",
                  borderRadius: "12px",
                  background: "var(--sf)",
                  color: "var(--tx)",
                  border: "1px solid var(--bd2)",
                  fontWeight: "bold",
                  fontSize: "14px",
                  textDecoration: "none"
                }}
              >
                Explore Courses
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "32px" }} className="cart-grid">
            {/* Left Items Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {items.map((item) => {
                const imgData = formatCartImg(item.emoji);
                const itemTotal = (item.price * item.quantity).toFixed(2);

                return (
                  <div
                    key={item.itemId}
                    style={{
                      background: "var(--bg2)",
                      border: "1px solid var(--bd)",
                      borderRadius: "18px",
                      padding: "20px 24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "20px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                      flexWrap: "wrap"
                    }}
                  >
                    {/* Item Info & Thumbnail */}
                    <div style={{ display: "flex", alignItems: "center", gap: "20px", flex: 1, minWidth: "260px" }}>
                      <div
                        style={{
                          width: "72px",
                          height: "72px",
                          borderRadius: "14px",
                          background: "var(--sf)",
                          border: "1px solid var(--bd)",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0
                        }}
                      >
                        {imgData.isUrl ? (
                          <img src={imgData.src} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <span style={{ fontSize: "36px" }}>{imgData.emoji}</span>
                        )}
                      </div>

                      <div>
                        <span style={{ fontSize: "10px", fontWeight: 800, padding: "3px 10px", borderRadius: "10px", background: "rgba(0,184,219,0.12)", color: "var(--ac2)", textTransform: "uppercase", letterSpacing: ".05em" }}>
                          {item.itemType || "ITEM"}
                        </span>
                        <h4 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--tx)", marginTop: "4px", marginBottom: "4px" }}>
                          {item.title}
                        </h4>
                        <div style={{ fontSize: "13px", color: "var(--tx3)", fontFamily: "'JetBrains Mono', monospace" }}>
                          ${item.price.toFixed(2)} each
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls & Remove */}
                    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                      {item.itemType === "Product" ? (
                        <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--bd)", borderRadius: "10px", background: "var(--sf)", overflow: "hidden" }}>
                          <button
                            onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                            style={{ padding: "6px 12px", background: "transparent", border: "none", color: "var(--tx)", cursor: "pointer", fontWeight: "bold" }}
                          >
                            -
                          </button>
                          <span style={{ padding: "6px 14px", fontSize: "13px", borderLeft: "1px solid var(--bd)", borderRight: "1px solid var(--bd)", fontFamily: "'JetBrains Mono', monospace", fontWeight: "bold" }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                            style={{ padding: "6px 12px", background: "transparent", border: "none", color: "var(--tx)", cursor: "pointer", fontWeight: "bold" }}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: "12px", color: "var(--tx3)", fontFamily: "'JetBrains Mono', monospace" }}>
                          Qty: 1
                        </span>
                      )}

                      <div style={{ textAlign: "right", minWidth: "90px" }}>
                        <div style={{ fontSize: "18px", fontWeight: "800", color: "var(--tx)", fontFamily: "'JetBrains Mono', monospace" }}>
                          ${itemTotal}
                        </div>
                        <button
                          onClick={() => removeItem(item.itemId)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "#ef4444",
                            fontSize: "12px",
                            cursor: "pointer",
                            marginTop: "4px",
                            fontWeight: "bold"
                          }}
                        >
                          🗑️ Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Summary Sidebar Panel */}
            <div
              style={{
                background: "var(--bg2)",
                border: "1px solid var(--bd)",
                borderRadius: "20px",
                padding: "28px 24px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                height: "fit-content",
                position: "sticky",
                top: "100px"
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "var(--tx)", marginBottom: "20px", borderBottom: "1px solid var(--bd)", paddingBottom: "12px" }}>
                Order Summary
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "var(--tx2)" }}>
                  <span>Subtotal ({items.length} items)</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: "bold" }}>${totalAmount.toFixed(2)}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "var(--tx2)" }}>
                  <span>Delivery &amp; Tax</span>
                  <span style={{ color: "#34d399", fontWeight: "bold" }}>FREE</span>
                </div>

                <div style={{ height: "1px", background: "var(--bd)", margin: "8px 0" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: "16px", fontWeight: "bold", color: "var(--tx)" }}>Total Amount</span>
                  <span style={{ fontSize: "28px", fontWeight: "800", color: "var(--ac2)", fontFamily: "'JetBrains Mono', monospace" }}>
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {user ? (
                <Link
                  href="/checkout"
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, var(--ac), #6366f1)",
                    color: "#ffffff",
                    fontWeight: "bold",
                    fontSize: "15px",
                    textAlign: "center",
                    display: "block",
                    textDecoration: "none",
                    boxShadow: "0 6px 20px rgba(0,184,219,0.3)"
                  }}
                >
                  🚀 Proceed to Checkout
                </Link>
              ) : (
                <Link
                  href="/login?redirect=checkout"
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, var(--ac), #6366f1)",
                    color: "#ffffff",
                    fontWeight: "bold",
                    fontSize: "15px",
                    textAlign: "center",
                    display: "block",
                    textDecoration: "none",
                    boxShadow: "0 6px 20px rgba(0,184,219,0.3)"
                  }}
                >
                  🔒 Sign In to Checkout
                </Link>
              )}

              <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--bd)", display: "flex", flexDirection: "column", gap: "10px", fontSize: "12px", color: "var(--tx3)" }}>
                <div>⚡ Instant Digital Asset Access</div>
                <div>🔒 Secure bKash / Card Payment</div>
                <div>💬 24/7 Developer Support</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .cart-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
