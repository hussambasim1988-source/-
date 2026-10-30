import React, { useState } from 'react';
import { User, Phone, MapPin, Award, CreditCard, HelpCircle, MessageCircle, ChevronDown, ChevronUp, ShieldCheck, Heart, FileText, Download } from 'lucide-react';

interface ProfileScreenProps {
  onOpenPdfGuide?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onOpenPdfGuide }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'كيف يتم تثبيت موعد المناسبة وحجز المطعم أو الكادر؟',
      a: 'يتم تثبيت الموعد بدفع عربون رمزي يمثل 25% من قيمة الطلب عبر زين كاش أو كي كارد. يتم حجز القاعة وتعيين الكادر فوراً ويصلك إشعار واتساب رسمي برقم الحجز.',
    },
    {
      q: 'متى يتم دفع المبلغ المتبقي؟',
      a: 'المبلغ المتبقي يُسدد في نفس يوم المناسبة بعد وصول الكادر والتأكد من استلام كافة التجهيزات وفق المواصفات المطلوبة.',
    },
    {
      q: 'هل يمكن تعديل موعد المناسبة أو زيادة عدد الوجبات؟',
      a: 'نعم، يمكنك التواصل مع منسق لمّـة عبر الواتساب قبل موعد المناسبة بـ 48 ساعة لتعديل التوقيت أو إضافة وجبات وكوادر إضافية بكل سهولة.',
    },
    {
      q: 'ما هي المناطق التي تغطيها كوادر الشاورما والقهوة والضيافة؟',
      a: 'نغطي حالياً كافة مناطق بغداد (الرصافة والكرخ)، بالإضافة إلى توفر باقات مخصصة في محافظات البصرة، أربيل، والنجف الأشرف.',
    },
  ];

  return (
    <section className="space-y-4 text-slate-800">
      {/* User Info Card */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-black text-xl shadow-md shadow-amber-500/20">
          ح
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-black text-slate-900">د. حسام باسم</h3>
            <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-full">
              عضو ذهبي VIP
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5" dir="ltr">
            0770 123 4567
          </span>
          <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-rose-500" />
            <span>بغداد، الحارثية - شارع الكندي</span>
          </span>
        </div>
      </div>

      {/* Lamma Loyalty Points Box */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 p-4 rounded-3xl text-white shadow-md border border-amber-500/20 relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] text-amber-400 font-black uppercase flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>مكافآت برنامج لمّـة كلوب</span>
            </span>
            <div className="text-2xl font-black text-amber-300 mt-1">240 نقطة</div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              تعادل خصم <strong className="text-white">15,000 د.ع</strong> على مناسبتك القادمة
            </p>
          </div>
          <button className="bg-amber-500 text-slate-950 text-xs font-black px-3 py-1.5 rounded-xl hover:bg-amber-400 transition shadow-sm">
            استبدال النقاط
          </button>
        </div>
      </div>

      {/* Saved Payment Methods */}
      <div className="bg-white rounded-3xl p-3.5 border border-slate-200 shadow-xs space-y-2.5">
        <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5 text-amber-500" />
          <span>المحافظ وطرق الدفع المفضلة</span>
        </h4>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
              <div>
                <span className="font-bold text-slate-900 block">محفظة زين كاش العراقية</span>
                <span className="text-[10px] text-slate-400" dir="ltr">0780****432</span>
              </div>
            </div>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
              نشطة ومربوطة
            </span>
          </div>

          <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-600" />
              <div>
                <span className="font-bold text-slate-900 block">بطاقة كي كارد / ماستركارد</span>
                <span className="text-[10px] text-slate-400">تنتهي في 09/2028</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-bold">حفظ تلقائي</span>
          </div>
        </div>
      </div>

      {/* Direct Customer Support Buttons */}
      <div className="space-y-2">
        <h4 className="text-xs font-black text-slate-800">خدمة عملاء لمّـة (24/7):</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <a
            href="https://wa.me/9647800000000?text=مرحباً،%20أحتاج%20مساعدة%20في%20تنسيق%20مناسبة"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>واتساب المنسقين</span>
          </a>

          <a
            href="tel:07800000000"
            className="p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
          >
            <Phone className="w-4 h-4" />
            <span>الاتصال المباشر</span>
          </a>
        </div>
      </div>

      {/* PDF Guide Banner */}
      {onOpenPdfGuide && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-500/30 p-3.5 rounded-3xl flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-sm shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900">دليل المنصة الشامل (PDF)</h4>
              <p className="text-[10px] text-slate-600 mt-0.5">
                ملف PDF رسمي يشرح كافة خطوات الحجز وطرق الدفع والضمانات
              </p>
            </div>
          </div>
          <button
            onClick={onOpenPdfGuide}
            className="bg-slate-950 hover:bg-slate-800 text-amber-400 text-xs font-black px-3 py-2 rounded-xl transition flex items-center gap-1 shrink-0 active:scale-95 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>عرض وتحميل</span>
          </button>
        </div>
      )}

      {/* FAQ Accordion */}
      <div className="bg-white rounded-3xl p-3.5 border border-slate-200 shadow-xs space-y-2">
        <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5 mb-1">
          <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
          <span>الأسئلة الشائعة وضمان المناسبات</span>
        </h4>

        <div className="space-y-1.5 divide-y divide-slate-100">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="pt-2 first:pt-0">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex justify-between items-center text-right text-xs font-bold text-slate-800 py-1 transition hover:text-amber-600"
                >
                  <span className="leading-snug">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
                  )}
                </button>
                {isOpen && (
                  <p className="text-[11px] text-slate-600 pt-1 leading-relaxed pr-2">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-[10px] text-slate-400 pb-2">
        <span>منصة لمّـة لتنسيق المناسبات • الإصدار 2.5 • بغداد 2026</span>
      </div>
    </section>
  );
};
