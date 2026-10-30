import React, { useState } from 'react';
import { VENUES_DATA, STANDALONE_SERVICES } from '../data/mockData';
import { Search, Star, MapPin, Users, Plus, Check, Sparkles, Building2, Flame } from 'lucide-react';
import { StandaloneService, Venue } from '../types';

interface ExploreScreenProps {
  onSelectVenue: (venueId: string) => void;
  onAddToCartService: (service: StandaloneService) => void;
  onQuickBookService: (title: string, price: number, vendor: string) => void;
  cartItemCounts: Record<string, number>;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onSelectVenue,
  onAddToCartService,
  onQuickBookService,
  cartItemCounts,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'venues' | 'services'>('all');

  const filteredVenues = VENUES_DATA.filter((v) =>
    v.name.includes(searchTerm) || v.location.includes(searchTerm) || v.category.includes(searchTerm)
  );

  const filteredServices = STANDALONE_SERVICES.filter((s) =>
    s.name.includes(searchTerm) || s.vendor.includes(searchTerm) || s.categoryLabel.includes(searchTerm)
  );

  return (
    <section className="space-y-4 text-slate-800">
      {/* Title */}
      <div>
        <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
          <span>دليل لمّـة للمطاعم والخدمات</span>
          <span>🔍</span>
        </h2>
        <p className="text-[11px] text-slate-500">
          تصفح قاعات ومطاعم بغداد، محلات الكيك، وشيف الشاورما وعربات القهوة
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ابحث عن مكان، مطعم، كيك، أو شيف شاورما..."
          className="w-full bg-white border border-slate-200 rounded-2xl py-2.5 pr-9 pl-3 text-xs font-bold text-slate-800 outline-none focus:border-amber-500 shadow-2xs transition"
        />
        <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 text-xs">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-1.5 rounded-xl font-bold transition ${
            activeTab === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          الكل ({filteredVenues.length + filteredServices.length})
        </button>
        <button
          onClick={() => setActiveTab('venues')}
          className={`flex-1 py-1.5 rounded-xl font-bold transition ${
            activeTab === 'venues'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          مطاعم وقاعات ({filteredVenues.length})
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`flex-1 py-1.5 rounded-xl font-bold transition ${
            activeTab === 'services'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          خدمات وتجهيزات ({filteredServices.length})
        </button>
      </div>

      {/* Venues Section */}
      {(activeTab === 'all' || activeTab === 'venues') && filteredVenues.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
            <Building2 className="w-4 h-4 text-amber-500" />
            <span>مطاعم وقاعات المناسبات</span>
          </div>

          <div className="space-y-3">
            {filteredVenues.map((v) => (
              <div
                key={v.id}
                onClick={() => onSelectVenue(v.id)}
                className="bg-white rounded-3xl border border-slate-200 p-3.5 shadow-xs hover:border-amber-400 transition cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-amber-600 font-bold block">{v.category}</span>
                    <h4 className="text-xs font-black text-slate-900 group-hover:text-amber-600 transition">
                      {v.name}
                    </h4>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-700 font-black px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-200">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{v.rating}</span>
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-2">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-500" />
                    <span>سعة {v.capacityMin}-{v.capacityMax}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span className="truncate">{v.location}</span>
                  </span>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-[11px] text-emerald-700 font-bold">
                    تبدأ الباقات من {v.offers[0]?.price.toLocaleString('ar-IQ')} د.ع
                  </span>
                  <button className="text-xs font-extrabold text-amber-600 group-hover:underline">
                    عرض المنيو والباقات ←
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Services Section */}
      {(activeTab === 'all' || activeTab === 'services') && filteredServices.length > 0 && (
        <div className="space-y-2.5 pt-2">
          <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>خدمات وتجهيزات لموقعك الخاص</span>
          </div>

          <div className="space-y-2.5">
            {filteredServices.map((service) => {
              const count = cartItemCounts[service.id] || 0;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs flex justify-between items-center hover:border-amber-400 transition"
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    {service.image ? (
                      <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden shrink-0 shadow-2xs">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg shadow-inner shrink-0">
                        <span>{service.icon}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-slate-900 truncate">{service.name}</h5>
                      <span className="text-[10px] text-slate-400 block truncate">{service.vendor}</span>
                      <span className="text-xs font-black text-amber-600 block mt-0.5">
                        {service.price.toLocaleString('ar-IQ')} د.ع
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onAddToCartService(service)}
                      className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 px-2 py-1.5 rounded-xl font-bold transition flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{count > 0 ? count : '+'}</span>
                    </button>
                    <button
                      onClick={() =>
                        onQuickBookService(service.name, service.price, service.vendor)
                      }
                      className="text-[11px] bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white px-2.5 py-1.5 rounded-xl font-bold transition"
                    >
                      حجز
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
