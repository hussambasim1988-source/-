import React, { useRef, useState } from 'react';
import { 
  Download, 
  Printer, 
  X, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Building2, 
  Truck, 
  ShieldCheck, 
  CreditCard, 
  MessageCircle, 
  FileText, 
  Sparkles, 
  HelpCircle,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

interface PdfGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfGuideModal: React.FC<PdfGuideModalProps> = ({ isOpen, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const pdfUrl = '/Lamma_App_Guide.pdf';
  const standaloneGuideUrl = '/guide.html';

  const handleTriggerDownload = async () => {
    try {
      // 1. Fetch the pre-generated static PDF file
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error('File not found');
      const blob = await response.blob();
      
      // 2. Create blob URL and simulate download
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'دليل_منصة_لمة_للمناسبات_العراق.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch {
      // Fallback: direct window open
      window.open(pdfUrl, '_blank');
    }
  };

  const handleCopyLink = () => {
    const fullUrl = window.location.origin + pdfUrl;
    navigator.clipboard?.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    // Open the standalone clean HTML page in a new window and trigger print
    const printWindow = window.open(standaloneGuideUrl, '_blank');
    if (printWindow) {
      printWindow.focus();
    } else {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Control Bar */}
        <div className="p-3.5 sm:p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap gap-2 items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-black flex items-center gap-2">
                <span>الدليل الإرشادي الرسمي لمنصة لمّـة للمناسبات</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  ملف PDF رسمي
                </span>
              </h3>
              <p className="text-[10px] text-slate-400">
                شرح تفصيلي خطوة بخطوة لكافة خطوات الحجز، المطاعم، الكوادر، ودفع العربون
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Direct Native PDF Download Anchor */}
            <a
              href={pdfUrl}
              download="دليل_منصة_لمة_للمناسبات_العراق.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setDownloadSuccess(true)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل ملف PDF فوري</span>
            </a>

            {/* Standalone page for printing / browser save as PDF */}
            <a
              href={standaloneGuideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1.5 border border-slate-700 cursor-pointer"
              title="فتح الدليل في صفحة مستقلة للطباعة أو الحفظ كـ PDF"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>فتح وطباعة A4</span>
            </a>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notice & Direct Links Banner */}
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex flex-wrap justify-between items-center text-[11px] text-amber-200 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>الملف جاهز للتحميل بحجم (68 كيلوبايت) بصيغة PDF أصلية متوافقة مع كافة الهواتف والحواسيب.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 underline underline-offset-2"
            >
              {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedLink ? 'تم نسخ الرابط' : 'نسخ رابط ملف الـ PDF'}</span>
            </button>
            <span>•</span>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-2"
            >
              معاينة الملف المباشر
            </a>
          </div>
        </div>

        {/* Download Success Notice */}
        {downloadSuccess && (
          <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 text-center flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>بدأ تحميل ملف دليل منصة لمّـة (PDF) على جهازك بنجاح! إذا لم يبدأ تلقائياً، انقر على زر (معاينة الملف المباشر) بالأعلى.</span>
          </div>
        )}

        {/* Document Scroll View Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-3 sm:p-6 bg-slate-950/60">
          
          {/* Document Container - A4 Sheet */}
          <div
            className="w-full max-w-3xl mx-auto bg-white text-slate-800 p-6 sm:p-10 rounded-2xl shadow-xl font-['Tajawal',sans-serif] space-y-8 border border-slate-200 text-right"
            dir="rtl"
          >
            {/* Header Ribbon of the Document */}
            <div className="border-b-2 border-amber-500 pb-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-black text-slate-950 text-2xl shadow-md">
                  ل
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-none">
                    منصة لمّـة للمناسبات | Lamma App
                  </h1>
                  <span className="text-xs text-amber-600 font-extrabold mt-1 block">
                    الدليل الإرشادي والتنفيذي الكامل للمستخدم ومنسقي الحفلات (2026)
                  </span>
                </div>
              </div>
              <div className="text-left text-[11px] text-slate-500 font-bold hidden sm:block">
                <div>النسخة: 2.5</div>
                <div>تاريخ الإصدار: 2026</div>
                <div className="text-amber-600">بغداد • العراق 🇮🇶</div>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs leading-relaxed space-y-1.5">
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>مقدمة عن المنصة</span>
              </h2>
              <p className="text-slate-700">
                <strong>منصة لمّـة</strong> هي أول تطبيق عراقي ذكي متكامل مصمم لحجز وتنسيق وتنظيم كافة أنواع المناسبات (أعياد ميلاد، افتتاح عيادات ومشاريع، تخرج، خطوبة وحنة، ختان طفل، واجتماعات العمل). يربط التطبيق أصحاب المناسبات مباشرةً بأفضل المطاعم والقاعات المحجوزة حصرياً، ومحلات الكيك، وكوادر الضيافة الفندقية، ومحطات الطهي الحية (شيف الشاورما، عربات القهوة، والباربكيو) مع نظام حجز آمن يعتمد على دفع <strong>عربون 25% فقط</strong> لتثبيت الموعد.
              </p>
            </div>

            {/* Quick Index */}
            <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-2xl">
              <h3 className="text-xs font-black text-amber-900 mb-2">فهرس خطوات رحلة الحجز:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-black">1</span>
                  <span>الخطوة 1: معالج إعداد المناسبة (تحديد النوع والضيوف)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-black">2</span>
                  <span>الخطوة 2: اختيار المسار (المكان + الخدمات أو خدمات فقط)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-black">3</span>
                  <span>الخطوة 3: حجز باقات المطاعم أو الكوادر واللايف ستيشن</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-black">4</span>
                  <span>الخطوة 4: السلة والشفافية المالية وحساب العربون (25%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-black">5</span>
                  <span>الخطوة 5: طرق الدفع المعتمدة (زين كاش وكي كارد)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-black">6</span>
                  <span>الخطوة 6: التتبع الفوري ورمز الحجز وإشعار الواتساب</span>
                </div>
              </div>
            </div>

            {/* STEP 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-r-4 border-amber-500 pr-3">
                <span className="bg-slate-900 text-amber-400 text-xs font-black px-2.5 py-1 rounded-lg">الخطوة 1</span>
                <h3 className="text-base font-black text-slate-900">معالج إعداد المناسبة (Wizard)</h3>
              </div>
              <div className="text-xs text-slate-700 leading-relaxed pr-4 space-y-2">
                <p>عند فتح تطبيق لمّـة، يبدأ المستخدم بتحديد التفاصيل الأساسية لمناسبته:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                    <span className="font-black text-slate-900 block mb-1">1. نوع المناسبة:</span>
                    <p className="text-[11px] text-slate-600">عيد ميلاد (🎂)، افتتاح عيادة أو مشروع (🏥)، تخرج (🎓)، خطوبة/حنة (💍)، ختان طفل (👶)، أو اجتماع عمل (💼).</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                    <span className="font-black text-slate-900 block mb-1">2. الموعد والتوقيت:</span>
                    <p className="text-[11px] text-slate-600">تحديد تاريخ المناسبة بدقة ووقت بدء استقبال الضيوف لحجز وتفريغ الكادر في نفس الموعد.</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                    <span className="font-black text-slate-900 block mb-1">3. عدد الحضور:</span>
                    <p className="text-[11px] text-slate-600">سلايدر مرن من 10 إلى 200+ شخص يعطيك اقتراحاً ذكياً لحجم الصالة أو وجبات الشاورما المطلوبة.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-r-4 border-amber-500 pr-3">
                <span className="bg-slate-900 text-amber-400 text-xs font-black px-2.5 py-1 rounded-lg">الخطوة 2</span>
                <h3 className="text-base font-black text-slate-900">المفترق المفصلي: اختيار مسار المناسبة</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-4 text-xs">
                <div className="border-2 border-amber-400/80 bg-amber-50/40 p-3.5 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 font-black text-amber-900">
                    <Building2 className="w-4 h-4 text-amber-600" />
                    <span>المسار الأول: المكان + الخدمات 🏢</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    مخصص للمستخدمين الراغبين بحجز مكان جاهز يتكفل بالطعام والضيافة:
                  </p>
                  <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-1">
                    <li><strong>مطعم صاج الريف - المنصور:</strong> سعة 20-70 شخص، مجهز بصوتيات وشاشات وتكييف فندقي.</li>
                    <li><strong>عرض لمّة الحصري (-20%):</strong> 30 وجبة صاج مكس + مقبلات ملكية + مشروبات غير محدودة + كيكة مجانية من المطعم (240 ألف بدل 300 ألف د.ع).</li>
                    <li><strong>قائمة الطعام الفردية:</strong> إمكانية طلب وجبات صاج لحم إضافية (6,500 د.ع)، مشويات مشكل (14,000 د.ع)، بقلاوة بدهن حر.</li>
                    <li><strong>خيارات أخرى:</strong> حدائق وقاعة دجلة الملكية بالجادرية، بيتي لاونج بالكرادة.</li>
                  </ul>
                </div>

                <div className="border-2 border-blue-400/80 bg-blue-50/40 p-3.5 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 font-black text-blue-900">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>المسار الثاني: عندي المكان (خدمات فقط) 🏡</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    مخصص للمناسبات في العيادات، المنازل، الحدائق الخاصة، والمكاتب:
                  </p>
                  <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-1">
                    <li><strong>محلات الكيك:</strong> قالب كيك افتتاح VIP مخصص باللوجو والاسم من كيك توليب (45 ألف)، كيك تخرج طبقتين، وتوزيعات ختان (35 ألف).</li>
                    <li><strong>كوادر الضيافة:</strong> طاقم 3 ويترز زي رسمي موحد لـ 4 ساعات (120 ألف)، مضيفات استقبال، ومقدم قهوة عربية بالدلة.</li>
                    <li><strong>محطات الطهي لايف:</strong> شيف شاورما كامل بموقعك (320 ألف)، عربة قهوة مختصة 50 كوب مع باريستا (180 ألف)، ستيشن باربكيو فحم.</li>
                    <li><strong>ديكور وتصوير:</strong> قوس بالونات وإضاءة نيون (85 ألف)، ومصور محترف مع فيديو ريلز فوري (95 ألف).</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* STEP 3 & 4 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-r-4 border-amber-500 pr-3">
                <span className="bg-slate-900 text-amber-400 text-xs font-black px-2.5 py-1 rounded-lg">الخطوة 3 و 4</span>
                <h3 className="text-base font-black text-slate-900">السلة، الشفافية المالية، واحتساب العربون</h3>
              </div>
              <div className="text-xs text-slate-700 leading-relaxed pr-4 space-y-2">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
                  <div className="flex justify-between items-center text-slate-800">
                    <span>• رسوم المنصة والتنسيق اللوجستي:</span>
                    <span className="font-black text-emerald-600">مجاناً 0 د.ع (عرض ترويجي لمستخدمي التطبيق) 🎁</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-800 border-t border-slate-200 pt-1.5">
                    <span>• العربون المطلوب لتثبيت الموعد (25%):</span>
                    <span className="font-black text-amber-600">يُسدد إلكترونياً لضمان حجز الموعد وتفريغ الكادر والمطعم</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-800 border-t border-slate-200 pt-1.5">
                    <span>• المبلغ المتبقي (75%):</span>
                    <span className="font-bold text-slate-900">يُدفع نقداً أو تحويلاً يوم المناسبة بعد وصول الكادر وفحص التجهيزات</span>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 5 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-r-4 border-amber-500 pr-3">
                <span className="bg-slate-900 text-amber-400 text-xs font-black px-2.5 py-1 rounded-lg">الخطوة 5</span>
                <h3 className="text-base font-black text-slate-900">طرق دفع العربون المعتمدة في العراق</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-4 text-xs">
                <div className="bg-white border-2 border-slate-900 p-3 rounded-2xl space-y-1">
                  <div className="flex items-center gap-2 font-black text-slate-950">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span>1. محفظة زين كاش (ZainCash)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    الدفع الفوري من خلال تطبيق محفظة زين كاش عبر رقم المحفظة المعتمد أو مسح رمز الاستجابة السريع (QR Code) مع إشعار فوري بالحوالة.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 p-3 rounded-2xl space-y-1">
                  <div className="flex items-center gap-2 font-black text-slate-900">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span>2. ماستركارد / كي كارد (Qi Card)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    الدفع عبر بطاقات الدفع الوطنية العراقية (مصرف الرافدين، الرشيد، مصرف بغداد، وجميع البطاقات المعتمدة) بأعلى معايير الأمان 3D Secure.
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 6 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-r-4 border-amber-500 pr-3">
                <span className="bg-slate-900 text-amber-400 text-xs font-black px-2.5 py-1 rounded-lg">الخطوة 6</span>
                <h3 className="text-base font-black text-slate-900">تأكيد الحجز وتتبع المراحل الأربعة عبر الواتساب</h3>
              </div>
              <div className="text-xs text-slate-700 leading-relaxed pr-4 space-y-2">
                <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl space-y-2 text-[11px]">
                  <div className="flex items-center gap-2 font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>يتم إصدار كود حجز رسمي فريد (مثال: LAMMA-2026-7841).</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-emerald-900">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>توليد رسالة واتساب معتمدة ومجهزة بكافة التفاصيل للتواصل المباشر مع المنسق.</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-emerald-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>بدء نظام التتبع الحي: (1. استلام الطلب وتثبيت العربون ✓ 2. تأكيد المزود 3. تجهيز المعدات 4. وصول الكادر للموقع).</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Table of Recommended Packages */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-900 border-r-4 border-amber-500 pr-3">
                جدول مقارنة أبرز الباقات والخدمات الأكثر طلباً في بغداد:
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] text-right border-collapse border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="p-2 border border-slate-700">الخدمة / الباقة</th>
                      <th className="p-2 border border-slate-700">مزود الخدمة</th>
                      <th className="p-2 border border-slate-700">السعة / الكمية</th>
                      <th className="p-2 border border-slate-700">السعر الإجمالي</th>
                      <th className="p-2 border border-slate-700">العربون (25%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr className="hover:bg-amber-50/50">
                      <td className="p-2 font-bold">سيت منيو صاج الريف للمناسبات</td>
                      <td className="p-2">مطعم صاج الريف - المنصور</td>
                      <td className="p-2">30 شخص + كيكة مجاناً</td>
                      <td className="p-2 font-black text-amber-600">240,000 د.ع</td>
                      <td className="p-2 font-bold text-emerald-700">60,000 د.ع</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50">
                      <td className="p-2 font-bold">شيف شاورما لايف بموقعك</td>
                      <td className="p-2">فريق الشاورما الملكية</td>
                      <td className="p-2">سيخ كامل (50-60 شخص)</td>
                      <td className="p-2 font-black text-amber-600">320,000 د.ع</td>
                      <td className="p-2 font-bold text-emerald-700">80,000 د.ع</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50">
                      <td className="p-2 font-bold">عربة قهوة مختصة لايف + باريستا</td>
                      <td className="p-2">بار القهوة المتنقل VIP</td>
                      <td className="p-2">50 كوب حار وبارد</td>
                      <td className="p-2 font-black text-amber-600">180,000 د.ع</td>
                      <td className="p-2 font-bold text-emerald-700">45,000 د.ع</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50">
                      <td className="p-2 font-bold">كادر ضيافة ويترز (3 شباب زي موحد)</td>
                      <td className="p-2">شركة النخبة للبروتوكول</td>
                      <td className="p-2">4 ساعات خدمة متواصلة</td>
                      <td className="p-2 font-black text-amber-600">120,000 د.ع</td>
                      <td className="p-2 font-bold text-emerald-700">30,000 د.ع</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50">
                      <td className="p-2 font-bold">قالب كيك افتتاح مخصص VIP</td>
                      <td className="p-2">محل كيك توليب - المنصور</td>
                      <td className="p-2">30 إلى 40 شخص باللوجو</td>
                      <td className="p-2 font-black text-amber-600">45,000 د.ع</td>
                      <td className="p-2 font-bold text-emerald-700">11,250 د.ع</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQs & Guarantees */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
              <h3 className="font-black text-slate-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                <span>الأسئلة الشائعة وضمانة منصة لمّـة:</span>
              </h3>
              <div className="space-y-1.5 text-[11px] text-slate-700">
                <p><strong>س: هل العربون مسترد في حال تأجيل المناسبة؟</strong><br />
                ج: نعم، يحق للمستخدم إعادة جدولة وتغيير موعد المناسبة مجاناً قبل 48 ساعة من الموعد دون أي غرامات، ويتم ترحيل العربون للموعد الجديد.</p>
                <p><strong>س: متى يصل كادر الشاورما أو القهوة للموقع؟</strong><br />
                ج: يصل فريق التجهيز قبل موعد بدء المناسبة بساعة إلى ساعة ونصف لتسخين السيخ وتجهيز الصمون وضبط الآلات ليكون كل شيء جاهزاً عند وصول أول ضيف.</p>
                <p><strong>س: كيف أتواصل مع خدمة العملاء في بغداد؟</strong><br />
                ج: الدعم الفني ومنسقو الحفلات متاحون 24/7 عبر الخط الساخن والواتساب: <strong>07800000000</strong>.</p>
              </div>
            </div>

            {/* Document Footer */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 gap-2">
              <span>جميع الحقوق محفوظة © 2026 لمنصة لمّـة لتقنية تنظيم المناسبات في العراق.</span>
              <div className="flex items-center gap-2 text-slate-500 font-bold">
                <span>بغداد • المنصور • الكرادة • الجادرية</span>
                <span>•</span>
                <span>www.lamma-events.iq</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex flex-wrap gap-2 justify-between items-center text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download="دليل_منصة_لمة_للمناسبات_العراق.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 text-slate-950 font-black px-3 py-1.5 rounded-lg hover:bg-amber-400 transition"
            >
              تنزيل PDF مباشر
            </a>
            <a
              href={standaloneGuideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white underline"
            >
              فتح في صفحة مستقلة
            </a>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-1.5 rounded-xl transition"
          >
            إغلاق الدليل
          </button>
        </div>

      </div>
    </div>
  );
};
