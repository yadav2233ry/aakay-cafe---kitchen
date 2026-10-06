import React from 'react';
import { Star, Quote, Info } from 'lucide-react';
import { REVIEWS } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#F4EFE6]/70 border-t border-b border-[#2A1E17]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#8C5D39]">
            Guest Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2A1E17] [text-wrap:balance]">
            Warm Words from Our Tables
          </h2>
          <p className="text-sm sm:text-base text-[#5E4E42]">
            Stories of memorable afternoons, cherished conversations, and comforting flavours shared over our tables.
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="relative bg-[#FFFDF9] rounded-2xl p-7 border border-[#2A1E17]/10 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#8C5D39]/30 transition-all duration-300"
            >
              <div>
                {/* Star Rating and Quote mark */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#C5A059]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#E8DCC4] stroke-[1.5]" />
                </div>

                {/* Comment */}
                <p className="text-sm sm:text-base text-[#4A3B30] italic font-serif leading-relaxed mb-6">
                  “{review.comment}”
                </p>
              </div>

              {/* Author & Dish attribution */}
              <div className="pt-4 border-t border-[#2A1E17]/8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EAE2D5] text-[#8C5D39] font-serif font-bold text-sm flex items-center justify-center shrink-0">
                    {review.author.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-[#2A1E17] truncate">
                      {review.author}
                    </h3>
                    <p className="text-xs text-[#7D6B5D] truncate">
                      {review.role}
                    </p>
                  </div>
                </div>

                {/* Favorite selection */}
                <div className="mt-3 text-[11px] text-[#8C5D39] flex items-center gap-1.5 font-medium">
                  <span className="text-[#9C8B7E]">Favorite:</span>
                  <span className="truncate">{review.favoriteDish}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clear Portfolio / Demo Disclaimer Note */}
        <div className="mt-12 text-center">
          <p className="inline-flex items-center gap-2 text-xs text-[#7D6B5D] bg-[#EFE9DF] px-4 py-2 rounded-lg border border-[#2A1E17]/10">
            <Info className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <span>Fictional showcase testimonials created for portfolio demonstration purposes.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
