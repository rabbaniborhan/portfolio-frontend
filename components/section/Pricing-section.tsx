"use client";

import { useEffect } from "react";

const plans = [
  {
    name: "Hourly Support",
    sub: "Bug fixes, small features, consultations",
    price: "$25",
    unit: "/ hour",
    featured: false,
    features: [
      "Quick turnaround (same day)",
      "Bug fixes and small features",
      "Code review and consultation",
      "Email communication",
      "No minimum hours",
      "Dedicated attention",
    ],
    btn: "Book Hours",
    btnClass: "ol",
  },
  {
    name: "Full Stack Project",
    sub: "Complete web application built to spec",
    price: "$500",
    unit: "/ project",
    featured: true,
    popular: "Most Popular",
    features: [
      "Complete MERN application",
      "MongoDB + Redis setup",
      "REST API with documentation",
      "Admin dashboard included",
      "Docker production deployment",
      "14 days post-launch support",
      "Source code + documentation",
      "2-week delivery guarantee",
    ],
    btn: "⚡ Hire Now",
    btnClass: "sl2",
  },
  {
    name: "AI Integration",
    sub: "AI-powered automation for your business",
    price: "$800",
    unit: "/ project",
    featured: false,
    features: [
      "Full Stack Project (everything above)",
      "GPT-4 / Claude integration",
      "Custom AI workflow design",
      "Chatbot or automation pipeline",
      "30 days post-launch support",
      "Performance analytics setup",
      "Training session included",
      "Priority communication",
    ],
    btn: "Get Started",
    btnClass: "ol",
  },
];

export function PricingSection() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".rv, .rvl, .rvr").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="sp" style={{ background: "linear-gradient(180deg,transparent,rgba(0,184,219,.025),transparent)" }}>

      <div className="container">
        <div className="sh">
          <div className="lbl" style={{ justifyContent: "center" }}>Hire Me</div>
          <h2 className="stitle rv">Flexible Packages</h2>
        </div>
        <div className="prg">
          {plans.map((p) => (
            <div key={p.name} className={`prc rv${p.featured ? " feat" : ""}`}>
              {p.popular && <div className="pp2">{p.popular}</div>}
              <div className="prpl">{p.name}</div>
              <div className="prsb">{p.sub}</div>
              <div className="prpr">{p.price} <span className="pru">{p.unit}</span></div>
              <div className="prdv" />
              <ul className="prft">
                {p.features.map((f) => (
                  <li key={f}><span className="prch">✓</span>{f}</li>
                ))}
              </ul>
              <button className={`prb ${p.btnClass}`} onClick={scrollToContact}>
                {p.btn}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
