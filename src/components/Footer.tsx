import React from 'react';
import { ArrowUp, Instagram, Facebook, Twitter, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-[#211711] text-[#FAF7F2] pt-16 pb-12 border-t border-[#2A1E17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Info (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                AAKAY
              </span>
              <span className="text-[11px] tracking-[0.2em] font-medium text-[#C5A059] uppercase block mt-0.5">
                Café & Kitchen
              </span>
            </div>

            <p className="font-serif italic text-sm text-[#E5DCCF]">
              “{RESTAURANT_INFO.tagline}”
            </p>

            <p className="text-xs text-[#A8988B] leading-relaxed max-w-sm">
              An original portfolio showcase creating memorable culinary moments through slow-roasted single-origin coffees, artisanal bakes, and farm-fresh ingredients.
            </p>

            {/* Social Icons (Demo Links) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#contact"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#C5A059] hover:text-[#211711] text-[#E5DCCF] flex items-center justify-center transition-colors"
                aria-label="Instagram Demo Link"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#C5A059] hover:text-[#211711] text-[#E5DCCF] flex items-center justify-center transition-colors"
                aria-label="Facebook Demo Link"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#C5A059] hover:text-[#211711] text-[#E5DCCF] flex items-center justify-center transition-colors"
                aria-label="X / Twitter Demo Link"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (Cols 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#E5C992]">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-xs text-[#C9BEB5]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#about')}
                  className="hover:text-white transition-colors"
                >
                  About Our Kitchen
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#menu')}
                  className="hover:text-white transition-colors"
                >
                  Handcrafted Menu
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#gallery')}
                  className="hover:text-white transition-colors"
                >
                  Visual Moments Gallery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#reviews')}
                  className="hover:text-white transition-colors"
                >
                  Guest Experiences
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#reservation')}
                  className="hover:text-white transition-colors text-[#E5C992]"
                >
                  Reserve a Table
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#contact')}
                  className="hover:text-white transition-colors"
                >
                  Visit & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Opening Hours & Atmosphere (Cols 8-9) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#E5C992]">
              Hours & Days
            </h3>
            <div className="space-y-2 text-xs text-[#C9BEB5]">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium">Monday – Sunday</span>
                  <span>10:00 AM – 11:00 PM</span>
                </div>
              </div>
              <p className="text-[11px] text-[#A8988B] pt-2">
                Breakfast & Coffee: 10:00 AM onwards
                <br />
                Kitchen closes at 10:30 PM
              </p>
            </div>
          </div>

          {/* Contact Details (Cols 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#E5C992]">
              Contact & Location
            </h3>
            <div className="space-y-2.5 text-xs text-[#C9BEB5]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.name}, City Centre</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="hover:text-white font-mono transition-colors"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="hover:text-white transition-colors truncate"
                >
                  {RESTAURANT_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8988B]">
          <p className="text-center sm:text-left">
            © 2026 AAKAY Café & Kitchen. Portfolio Demo Project.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs text-[#E5C992] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059] px-2 py-1 rounded"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
