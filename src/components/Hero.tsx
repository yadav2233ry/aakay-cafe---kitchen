import React from 'react';
import { ArrowRight, CalendarDays, Clock, MapPin, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { IMAGES } from '../data/restaurantData';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
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
    <section id="home" className="relative pt-24 sm:pt-28 pb-16 lg:pb-24 overflow-hidden">
      {/* Subtle warm decorative ambient glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E8DCC4]/40 blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Ambient Quiet Kicker (Zero-pill discipline: unboxed clean text) */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase text-[#8C5D39]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Artisanal Coffee & Kitchen</span>
              <span aria-hidden="true" className="text-[#C5A059]">·</span>
              <span>City Centre</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-bold tracking-tight text-[#2A1E17] leading-[1.12] [text-wrap:balance]">
              Good Food.
              <br />
              <span className="italic font-normal text-[#8C5D39]">Great Moments.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#5E4E42] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Where handcrafted flavours, fresh ingredients and warm moments come together. Step in for quiet morning roasts, vibrant afternoon bites, and soulful evening conversations.
            </p>

            {/* Working Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={() => scrollTo('menu')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide text-white bg-[#2A1E17] hover:bg-[#3D2C22] active:bg-[#1C140F] rounded-lg shadow-sm hover:shadow transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4 text-[#E5C992] transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('reservation')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide text-[#2A1E17] bg-[#EFE9DF] hover:bg-[#E5DCCF] border border-[#2A1E17]/15 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                <CalendarDays className="w-4 h-4 text-[#8C5D39]" />
                <span>Reserve a Table</span>
              </button>
            </div>

            {/* Quick Trust Meta Strip */}
            <div className="pt-4 border-t border-[#2A1E17]/10 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-[#7D6B5D]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                <span>Daily 10:00 AM – 11:00 PM</span>
              </div>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span>Downtown City Centre</span>
              </div>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="text-[#8C5D39] font-medium">100% Fresh Daily Bakes</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Backing decorative frame with warm gold border */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-[#E8DCC4] to-[#F5ECE0] -rotate-1 -z-10 shadow-sm" />

              {/* Main Image Container */}
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-[#2A1E17]/10 bg-stone-100 aspect-[16/11] sm:aspect-[16/10]">
                <ImageWithFallback
                  src={IMAGES.hero}
                  alt="AAKAY Café and Kitchen warm artisanal dining ambience"
                  fallbackTitle="AAKAY Café Ambience"
                  className="w-full h-full object-cover"
                />

                {/* Subtle scrim for bottom caption badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                {/* Floating Bottom Trust Label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs sm:text-sm">
                  <div>
                    <p className="font-serif font-medium text-amber-100">Handcrafted Culinary Experience</p>
                    <p className="text-[11px] text-stone-200">Single-origin coffees & artisanal comfort meals</p>
                  </div>
                  <span className="hidden sm:inline-block px-2.5 py-1 text-[11px] font-medium rounded bg-black/40 backdrop-blur-md border border-white/20 text-[#F5ECE0]">
                    Portfolio Demo
                  </span>
                </div>
              </div>

              {/* Floating Accent Card: Signature highlight */}
              <div className="hidden sm:flex items-center gap-3 absolute -bottom-6 -left-6 bg-[#FAF7F2] p-3.5 rounded-xl shadow-md border border-[#2A1E17]/10">
                <div className="w-10 h-10 rounded-lg bg-[#EAE2D5] flex items-center justify-center text-[#8C5D39] font-serif font-bold text-lg">
                  A
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#2A1E17]">Signature Roast Available</p>
                  <p className="text-[11px] text-[#7D6B5D]">Freshly brewed every 30 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
