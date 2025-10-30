"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowUp,
  Code,
  Coffee,
  ExternalLink,
  Github,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "API Development",
    "Consulting",
    "Technical Writing",
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      url: "https://github.com/johndoe",
      color: "hover:text-gray-700 dark:hover:text-gray-300",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://linkedin.com/in/johndoe",
      color: "hover:text-blue-600",
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "https://twitter.com/johndoe",
      color: "hover:text-sky-500",
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://instagram.com/johndoe",
      color: "hover:text-pink-500",
    },
    {
      icon: Youtube,
      name: "YouTube",
      url: "https://youtube.com/johndoe",
      color: "hover:text-red-500",
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "hello@johndoe.dev",
      href: "mailto:hello@johndoe.dev",
    },
    {
      icon: Phone,
      text: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      text: "San Francisco, CA",
      href: "https://maps.google.com/?q=San+Francisco,+CA",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">John Doe</h3>
                <p className="text-sm text-muted-foreground">
                  Full Stack Developer
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Creating digital experiences that inspire and deliver results.
              Let's build something amazing together.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  asChild
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={social.color}
                  >
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity mr-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <div className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                    <span className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity mr-3" />
                    {service}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get In Touch</h4>
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <contact.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{contact.text}</span>
                </a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium mb-2">Stay Updated</p>
              <p className="text-xs text-muted-foreground mb-3">
                Get the latest articles and updates
              </p>
              <Button size="sm" className="w-full" asChild>
                <a href="#contact">
                  Subscribe
                  <ExternalLink className="h-3 w-3 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© {currentYear} John Doe. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 fill-current" />
                <span>and</span>
                <Coffee className="h-4 w-4 text-amber-600" />
              </div>
            </div>

            {/* Additional Links */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 hover:text-primary transition-colors group"
              >
                <span>Back to Top</span>
                <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-4 pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground">
              Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={scrollToTop}
        size="icon"
        className="fixed bottom-6 right-6 rounded-full shadow-lg z-50 h-12 w-12"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </footer>
  );
}
