import React, { useState } from 'react';
import { CartItem, Booking } from '../types';
import { ArrowRight, Trash2, Plus, Minus, Lock, CheckCircle2, ShieldCheck, MapPin, Phone, User, Calendar, Clock, Sparkles } from 'lucide-react';

interface CheckoutScreenProps {
  cart: CartItem[];
  occasion: string;
  eventDate: string;
  eventTime: string;
  guestCount: number;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onBack: () => void;
  onConfirmBooking: (booking: Booking) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  cart,
  occasion,
  eventDate,
  eventTime,
  guestCount,
  onUpdateQuantity,
  onRemoveItem,
  onBack,
  onConfirmBooking,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [city, setCity] = useState('بغداد');
  const [district, setDistrict] = useState('المنصور');
  const [addressNotes, setAddressNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'zain_cash' | 'qi_card' | 'cash'>('zain_cash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Calculations
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const depositPrice = Math.round(totalPrice * 0.25);
  const remainingPrice = totalPrice - depositPrice;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setErrorMsg('سلة حجزك فارغة. يرجى اختيار باقة أو خدمة أولاً.');
      return;
    }
    if (!customerName.trim()) {
      setErrorMsg('يرجى إدخال اسم صاحب الحجز.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 10) {
      setErrorMsg('يرجى إدخال رقم هاتف عراقي صالح (مثال: 07701234567).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Generate authentic booking code
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      id: 'booking-' + Date.now(),
      bookingCode: `LAMMA-2026-${randomCode}`,
      occasion,
      eventDate,
      eventTime,
      guestCount,
      items: [...cart],
      totalAmount: totalPrice,
      depositAmount: depositPrice,
      remainingAmount: remainingPrice,
      paymentMethod,
      customerName,
      customerPhone,
      city,
      district,
      addressNotes,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onConfirmBooking(newBooking);
    }, 600);
  };

  return (
    <section className="space-y-4">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition active:scale-95"
      >
        <ArrowRight className="w-3.5 h-3.5" />
        <span>الرجوع وتعديل الاختيارات</span>
      </button>

      {/* Cart Items Card */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs font-black text-slate-900">تفاصيل حجز المناسبة 📋</h3>
            <span className="text-[10px] text-slate-500">({occasion} • {guestCount} شخص)</span>
          </div>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>حجز أولي مؤكد</span>
          </span>
        </div>

        {/* Date & Time pill */}
        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl text-[11px] text-slate-600">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-bold">{eventDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-bold">{eventTime}</span>
          </div>
        </div>

        {/* Item Rows */}
        <div className="space-y-2.5 divide-y divide-slate-100">
          {cart.length === 0 ? (
            <p className="text-xs text-slate-400 py-3 text-center">لا توجد خدمات مختارة بالسلة بعد</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="pt-2 first:pt-0 flex justify-between items-center text-xs">
                <div className="flex-1 pl-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">{item.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">{item.vendor}</span>
                  <span className="text-xs font-black text-amber-600 mt-0.5 block">
                    {(item.price * item.quantity).toLocaleString('ar-IQ')} د.ع
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-slate-100 rounded-xl px-2 py-1">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="text-slate-600 hover:text-slate-950 font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-black px-1">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="text-slate-600 hover:text-slate-950 font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-slate-400 hover:text-rose-500 p-1"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Platform Fees & Total */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-500 text-[11px]">
            <span>رسوم المنصة والتنسيق اللوجستي:</span>
            <span className="font-bold text-emerald-600">مجاناً (عرض لمّة) 🎁</span>
          </div>
          <div className="border-t border-slate-100 pt-2 flex justify-between text-sm font-black text-slate-900">
            <span>المجموع الكلي للحجز:</span>
            <span className="text-amber-600">{totalPrice.toLocaleString('ar-IQ')} د.ع</span>
          </div>
        </div>
      </div>

      {/* حساب العربون والمتبقي */}
      <div className="bg-amber-50/90 border border-amber-200 p-3.5 rounded-3xl space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-800">العربون المطلوب لتثبيت الموعد (25%):</span>
          <span className="font-black text-amber-700 text-base">
            {depositPrice.toLocaleString('ar-IQ')} د.ع
          </span>
        </div>
        <div className="flex justify-between items-center text-[11px] text-slate-600 border-t border-amber-200/60 pt-1.5">
          <span>المبلغ المتبقي يوم المناسبة للكادر:</span>
          <span className="font-bold text-slate-800">{remainingPrice.toLocaleString('ar-IQ')} د.ع</span>
        </div>
        <div className="text-[10px] text-amber-800/80 flex items-center gap-1 pt-0.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>العربون محمي في محفظة لمّة حتى وصول الكادر والتأكد من جودة الخدمة.</span>
        </div>
      </div>

      {/* Form: Customer Details & Payment */}
      <form onSubmit={handleCheckoutSubmit} className="space-y-4">
        {/* Customer Information */}
        <div className="bg-white p-3.5 rounded-3xl border border-slate-200 shadow-xs space-y-2.5">
          <h4 className="text-xs font-black text-slate-900 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-amber-500" />
            <span>بيانات صاحب المناسبة للتواصل والتنسيق</span>
          </h4>

          <div className="space-y-2">
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">الاسم الكامل *</label>
              <input
                type="text"
                required
                placeholder="مثال: د. حسام باسم"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-500 transition"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">
                رقم الهاتف (واتساب عراقي لتأكيد الحجز) *
              </label>
              <input
                type="tel"
                required
                placeholder="0770 123 4567"
                dir="ltr"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-500 text-right transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">المحافظة</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 outline-none focus:border-amber-500"
                >
                  <option value="بغداد">بغداد</option>
                  <option value="البصرة">البصرة</option>
                  <option value="أربيل">أربيل</option>
                  <option value="النجف">النجف الأشرف</option>
                  <option value="كربلاء">كربلاء المقدسة</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">المنطقة / الحي</label>
                <input
                  type="text"
                  placeholder="مثال: المنصور، الكرادة"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">
                ملاحظات خاصة (تفاصيل العنوان، الكتابة على الكيك...)
              </label>
              <textarea
                rows={2}
                placeholder="مثال: يرجى كتابة (مبارك الافتتاح د. حسام) على الكيكة، ووصول الكادر قبل نصف ساعة من الموعد."
                value={addressNotes}
                onChange={(e) => setAddressNotes(e.target.value)}
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-amber-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* طرق دفع العربون */}
        <div>
          <label className="text-xs font-extrabold text-slate-800 block mb-2">
            طريقة دفع العربون لتثبيت الموعد:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {/* زين كاش */}
            <button
              type="button"
              onClick={() => setPaymentMethod('zain_cash')}
              className={`p-2.5 rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-xs transition active:scale-95 ${
                paymentMethod === 'zain_cash'
                  ? 'border-2 border-slate-950 bg-white text-slate-900 shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-400'
              }`}
            >
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>زين كاش (ZainCash)</span>
            </button>

            {/* ماستركارد / كي كارد */}
            <button
              type="button"
              onClick={() => setPaymentMethod('qi_card')}
              className={`p-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 ${
                paymentMethod === 'qi_card'
                  ? 'border-2 border-slate-950 bg-white text-slate-900 shadow-sm font-black'
                  : 'border border-slate-200 bg-white text-slate-400'
              }`}
            >
              <span>ماستركارد / كي كارد</span>
            </button>
          </div>

          <p className="text-[10px] text-slate-500 mt-1.5 text-center">
            {paymentMethod === 'zain_cash'
              ? 'سيتم تحويلك لمحفظة زين كاش أو إرسال رقم المحفظة المعتمد عبر الواتساب لتأكيد الإيداع.'
              : 'دفع إلكتروني آمن عبر بوابة الدفع الوطنية العراقية Qi / Mastercard.'}
          </p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
            {errorMsg}
          </div>
        )}

        {/* زر الدفع النهائي */}
        <button
          type="submit"
          disabled={isSubmitting || cart.length === 0}
          className="w-full bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs py-3.5 rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>جارِ تأكيد الحجز وتثبيت الموعد...</span>
          ) : (
            <>
              <span>تأكيد الحجز ودفع العربون ({depositPrice.toLocaleString('ar-IQ')} د.ع)</span>
              <Lock className="w-3.5 h-3.5 text-slate-950" />
            </>
          )}
        </button>
      </form>
    </section>
  );
};
