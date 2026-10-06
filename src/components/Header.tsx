import React, { useState, useEffect } from 'react';
import { Menu, X, CalendarDays, Phone } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-header border-b border-[#2A1E17]/10 shadow-sm py-3.5'
          : 'bg-[#FAF7F2]/90 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark (Zone 1) */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex flex-col items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded"
          >
            <span className="font-serif text-2xl sm:text-2xl font-bold tracking-tight text-[#2A1E17] group-hover:text-[#8C5D39] transition-colors leading-none">
              AAKAY
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.2em] font-medium text-[#7D6B5D] uppercase mt-0.5">
              Café & Kitchen
            </span>
          </a>

          {/* Desktop Nav Links (Zone 2) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 lg:gap-8"
          >
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative text-sm font-medium tracking-wide transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded ${
                    isActive
                      ? 'text-[#2A1E17] font-semibold'
                      : 'text-[#5E4E42] hover:text-[#2A1E17]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A059] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Primary Action & Mobile Menu Toggle (Zone 3) */}
          <div className="flex items-center gap-3">
            <a
              href="#reservation"
              onClick={(e) => handleNavClick(e, '#reservation')}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-white bg-[#2A1E17] hover:bg-[#3D2C22] active:bg-[#1C140F] rounded-lg shadow-sm hover:shadow transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
            >
              <CalendarDays className="w-4 h-4 text-[#E5C992]" />
              <span>Reserve a Table</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#2A1E17] hover:text-[#8C5D39] hover:bg-[#EFE9DF] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-[#2A1E17]/10 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#EAE2D5] text-[#2A1E17] font-semibold'
                        : 'text-[#4A3B30] hover:bg-[#F2ECE1] hover:text-[#2A1E17]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-2 px-1 flex items-center justify-between text-xs text-[#7D6B5D] border-t border-[#2A1E17]/5 mt-2">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  +91 90000 00000
                </span>
                <span>Open 10 AM – 11 PM</span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
