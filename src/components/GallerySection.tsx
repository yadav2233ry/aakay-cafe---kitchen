import React, { useState } from 'react';
import { X, ZoomIn, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const filters = [
    { id: 'all', label: 'All Moments' },
    { id: 'interior', label: 'Café Interior' },
    { id: 'coffee', label: 'Coffee' },
    { id: 'mains', label: 'Burger' },
    { id: 'starters', label: 'Snacks' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'drinks', label: 'Drinks' },
  ];

  const filteredGallery = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#8C5D39]">
            Visual Journal
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2A1E17] [text-wrap:balance]">
            Moments at AAKAY
          </h2>
          <p className="text-sm sm:text-base text-[#5E4E42]">
            A glimpse into our sunlit corners, freshly brewed cups, artisan kitchen creations, and joyous gatherings.
          </p>
        </div>

        {/* Filter Pills / Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
                activeFilter === f.id
                  ? 'bg-[#2A1E17] text-white shadow-sm font-semibold'
                  : 'bg-[#F2ECE1] text-[#4A3B30] hover:text-[#2A1E17] hover:bg-[#E5DCCF]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-stone-100 border border-[#2A1E17]/10 aspect-[4/3] shadow-sm hover:shadow-lg transition-all duration-300"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedPhoto(item);
                }
              }}
              aria-label={`View ${item.title}`}
            >
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                fallbackTitle={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover Overlay with smooth gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] font-medium tracking-wider uppercase text-[#E5C992] mb-1">
                  {item.categoryLabel}
                </span>
                <h3 className="font-serif text-lg font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#E5C992] font-medium">
                  <ZoomIn className="w-4 h-4" />
                  <span>Click to expand</span>
                </div>
              </div>

              {/* Quiet corner badge for unhovered state */}
              <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 backdrop-blur-md text-white opacity-80 group-hover:opacity-0 transition-opacity">
                <Eye className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.title}
        >
          <div
            className="relative max-w-4xl w-full bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-2xl border border-[#FAF7F2]/20 text-[#2A1E17]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo Preview */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-stone-900 w-full">
              <ImageWithFallback
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                fallbackTitle={selectedPhoto.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Photo Metadata in Modal */}
            <div className="p-6 sm:p-7 bg-[#FFFDF9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold tracking-widest uppercase text-[#8C5D39]">
                  {selectedPhoto.categoryLabel} · AAKAY Café Portfolio
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2A1E17] mt-1">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5E4E42] mt-2 max-w-2xl leading-relaxed">
                  {selectedPhoto.description}
                </p>
              </div>

              <a
                href="#reservation"
                onClick={() => setSelectedPhoto(null)}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#2A1E17] hover:bg-[#3D2C22] shrink-0"
              >
                Experience in Person
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
