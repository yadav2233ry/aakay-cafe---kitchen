import React from 'react';
import { Coffee, HeartHandshake, Sparkles, Utensils } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { IMAGES } from '../data/restaurantData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F4EFE6]/60 border-t border-b border-[#2A1E17]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image Layout Column (Left on Desktop) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#2A1E17]/10 aspect-[4/3] sm:aspect-[4/3] bg-stone-100">
                <ImageWithFallback
                  src={IMAGES.interior}
                  alt="Aesthetic interior of AAKAY Café with oak tables and sunlight"
                  fallbackTitle="AAKAY Interior"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Story Pullout Accent Card */}
              <div className="mt-4 sm:mt-6 bg-[#FAF7F2] p-5 rounded-xl border border-[#2A1E17]/10 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#EAE2D5] text-[#8C5D39] shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-serif font-bold text-[#2A1E17]">
                      The AAKAY Philosophy
                    </h2>
                    <p className="text-xs text-[#5E4E42] mt-1 leading-relaxed">
                      “Every morning begins with freshly ground beans, small-batch dough, and the belief that a quiet moment over good food can turn an entire day around.”
                    </p>
                    <p className="text-[11px] font-medium text-[#8C5D39] mt-2">
                      — The AAKAY Kitchen Team
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story Content Column (Right on Desktop) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#8C5D39]">
                Our Story & Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2A1E17] leading-tight [text-wrap:balance]">
                Welcome to AAKAY
              </h2>
            </div>

            <div className="space-y-4 text-base text-[#5E4E42] leading-relaxed">
              <p>
                AAKAY Café & Kitchen was conceived around a simple yet uncompromising ideal: that dining out should never feel rushed or industrial. We wanted to build a sanctuary where the comforting aroma of slowly roasted Arabica beans greets you at the doorway, and each dish arrives fresh from the pan.
              </p>
              <p>
                From our artisanal sourdough breads pressed to golden perfection, to our velvety house-special coffees and signature burgers, everything we serve begins with pure, uncompromised ingredients. We partner directly with nearby organic dairies and growers to ensure crisp, vibrant flavours in every course.
              </p>
              <p>
                Whether you are joining us for an early morning espresso ritual, sharing loaded nachos with close friends after work, or indulging in warm chocolate lava cake over an intimate date, AAKAY is your space to slow down and savour life’s great moments.
              </p>
            </div>

            {/* Quick Stats / Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#2A1E17]/10">
              <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#2A1E17]/10">
                <div className="flex items-center gap-2 text-[#8C5D39] mb-1">
                  <Coffee className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Arabica</span>
                </div>
                <div className="font-serif text-2xl font-bold text-[#2A1E17]">100%</div>
                <p className="text-xs text-[#7D6B5D] mt-0.5">Single-Origin Roast</p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#2A1E17]/10">
                <div className="flex items-center gap-2 text-[#8C5D39] mb-1">
                  <Utensils className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Kitchen</span>
                </div>
                <div className="font-serif text-2xl font-bold text-[#2A1E17]">Daily</div>
                <p className="text-xs text-[#7D6B5D] mt-0.5">Fresh Small-Batches</p>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3.5 rounded-lg bg-[#FAF7F2] border border-[#2A1E17]/10">
                <div className="flex items-center gap-2 text-[#8C5D39] mb-1">
                  <HeartHandshake className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Hospitality</span>
                </div>
                <div className="font-serif text-2xl font-bold text-[#2A1E17]">Zero</div>
                <p className="text-xs text-[#7D6B5D] mt-0.5">Artificial Additives</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
