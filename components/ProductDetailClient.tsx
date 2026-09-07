"use client";

import React, { useEffect, useState } from "react";

type Faq = { q: string; a: string };

export default function ProductDetailClient({ faqs }: { faqs: Faq[] }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".rv, .rvl, .rvr").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function FaqItem({ q, a }: Faq) {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ border: "1px solid var(--bd)", borderRadius: "12px", marginBottom: "8px", overflow: "hidden" }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: "100%", textAlign: "left", padding: "18px 22px",
            background: "var(--bg2)", border: "none", color: "var(--tx)",
            fontSize: "14px", fontWeight: 600, cursor: "pointer",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            fontFamily: "'Space Grotesk', sans-serif", transition: "background .2s",
            gap: "12px"
          }}
        >
          {q}
          <span style={{
            fontSize: "18px", transition: "transform .3s", transform: open ? "rotate(45deg)" : "rotate(0)",
            flexShrink: 0, color: "var(--ac)", fontWeight: 300, lineHeight: 1
          }}>+</span>
        </button>
        {open && (
          <div style={{
            padding: "14px 22px 18px",
            fontSize: "13.5px", color: "var(--tx2)", lineHeight: 1.75,
            background: "var(--bg2)", borderTop: "1px solid var(--bd)"
          }}>
            {a}
          </div>
        )}
      </div>
    );
  }

  return <>{faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}</>;
}
