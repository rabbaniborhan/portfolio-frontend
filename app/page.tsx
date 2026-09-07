"use client";

import { BlogSection } from "@/components/section/Blog-section";
import { ContactSection } from "@/components/section/Contact-section";
import { CTASection } from "@/components/section/CTA-section";
import { HeroSection } from "@/components/section/Hero";
import { PricingSection } from "@/components/section/Pricing-section";
import { ProjectsSection } from "@/components/section/Projects-section";
import { ProductsSection } from "@/components/section/Products-section";
import { ServicesSection } from "@/components/section/Services-section";
import { SkillsSection } from "@/components/section/Skills-section";
import { TestimonialsSection } from "@/components/section/Testimonials-section";
import { useEffect, useState } from "react";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <ProjectsSection />
      <ProductsSection />
      <SkillsSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
      <CTASection />


      {/* Scroll to top */}
      <button
        className={`sctop${showScrollTop ? " show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        ↑
      </button>

      {/* WhatsApp floating button */}
      <div className="fab-stack">
        <a
          href="https://wa.me/8801XXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="fab wa-btn"
          aria-label="Chat on WhatsApp"
        >
          <span className="fab-label">Chat on WhatsApp</span>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" width="27" height="27">
              <path fill="currentColor" d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12.04 2.5c-5.25 0-9.5 4.25-9.5 9.5 0 1.67.44 3.3 1.27 4.74L2.5 21.5l4.9-1.28a9.46 9.46 0 0 0 4.63 1.18h.01c5.24 0 9.5-4.25 9.5-9.5 0-2.54-.99-4.92-2.78-6.72A9.43 9.43 0 0 0 12.04 2.5z" />
            </svg>
          </span>
        </a>
      </div>
    </>
  );
}
