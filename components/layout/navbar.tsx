"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";

const navigation = [
  { name: "Home",     href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Products", href: "/products" },
  { name: "Courses",  href: "/courses" },
  { name: "Blog",     href: "/blog" },
  { name: "Services", href: "/services" },
  { name: "Contact",  href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const hbRef = useRef<HTMLButtonElement>(null);
  const mmRef = useRef<HTMLDivElement>(null);

  const cartItems = useCartStore((state) => state.items);
  const { user, checkAuth, logout } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored || "dark");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const toggleMenu = () => {
    const open = !menuOpen;
    setMenuOpen(open);
    if (open) {
      hbRef.current?.classList.add("open");
      mmRef.current?.classList.add("open");
    } else {
      hbRef.current?.classList.remove("open");
      mmRef.current?.classList.remove("open");
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    hbRef.current?.classList.remove("open");
    mmRef.current?.classList.remove("open");
  };

  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <>
      <nav className={`nav-bar${scrolled ? " scrolled" : ""}`}>
        <Link href="/" className="logo" style={{ zIndex: 10 }}>Borhan<span>.dev</span></Link>

        {/* Desktop nav */}
        <div className="nl">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", zIndex: 10 }}>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          </button>

          {/* Auth State Links */}
          {user ? (
            <Link
              href="/dashboard"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 16px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, rgba(0,184,219,0.15), rgba(99,102,241,0.15))",
                border: "1px solid rgba(0,184,219,0.35)",
                color: "var(--ac2)",
                fontWeight: "bold",
                fontSize: "13px",
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(0,184,219,0.15)"
              }}
            >
              <span>📚</span> My Learning Library
            </Link>
          ) : (
            <Link href="/login" style={{ fontSize: "13px", color: "var(--tx)", padding: "7px 14px", border: "1px solid var(--bd)", borderRadius: "10px", textDecoration: "none", fontWeight: "600" }}>
              Sign In
            </Link>
          )}

          <Link href="/hire" className="nh">⚡ Hire Me</Link>
          <button ref={hbRef} className="hb" onClick={toggleMenu} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div ref={mmRef} className="mm">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={pathname === item.href ? "active" : ""}
            onClick={closeMenu}
          >
            {item.name}
          </Link>
        ))}
        {user ? (
          <Link
            href="/dashboard"
            onClick={closeMenu}
            style={{
              padding: "10px 16px",
              color: "var(--ac2)",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none"
            }}
          >
            📚 My Learning Library
          </Link>
        ) : (
          <Link href="/login" onClick={closeMenu} style={{ padding: "8px 16px" }}>
            Sign In
          </Link>
        )}
        <button className="theme-toggle" onClick={toggleTheme} style={{ margin: "8px 16px", alignSelf: "flex-start" }} aria-label="Toggle theme">
          <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        </button>
        <div style={{ marginTop: "12px" }}>
          <Link href="/hire" className="bp" style={{ display: "block", textAlign: "center" }} onClick={closeMenu}>
            ⚡ Hire Me
          </Link>
        </div>
      </div>
    </>
  );
}

