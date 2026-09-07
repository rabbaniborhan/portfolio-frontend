"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data.success) {
        setUser(res.data.user);
        if (res.data.user.role === "ADMIN") {
          window.location.href = "http://localhost:3001/";
        } else {
          router.push("/dashboard");
        }
      } else {
        setError(res.data.message || "Failed to log in");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "100px",
        paddingBottom: "60px",
        background: "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(0, 184, 219, 0.08), transparent 80%), var(--bg)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Ambient Glow Orbs */}
      <div style={{ position: "absolute", top: "20%", left: "15%", width: "320px", height: "320px", background: "radial-gradient(circle, rgba(0,184,219,0.08) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "15%", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />

      <div className="container" style={{ maxWidth: "540px", position: "relative", zIndex: 2 }}>
        <div
          style={{
            background: "var(--bg2)",
            border: "1px solid var(--bd)",
            borderRadius: "24px",
            padding: "36px 44px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Top Gradient Highlight Line */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent, var(--ac), #6366f1, transparent)" }} />

          {/* Header Icon */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "rgba(0,184,219,0.1)", border: "1px solid rgba(0,184,219,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "28px" }}>
              🔑
            </div>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "var(--tx)", marginBottom: "8px" }}>Welcome Back</h1>
            <p style={{ fontSize: "14px", color: "var(--tx2)", lineHeight: 1.5 }}>
              Sign in to access your student portal, courses, and purchased files.
            </p>
          </div>

          {error && (
            <div style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444", borderRadius: "12px", padding: "14px", fontSize: "13px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>⚠️</span> <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "var(--tx2)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: ".04em" }}>
                📧 Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  width: "100%",
                  background: "var(--sf)",
                  border: "1px solid var(--bd)",
                  borderRadius: "12px",
                  padding: "13px 16px",
                  color: "var(--tx)",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.2s"
                }}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ fontSize: "12px", fontWeight: "bold", color: "var(--tx2)", textTransform: "uppercase", letterSpacing: ".04em" }}>
                  🔒 Password
                </label>
                <Link href="/forgot-password" style={{ fontSize: "12px", color: "var(--ac2)", fontWeight: "700", textDecoration: "none" }}>
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  background: "var(--sf)",
                  border: "1px solid var(--bd)",
                  borderRadius: "12px",
                  padding: "13px 16px",
                  color: "var(--tx)",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.2s"
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, var(--ac), #6366f1)",
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "15px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(0,184,219,0.3)",
                marginTop: "4px"
              }}
            >
              {loading ? "Signing in..." : "🚀 Sign In to Account"}
            </button>
          </form>

          <div style={{ marginTop: "28px", textAlign: "center", fontSize: "14px", color: "var(--tx3)", paddingTop: "20px", borderTop: "1px solid var(--bd)" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color: "var(--ac2)", fontWeight: "800", textDecoration: "none" }}>
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
