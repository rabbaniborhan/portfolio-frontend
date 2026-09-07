import { useEffect, useState } from "react";
import api from "@/lib/api";

const skills = [
  "React", "Next.js", "TypeScript", "Node.js", "MongoDB", "PostgreSQL",
  "REST APIs", "Docker", "AWS", "Git", "Redux", "Tailwind CSS",
];

export default function AboutSection() {
  const [about, setAbout] = useState<any>({
    name: "Borhan Rabbani",
    role: "Full Stack Engineer",
    location: "Rajshahi, BD",
    bio: "Hello! I'm Borhan, a passionate Full Stack Developer focused on building scalable, high-performance web applications and digital products. I specialize in the MERN stack, Next.js, and modern backend architectures, crafting clean, maintainable systems that are built to grow.",
  });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get("/about");
        if (res.data.success && res.data.data) {
          setAbout(res.data.data);
        }
      } catch (err) {
        console.error("Error loading About section:", err);
      }
    };
    fetchAbout();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".rv, .rvl, .rvr").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="sp">
      <div className="container">
        <div className="sh">
          <div className="lbl" style={{ justifyContent: "center" }}>About Me</div>
          <h2 className="stitle rv">My Professional Journey</h2>
          <p className="sdesc rv">
            Passionate full-stack developer with 3+ years of experience building scalable digital products.
          </p>
        </div>

        {/* 2-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "70px", alignItems: "center" }}
             className="about-grid">
          {/* Left: code block card */}
          <div className="rvl">
            <div style={{
              background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "var(--rl)",
              padding: "28px", fontFamily: "'JetBrains Mono', monospace", fontSize: "12.5px",
              lineHeight: 2, boxShadow: "0 8px 48px rgba(0,0,0,.4), 0 0 0 1px rgba(0,184,219,.06)",
              position: "relative", overflow: "hidden"
            }}>

              {/* Top glow bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, var(--ac), transparent)", borderRadius: "var(--rl) var(--rl) 0 0" }} />
              <span style={{ color: "var(--tx3)" }}>// About {about.name?.split(" ")[0]}</span><br />
              <span style={{ color: "var(--ac)" }}>const</span>{" "}
              <span style={{ color: "var(--ac2)" }}>developer</span>{" "}
              <span style={{ color: "var(--tx2)" }}>=</span>{" "}
              <span style={{ color: "var(--tx2)" }}>{"{"}</span><br />
              <span style={{ paddingLeft: "20px" }}>
                <span style={{ color: "var(--ac)" }}>name</span>
                <span style={{ color: "var(--tx2)" }}>:</span>{" "}
                <span style={{ color: "var(--gr)" }}>&quot;{about.name}&quot;</span>,
              </span><br />
              <span style={{ paddingLeft: "20px" }}>
                <span style={{ color: "var(--ac)" }}>role</span>
                <span style={{ color: "var(--tx2)" }}>:</span>{" "}
                <span style={{ color: "var(--gr)" }}>&quot;{about.title || about.role}&quot;</span>,
              </span><br />
              <span style={{ paddingLeft: "20px" }}>
                <span style={{ color: "var(--ac)" }}>location</span>
                <span style={{ color: "var(--tx2)" }}>:</span>{" "}
                <span style={{ color: "var(--gr)" }}>&quot;{about.location || "Rajshahi, BD"}&quot;</span>,
              </span><br />
              <span style={{ paddingLeft: "20px" }}>
                <span style={{ color: "var(--ac)" }}>available</span>
                <span style={{ color: "var(--tx2)" }}>:</span>{" "}
                <span style={{ color: "var(--ac2)" }}>true</span>,
              </span><br />
              <span style={{ paddingLeft: "20px" }}>
                <span style={{ color: "var(--ac)" }}>passion</span>
                <span style={{ color: "var(--tx2)" }}>:</span>{" "}
                <span style={{ color: "var(--gr)" }}>&quot;Building impactful products&quot;</span>,
              </span><br />
              <span style={{ color: "var(--tx2)" }}>{"}"}</span><br /><br />
              <span style={{ color: "var(--tx3)" }}>// Let&apos;s collaborate!</span><br />
              <span style={{ color: "var(--ac2)" }}>developer</span>
              <span style={{ color: "var(--tx2)" }}>.</span>
              <span style={{ color: "var(--ac)" }}>hire</span>
              <span style={{ color: "var(--tx2)" }}>(</span>
              <span style={{ color: "var(--gr)" }}>&quot;you&quot;</span>
              <span style={{ color: "var(--tx2)" }}>);</span>
            </div>

          </div>

          {/* Right: text + skills */}
          <div className="rvr">
            <p style={{ fontSize: "15px", color: "var(--tx2)", lineHeight: 1.85, marginBottom: "28px" }}>
              {about.bio}
            </p>

            {/* Skill badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {skills.map((s) => (
                <span key={s} className="skb-tag">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .about-grid{grid-template-columns:1fr !important;gap:40px !important;}
        }
      `}</style>
    </section>
  );
}
