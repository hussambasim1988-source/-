import React from 'react';
import { Wand2, CalendarCheck, User, Compass, ShoppingBag } from 'lucide-react';

export type TabType = 'wizard' | 'products' | 'explore' | 'bookings' | 'profile';

interface BottomNavProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
  bookingsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onChangeTab,
  bookingsCount,
}) => {
  return (
    <nav className="h-14 bg-white border-t border-slate-200 flex items-center justify-around text-slate-400 text-[10px] px-2 select-none shrink-0 z-20">
      {/* 1. رتّب لمّتك */}
      <button
        onClick={() => onChangeTab('wizard')}
        className={`flex flex-col items-center gap-1 transition-all ${
          currentTab === 'wizard'
            ? 'text-amber-600 font-extrabold scale-105'
            : 'hover:text-slate-800 font-medium'
        }`}
      >
        <Wand2 className="w-4 h-4" />
        <span>رتّب لمّتك</span>
      </button>

      {/* 2. المنتجات (كل ايتم وصورته وسعره) */}
      <button
        onClick={() => onChangeTab('products')}
        className={`flex flex-col items-center gap-1 transition-all ${
          currentTab === 'products'
            ? 'text-amber-600 font-extrabold scale-105'
            : 'hover:text-slate-800 font-medium'
        }`}
      >
        <ShoppingBag className="w-4 h-4" />
        <span>المنتجات</span>
      </button>

      {/* 3. استكشف */}
      <button
        onClick={() => onChangeTab('explore')}
        className={`flex flex-col items-center gap-1 transition-all ${
          currentTab === 'explore'
            ? 'text-amber-600 font-extrabold scale-105'
            : 'hover:text-slate-800 font-medium'
        }`}
      >
        <Compass className="w-4 h-4" />
        <span>استكشف</span>
      </button>

      {/* 4. حجوزاتي */}
      <button
        onClick={() => onChangeTab('bookings')}
        className={`flex flex-col items-center gap-1 transition-all relative ${
          currentTab === 'bookings'
            ? 'text-amber-600 font-extrabold scale-105'
            : 'hover:text-slate-800 font-medium'
        }`}
      >
        <div className="relative">
          <CalendarCheck className="w-4 h-4" />
          {bookingsCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              {bookingsCount}
            </span>
          )}
        </div>
        <span>حجوزاتي</span>
      </button>

      {/* 5. حسابي */}
      <button
        onClick={() => onChangeTab('profile')}
        className={`flex flex-col items-center gap-1 transition-all ${
          currentTab === 'profile'
            ? 'text-amber-600 font-extrabold scale-105'
            : 'hover:text-slate-800 font-medium'
        }`}
      >
        <User className="w-4 h-4" />
        <span>حسابي</span>
      </button>
    </nav>
  );
};
