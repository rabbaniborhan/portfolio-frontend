import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import type { Metadata } from "next";
import "./globals.css";

import { ReduxProvider } from "@/redux/provider";

export const metadata: Metadata = {
  title: "Borhan Rabbani — Full Stack Engineer",
  description:
    "Full Stack Engineer with 2.5+ years of experience in React, Next.js, Node.js, and AI-driven development. Based in Rajshahi, Bangladesh.",
  icons: {
    icon: [
      { url: "/favicon.jpg", type: "image/jpeg" },
    ],
    shortcut: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ReduxProvider>
          {/* Background orbs — Electric Purple & Violet Creator Palette */}
          <div style={{position:'fixed',borderRadius:'50%',filter:'blur(130px)',pointerEvents:'none',zIndex:0,width:'680px',height:'680px',background:'rgba(147,51,234,0.12)',top:'-180px',right:'-180px'}} />
          <div style={{position:'fixed',borderRadius:'50%',filter:'blur(110px)',pointerEvents:'none',zIndex:0,width:'520px',height:'520px',background:'rgba(168,85,247,0.1)',bottom:'20%',left:'-140px'}} />
          <div style={{position:'fixed',borderRadius:'50%',filter:'blur(90px)',pointerEvents:'none',zIndex:0,width:'360px',height:'360px',background:'rgba(192,132,252,0.08)',top:'55%',right:'8%'}} />
          <Navbar />
          <main style={{minHeight:'100vh'}}>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
