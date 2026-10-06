/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WhyUs } from './components/WhyUs';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ReservationSection } from './components/ReservationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MenuItem } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [wishlistItems, setWishlistItems] = useState<MenuItem[]>([]);

  // Track active section for header indicator using IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'about', 'menu', 'gallery', 'reviews', 'reservation', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleItemInReservation = (item: MenuItem) => {
    setWishlistItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleClearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2A1E17]">
      {/* Sticky Top Header */}
      <Header activeSection={activeSection} />

      {/* Main Content Layout */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Why Choose AAKAY Feature Cards */}
        <WhyUs />

        {/* Menu Section with categories and search */}
        <MenuSection
          selectedItems={wishlistItems}
          onAddItemToReservation={handleToggleItemInReservation}
        />

        {/* Gallery Section */}
        <GallerySection />

        {/* Reviews Section ("Guest Experiences") */}
        <ReviewsSection />

        {/* Reservation Section with validation */}
        <ReservationSection
          wishlistItems={wishlistItems}
          onClearWishlist={handleClearWishlist}
        />

        {/* Contact / Visit Us Section with Map placeholder */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
