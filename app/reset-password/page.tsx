"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await api.post("/auth/reset-password", { token, newPassword });
      if (res.data.success) {
        setMessage(res.data.message || "Password reset successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      } else {
        setError(res.data.message || "Failed to reset password");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid or expired reset token.");
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
              🔒
            </div>
            <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--tx)", marginBottom: "8px" }}>Set New Password</h1>
            <p style={{ fontSize: "14px", color: "var(--tx2)" }}>Enter a strong password for your account.</p>
          </div>

          {message && (
            <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e", fontSize: "13px", marginBottom: "20px", textAlign: "center" }}>
              ✅ {message}
              <div style={{ marginTop: "8px", fontSize: "12px" }}>Redirecting to sign in page...</div>
            </div>
          )}

          {error && (
            <div style={{ padding: "12px 14px", borderRadius: "10px", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", fontSize: "13px", marginBottom: "20px" }}>
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "var(--tx2)", marginBottom: "6px" }}>New Password</label>
              <input
                type="password"
                required
                placeholder="At least 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "var(--tx2)", marginBottom: "6px" }}>Confirm New Password</label>
              <input
                type="password"
                required
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? "Resetting password..." : "Reset Password"}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: "140px", textAlign: "center" }}>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
