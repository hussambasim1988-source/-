import React from 'react';
import { OccasionType } from '../types';
import { OCCASIONS_LIST, VENUES_DATA, STANDALONE_SERVICES } from '../data/mockData';
import { Calendar, Clock, Users, Building2, Truck, ChevronLeft, Sparkles, Star, MapPin } from 'lucide-react';

interface WizardScreenProps {
  selectedOccasion: OccasionType;
  onSelectOccasion: (occ: OccasionType) => void;
  eventDate: string;
  onChangeDate: (d: string) => void;
  eventTime: string;
  onChangeTime: (t: string) => void;
  guestCount: number;
  onChangeGuests: (g: number) => void;
  onNavigateToVenue: (venueId?: string) => void;
  onNavigateToServices: () => void;
  onQuickBookService: (serviceId: string) => void;
  onOpenPdfGuide?: () => void;
  onNavigateToProducts?: () => void;
}

export const WizardScreen: React.FC<WizardScreenProps> = ({
  selectedOccasion,
  onSelectOccasion,
  eventDate,
  onChangeDate,
  eventTime,
  onChangeTime,
  guestCount,
  onChangeGuests,
  onNavigateToVenue,
  onNavigateToServices,
  onQuickBookService,
  onOpenPdfGuide,
  onNavigateToProducts,
}) => {
  // Smart catering suggestions based on guest count
  const getSuggestion = () => {
    if (guestCount <= 25) {
      return 'لمّة عائلية حميمة - تكفيها كيكة مخصصة وعربة قهوة أو سيت منيو مطعم مريح.';
    } else if (guestCount <= 60) {
      return 'حجم مثالي لقاعة مطعم صاج الريف المنصور أو محطة شاورما لايف مع 3 ويترز.';
    } else {
      return 'مناسبة كبيرة ومميزة - يُنصح بقاعة وحدائق دجلة أو محطة شاورما + باربكيو وكادر ضيافة موسع.';
    }
  };

  return (
    <section className="space-y-4 text-slate-800">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
            <span>شنو مناسبتك القادمة؟</span>
            <span>🎉</span>
          </h2>
          <div className="flex items-center gap-1.5">
            {onOpenPdfGuide && (
              <button
                onClick={onOpenPdfGuide}
                className="text-[10px] bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 border border-amber-500/30 font-black px-2 py-0.5 rounded-full transition active:scale-95 cursor-pointer flex items-center gap-1"
              >
                <span>📄 دليل الخطوات PDF</span>
              </button>
            )}
            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
              خطوة 1 من 2
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          حدد التفاصيل لنعرضلك الخيارات والمطاعم والكوادر المتوافقة في بغداد
        </p>
      </div>

      {/* Occasion Selection Grid */}
      <div className="grid grid-cols-3 gap-2">
        {OCCASIONS_LIST.map((item) => {
          const isSelected = selectedOccasion === item.name;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectOccasion(item.name);
                onChangeGuests(item.recommendedGuests);
              }}
              className={`p-2.5 rounded-2xl flex flex-col items-center gap-1.5 transition active:scale-95 text-center ${
                isSelected
                  ? 'border-2 border-amber-500 bg-amber-50/90 shadow-sm shadow-amber-500/10'
                  : 'border border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span className="text-2xl leading-none select-none">{item.icon}</span>
              <span
                className={`text-xs ${
                  isSelected ? 'font-black text-slate-950' : 'font-semibold text-slate-600'
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Date & Time Grid */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs focus-within:border-amber-500 transition">
          <label className="text-[10px] font-bold text-slate-400 block mb-1 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-amber-500" />
            <span>تاريخ المناسبة</span>
          </label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => onChangeDate(e.target.value)}
            className="text-xs font-bold text-slate-800 w-full outline-none bg-transparent cursor-pointer"
          />
        </div>

        <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs focus-within:border-amber-500 transition">
          <label className="text-[10px] font-bold text-slate-400 block mb-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-500" />
            <span>وقت البدء</span>
          </label>
          <input
            type="time"
            value={eventTime}
            onChange={(e) => onChangeTime(e.target.value)}
            className="text-xs font-bold text-slate-800 w-full outline-none bg-transparent cursor-pointer"
          />
        </div>
      </div>

      {/* Guest Count Slider */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Users className="w-3.5 h-3.5 text-amber-600" />
            <span>عدد الحضور المتوقع:</span>
          </div>
          <span className="text-sm font-black text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200/60">
            {guestCount} شخص
          </span>
        </div>

        <input
          type="range"
          min="10"
          max="200"
          step="5"
          value={guestCount}
          onChange={(e) => onChangeGuests(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
        />

        <div className="flex justify-between text-[9px] font-bold text-slate-400 px-0.5">
          <span>10 أشخاص (لمّة مصغرة)</span>
          <span>50 شخص</span>
          <span>100+ شخص (حفلة كبيرة)</span>
        </div>

        {/* Smart recommendation note */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-2 text-[10px] text-slate-600 flex items-start gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
          <span>{getSuggestion()}</span>
        </div>
      </div>

      {/* The Two Main Paths */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
            حدد مسار المناسبة:
          </h3>
          <span className="text-[10px] text-slate-400">اختر الطريق الأنسب لك</span>
        </div>

        {/* المسار 1: المكان + الخدمات */}
        <div
          onClick={() => onNavigateToVenue()}
          className="cursor-pointer bg-white p-4 rounded-2xl border-2 border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-md transition active:scale-98 flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl shadow-inner group-hover:scale-105 transition">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-amber-600 transition">
                  المكان + الخدمات 🏢
                </h4>
                <span className="text-[9px] bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded">
                  باقات مخفضة
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                مطاعم، قاعات، حدائق وفنادق مع الأكل والضيافة الشاملة
              </p>
              <div className="text-[10px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                <span>مثال: صاج الريف المنصور (خصم 20% + كيكة مجاناً)</span>
              </div>
            </div>
          </div>
          <ChevronLeft className="w-5 h-5 text-slate-300 group-hover:text-amber-500 group-hover:-translate-x-1 transition shrink-0" />
        </div>

        {/* المسار 2: خدمات فقط */}
        <div
          onClick={onNavigateToServices}
          className="cursor-pointer bg-white p-4 rounded-2xl border-2 border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-md transition active:scale-98 flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl shadow-inner group-hover:scale-105 transition">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition">
                  عندي المكان (خدمات فقط) 🏡
                </h4>
                <span className="text-[9px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded">
                  لعيادتك أو بيتك
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                كيك مخصص، كادر تقديم وضيافة، لايف ستيشن شاورما وعربات قهوة
              </p>
              <div className="text-[10px] text-blue-600 font-bold mt-1 flex items-center gap-1">
                <span>وصول الكادر والتجهيز بالكامل بموقعك</span>
              </div>
            </div>
          </div>
          <ChevronLeft className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:-translate-x-1 transition shrink-0" />
        </div>

        {/* Quick direct access to Products Section */}
        {onNavigateToProducts && (
          <div
            onClick={onNavigateToProducts}
            className="cursor-pointer bg-amber-50/80 hover:bg-amber-100/90 border border-amber-300 p-3 rounded-2xl flex items-center justify-between transition active:scale-98 shadow-2xs group"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🛍️</span>
              <div>
                <h4 className="text-xs font-black text-slate-900 group-hover:text-amber-800 transition">
                  تصفح قسم المنتجات والتجهيزات بالكامل
                </h4>
                <p className="text-[10px] text-slate-600">
                  عرض كل صنف مع صورته الحقيقية وسعره الفوري بالدينار العراقي
                </p>
              </div>
            </div>
            <span className="text-xs font-black text-amber-700 bg-white px-2.5 py-1 rounded-xl border border-amber-200 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
              عرض المنتجات ←
            </span>
          </div>
        )}
      </div>

      {/* Featured highlight strip */}
      <div className="pt-2">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 p-3.5 rounded-2xl text-white shadow-md flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-amber-400 text-[10px] font-black uppercase tracking-wider block">
              ضمان لمّـة المعتمد 🛡️
            </span>
            <h5 className="text-xs font-extrabold text-white">تثبيت موعدك بعربون رسمي 25% فقط</h5>
            <p className="text-[10px] text-slate-300">
              دفع الباقي يوم المناسبة، وإشعار واتساب وتتبع فوري للطلب
            </p>
          </div>
          <div className="text-center bg-amber-500 text-slate-950 px-2.5 py-1.5 rounded-xl font-black text-xs shrink-0">
            <span>ZainCash</span>
            <div className="text-[9px] font-bold">& QiCard</div>
          </div>
        </div>
      </div>
    </section>
  );
};
