"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import api from "@/lib/api";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  const total = getTotal();

  // Check if physical shipping is required (i.e. contains a physical book)
  // Let's check item names or assume digital unless we mark it.
  // We can just render shipping fields as optional or required.
  const requiresShipping = items.some((item) => item.title.toLowerCase().includes("physical") || item.title.toLowerCase().includes("book") && !item.title.toLowerCase().includes("ebook"));

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const orderData = {
        items: items.map((i) => ({
          itemId: i.itemId,
          itemType: i.itemType,
          quantity: i.quantity,
        })),
        billingAddress: {
          fullName,
          email,
          addressLine1,
          city,
          postalCode,
          country,
        },
        shippingAddress: requiresShipping ? {
          fullName,
          addressLine1,
          city,
          postalCode,
          country,
          phone,
        } : undefined,
      };

      const res = await api.post("/orders/checkout", orderData);
      if (res.data.success) {
        setSuccess(true);
        clearCart();
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setError(res.data.message || "Checkout failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Payment and checkout failed");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !success) {
    return (
      <div style={{ paddingTop: "100px", textAlign: "center", minHeight: "80vh" }}>
        <p>No items in cart to checkout.</p>
        <Link href="/products" className="buyb" style={{ marginTop: "20px" }}>Shop products</Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "60px", minHeight: "80vh" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "24px" }}>Checkout</h1>

        {success ? (
          <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgb(16, 185, 129)", color: "rgb(16, 185, 129)", borderRadius: "12px", padding: "32px", textAlign: "center" }}>
            <span style={{ fontSize: "48px", display: "block", marginBottom: "16px" }}>🎉</span>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>Payment Successful!</h3>
            <p>Your order has been created and digital access has been granted.</p>
            <p style={{ fontSize: "14px", color: "var(--tx3)", marginTop: "8px" }}>Redirecting to your student/customer dashboard...</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
            {/* Left Column: Form */}
            <form onSubmit={handlePlaceOrder} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: "var(--r)", padding: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>Billing Information</h3>
                
                {error && (
                  <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgb(239, 68, 68)", color: "rgb(239, 68, 68)", borderRadius: "8px", padding: "12px", fontSize: "14px", marginBottom: "16px" }}>
                    {error}
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "12px", color: "var(--tx3)" }}>Full Name</label>
                    <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ background: "var(--bg)", border: "1px solid var(--bd)", borderRadius: "6px", padding: "10px", color: "var(--tx)" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "12px", color: "var(--tx3)" }}>Billing Email</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ background: "var(--bg)", border: "1px solid var(--bd)", borderRadius: "6px", padding: "10px", color: "var(--tx)" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "12px", color: "var(--tx3)" }}>Address Line 1</label>
                    <input type="text" required value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} style={{ background: "var(--bg)", border: "1px solid var(--bd)", borderRadius: "6px", padding: "10px", color: "var(--tx)" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <label style={{ fontSize: "12px", color: "var(--tx3)" }}>City</label>
                      <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} style={{ background: "var(--bg)", border: "1px solid var(--bd)", borderRadius: "6px", padding: "10px", color: "var(--tx)" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <label style={{ fontSize: "12px", color: "var(--tx3)" }}>Postal Code</label>
                      <input type="text" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} style={{ background: "var(--bg)", border: "1px solid var(--bd)", borderRadius: "6px", padding: "10px", color: "var(--tx)" }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "12px", color: "var(--tx3)" }}>Country</label>
                    <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)} style={{ background: "var(--bg)", border: "1px solid var(--bd)", borderRadius: "6px", padding: "10px", color: "var(--tx)" }} />
                  </div>
                </div>
              </div>

              {requiresShipping && (
                <div style={{ background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: "var(--r)", padding: "24px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>Shipping Address (Physical Book)</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <label style={{ fontSize: "12px", color: "var(--tx3)" }}>Phone Number</label>
                      <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} style={{ background: "var(--bg)", border: "1px solid var(--bd)", borderRadius: "6px", padding: "10px", color: "var(--tx)" }} />
                    </div>
                  </div>
                </div>
              )}

              <button type="submit" disabled={loading} className="buyb" style={{ padding: "16px", fontSize: "16px", fontWeight: "bold", width: "100%", cursor: "pointer", border: "none" }}>
                {loading ? "Processing Payment..." : `Pay $${total.toFixed(2)} & Place Order`}
              </button>
            </form>

            {/* Right Column: Order Summary */}
            <div style={{ background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: "var(--r)", padding: "24px", height: "fit-content" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>Order Summary</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", borderBottom: "1px solid var(--bd)", paddingBottom: "16px", marginBottom: "16px" }}>
                {items.map((i) => (
                  <div key={i.itemId} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <div>
                      <span>{i.title}</span>
                      {i.quantity > 1 && <span style={{ color: "var(--tx3)", marginLeft: "6px" }}>x{i.quantity}</span>}
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: "bold" }}>
                      ${(i.price * i.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "bold" }}>
                <span>Total Amount:</span>
                <span style={{ color: "var(--ac)", fontFamily: "'JetBrains Mono', monospace" }}>
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Inline fallback Link implementation if not imported
import Link from "next/link";
