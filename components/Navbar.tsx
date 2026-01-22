"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Coffee } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update background state
      setIsScrolled(currentScrollY > 10);
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/notre-carte", label: "Notre Carte" },
    { href: "/notre-histoire", label: "Notre Histoire" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Coffee
              className={`w-8 h-8 transition-colors ${
                isScrolled
                  ? "text-primary group-hover:text-secondary"
                  : "text-white group-hover:text-cream"
              }`}
            />
            <span
              className={`text-2xl font-bold transition-colors ${
                isScrolled
                  ? "text-charcoal group-hover:text-primary"
                  : "text-white group-hover:text-cream"
              }`}
            >
              Votre Café
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors hover:text-secondary ${
                  isScrolled ? "text-charcoal" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/order?table=1"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Commander
            </Link>
            <Link
              href="/admin/kitchen"
              className={`text-base font-medium transition-colors hover:text-accent ${
                isScrolled ? "text-charcoal" : "text-white"
              }`}
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? "text-charcoal hover:bg-cream"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-20 bottom-0 w-64 bg-white shadow-2xl z-[95]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-charcoal hover:text-primary text-lg font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/order?table=1"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-semibold text-center transition-all hover:scale-105 shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Commander
              </Link>
              <Link
                href="/admin/kitchen"
                className="text-charcoal hover:text-accent text-lg font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
