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
      setIsScrolled(currentScrollY > 10);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/notre-carte", label: "Notre Carte" },
    { href: "/notre-histoire", label: "Notre Histoire" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled || isMobileMenuOpen
            ? "bg-white shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Hide text on mobile when menu is open */}
            <Link href="/" className="flex items-center space-x-2 group z-[110]">
              <Coffee
                className={`w-8 h-8 transition-colors ${
                  isScrolled || isMobileMenuOpen
                    ? "text-primary group-hover:text-secondary"
                    : "text-white group-hover:text-cream"
                }`}
              />
              <span
                className={`text-2xl font-bold transition-colors ${
                  isMobileMenuOpen ? "md:block hidden" : ""
                } ${
                  isScrolled || isMobileMenuOpen
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
              className={`md:hidden p-2 rounded-lg transition-colors z-[110] ${
                isMobileMenuOpen || isScrolled
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
      </nav>

      {/* Mobile Menu - Clean & Simple */}
      <div
        className={`md:hidden fixed inset-0 z-[95] transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Dark Backdrop */}
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel - Clean White */}
        <div
          className={`absolute top-0 right-0 w-72 bg-white shadow-2xl transform transition-transform duration-300 rounded-l-2xl ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ maxHeight: 'calc(100vh - 2rem)', top: '1rem' }}
        >
          {/* Navigation Links - No Header */}
          <div className="flex flex-col p-6 pt-24 space-y-2 bg-white overflow-y-auto h-full rounded-l-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-charcoal hover:bg-cream hover:text-primary text-base font-semibold transition-all py-3 px-4 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Commander Button */}
            <div className="pt-3">
              <Link
                href="/order?table=1"
                className="block bg-gradient-to-r from-primary to-[#6B0F2A] hover:from-primary/90 hover:to-[#6B0F2A]/90 text-white px-5 py-3 rounded-lg font-bold text-center transition-all hover:scale-105 shadow-lg text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Commander
              </Link>
            </div>

            {/* Admin Link */}
            <Link
              href="/admin/kitchen"
              className="text-accent hover:bg-accent/10 hover:text-accent text-base font-semibold transition-all py-3 px-4 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
