import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Booking } from '../types';
import { CheckCircle2, MessageCircle, Calendar, Users, MapPin, ArrowRight, Copy, Check } from 'lucide-react';

interface BookingSuccessModalProps {
  booking: Booking;
  onGoToBookings: () => void;
  onNewBooking: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  booking,
  onGoToBookings,
  onNewBooking,
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#10b981', '#6366f1'],
      });
    } catch {
      // ignore in tests/headless
    }
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(booking.bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Build Arabic WhatsApp share text
  const shareText = encodeURIComponent(
    `مرحباً فريق لمّـة، حجزت مناسبتي بنجاح:\n` +
      `رقم الحجز: ${booking.bookingCode}\n` +
      `المناسبة: ${booking.occasion} (${booking.guestCount} شخص)\n` +
      `الموعد: ${booking.eventDate} الساعة ${booking.eventTime}\n` +
      `صاحب الحجز: ${booking.customerName} (${booking.customerPhone})\n` +
      `العربون المدفوع: ${booking.depositAmount.toLocaleString('ar-IQ')} د.ع\n` +
      `المتبقي: ${booking.remainingAmount.toLocaleString('ar-IQ')} د.ع\n` +
      `الموقع: ${booking.city} - ${booking.district}`
  );

  const whatsappUrl = `https://wa.me/9647800000000?text=${shareText}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3.5 overflow-y-auto">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-slate-800 my-auto">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 p-5 text-center text-slate-950 relative">
          <div className="w-14 h-14 bg-white/90 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl shadow-md">
            🎉
          </div>
          <h2 className="text-base font-black">تم حجز لمّتك بنجاح!</h2>
          <p className="text-xs font-semibold text-slate-900 mt-0.5">
            مبروك! تم تثبيت العربون وجارِ تجهيز أفضل تجربة لمناسبتك
          </p>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3.5">
          {/* Booking Code Box */}
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 block">رقم الحجز المعتمد:</span>
              <span className="text-sm font-black text-slate-900 tracking-wider">
                {booking.bookingCode}
              </span>
            </div>
            <button
              onClick={handleCopyCode}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-200 flex items-center gap-1 transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>تم النسخ</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Summary Grid */}
          <div className="bg-slate-50 p-3 rounded-2xl space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>المناسبة:</span>
              <span className="font-bold text-slate-900">{booking.occasion}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>تاريخ ووقت البدء:</span>
              <span className="font-bold text-slate-900">
                {booking.eventDate} ({booking.eventTime})
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>العربون المدفوع (مثبت):</span>
              <span className="font-black text-emerald-600">
                {booking.depositAmount.toLocaleString('ar-IQ')} د.ع
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>المتبقي يوم المناسبة:</span>
              <span className="font-bold text-slate-800">
                {booking.remainingAmount.toLocaleString('ar-IQ')} د.ع
              </span>
            </div>
          </div>

          {/* Progress Tracker Visualizer */}
          <div className="space-y-1.5">
            <h4 className="text-[11px] font-black text-slate-700">مراحل تنفيذ المناسبة:</h4>
            <div className="space-y-2 border-r-2 border-amber-400 pr-3 mr-1 text-[11px]">
              <div className="relative">
                <span className="absolute -right-[17px] top-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
                <span className="font-bold text-emerald-600 block">1. استلام الطلب وتثبيت العربون ✓</span>
                <span className="text-[10px] text-slate-400">تم تسجيل بياناتك بنجاح</span>
              </div>
              <div className="relative">
                <span className="absolute -right-[17px] top-1 w-2 h-2 rounded-full bg-slate-300 ring-2 ring-white"></span>
                <span className="font-bold text-slate-700 block">2. تأكيد المزود والتنسيق اللوجستي</span>
                <span className="text-[10px] text-slate-400">سيتواصل معك المنسق عبر الواتساب</span>
              </div>
              <div className="relative">
                <span className="absolute -right-[17px] top-1 w-2 h-2 rounded-full bg-slate-300 ring-2 ring-white"></span>
                <span className="font-bold text-slate-700 block">3. وصول الكادر وبدء الفعالية</span>
                <span className="text-[10px] text-slate-400">في الموعد المحدد بكل دقة</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Share / Support Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-2.5 rounded-2xl shadow-sm transition active:scale-95 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>إرسال تفاصيل الحجز للمنسق عبر الواتساب</span>
          </a>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={onGoToBookings}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-2xl transition"
            >
              عرض في حجوزاتي
            </button>
            <button
              onClick={onNewBooking}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-2xl transition"
            >
              الرئيسية
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
