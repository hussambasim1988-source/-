import React, { useState } from 'react';
import { Booking } from '../types';
import { Calendar, Clock, MapPin, Users, Phone, CheckCircle2, AlertCircle, MessageCircle, FileText, ChevronDown, ChevronUp, X } from 'lucide-react';

interface MyBookingsScreenProps {
  bookings: Booking[];
  onStartNewBooking: () => void;
}

export const MyBookingsScreen: React.FC<MyBookingsScreenProps> = ({
  bookings,
  onStartNewBooking,
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedBookingForReceipt, setSelectedBookingForReceipt] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'active') return b.status !== 'completed' && b.status !== 'cancelled';
    if (filter === 'completed') return b.status === 'completed';
    return true;
  });

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="text-[10px] bg-amber-100 text-amber-800 font-black px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>
            <span>عربون مثبت • قيد التنسيق</span>
          </span>
        );
      case 'vendor_confirmed':
        return (
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>مؤكد من مزود الخدمة</span>
          </span>
        );
      case 'preparing':
        return (
          <span className="text-[10px] bg-blue-100 text-blue-800 font-black px-2 py-0.5 rounded-full">
            جارِ تجهيز المعدات والكادر
          </span>
        );
      case 'completed':
        return (
          <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full">
            مناسبة مكتملة ✓
          </span>
        );
      default:
        return (
          <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
            قيد المعالجة
          </span>
        );
    }
  };

  return (
    <section className="space-y-4 text-slate-800">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm font-extrabold text-slate-900">سجل مناسباتي وحجوزاتي 📅</h2>
          <p className="text-[11px] text-slate-500">متابعة العربون ومواعيد وصول الكوادر والمطاعم</p>
        </div>
        <button
          onClick={onStartNewBooking}
          className="text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl transition shadow-xs"
        >
          + حجز جديد
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setFilter('all')}
          className={`pb-1 font-bold transition ${
            filter === 'all'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          الكل ({bookings.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`pb-1 font-bold transition ${
            filter === 'active'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          المناسبات القادمة
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`pb-1 font-bold transition ${
            filter === 'completed'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          المكتملة
        </button>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-6 text-center border border-slate-200 space-y-2">
          <div className="text-3xl">🎈</div>
          <h4 className="text-xs font-bold text-slate-800">لا توجد حجوزات في هذا القسم</h4>
          <p className="text-[11px] text-slate-400">
            رتب لمّتك القادمة واستمتع بأقوى العروض الحصرية وكوادر الخدمة الفندقية.
          </p>
          <button
            onClick={onStartNewBooking}
            className="mt-2 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            رتّب لمّتك الآن
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs p-4 space-y-3 hover:border-amber-400 transition"
            >
              {/* Header */}
              <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-2.5">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-900">{b.occasion}</span>
                    <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded">
                      {b.bookingCode}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    تاريخ الطلب: {b.createdAt}
                  </span>
                </div>
                {getStatusBadge(b.status)}
              </div>

              {/* Event Info Details */}
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-2xl">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-bold">{b.eventDate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-bold">{b.eventTime}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Users className="w-3.5 h-3.5 text-amber-500" />
                  <span>{b.guestCount} شخص متوقع</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span className="truncate">{b.city} - {b.district}</span>
                </div>
              </div>

              {/* Items summary */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 block">الخدمات المضمنة:</span>
                {b.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-[11px] text-slate-700">
                    <span className="font-medium">• {item.title} ({item.quantity}x)</span>
                    <span className="font-bold">{(item.price * item.quantity).toLocaleString('ar-IQ')} د.ع</span>
                  </div>
                ))}
              </div>

              {/* Financial status */}
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">العربون المدفوع:</span>
                  <span className="font-black text-emerald-600">
                    {b.depositAmount.toLocaleString('ar-IQ')} د.ع
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block text-left">المتبقي:</span>
                  <span className="font-bold text-slate-800">
                    {b.remainingAmount.toLocaleString('ar-IQ')} د.ع
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-slate-500 block">الإجمالي:</span>
                  <span className="font-black text-amber-600">
                    {b.totalAmount.toLocaleString('ar-IQ')} د.ع
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setSelectedBookingForReceipt(b)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold py-2 rounded-xl transition flex items-center justify-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-600" />
                  <span>فاتورة الحجز</span>
                </button>

                <a
                  href={`https://wa.me/9647800000000?text=${encodeURIComponent(
                    `مرحباً، أستفسر بخصوص حجزي برقم ${b.bookingCode} لمناسبة ${b.occasion} بتاريخ ${b.eventDate}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold py-2 rounded-xl transition flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>واتساب المنسق</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invoice Modal */}
      {selectedBookingForReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-slate-900">
            {/* Invoice Header */}
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm">
                  ل
                </div>
                <div>
                  <h3 className="text-xs font-black">وصل حجز لمّـة الإلكتروني</h3>
                  <span className="text-[9px] text-amber-400 font-bold">
                    كود: {selectedBookingForReceipt.bookingCode}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedBookingForReceipt(null)}
                className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Invoice Body */}
            <div className="p-4 space-y-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-2xl space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">صاحب الحجز:</span>
                  <span className="font-bold">{selectedBookingForReceipt.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">رقم الهاتف:</span>
                  <span className="font-bold" dir="ltr">{selectedBookingForReceipt.customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">المكان والمحافظة:</span>
                  <span className="font-bold">
                    {selectedBookingForReceipt.city} - {selectedBookingForReceipt.district}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">الموعد المحدد:</span>
                  <span className="font-bold">
                    {selectedBookingForReceipt.eventDate} ({selectedBookingForReceipt.eventTime})
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="border border-slate-200 rounded-2xl p-2.5 space-y-1.5">
                <h5 className="font-black text-[11px] text-slate-800 border-b border-slate-100 pb-1">
                  البنود والخدمات:
                </h5>
                {selectedBookingForReceipt.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-[11px]">
                    <span>
                      {item.title} ({item.quantity}x)
                    </span>
                    <span className="font-bold">
                      {(item.price * item.quantity).toLocaleString('ar-IQ')} د.ع
                    </span>
                  </div>
                ))}
              </div>

              {/* Financials */}
              <div className="bg-amber-50 p-3 rounded-2xl space-y-1 border border-amber-200/60">
                <div className="flex justify-between font-bold text-slate-700">
                  <span>المبلغ الإجمالي:</span>
                  <span>{selectedBookingForReceipt.totalAmount.toLocaleString('ar-IQ')} د.ع</span>
                </div>
                <div className="flex justify-between font-black text-emerald-700">
                  <span>العربون المسدد (زين كاش/كي كارد):</span>
                  <span>{selectedBookingForReceipt.depositAmount.toLocaleString('ar-IQ')} د.ع</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 border-t border-amber-200 pt-1">
                  <span>المتبقي يوم المناسبة:</span>
                  <span>{selectedBookingForReceipt.remainingAmount.toLocaleString('ar-IQ')} د.ع</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 text-center">
                شكراً لاختياركم منصة لمّـة • بغداد، العراق 🇮🇶
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
              <button
                onClick={() => setSelectedBookingForReceipt(null)}
                className="w-full bg-slate-900 text-white font-bold text-xs py-2 rounded-xl hover:bg-slate-800"
              >
                إغلاق الوصل
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
