import AboutSection from "@/components/section/About-section";
import { BlogSection } from "@/components/section/Blog-section";
import { ContactSection } from "@/components/section/Contact-section";
import { HeroSection } from "@/components/section/Hero";
import { ProjectsSection } from "@/components/section/Projects-section";
import { SkillsSection } from "@/components/section/Skills-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
