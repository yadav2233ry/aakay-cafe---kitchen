import React, { useState, useEffect, useCallback } from 'react';
import { X, ZoomIn, Eye, ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filters = [
    { id: 'all', label: 'All Moments' },
    { id: 'interior', label: 'Café Interior' },
    { id: 'coffee', label: 'Coffee' },
    { id: 'burger', label: 'Burger' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'drinks', label: 'Drinks' },
  ];

  const filteredGallery = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const selectedPhoto = selectedPhotoIndex !== null ? filteredGallery[selectedPhotoIndex] : null;

  const handleNextPhoto = useCallback(() => {
    if (selectedPhotoIndex === null || filteredGallery.length === 0) return;
    setSelectedPhotoIndex((prevIndex) => {
      if (prevIndex === null) return 0;
      return (prevIndex + 1) % filteredGallery.length;
    });
  }, [selectedPhotoIndex, filteredGallery.length]);

  const handlePrevPhoto = useCallback(() => {
    if (selectedPhotoIndex === null || filteredGallery.length === 0) return;
    setSelectedPhotoIndex((prevIndex) => {
      if (prevIndex === null) return 0;
      return (prevIndex - 1 + filteredGallery.length) % filteredGallery.length;
    });
  }, [selectedPhotoIndex, filteredGallery.length]);

  const handleCloseModal = useCallback(() => {
    setSelectedPhotoIndex(null);
  }, []);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (selectedPhotoIndex === null) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPhotoIndex, handleCloseModal, handleNextPhoto, handlePrevPhoto]);

  // If filter changes while modal is open, adjust or close index if out of bounds
  useEffect(() => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex >= filteredGallery.length) {
      setSelectedPhotoIndex(filteredGallery.length > 0 ? 0 : null);
    }
  }, [activeFilter, filteredGallery.length, selectedPhotoIndex]);

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
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 mb-12 flex-wrap">
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            const count = GALLERY_ITEMS.filter((item) => f.id === 'all' || item.category === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setActiveFilter(f.id);
                  setSelectedPhotoIndex(null);
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#2A1E17] text-[#FAF7F2] shadow-md ring-2 ring-[#C5A059] font-semibold scale-[1.02]'
                    : 'bg-[#F2ECE1] text-[#4A3B30] hover:text-[#2A1E17] hover:bg-[#E5DCCF]'
                }`}
              >
                <span>{f.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-[#C5A059] text-[#2A1E17] font-bold' : 'bg-[#E2D7C7] text-[#7D6B5D]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Responsive Gallery Grid */}
        {filteredGallery.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFDF9] rounded-2xl border border-[#2A1E17]/10 p-8">
            <p className="font-serif text-lg font-bold text-[#2A1E17]">No moments found in this category.</p>
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className="mt-4 px-4 py-2 text-xs font-medium text-[#2A1E17] bg-[#EAE2D5] rounded-lg hover:bg-[#DDD2C2]"
            >
              Show All Moments
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhotoIndex(index)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-stone-100 border border-[#2A1E17]/10 aspect-[4/3] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPhotoIndex(index);
                  }
                }}
                aria-label={`Open photo lightbox for ${item.title}`}
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  fallbackTitle={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Always-visible top category pill for mobile and quick scanning */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-2.5 py-1 text-[11px] font-medium tracking-wider uppercase rounded-md bg-[#2A1E17]/80 backdrop-blur-md text-[#E5C992] border border-white/10 shadow-sm">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Subtle top right eye icon */}
                <div className="absolute top-3.5 right-3.5 z-10 p-2 rounded-full bg-black/40 backdrop-blur-md text-white opacity-80 group-hover:opacity-0 transition-opacity">
                  <Eye className="w-3.5 h-3.5" />
                </div>

                {/* Hover Overlay with smooth gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-medium tracking-wider uppercase text-[#E5C992] mb-1">
                    {item.categoryLabel}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#E5C992] font-medium">
                    <ZoomIn className="w-4 h-4" />
                    <span>Click to view full image</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.title}
        >
          {/* Modal Container: Stop propagation so clicking inside doesn't close */}
          <div
            className="relative max-w-4xl w-full bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-2xl border border-white/15 text-[#2A1E17] flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar inside modal */}
            <div className="p-3.5 sm:p-4 bg-[#2A1E17] text-white flex items-center justify-between z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase px-2 py-0.5 rounded bg-[#C5A059] text-[#2A1E17]">
                  {selectedPhoto.categoryLabel}
                </span>
                <span className="text-xs text-stone-300 hidden sm:inline">
                  Photo {selectedPhotoIndex! + 1} of {filteredGallery.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] cursor-pointer"
                aria-label="Close photo preview (Escape)"
                title="Close (Escape)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Preview with Previous / Next Arrows */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-stone-950 w-full overflow-hidden flex items-center justify-center select-none">
              <ImageWithFallback
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                fallbackTitle={selectedPhoto.title}
                className="w-full h-full object-cover"
              />

              {/* Previous Control Button */}
              {filteredGallery.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevPhoto();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-lg transition-transform hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] cursor-pointer"
                  aria-label="Previous photo (Left Arrow)"
                  title="Previous (Left Arrow)"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}

              {/* Next Control Button */}
              {filteredGallery.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextPhoto();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-lg transition-transform hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] cursor-pointer"
                  aria-label="Next photo (Right Arrow)"
                  title="Next (Right Arrow)"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}

              {/* Bottom scrim photo indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-white sm:hidden">
                {selectedPhotoIndex! + 1} / {filteredGallery.length}
              </div>
            </div>

            {/* Photo Metadata & CTA in Modal */}
            <div className="p-4 sm:p-6 bg-[#FFFDF9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-y-auto">
              <div className="space-y-1">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A1E17]">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5E4E42] max-w-2xl leading-relaxed">
                  {selectedPhoto.description}
                </p>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                <a
                  href="#reservation"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCloseModal();
                    setTimeout(() => {
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
                    }, 50);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#2A1E17] hover:bg-[#3D2C22] shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                >
                  <CalendarDays className="w-4 h-4 text-[#E5C992]" />
                  <span>Reserve Table to Visit</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
