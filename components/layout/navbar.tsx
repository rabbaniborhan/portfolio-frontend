"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium   transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center ">
            <div className=" mr-10 md:mr-0 md:pr-3">
              <ThemeToggle />
            </div>

            <div className="relative z-50 md:hidden">
              {/* Toggle Button */}
              <button
                onClick={toggleMenu}
                className="p-2 text-foreground focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
              </button>

              {/* AnimatePresence for smooth open/close */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-12 right-0 w-48 bg-background border border-border rounded-2xl shadow-xl overflow-hidden"
                  >
                    <ul className="flex flex-col text-sm font-medium text-foreground">
                      {navigation.map((item) => (
                        <motion.li
                          key={item.name}
                          whileHover={{ backgroundColor: "hsl(var(--muted))" }}
                        >
                          <Link
                            href={item.href}
                            className="block px-5 py-3 hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
