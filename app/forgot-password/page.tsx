"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    setResetLink("");

    try {
      const res = await api.post("/auth/forgot-password", { email });
      if (res.data.success) {
        setMessage(res.data.message || "Reset link generated!");
        if (res.data.resetLink) {
          setResetLink(res.data.resetLink);
        }
      } else {
        setError(res.data.message || "Failed to process request");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong. Please check your email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: "140px", paddingBottom: "80px", minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="container" style={{ maxWidth: "540px" }}>
        <div style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "24px", padding: "36px 44px", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "rgba(0,184,219,0.1)", border: "1px solid rgba(0,184,219,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "28px" }}>
              🔑
            </div>
            <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--tx)", marginBottom: "8px" }}>Forgot Password?</h1>
            <p style={{ fontSize: "14px", color: "var(--tx2)" }}>Enter your account email to receive a password reset link.</p>
          </div>

          {message && (
            <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e", fontSize: "13px", marginBottom: "20px" }}>
              ✅ {message}
              {resetLink && (
                <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid rgba(34,197,94,0.2)" }}>
                  <p style={{ fontSize: "12px", color: "var(--tx2)", marginBottom: "6px" }}>Click to proceed immediately:</p>
                  <Link href={resetLink} style={{ color: "var(--ac2)", fontWeight: "bold", textDecoration: "underline", fontSize: "13px" }}>
                    Proceed to Reset Password →
                  </Link>
                </div>
              )}
            </div>
          )}

          {error && (
            <div style={{ padding: "12px 14px", borderRadius: "10px", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", fontSize: "13px", marginBottom: "20px" }}>
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "var(--tx2)", marginBottom: "6px" }}>Email Address</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "var(--sf)",
                  border: "1px solid var(--bd)",
                  color: "var(--tx)",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, var(--ac), #6366f1)",
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(0,184,219,0.3)"
              }}
            >
              {loading ? "Sending link..." : "Send Reset Link"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--bd)" }}>
            <Link href="/login" style={{ color: "var(--ac2)", fontSize: "13px", fontWeight: "bold", textDecoration: "none" }}>
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
