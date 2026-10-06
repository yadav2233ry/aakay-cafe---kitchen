import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, CheckCircle2, Send, Wifi, Car, Coffee, Info } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const ContactSection: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryMsg.trim()) return;

    setInquirySent(true);
    setTimeout(() => {
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMsg('');
    }, 400);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#F4EFE6]/60 border-t border-[#2A1E17]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#8C5D39]">
            Visit Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2A1E17] [text-wrap:balance]">
            Find Us in City Centre
          </h2>
          <p className="text-sm sm:text-base text-[#5E4E42]">
            We are nestled in the vibrant heart of the city. Stop by for an impromptu espresso or plan an unforgettable evening.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Contact Cards & Quick Inquiry */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Details Card */}
            <div className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-7 border border-[#2A1E17]/10 shadow-sm space-y-5">
              <h3 className="font-serif text-xl font-bold text-[#2A1E17]">
                {RESTAURANT_INFO.name}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-[#F2ECE1] text-[#8C5D39] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#7D6B5D] block text-xs font-medium">Location</span>
                    <strong className="text-[#2A1E17] font-semibold">{RESTAURANT_INFO.address}</strong>
                    <p className="text-xs text-[#7D6B5D] mt-0.5">Fictional Demo Address · Landmark Hub</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-[#F2ECE1] text-[#8C5D39] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#7D6B5D] block text-xs font-medium">Opening Hours</span>
                    <strong className="text-[#2A1E17] font-semibold">{RESTAURANT_INFO.hours}</strong>
                    <p className="text-xs text-[#7D6B5D] mt-0.5">{RESTAURANT_INFO.days}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-[#F2ECE1] text-[#8C5D39] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#7D6B5D] block text-xs font-medium">Phone Enquiries</span>
                    <a
                      href={`tel:${RESTAURANT_INFO.phone}`}
                      className="font-mono text-[#2A1E17] hover:text-[#8C5D39] font-medium transition-colors"
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                    <p className="text-[11px] text-[#7D6B5D] mt-0.5">Table coordination & private events</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-[#F2ECE1] text-[#8C5D39] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#7D6B5D] block text-xs font-medium">Email</span>
                    <a
                      href={`mailto:${RESTAURANT_INFO.email}`}
                      className="text-[#2A1E17] hover:text-[#8C5D39] font-medium transition-colors"
                    >
                      {RESTAURANT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Café Amenities */}
              <div className="pt-4 border-t border-[#2A1E17]/8">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C5D39] block mb-2.5">
                  Café Amenities
                </span>
                <div className="flex flex-wrap gap-2 text-xs text-[#4A3B30]">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF7F2] border border-[#2A1E17]/10">
                    <Wifi className="w-3.5 h-3.5 text-[#C5A059]" /> High-Speed Wi-Fi
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF7F2] border border-[#2A1E17]/10">
                    <Car className="w-3.5 h-3.5 text-[#C5A059]" /> Valet Parking
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF7F2] border border-[#2A1E17]/10">
                    <Coffee className="w-3.5 h-3.5 text-[#C5A059]" /> Espresso Bar
                  </span>
                </div>
              </div>
            </div>

            {/* General Inquiry Mini-Form */}
            <div className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-7 border border-[#2A1E17]/10 shadow-sm">
              <h3 className="font-serif text-base font-bold text-[#2A1E17] mb-1">
                Have a Quick Question?
              </h3>
              <p className="text-xs text-[#7D6B5D] mb-4">
                Send a quick note regarding events, catering, or dietary questions.
              </p>

              {inquirySent ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Message Received!</strong>
                    <span>Thank you for your note. This portfolio demo simulation has logged your inquiry.</span>
                    <button
                      type="button"
                      onClick={() => setInquirySent(false)}
                      className="mt-2 text-xs font-semibold text-emerald-800 underline block"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-[#FAF7F2] border border-[#2A1E17]/15 text-[#2A1E17] placeholder:text-[#9C8B7E] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="Your Email"
                    className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-[#FAF7F2] border border-[#2A1E17]/15 text-[#2A1E17] placeholder:text-[#9C8B7E] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                  <textarea
                    rows={2}
                    required
                    value={inquiryMsg}
                    onChange={(e) => setInquiryMsg(e.target.value)}
                    placeholder="How can our kitchen help you today?"
                    className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-[#FAF7F2] border border-[#2A1E17]/15 text-[#2A1E17] placeholder:text-[#9C8B7E] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-white bg-[#2A1E17] hover:bg-[#3D2C22] transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5 text-[#E5C992]" />
                    <span>Send Inquiry Note</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Architectural Map-Style Placeholder */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFDF9] rounded-2xl overflow-hidden border border-[#2A1E17]/10 shadow-sm flex flex-col">
              {/* Map Canvas Header bar */}
              <div className="p-4 sm:p-5 border-b border-[#2A1E17]/10 bg-[#FAF7F2] flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-[#2A1E17] flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-[#8C5D39]" />
                    <span>City Centre Map Guide</span>
                  </h3>
                  <p className="text-xs text-[#7D6B5D]">Interactive illustrative neighborhood guide</p>
                </div>
                <span className="text-[11px] font-medium text-[#8C5D39] bg-[#EAE2D5] px-2.5 py-1 rounded">
                  Portfolio Map Simulation
                </span>
              </div>

              {/* Stylized Architectural Map SVG Canvas */}
              <div className="relative h-80 sm:h-96 w-full bg-[#EFE9DD] overflow-hidden select-none">
                {/* Vector Map Roads, Grid & Greenery */}
                <svg
                  className="w-full h-full object-cover"
                  viewBox="0 0 600 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background Ground */}
                  <rect width="600" height="400" fill="#EAE3D5" />

                  {/* Park / Garden Area */}
                  <rect x="30" y="30" width="140" height="110" rx="8" fill="#D3DEC8" />
                  <text x="50" y="85" fill="#587A5E" fontSize="11" fontFamily="sans-serif" fontWeight="600">
                    City Central Park
                  </text>

                  {/* Secondary Green Zone */}
                  <rect x="420" y="270" width="150" height="100" rx="8" fill="#D3DEC8" />
                  <text x="440" y="325" fill="#587A5E" fontSize="11" fontFamily="sans-serif" fontWeight="600">
                    Botanical Boulevard
                  </text>

                  {/* City Blocks / Buildings */}
                  <rect x="200" y="40" width="100" height="80" rx="4" fill="#DDD5C5" stroke="#C9BEA8" strokeWidth="1" />
                  <rect x="320" y="40" width="120" height="80" rx="4" fill="#DDD5C5" stroke="#C9BEA8" strokeWidth="1" />
                  <rect x="40" y="180" width="120" height="90" rx="4" fill="#DDD5C5" stroke="#C9BEA8" strokeWidth="1" />
                  <rect x="40" y="300" width="130" height="70" rx="4" fill="#DDD5C5" stroke="#C9BEA8" strokeWidth="1" />
                  <rect x="460" y="50" width="100" height="70" rx="4" fill="#DDD5C5" stroke="#C9BEA8" strokeWidth="1" />

                  {/* Main Avenues (Cream white roadways) */}
                  {/* Horizontal Primary Boulevard */}
                  <rect x="0" y="145" width="600" height="24" fill="#FAF7F2" stroke="#D5CBB9" strokeWidth="1" />
                  <line x1="0" y1="157" x2="600" y2="157" stroke="#D5CBB9" strokeDasharray="6 4" strokeWidth="1.5" />

                  {/* Vertical Main Avenue */}
                  <rect x="180" y="0" width="24" height="400" fill="#FAF7F2" stroke="#D5CBB9" strokeWidth="1" />
                  <line x1="192" y1="0" x2="192" y2="400" stroke="#D5CBB9" strokeDasharray="6 4" strokeWidth="1.5" />

                  {/* Diagonal Street */}
                  <path d="M 320 0 L 600 280" stroke="#FAF7F2" strokeWidth="20" />
                  <path d="M 320 0 L 600 280" stroke="#D5CBB9" strokeWidth="1" strokeDasharray="6 4" />

                  {/* Secondary Horizontal Way */}
                  <rect x="180" y="270" width="420" height="18" fill="#FAF7F2" stroke="#D5CBB9" strokeWidth="1" />

                  {/* AAKAY Building Highlight Block */}
                  <rect x="230" y="190" width="150" height="130" rx="8" fill="#FAF7F2" stroke="#8C5D39" strokeWidth="2" />
                  <rect x="235" y="195" width="140" height="120" rx="6" fill="#F4EFE6" />

                  {/* Street Names */}
                  <text x="350" y="161" fill="#7D6B5D" fontSize="10" fontFamily="sans-serif" fontWeight="500">
                    GRAND CENTRAL AVENUE
                  </text>
                  <text x="250" y="283" fill="#7D6B5D" fontSize="9" fontFamily="sans-serif" fontWeight="500">
                    MARKET WAY
                  </text>
                </svg>

                {/* Animated / Prominent AAKAY Pin Marker */}
                <div className="absolute top-[52%] left-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#2A1E17] text-white flex items-center justify-center shadow-xl border-2 border-[#E5C992] animate-bounce">
                      <Coffee className="w-5 h-5 text-[#E5C992]" />
                    </div>
                    {/* Radar Pulse Effect */}
                    <div className="absolute -inset-2 rounded-full border-2 border-[#C5A059]/50 animate-ping pointer-events-none" />
                  </div>

                  <div className="mt-2 bg-[#2A1E17] text-white px-3 py-1.5 rounded-lg shadow-lg text-center border border-[#C5A059]/40">
                    <p className="font-serif font-bold text-xs text-[#E5C992]">AAKAY Café & Kitchen</p>
                    <p className="text-[10px] text-stone-300">City Centre Plaza</p>
                  </div>
                </div>

                {/* Transit & Walking Badge */}
                <div className="absolute bottom-4 left-4 bg-[#FFFDF9]/95 backdrop-blur-sm p-3 rounded-xl border border-[#2A1E17]/10 shadow-sm text-xs text-[#2A1E17] max-w-[220px]">
                  <p className="font-semibold text-[11px] text-[#8C5D39] uppercase tracking-wider">Nearby Transit</p>
                  <p className="text-xs text-[#4A3B30] mt-0.5">2 min walk from Central Metro & City Square Plaza</p>
                </div>
              </div>

              {/* Bottom Direction Bar */}
              <div className="p-4 sm:p-5 bg-[#FAF7F2] border-t border-[#2A1E17]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#7D6B5D]">
                  <Info className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>Illustrative location preview for portfolio showcase</span>
                </div>

                <a
                  href="#reservation"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white bg-[#2A1E17] hover:bg-[#3D2C22] transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#E5C992]" />
                  <span>Reserve Table for Visit</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
