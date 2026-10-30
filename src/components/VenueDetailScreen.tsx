import React, { useState } from 'react';
import { Venue, MenuItem } from '../types';
import { VENUES_DATA } from '../data/mockData';
import { ArrowRight, Users, MapPin, Star, Plus, Check, Sparkles, Building2 } from 'lucide-react';

interface VenueDetailScreenProps {
  currentVenueId: string;
  onSelectVenueId: (id: string) => void;
  onBackToWizard: () => void;
  onAddPackageAndCheckout: (title: string, price: number, vendor: string) => void;
  onAddMenuItemToCart: (item: MenuItem, vendor: string) => void;
  cartItemCounts: Record<string, number>;
}

export const VenueDetailScreen: React.FC<VenueDetailScreenProps> = ({
  currentVenueId,
  onSelectVenueId,
  onBackToWizard,
  onAddPackageAndCheckout,
  onAddMenuItemToCart,
  cartItemCounts,
}) => {
  const [activeTab, setActiveTab] = useState<'offers' | 'menu'>('offers');

  const venue = VENUES_DATA.find((v) => v.id === currentVenueId) || VENUES_DATA[0];

  return (
    <section className="space-y-4">
      {/* Back Button & Venue Switcher */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToWizard}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition active:scale-95"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>الرجوع لتعديل البيانات</span>
        </button>

        {/* Change Venue Dropdown */}
        <div className="flex items-center gap-1">
          <Building2 className="w-3 h-3 text-amber-500" />
          <select
            value={venue.id}
            onChange={(e) => onSelectVenueId(e.target.value)}
            className="text-[11px] font-bold text-slate-700 bg-white border border-slate-200 rounded-lg px-2 py-1 outline-none"
          >
            {VENUES_DATA.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* البروفايل الرئيسي للمكان */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
        <div className="h-36 bg-gradient-to-tr from-slate-950 via-slate-900 to-amber-950 flex items-center justify-center relative p-4 text-center">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
              {venue.category}
            </span>
            <h3 className="text-white font-black text-lg mt-0.5">{venue.name}</h3>
            <p className="text-[11px] text-slate-300 mt-1 max-w-[280px] mx-auto line-clamp-1">
              {venue.features.join(' • ')}
            </p>
          </div>
          <span className="absolute bottom-2.5 right-3 bg-black/60 backdrop-blur-md text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>
              {venue.rating} ({venue.reviewsCount} تقييم)
            </span>
          </span>
        </div>

        <div className="p-3.5 flex justify-between items-center text-xs text-slate-600 bg-slate-50/70 border-t border-slate-100">
          <span className="flex items-center gap-1 font-bold">
            <Users className="w-3.5 h-3.5 text-amber-500" />
            <span>
              سعة القاعة: {venue.capacityMin} - {venue.capacityMax} شخص
            </span>
          </span>
          <span className="flex items-center gap-1 font-bold">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span>{venue.location}</span>
          </span>
        </div>
      </div>

      {/* تبويبات خدمات المكان */}
      <div className="flex border-b border-slate-200 text-xs">
        <button
          onClick={() => setActiveTab('offers')}
          className={`flex-1 pb-2.5 font-black transition relative ${
            activeTab === 'offers'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <span>عروض لمّة الخاصة 🏷️</span>
        </button>

        <button
          onClick={() => setActiveTab('menu')}
          className={`flex-1 pb-2.5 font-bold transition relative ${
            activeTab === 'menu'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <span>قائمة الطعام (أفراد)</span>
        </button>
      </div>

      {/* 1. محتوى تبويب العروض الحصرية */}
      {activeTab === 'offers' && (
        <div className="space-y-3">
          {venue.offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-gradient-to-bl from-amber-500 via-amber-500 to-amber-600 text-slate-950 p-4 rounded-3xl shadow-lg relative overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-slate-950 text-amber-400 text-[10px] font-black px-2.5 py-1 rounded-full inline-block">
                  عرض حصري لمستخدمي لمّة (-{offer.discount})
                </span>
                {offer.popular && (
                  <span className="bg-white/80 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                    الأكثر طلباً 🔥
                  </span>
                )}
              </div>

              <h4 className="font-black text-base leading-snug">{offer.name}</h4>
              <p className="text-xs text-slate-900 mt-1 font-medium leading-relaxed">
                {offer.description}
              </p>

              <div className="mt-4 flex justify-between items-center pt-2 border-t border-amber-400/40">
                <div>
                  {offer.originalPrice && (
                    <span className="text-xs line-through text-slate-800/80 block">
                      {offer.originalPrice.toLocaleString('ar-IQ')} د.ع
                    </span>
                  )}
                  <span className="text-base font-black text-slate-950">
                    {offer.price.toLocaleString('ar-IQ')} د.ع
                  </span>
                </div>

                <button
                  onClick={() => onAddPackageAndCheckout(offer.name, offer.price, venue.name)}
                  className="bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>حجز هذه الباقة</span>
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          <div className="bg-amber-50 border border-amber-200/80 p-3 rounded-2xl text-[11px] text-amber-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              جميع الباقات تشمل حجز صالة خاصة مجاناً وتجهيز الطاولات وتوفير خدمة الويترز طوال فترة المناسبة.
            </span>
          </div>
        </div>
      )}

      {/* 2. محتوى تبويب المنيو بالقطعة */}
      {activeTab === 'menu' && (
        <div className="space-y-2.5">
          <p className="text-[11px] text-slate-500 mb-1">
            يمكنك إضافة وجبات أو أصناف فردية مكملة لمناسبتك:
          </p>

          {venue.menu.map((item) => {
            const count = cartItemCounts[item.id] || 0;
            return (
              <div
                key={item.id}
                className="bg-white p-2.5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs hover:border-amber-400 transition gap-2.5"
              >
                {/* Product Picture */}
                {item.image && (
                  <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-bold text-slate-900 truncate">{item.name}</h5>
                  {item.description && (
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  )}
                  <span className="text-xs text-amber-600 font-black block mt-1">
                    {item.price.toLocaleString('ar-IQ')} د.ع
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {count > 0 && (
                    <span className="text-xs font-black text-slate-900 bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-200">
                      {count}
                    </span>
                  )}
                  <button
                    onClick={() => onAddMenuItemToCart(item, venue.name)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-amber-500 hover:text-white flex items-center justify-center text-xs font-bold transition active:scale-90 cursor-pointer"
                    title="إضافة للسلة"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
