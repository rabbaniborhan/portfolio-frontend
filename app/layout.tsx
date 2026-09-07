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
    icon: "/logo2.png",
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
          {/* Background orbs — cyan/navy palette */}
          <div style={{position:'fixed',borderRadius:'50%',filter:'blur(120px)',pointerEvents:'none',zIndex:0,width:'640px',height:'640px',background:'rgba(0,184,219,0.07)',top:'-180px',right:'-180px'}} />
          <div style={{position:'fixed',borderRadius:'50%',filter:'blur(100px)',pointerEvents:'none',zIndex:0,width:'480px',height:'480px',background:'rgba(0,150,184,0.05)',bottom:'20%',left:'-140px'}} />
          <div style={{position:'fixed',borderRadius:'50%',filter:'blur(80px)',pointerEvents:'none',zIndex:0,width:'320px',height:'320px',background:'rgba(129,140,248,0.04)',top:'55%',right:'8%'}} />
          <Navbar />
          <main style={{minHeight:'100vh'}}>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
