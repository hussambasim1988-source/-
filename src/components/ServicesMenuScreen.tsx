import React, { useState } from 'react';
import { StandaloneService } from '../types';
import { STANDALONE_SERVICES } from '../data/mockData';
import { ArrowRight, Plus, Check, Sparkles, Flame, Coffee, Cake, Users, Music } from 'lucide-react';

interface ServicesMenuScreenProps {
  onBackToWizard: () => void;
  onQuickBookService: (title: string, price: number, vendor: string) => void;
  onAddToCart: (service: StandaloneService) => void;
  cartItemCounts: Record<string, number>;
}

export const ServicesMenuScreen: React.FC<ServicesMenuScreenProps> = ({
  onBackToWizard,
  onQuickBookService,
  onAddToCart,
  cartItemCounts,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'جميع التجهيزات ✨' },
    { id: 'cakes', label: 'كيك وتوزيعات 🎂' },
    { id: 'staff', label: 'كوادر ضيافة 🤵' },
    { id: 'live_stations', label: 'محطات طهي لايف 🎪' },
    { id: 'decor_sound', label: 'ديكور وتصوير 📸' },
  ];

  const filteredServices = STANDALONE_SERVICES.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  // Featured shawarma station
  const shawarmaStation = STANDALONE_SERVICES.find((s) => s.id === 'live-shawarma-station');

  return (
    <section className="space-y-4">
      {/* Back Button */}
      <button
        onClick={onBackToWizard}
        className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition active:scale-95"
      >
        <ArrowRight className="w-3.5 h-3.5" />
        <span>الرجوع للرئيسية</span>
      </button>

      {/* Screen Header */}
      <div>
        <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
          <span>تجهيزات موقعك الخاص</span>
          <span>🏡</span>
        </h2>
        <p className="text-[11px] text-slate-500 mt-0.5">
          اختر الكوادر والخدمات المناسبة لعيادتك أو حفلتك المنزلية أو مكتبك
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 text-[11px]">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition active:scale-95 ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Hero Featured Card: شيف شاورما لايف بموقعك */}
      {shawarmaStation && (selectedCategory === 'all' || selectedCategory === 'live_stations') && (
        <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white rounded-3xl shadow-md border border-amber-500/20 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-amber-400 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full mb-1.5">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>الخدمة الأكثر طلباً 🔥</span>
              </span>
              <h5 className="text-sm font-black mt-0.5 text-white">{shawarmaStation.name}</h5>
              <p className="text-[11px] text-slate-300 mt-1 max-w-[280px] leading-relaxed">
                {shawarmaStation.description}
              </p>
              <div className="mt-2 text-[10px] text-amber-300 flex items-center gap-2">
                <span>مزود الخدمة: {shawarmaStation.vendor}</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-[10px] text-slate-400 block">السعر الإجمالي شامل الشيف</span>
              <span className="text-sm font-black text-amber-400">
                {shawarmaStation.price.toLocaleString('ar-IQ')} د.ع
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onAddToCart(shawarmaStation)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة</span>
              </button>
              <button
                onClick={() =>
                  onQuickBookService(
                    shawarmaStation.name,
                    shawarmaStation.price,
                    shawarmaStation.vendor
                  )
                }
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-3.5 py-2 rounded-xl transition active:scale-95 shadow-md shadow-amber-500/20"
              >
                حجز مباشر
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Services List */}
      <div className="space-y-3">
        {filteredServices
          .filter((s) => s.id !== 'live-shawarma-station' || selectedCategory !== 'all')
          .map((service) => {
            const count = cartItemCounts[service.id] || 0;
            return (
              <div
                key={service.id}
                className="bg-white p-3.5 rounded-3xl border border-slate-200 shadow-xs hover:border-amber-400/80 transition flex flex-col gap-2.5"
              >
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {service.image ? (
                      <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden shrink-0 shadow-xs">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-xl shadow-inner shrink-0 mt-0.5">
                        <span>{service.icon}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-black text-slate-900 truncate">{service.name}</h4>
                        {service.popular && (
                          <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded shrink-0">
                            مميز
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2 leading-snug">
                        {service.description}
                      </p>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        المزود: {service.vendor}
                      </span>
                    </div>
                  </div>
                </div>

                {service.includedItems && (
                  <div className="bg-slate-50 p-2 rounded-xl text-[10px] text-slate-600 flex flex-wrap gap-2">
                    {service.includedItems.map((inc, i) => (
                      <span key={i} className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>{inc}</span>
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center pt-1 border-t border-slate-100">
                  <div>
                    <span className="text-xs font-black text-amber-600">
                      {service.price.toLocaleString('ar-IQ')} د.ع
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onAddToCart(service)}
                      className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{count > 0 ? `إضافة (${count})` : 'إضافة للسلة'}</span>
                    </button>

                    <button
                      onClick={() =>
                        onQuickBookService(service.name, service.price, service.vendor)
                      }
                      className="text-xs bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white px-3 py-1.5 rounded-xl font-bold transition active:scale-95"
                    >
                      حجز فوري
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};
