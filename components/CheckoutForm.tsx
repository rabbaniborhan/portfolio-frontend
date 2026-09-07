"use client";

import React, { useState } from "react";

export default function CheckoutForm({ productSlug, productTitle, price }: { productSlug: string; productTitle: string; price: string }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("uddokta");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName || !email) return alert("Please provide name and email");
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 1200);
  }

  const downloadLink = `/downloads/${productSlug}.zip`;

  return (
    <div style={{ maxWidth: 520 }}>
      {!success ? (
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{productTitle}</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>{price}</div>

          <input placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ padding: "12px 14px", borderRadius: 8, border: "1px solid var(--bd)" }} />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" style={{ padding: "12px 14px", borderRadius: 8, border: "1px solid var(--bd)" }} />
          <input placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ padding: "12px 14px", borderRadius: 8, border: "1px solid var(--bd)" }} />

          <label style={{ fontSize: 13, fontWeight: 700 }}>Payment method</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid var(--bd)" }}>
            <option value="uddokta">UddoktaPay (bkash, Nagad, Rocket)</option>
            <option value="card">Card (VISA/Mastercard)</option>
          </select>

          <button disabled={processing} type="submit" style={{ background: "linear-gradient(135deg,var(--ac),#0096b8)", color: "#fff", padding: "12px 16px", borderRadius: 10, fontWeight: 800, border: "none" }}>
            {processing ? "Processing…" : `Pay ${price}`}
          </button>
          <div style={{ fontSize: 12, color: "var(--tx3)" }}>By clicking Pay you agree to our terms. Payment processed securely.</div>
        </form>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "var(--gr)" }}>Payment successful</div>
          <div style={{ fontSize: 14 }}>Thanks {fullName || "friend"} — your download is ready.</div>
          <a href={downloadLink} style={{ display: "inline-block", background: "#111", color: "#fff", padding: "10px 14px", borderRadius: 8, textDecoration: "none" }}>Download Now</a>
        </div>
      )}
    </div>
  );
}
