import React, { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle2, AlertCircle, Sparkles, Utensils, RefreshCw, Download } from 'lucide-react';
import { ReservationData, MenuItem } from '../types';

interface ReservationSectionProps {
  wishlistItems?: MenuItem[];
  onClearWishlist?: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  wishlistItems = [],
  onClearWishlist,
}) => {
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    email: '',
    phone: '',
    date: today,
    time: '18:30',
    guests: 2,
    specialRequest: wishlistItems.length > 0 
      ? `Preferred Tasting Selection: ${wishlistItems.map((i) => i.name).join(', ')}`
      : '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReservationData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    data: ReservationData;
    bookingId: string;
    timestamp: string;
  } | null>(null);

  // Synchronize when wishlist items change if user hasn't typed custom request
  React.useEffect(() => {
    if (wishlistItems.length > 0 && !formData.specialRequest) {
      setFormData((prev) => ({
        ...prev,
        specialRequest: `Preferred Tasting Selection: ${wishlistItems.map((i) => i.name).join(', ')}`,
      }));
    }
  }, [wishlistItems]);

  const timeSlots = [
    '10:30', '11:30', '12:30', '13:30', '14:30',
    '16:00', '17:00', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
  ];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ReservationData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your phone number.';
    } else if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      newErrors.phone = 'Please enter a valid phone number (8-15 digits).';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a reservation date.';
    } else if (formData.date < today) {
      newErrors.date = 'Date cannot be in the past.';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a preferred dining time.';
    }

    if (!formData.guests || formData.guests < 1 || formData.guests > 12) {
      newErrors.guests = 'Party size must be between 1 and 12 guests.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate realistic asynchronous booking confirmation
    setTimeout(() => {
      const randomBookingNumber = Math.floor(10000 + Math.random() * 90000);
      setConfirmedBooking({
        data: { ...formData },
        bookingId: `AK-${randomBookingNumber}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      setIsSubmitting(false);
      if (onClearWishlist) {
        onClearWishlist();
      }
    }, 700);
  };

  const handleDownloadSummary = () => {
    if (!confirmedBooking) return;
    const text = `AAKAY CAFÉ & KITCHEN - RESERVATION CONFIRMATION
Reference: ${confirmedBooking.bookingId}
Guest: ${confirmedBooking.data.name}
Party Size: ${confirmedBooking.data.guests} Guests
Date: ${confirmedBooking.data.date}
Time: ${confirmedBooking.data.time}
Contact: ${confirmedBooking.data.phone} | ${confirmedBooking.data.email}
Special Note: ${confirmedBooking.data.specialRequest || 'Standard Seating'}

Thank you for choosing AAKAY Café & Kitchen.
(Portfolio Demo Booking - Not a commercial reservation)`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AAKAY_Reservation_${confirmedBooking.bookingId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: today,
      time: '18:30',
      guests: 2,
      specialRequest: '',
    });
    setErrors({});
  };

  return (
    <section id="reservation" className="py-20 lg:py-28 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Hospitality Promise */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#8C5D39]">
              Table Bookings
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2A1E17] leading-tight [text-wrap:balance]">
              Reserve Your Table
            </h2>
            <p className="text-base text-[#5E4E42] leading-relaxed">
              Whether you are planning a celebratory brunch, an intimate evening date, or a relaxed work catchup, our hosts look forward to preparing a warm corner just for you.
            </p>

            {/* Practical Notes */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#FFFDF9] border border-[#2A1E17]/10">
                <Clock className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#4A3B30]">
                  <strong className="text-[#2A1E17] block font-semibold mb-0.5">Dining Duration</strong>
                  Tables are reserved for 90 minutes during peak evening hours (7 PM – 10 PM) to ensure graceful seating for all guests.
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#FFFDF9] border border-[#2A1E17]/10">
                <Users className="w-5 h-5 text-[#8C5D39] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#4A3B30]">
                  <strong className="text-[#2A1E17] block font-semibold mb-0.5">Large Parties (6+ Guests)</strong>
                  For parties larger than 6, we recommend booking at least 4 hours in advance so our kitchen can prepare personalized service.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#2A1E17]/10 text-xs text-[#5E4E42]">
                <strong className="text-[#2A1E17] block font-semibold mb-1">Portfolio Demonstration</strong>
                This reservation module features full client-side validation and immediate visual feedback. No real external booking or payment is processed.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form or Success State */}
          <div className="lg:col-span-7">
            {confirmedBooking ? (
              <div className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#C5A059]/40 shadow-lg animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center gap-3 text-emerald-800 mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#2A1E17]">
                      Table Reservation Confirmed
                    </h3>
                    <p className="text-xs text-emerald-700 font-medium">
                      Booking Reference: {confirmedBooking.bookingId}
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#2A1E17]/10 my-6 space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <span className="text-[#7D6B5D] block text-xs">Guest Name</span>
                      <strong className="text-[#2A1E17] font-semibold">{confirmedBooking.data.name}</strong>
                    </div>
                    <div>
                      <span className="text-[#7D6B5D] block text-xs">Party Size</span>
                      <strong className="text-[#2A1E17] font-semibold">{confirmedBooking.data.guests} Guests</strong>
                    </div>
                    <div>
                      <span className="text-[#7D6B5D] block text-xs">Date</span>
                      <strong className="text-[#2A1E17] font-semibold">{confirmedBooking.data.date}</strong>
                    </div>
                    <div>
                      <span className="text-[#7D6B5D] block text-xs">Time</span>
                      <strong className="text-[#2A1E17] font-semibold">{confirmedBooking.data.time}</strong>
                    </div>
                    <div>
                      <span className="text-[#7D6B5D] block text-xs">Phone</span>
                      <span className="text-[#2A1E17] font-mono text-xs">{confirmedBooking.data.phone}</span>
                    </div>
                    <div>
                      <span className="text-[#7D6B5D] block text-xs">Email</span>
                      <span className="text-[#2A1E17] text-xs truncate block">{confirmedBooking.data.email}</span>
                    </div>
                  </div>

                  {confirmedBooking.data.specialRequest && (
                    <div className="pt-3 border-t border-[#2A1E17]/8 text-xs">
                      <span className="text-[#7D6B5D] block mb-0.5">Special Notes</span>
                      <p className="text-[#4A3B30] italic bg-white/70 p-2.5 rounded border border-[#2A1E17]/5">
                        "{confirmedBooking.data.specialRequest}"
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-lg bg-amber-50/80 border border-amber-200/70 text-xs text-amber-900 mb-6 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    A fictional reservation has been logged in this demo session. You may download your receipt summary or create another booking.
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadSummary}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#2A1E17] hover:bg-[#3D2C22] shadow-sm transition-all"
                  >
                    <Download className="w-4 h-4 text-[#E5C992]" />
                    <span>Download Confirmation Receipt</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold text-[#2A1E17] bg-[#EAE2D5] hover:bg-[#DDD2C2] transition-all"
                  >
                    <RefreshCw className="w-4 h-4 text-[#8C5D39]" />
                    <span>Reserve Another Table</span>
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#2A1E17]/10 shadow-sm space-y-6"
              >
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="res-name" className="block text-xs font-semibold text-[#2A1E17] mb-1.5 uppercase tracking-wider">
                      Your Full Name *
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maya Sengupta"
                      className={`w-full px-4 py-3 rounded-lg text-sm bg-[#FAF7F2] border text-[#2A1E17] placeholder:text-[#9C8B7E] transition-all focus:outline-none focus:ring-2 ${
                        errors.name
                          ? 'border-red-400 focus:ring-red-400'
                          : 'border-[#2A1E17]/15 focus:ring-[#C5A059]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="res-email" className="block text-xs font-semibold text-[#2A1E17] mb-1.5 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="maya@example.com"
                      className={`w-full px-4 py-3 rounded-lg text-sm bg-[#FAF7F2] border text-[#2A1E17] placeholder:text-[#9C8B7E] transition-all focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-red-400 focus:ring-red-400'
                          : 'border-[#2A1E17]/15 focus:ring-[#C5A059]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone & Party Size Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="res-phone" className="block text-xs font-semibold text-[#2A1E17] mb-1.5 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 rounded-lg text-sm bg-[#FAF7F2] border text-[#2A1E17] placeholder:text-[#9C8B7E] transition-all focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? 'border-red-400 focus:ring-red-400'
                          : 'border-[#2A1E17]/15 focus:ring-[#C5A059]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="res-guests" className="block text-xs font-semibold text-[#2A1E17] mb-1.5 uppercase tracking-wider">
                      Number of Guests *
                    </label>
                    <div className="relative">
                      <select
                        id="res-guests"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                        className="w-full px-4 py-3 rounded-lg text-sm bg-[#FAF7F2] border border-[#2A1E17]/15 text-[#2A1E17] transition-all focus:outline-none focus:ring-2 focus:ring-[#C5A059] appearance-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest (Solo Coffee Table)' : num === 2 ? 'Guests (Intimate Table)' : `Guests`}
                          </option>
                        ))}
                      </select>
                      <Users className="w-4 h-4 text-[#7D6B5D] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {errors.guests && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.guests}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Date & Time Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="res-date" className="block text-xs font-semibold text-[#2A1E17] mb-1.5 uppercase tracking-wider">
                      Date *
                    </label>
                    <div className="relative">
                      <input
                        id="res-date"
                        type="date"
                        min={today}
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg text-sm bg-[#FAF7F2] border text-[#2A1E17] transition-all focus:outline-none focus:ring-2 ${
                          errors.date
                            ? 'border-red-400 focus:ring-red-400'
                            : 'border-[#2A1E17]/15 focus:ring-[#C5A059]'
                        }`}
                      />
                    </div>
                    {errors.date && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.date}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="res-time" className="block text-xs font-semibold text-[#2A1E17] mb-1.5 uppercase tracking-wider">
                      Seating Time *
                    </label>
                    <div className="relative">
                      <select
                        id="res-time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg text-sm bg-[#FAF7F2] border border-[#2A1E17]/15 text-[#2A1E17] transition-all focus:outline-none focus:ring-2 focus:ring-[#C5A059] appearance-none cursor-pointer"
                      >
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time} ({parseInt(time.split(':')[0]) >= 12 ? `${parseInt(time.split(':')[0]) === 12 ? 12 : parseInt(time.split(':')[0]) - 12}:${time.split(':')[1]} PM` : `${time} AM`})
                          </option>
                        ))}
                      </select>
                      <Clock className="w-4 h-4 text-[#7D6B5D] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {errors.time && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.time}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Special Request */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="res-notes" className="block text-xs font-semibold text-[#2A1E17] uppercase tracking-wider">
                      Special Request (Optional)
                    </label>
                    {wishlistItems.length > 0 && (
                      <span className="text-[11px] text-[#8C5D39] font-medium flex items-center gap-1">
                        <Utensils className="w-3 h-3" />
                        Includes {wishlistItems.length} menu selection{wishlistItems.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  <textarea
                    id="res-notes"
                    rows={3}
                    value={formData.specialRequest}
                    onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                    placeholder="e.g. Window table preferred, anniversary celebration, high chair needed, dietary restrictions..."
                    className="w-full px-4 py-3 rounded-lg text-sm bg-[#FAF7F2] border border-[#2A1E17]/15 text-[#2A1E17] placeholder:text-[#9C8B7E] transition-all focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl font-semibold text-sm tracking-wide text-white bg-[#2A1E17] hover:bg-[#3D2C22] active:bg-[#1C140F] shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Confirming Seating Details...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 text-[#E5C992]" />
                      <span>Reserve Your Table</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
