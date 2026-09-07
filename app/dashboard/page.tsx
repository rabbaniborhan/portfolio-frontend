"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

export default function StudentDashboard() {
  const { user, checked, loading: authLoading, logout } = useAuthStore();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"courses" | "downloads" | "orders" | "settings">("courses");
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (checked && !user) {
      router.push("/login");
    }
  }, [user, checked, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [enrollmentRes, ordersRes] = await Promise.all([
          api.get("/courses/my-enrollments"),
          api.get("/orders/my-orders"),
        ]);
        if (enrollmentRes.data.success) {
          setEnrollments(enrollmentRes.data.enrollments || []);
        }
        if (ordersRes.data.success) {
          setOrders(ordersRes.data.orders || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (authLoading || !checked || !user) {
    return (
      <div style={{ paddingTop: "140px", textAlign: "center", minHeight: "80vh" }}>
        <div style={{ display: "inline-block", width: "42px", height: "42px", border: "3px solid rgba(0,184,219,0.2)", borderTopColor: "var(--ac2, #38bdf8)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <p style={{ marginTop: "16px", color: "var(--tx2)", fontSize: "15px" }}>Loading your learning dashboard...</p>
      </div>
    );
  }

  // Extract products downloaded from completed paid orders
  const downloads = orders
    .filter((order) => order.paymentStatus === "PAID")
    .flatMap((order) => order.items)
    .filter((item) => item.itemType === "Product");

  const averageProgress = enrollments.length > 0
    ? Math.round(enrollments.reduce((acc, curr) => acc + (curr.progress || 0), 0) / enrollments.length)
    : 0;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div style={{ paddingTop: "96px", paddingBottom: "80px", minHeight: "90vh", background: "var(--bg)" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>

        {/* Executive Student Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(0,184,219,0.12), rgba(99,102,241,0.08))",
            border: "1px solid var(--bd)",
            borderRadius: "20px",
            padding: "28px 32px",
            marginBottom: "32px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--ac), #6366f1)",
                color: "#ffffff",
                fontSize: "28px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 20px rgba(0,184,219,0.3)",
                border: "2px solid rgba(255,255,255,0.2)"
              }}
            >
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--tx)" }}>Welcome, {user.name} 👋</h1>
                <span style={{ fontSize: "11px", fontWeight: 800, padding: "3px 10px", borderRadius: "14px", background: "rgba(0,184,219,0.15)", color: "var(--ac2)", border: "1px solid rgba(0,184,219,0.3)", fontFamily: "'JetBrains Mono', monospace" }}>
                  STUDENT PORTAL
                </span>
              </div>
              <p style={{ fontSize: "14px", color: "var(--tx2)", marginTop: "4px" }}>{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: "9px 18px",
              borderRadius: "10px",
              background: "rgba(239, 68, 68, 0.12)",
              color: "#ef4444",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              fontWeight: "bold",
              fontSize: "13px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            🚪 Sign Out
          </button>
        </div>

        {/* Metric Cards Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "36px" }}>
          <div style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "16px", padding: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(0,184,219,0.1)", color: "var(--ac2)", fontSize: "22px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              📚
            </div>
            <div>
              <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--tx)", fontFamily: "'JetBrains Mono', monospace" }}>{enrollments.length}</div>
              <div style={{ fontSize: "12px", color: "var(--tx3)" }}>Enrolled Courses</div>
            </div>
          </div>

          <div style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "16px", padding: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(52,211,153,0.1)", color: "#34d399", fontSize: "22px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              ⚡
            </div>
            <div>
              <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--tx)", fontFamily: "'JetBrains Mono', monospace" }}>{averageProgress}%</div>
              <div style={{ fontSize: "12px", color: "var(--tx3)" }}>Average Course Progress</div>
            </div>
          </div>

          <div style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "16px", padding: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(167,139,250,0.1)", color: "#a78bfa", fontSize: "22px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              💾
            </div>
            <div>
              <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--tx)", fontFamily: "'JetBrains Mono', monospace" }}>{downloads.length}</div>
              <div style={{ fontSize: "12px", color: "var(--tx3)" }}>Digital Downloads</div>
            </div>
          </div>

          <div style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "16px", padding: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(251,191,36,0.1)", color: "#fbbf24", fontSize: "22px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              💳
            </div>
            <div>
              <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--tx)", fontFamily: "'JetBrains Mono', monospace" }}>{orders.length}</div>
              <div style={{ fontSize: "12px", color: "var(--tx3)" }}>Total Completed Orders</div>
            </div>
          </div>
        </div>

        {/* Main Workspace Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "28px" }} className="dashboard-grid">

          {/* Left Navigation Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { id: "courses", label: "📚 My Courses", count: enrollments.length },
              { id: "downloads", label: "💾 Downloads", count: downloads.length },
              { id: "orders", label: "💳 Purchase History", count: orders.length },
              { id: "settings", label: "⚙️ Account Profile" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  textAlign: "left",
                  padding: "12px 18px",
                  borderRadius: "12px",
                  border: "1px solid " + (activeTab === tab.id ? "var(--ac2)" : "transparent"),
                  background: activeTab === tab.id ? "linear-gradient(135deg, var(--ac), #6366f1)" : "var(--bg2)",
                  color: activeTab === tab.id ? "#ffffff" : "var(--tx)",
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: activeTab === tab.id ? "0 4px 16px rgba(0,184,219,0.3)" : "none"
                }}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "10px", background: activeTab === tab.id ? "rgba(255,255,255,0.25)" : "var(--sf)", color: activeTab === tab.id ? "#fff" : "var(--tx2)" }}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Right Main Content Area */}
          <div style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "20px", padding: "32px", minHeight: "450px" }}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ display: "inline-block", width: "36px", height: "36px", border: "3px solid rgba(0,184,219,0.2)", borderTopColor: "var(--ac2)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                <p style={{ marginTop: "12px", color: "var(--tx2)", fontSize: "14px" }}>Fetching your account data...</p>
              </div>
            ) : (
              <>
                {/* Courses Tab */}
                {activeTab === "courses" && (
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                      <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "var(--tx)" }}>Enrolled Courses</h3>
                      <Link href="/courses" style={{ fontSize: "13px", color: "var(--ac2)", fontWeight: "bold", textDecoration: "none" }}>
                        Browse All Courses →
                      </Link>
                    </div>

                    {enrollments.length === 0 ? (
                      <div style={{ textAlign: "center", padding: "60px 20px", border: "1px dashed var(--bd)", borderRadius: "16px", background: "var(--sf)" }}>
                        <div style={{ fontSize: "44px", marginBottom: "12px" }}>📚</div>
                        <h4 style={{ fontSize: "18px", fontWeight: "bold", color: "var(--tx)", marginBottom: "8px" }}>No Courses Enrolled Yet</h4>
                        <p style={{ color: "var(--tx2)", fontSize: "14px", marginBottom: "20px", maxWidth: "420px", margin: "0 auto 20px" }}>
                          Enroll in expert-led full-stack development and AI engineering courses to kickstart your career.
                        </p>
                        <Link href="/courses" style={{ padding: "10px 24px", borderRadius: "10px", background: "linear-gradient(135deg, var(--ac), #0096b8)", color: "#fff", fontWeight: "bold", fontSize: "13px", textDecoration: "none", display: "inline-block" }}>
                          Explore Available Courses
                        </Link>
                      </div>
                    ) : (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
                        {enrollments.map((en) => {
                          const course = en.courseId;
                          if (!course) return null;

                          return (
                            <div key={en._id} style={{ border: "1px solid var(--bd)", borderRadius: "16px", padding: "20px", background: "var(--sf)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
                              <div style={{ flex: 1, minWidth: "240px" }}>
                                <div style={{ fontSize: "11px", fontWeight: 800, color: "var(--ac2)", textTransform: "uppercase", marginBottom: "4px" }}>
                                  {course.category || "Full Stack"}
                                </div>
                                <h4 style={{ fontSize: "17px", fontWeight: "bold", color: "var(--tx)", marginBottom: "12px" }}>{course.title}</h4>

                                {/* Progress Bar */}
                                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                  <div style={{ flex: 1, height: "8px", background: "var(--bd)", borderRadius: "10px", overflow: "hidden" }}>
                                    <div style={{ width: `${en.progress || 0}%`, height: "100%", background: "linear-gradient(90deg, var(--ac), #6366f1)", borderRadius: "10px" }} />
                                  </div>
                                  <span style={{ fontSize: "12px", fontWeight: "bold", color: "var(--ac2)", fontFamily: "'JetBrains Mono', monospace" }}>
                                    {en.progress || 0}% Complete
                                  </span>
                                </div>
                              </div>

                              <Link
                                href={`/courses/learn/${course.slug || course._id}`}
                                style={{
                                  padding: "11px 22px",
                                  borderRadius: "10px",
                                  background: "linear-gradient(135deg, var(--ac), #0096b8)",
                                  color: "#ffffff",
                                  fontWeight: "bold",
                                  fontSize: "13px",
                                  textDecoration: "none",
                                  boxShadow: "0 4px 14px rgba(0,184,219,0.25)",
                                  whiteSpace: "nowrap"
                                }}
                              >
                                ▶️ Continue Learning
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Downloads Tab */}
                {activeTab === "downloads" && (
                  <div>
                    <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "var(--tx)", marginBottom: "20px" }}>Digital Assets & Downloads</h3>
                    {downloads.length === 0 ? (
                      <div style={{ textAlign: "center", padding: "60px 20px", border: "1px dashed var(--bd)", borderRadius: "16px", background: "var(--sf)" }}>
                        <div style={{ fontSize: "44px", marginBottom: "12px" }}>💾</div>
                        <h4 style={{ fontSize: "18px", fontWeight: "bold", color: "var(--tx)", marginBottom: "8px" }}>No Digital Downloads</h4>
                        <p style={{ color: "var(--tx2)", fontSize: "14px", marginBottom: "20px" }}>
                          Purchased templates, source code packages, and eBooks will appear here for instant download.
                        </p>
                        <Link href="/products" style={{ padding: "10px 24px", borderRadius: "10px", background: "linear-gradient(135deg, var(--ac), #0096b8)", color: "#fff", fontWeight: "bold", fontSize: "13px", textDecoration: "none", display: "inline-block" }}>
                          Browse Digital Products
                        </Link>
                      </div>
                    ) : (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
                        {downloads.map((item, idx) => (
                          <div key={idx} style={{ border: "1px solid var(--bd)", borderRadius: "14px", padding: "18px 20px", background: "var(--sf)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                            <div>
                              <span style={{ fontSize: "10px", fontWeight: 800, padding: "2px 8px", borderRadius: "10px", background: "rgba(0,184,219,0.12)", color: "var(--ac2)", textTransform: "uppercase" }}>
                                DIGITAL PRODUCT
                              </span>
                              <h4 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--tx)", marginTop: "4px" }}>{item.title}</h4>
                              <div style={{ fontSize: "12px", color: "var(--tx3)", marginTop: "2px" }}>Instant Digital Download Package</div>
                            </div>

                            <button
                              onClick={() => alert(`Downloading asset package: ${item.title}.zip`)}
                              style={{
                                padding: "10px 20px",
                                borderRadius: "10px",
                                background: "rgba(0,184,219,0.15)",
                                color: "var(--ac2)",
                                border: "1px solid rgba(0,184,219,0.3)",
                                fontWeight: "bold",
                                fontSize: "13px",
                                cursor: "pointer",
                                whiteSpace: "nowrap"
                              }}
                            >
                              ⬇️ Download Asset
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === "orders" && (
                  <div>
                    <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "var(--tx)", marginBottom: "20px" }}>Purchase History</h3>
                    {orders.length === 0 ? (
                      <div style={{ textAlign: "center", padding: "60px 20px", border: "1px dashed var(--bd)", borderRadius: "16px", background: "var(--sf)" }}>
                        <div style={{ fontSize: "44px", marginBottom: "12px" }}>💳</div>
                        <h4 style={{ fontSize: "18px", fontWeight: "bold", color: "var(--tx)", marginBottom: "8px" }}>No Purchase History</h4>
                        <p style={{ color: "var(--tx2)", fontSize: "14px" }}>Your completed orders and receipts will be stored here.</p>
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {orders.map((order) => (
                          <div key={order._id} style={{ border: "1px solid var(--bd)", borderRadius: "14px", padding: "20px", background: "var(--sf)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                            <div>
                              <div style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", color: "var(--tx3)" }}>
                                ORDER #{order._id.slice(-8).toUpperCase()}
                              </div>
                              <div style={{ fontSize: "15px", fontWeight: "bold", color: "var(--tx)", marginTop: "4px" }}>
                                {order.items.map((it: any) => `${it.title} (x${it.quantity})`).join(", ")}
                              </div>
                              <div style={{ fontSize: "12px", color: "var(--tx3)", marginTop: "4px" }}>
                                Date: {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </div>
                            </div>

                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontSize: "18px", fontWeight: "800", color: "var(--ac2)", fontFamily: "'JetBrains Mono', monospace" }}>
                                ${order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}
                              </div>
                              <span style={{
                                fontSize: "10px", fontWeight: "800", padding: "3px 10px", borderRadius: "10px",
                                background: order.paymentStatus === "PAID" ? "rgba(34,197,94,0.15)" : "rgba(245,158,11,0.15)",
                                color: order.paymentStatus === "PAID" ? "#22c55e" : "#f59e0b",
                                border: order.paymentStatus === "PAID" ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(245,158,11,0.3)",
                                display: "inline-block", marginTop: "4px"
                              }}>
                                {order.paymentStatus}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <div>
                    <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "var(--tx)", marginBottom: "20px" }}>Account &amp; Security Profile</h3>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "520px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div>
                          <label style={{ fontSize: "12px", fontWeight: "bold", color: "var(--tx2)", display: "block", marginBottom: "6px" }}>Full Name</label>
                          <input type="text" disabled value={user.name} style={{ width: "100%", background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: "8px", padding: "12px", color: "var(--tx)", fontSize: "14px" }} />
                        </div>

                        <div>
                          <label style={{ fontSize: "12px", fontWeight: "bold", color: "var(--tx2)", display: "block", marginBottom: "6px" }}>Email Address</label>
                          <input type="text" disabled value={user.email} style={{ width: "100%", background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: "8px", padding: "12px", color: "var(--tx)", fontSize: "14px" }} />
                        </div>

                        <div>
                          <label style={{ fontSize: "12px", fontWeight: "bold", color: "var(--tx2)", display: "block", marginBottom: "6px" }}>Account Role</label>
                          <input type="text" disabled value={user.role || "STUDENT"} style={{ width: "100%", background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: "8px", padding: "12px", color: "var(--ac2)", fontSize: "14px", fontWeight: "bold" }} />
                        </div>
                      </div>

                      {/* Change Password Sub-Form */}
                      <div style={{ borderTop: "1px solid var(--bd)", paddingTop: "24px" }}>
                        <h4 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--tx)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                          <span>🔑</span> Change Account Password
                        </h4>

                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            const formEl = e.target as HTMLFormElement;
                            const currentPassword = (formEl.elements.namedItem("currentPassword") as HTMLInputElement).value;
                            const newPassword = (formEl.elements.namedItem("newPassword") as HTMLInputElement).value;
                            const confirmNewPassword = (formEl.elements.namedItem("confirmNewPassword") as HTMLInputElement).value;

                            if (newPassword !== confirmNewPassword) {
                              alert("New passwords do not match!");
                              return;
                            }

                            try {
                              const res = await api.post("/auth/change-password", { currentPassword, newPassword });
                              if (res.data.success) {
                                alert("Password updated successfully!");
                                formEl.reset();
                              } else {
                                alert(res.data.message || "Failed to update password");
                              }
                            } catch (err: any) {
                              alert(err.response?.data?.message || "Failed to change password. Check your current password.");
                            }
                          }}
                          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
                        >
                          <div>
                            <label style={{ fontSize: "12px", fontWeight: "bold", color: "var(--tx2)", display: "block", marginBottom: "6px" }}>Current Password</label>
                            <input type="password" name="currentPassword" required placeholder="••••••••" style={{ width: "100%", background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: "8px", padding: "10px 12px", color: "var(--tx)", fontSize: "14px", outline: "none" }} />
                          </div>

                          <div>
                            <label style={{ fontSize: "12px", fontWeight: "bold", color: "var(--tx2)", display: "block", marginBottom: "6px" }}>New Password</label>
                            <input type="password" name="newPassword" required placeholder="At least 6 characters" style={{ width: "100%", background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: "8px", padding: "10px 12px", color: "var(--tx)", fontSize: "14px", outline: "none" }} />
                          </div>

                          <div>
                            <label style={{ fontSize: "12px", fontWeight: "bold", color: "var(--tx2)", display: "block", marginBottom: "6px" }}>Confirm New Password</label>
                            <input type="password" name="confirmNewPassword" required placeholder="Re-enter new password" style={{ width: "100%", background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: "8px", padding: "10px 12px", color: "var(--tx)", fontSize: "14px", outline: "none" }} />
                          </div>

                          <button
                            type="submit"
                            style={{
                              padding: "11px",
                              borderRadius: "10px",
                              background: "linear-gradient(135deg, var(--ac), #6366f1)",
                              color: "#ffffff",
                              fontWeight: "bold",
                              fontSize: "13px",
                              border: "none",
                              cursor: "pointer",
                              marginTop: "4px"
                            }}
                          >
                            Update Password
                          </button>
                        </form>
                      </div>

                      <div style={{ borderTop: "1px solid var(--bd)", paddingTop: "20px" }}>
                        <button
                          onClick={handleLogout}
                          style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "10px",
                            background: "rgba(239,68,68,0.12)",
                            color: "#ef4444",
                            border: "1px solid rgba(239,68,68,0.3)",
                            fontWeight: "bold",
                            fontSize: "14px",
                            cursor: "pointer"
                          }}
                        >
                          🚪 Sign Out of Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
