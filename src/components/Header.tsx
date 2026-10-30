import React, { useState } from 'react';
import { Bell, Smartphone, Monitor, ShoppingBag, X, CheckCircle, Sparkles, FileText } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
  onOpenPdfGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cart,
  onOpenCart,
  isMobileFrame,
  onToggleFrame,
  onOpenPdfGuide,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'عرض لمّة الحصري مستمر 🔥',
      desc: 'خصم 20% على سيت منيو صاج الريف المنصور لجميع مناسبات هذا الشهر.',
      time: 'منذ نصف ساعة',
      read: false,
    },
    {
      id: 2,
      title: 'تأكيد حجز العربون',
      desc: 'تم استلام عربون حجز عيادة د. حسام بنجاح وتأكيد موعد كادر الضيافة.',
      time: 'منذ 3 ساعات',
      read: false,
    },
    {
      id: 3,
      title: 'محطة الشاورما المتنقلة 🥙',
      desc: 'تمت إضافة باقات الشاورما الحية بموقعك في بغداد (الرصافة والكرخ).',
      time: 'أمس',
      read: true,
    },
  ];

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="bg-slate-900 text-white px-4 py-3 flex justify-between items-center shadow-lg border-b border-slate-800 shrink-0 sticky top-0 z-30">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center font-black text-slate-950 text-xl shadow-md shadow-amber-500/20 select-none">
            ل
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-base tracking-wide leading-none text-white">لمّــة</h1>
              <span className="text-[9px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded-full border border-amber-500/30">العراق</span>
            </div>
            <span className="text-[10px] text-amber-400 font-medium block mt-0.5">
              كل تفاصيل مناسبتك بلمسة واحدة
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Frame Toggle (Desktop helper) */}
          <button
            onClick={onToggleFrame}
            title={isMobileFrame ? 'التبديل إلى العرض الواسع' : 'التبديل إلى إطار شاشة الهاتف'}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-amber-400 text-[11px] font-bold transition border border-slate-700"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span>عرض واسع</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>إطار الهاتف</span>
              </>
            )}
          </button>

          {/* Cart Pill (if items exist) */}
          {totalItemsCount > 0 && (
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black hover:bg-amber-400 transition shadow-md shadow-amber-500/20 animate-bounce"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{totalItemsCount}</span>
            </button>
          )}

          {/* PDF Guide Button */}
          <button
            onClick={onOpenPdfGuide}
            title="تحميل وقراءة الدليل الشامل (PDF)"
            className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 hover:text-amber-200 text-[11px] font-black transition border border-amber-500/30 active:scale-95 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px]">دليل PDF</span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => setShowNotifications(true)}
            aria-label="الإشعارات"
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs relative hover:text-white hover:bg-slate-700 transition"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
          </button>
        </div>
      </header>

      {/* Notifications Drawer Modal */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-start sm:items-center justify-center p-3">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-3.5 border-b border-slate-800 flex justify-between items-center bg-slate-800/40">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-white">إشعارات وتحديثات لمّـة</h3>
              </div>
              <button
                onClick={() => setShowNotifications(false)}
                className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3 space-y-2.5 max-h-[380px] overflow-y-auto no-scrollbar">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 rounded-2xl border transition ${
                    n.read
                      ? 'bg-slate-800/30 border-slate-800/60 text-slate-400'
                      : 'bg-slate-800/80 border-amber-500/30 text-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-xs font-bold text-amber-300">{n.title}</h4>
                    <span className="text-[9px] text-slate-400 whitespace-nowrap">{n.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{n.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-slate-800 bg-slate-900/80 text-center">
              <button
                onClick={() => setShowNotifications(false)}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold"
              >
                إغلاق الإشعارات
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
