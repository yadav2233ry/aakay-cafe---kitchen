import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Plus, Check, Utensils, Coffee, Wine, Cake, Sandwich } from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface MenuSectionProps {
  onAddItemToReservation?: (item: MenuItem) => void;
  selectedItems?: MenuItem[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddItemToReservation,
  selectedItems = [],
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Offerings', icon: Utensils },
    { id: 'coffee', label: 'Coffee', icon: Coffee },
    { id: 'starters', label: 'Starters & Snacks', icon: Sandwich },
    { id: 'mains', label: 'Main Bites', icon: Utensils },
    { id: 'drinks', label: 'Drinks', icon: Wine },
    { id: 'desserts', label: 'Desserts', icon: Cake },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const isSelected = (itemId: string) =>
    selectedItems.some((i) => i.id === itemId);

  return (
    <section id="menu" className="py-20 lg:py-28 bg-[#F5F0E8]/70 border-t border-b border-[#2A1E17]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#8C5D39]">
            Handcrafted Menu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2A1E17] [text-wrap:balance]">
            Explore Our Kitchen & Bar
          </h2>
          <p className="text-sm sm:text-base text-[#5E4E42]">
            Freshly prepared with pure ingredients, authentic culinary passion, and attention to subtle flavours.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs (Segmented control style with proper buttons) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#E8DFD1]/80 rounded-xl overflow-x-auto max-w-full w-full md:w-auto scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
                    isActive
                      ? 'bg-[#2A1E17] text-white shadow-sm font-semibold'
                      : 'text-[#4A3B30] hover:text-[#2A1E17] hover:bg-[#DDD2C2]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E5C992]' : 'text-[#7D6B5D]'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#7D6B5D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coffee, burgers, desserts..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-[#2A1E17]/15 bg-[#FFFDF9] text-[#2A1E17] placeholder:text-[#9C8B7E] focus:outline-none focus:ring-2 focus:ring-[#C5A059] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7D6B5D] hover:text-[#2A1E17]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Wishlist / Pre-selection Indicator notice */}
        {selectedItems.length > 0 && (
          <div className="mb-8 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#C5A059]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#2A1E17]">
              <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>
                <strong>{selectedItems.length} dish{selectedItems.length > 1 ? 'es' : ''}</strong> selected for your table reservation wishlist.
              </span>
            </div>
            <a
              href="#reservation"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('reservation');
                if (el) {
                  const navOffset = 80;
                  const elementPosition = el.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - navOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                  });
                }
              }}
              className="text-xs font-semibold text-[#8C5D39] hover:text-[#2A1E17] underline decoration-[#C5A059] underline-offset-4"
            >
              Proceed to Table Booking →
            </a>
          </div>
        )}

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFDF9] rounded-2xl border border-[#2A1E17]/10 p-8">
            <Utensils className="w-10 h-10 text-[#C5A059] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-lg font-bold text-[#2A1E17]">No items found</h3>
            <p className="text-xs sm:text-sm text-[#7D6B5D] mt-1 max-w-sm mx-auto">
              We couldn't find anything matching "{searchQuery}". Try searching for coffee, nachos, burger, or brownie.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-[#2A1E17] bg-[#EAE2D5] rounded-lg hover:bg-[#DDD2C2]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const selected = isSelected(item.id);
              return (
                <div
                  key={item.id}
                  className="group relative bg-[#FFFDF9] rounded-xl border border-[#2A1E17]/10 hover:border-[#8C5D39]/30 transition-all duration-200 hover:shadow-md flex flex-col justify-between overflow-hidden"
                >
                  {/* Optional featured dish photo */}
                  {item.image && (
                    <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        fallbackTitle={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-[#2A1E17]/85 backdrop-blur-sm text-[#E5C992] text-[11px] font-medium px-2 py-0.5 rounded">
                        Chef's Selection
                      </div>
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Top Meta Line: Category & Dietary */}
                      <div className="flex items-center justify-between text-xs text-[#7D6B5D] mb-1.5">
                        <span className="uppercase tracking-wider text-[11px] font-medium text-[#8C5D39]">
                          {item.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {item.dietary === 'vegan' ? (
                            <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-medium border border-emerald-200">
                              Vegan
                            </span>
                          ) : (
                            <span className="text-[10px] text-emerald-900 bg-emerald-50/60 px-1.5 py-0.5 rounded font-medium">
                              Pure Veg
                            </span>
                          )}
                          {item.prepTime && (
                            <span className="text-[11px] text-[#9C8B7E]">· {item.prepTime}</span>
                          )}
                        </div>
                      </div>

                      {/* Item Name & Price */}
                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <h3 className="font-serif text-lg font-bold text-[#2A1E17] group-hover:text-[#8C5D39] transition-colors leading-snug">
                          {item.name}
                        </h3>
                        <span className="font-serif text-lg font-bold text-[#2A1E17] tabular-nums shrink-0">
                          ₹{item.price}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#5E4E42] leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Action: Add to reservation preference */}
                    <div className="mt-4 pt-3 border-t border-[#2A1E17]/8 flex items-center justify-between">
                      <span className="text-[11px] text-[#9C8B7E]">
                        {item.calories ? item.calories : 'Freshly made'}
                      </span>
                      {onAddItemToReservation && (
                        <button
                          type="button"
                          onClick={() => onAddItemToReservation(item)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            selected
                              ? 'bg-emerald-100 text-emerald-900 font-semibold'
                              : 'bg-[#F2ECE1] text-[#2A1E17] hover:bg-[#E5DCCF]'
                          }`}
                          title={selected ? 'Remove from tasting list' : 'Add to reservation tasting list'}
                        >
                          {selected ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 text-[#8C5D39]" />
                              <span>Select for Table</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
