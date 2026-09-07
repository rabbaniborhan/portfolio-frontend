"use client";

import { ContactSection } from "@/components/section/Contact-section";
import { CTASection } from "@/components/section/CTA-section";

export default function ContactPage() {
  return (
    <div style={{ paddingTop: "64px" }}>
      <ContactSection />
      <CTASection />
    </div>
  );
}
