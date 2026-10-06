import React from 'react';
import { Leaf, Heart, Armchair, Award } from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/restaurantData';

export const WhyUs: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'fresh-ingredients':
        return <Leaf className="w-5 h-5 text-[#3E6B48]" />;
      case 'crafted-with-care':
        return <Heart className="w-5 h-5 text-[#8C5D39]" />;
      case 'cozy-ambience':
        return <Armchair className="w-5 h-5 text-[#C5A059]" />;
      case 'memorable-taste':
      default:
        return <Award className="w-5 h-5 text-[#8C5D39]" />;
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#8C5D39]">
            The Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight text-[#2A1E17] [text-wrap:balance]">
            Why Choose AAKAY
          </h2>
          <p className="text-sm sm:text-base text-[#5E4E42]">
            Every detail — from the warmth of our timber tables to the crunch of our artisan bakes — is thoughtfully curated.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
          {WHY_CHOOSE_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-[#FFFDF9] rounded-xl p-6 border border-[#2A1E17]/10 hover:border-[#8C5D39]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#F2ECE1] group-hover:bg-[#EAE2D5] flex items-center justify-center transition-colors duration-200 mb-5">
                  {getIcon(item.id)}
                </div>

                <div className="text-[11px] font-mono font-medium text-[#7D6B5D] mb-1">
                  0{index + 1}
                </div>

                <h3 className="font-serif text-lg font-bold text-[#2A1E17] group-hover:text-[#8C5D39] transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5E4E42] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2A1E17]/8 flex items-center justify-between text-[11px] font-medium text-[#8C5D39]">
                <span>{item.highlight}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
