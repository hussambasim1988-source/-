import { OccasionOption, Venue, StandaloneService, Booking } from '../types';

export const OCCASIONS_LIST: OccasionOption[] = [
  { id: 'birthday', name: 'عيد ميلاد', icon: '🎂', recommendedGuests: 30 },
  { id: 'clinic', name: 'افتتاح عيادة', icon: '🏥', recommendedGuests: 45 },
  { id: 'grad', name: 'تخرج', icon: '🎓', recommendedGuests: 50 },
  { id: 'engagement', name: 'خطوبة/حنة', icon: '💍', recommendedGuests: 60 },
  { id: 'khitan', name: 'ختان', icon: '👶', recommendedGuests: 35 },
  { id: 'business', name: 'اجتماع/عمل', icon: '💼', recommendedGuests: 20 },
  { id: 'family', name: 'عزيمة ولمّة عائلية', icon: '🥘', recommendedGuests: 25 },
];

export const VENUES_DATA: Venue[] = [
  {
    id: 'saj-al-reef-mansour',
    name: 'مطعم صاج الريف - المنصور',
    category: 'مطاعم ومناسبات عائلية',
    location: 'بغداد - المنصور، تقاطع الرواد',
    city: 'بغداد',
    rating: 4.9,
    reviewsCount: 140,
    capacityMin: 20,
    capacityMax: 70,
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    features: ['مكيف بالكامل', 'باركينغ سيارات', 'صوتيات وشاشات عرض', 'خدمة صف السيارات'],
    offers: [
      {
        id: 'saj-offer-1',
        name: 'سيت منيو أعياد الميلاد والمناسبات (الباقة الأكثر طلباً)',
        price: 240000,
        originalPrice: 300000,
        discount: '20%',
        category: 'offers',
        popular: true,
        image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=500&auto=format&fit=crop&q=80',
        description: '30 وجبة شاورما صاج مكس (لحم ودجاج عراقي) + ماعونين مقبلات ملكية مشكلة + مشروبات غازية غير محدودة + كيكة احتفالية مجانية من المطعم.'
      },
      {
        id: 'saj-offer-2',
        name: 'باقة الوليمة الملكية الفاخرة VIP (لـ 45 شخص)',
        price: 430000,
        originalPrice: 510000,
        discount: '15%',
        category: 'offers',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=80',
        description: '45 وجبة صاج ومشاوي عراقي مشكل + بوفيه مقبلات باردة وحارة + بار عصائر طبيعية فريش + كيكة مخصصة بالاسم + ستاند تصوير احتفالي.'
      }
    ],
    menu: [
      {
        id: 'item-saj-beef',
        name: 'وجبة صاج لحم عراقي سوبر (مع بطاطا ومقبلات)',
        price: 6500,
        category: 'individual',
        image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500&auto=format&fit=crop&q=80',
        description: 'شاورما لحم غنم عراقي بلدي بالخبز الصاج المقرمش مع طرشي وثومية وصوص خاص وبطاطا مقرمشة.'
      },
      {
        id: 'item-saj-chicken',
        name: 'وجبة صاج دجاج عراقي متبل فاخر',
        price: 6000,
        category: 'individual',
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&auto=format&fit=crop&q=80',
        description: 'شاورما دجاج متبل على أصولها مع صلصة الثوم المميزة وبطاطا مقلية صاج حار مقرمش.'
      },
      {
        id: 'item-mashawi-platter',
        name: 'ماعون مشويات مشكل فاخر (كباب وتكة وشيش طاووق)',
        price: 14000,
        category: 'individual',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80',
        description: 'سيخين كباب عراقي + سيخ تكة لحم + سيخ شيش طاووق مع الخضار المشوية وخبز التنور الحار.'
      },
      {
        id: 'item-appetizers-large',
        name: 'صينية مقبلات ملكية فاخرة (8 أصناف مشكلة)',
        price: 15000,
        category: 'individual',
        image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=500&auto=format&fit=crop&q=80',
        description: 'حمص بطحينة، متبل باذنجان، بابا غنوج، تبولة، فتوش، جاجيك، وسلطات موسمية.'
      },
      {
        id: 'item-baklava',
        name: 'صينية بقلاوة بالفستق الحلبي ودهن حر (للمناسبات)',
        price: 25000,
        category: 'individual',
        image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500&auto=format&fit=crop&q=80',
        description: 'بقلاوة عراقية مقرمشة محشوة بالفستق ومسقية بالشيرة العطرية.'
      }
    ]
  },
  {
    id: 'dijlah-gardens-jadriya',
    name: 'حدائق وقاعة دجلة الملكية - الجادرية',
    category: 'قاعات وحدائق حفلات مفتوحة',
    location: 'بغداد - الجادرية، إطلالة على نهر دجلة',
    city: 'بغداد',
    rating: 4.8,
    reviewsCount: 95,
    capacityMin: 30,
    capacityMax: 160,
    coverImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format&fit=crop&q=80',
    features: ['إطلالة نهرية ساحرة', 'حديقة خضراء مضاءة', 'نظام صوت ودي جي', 'بوفيه مفتوح'],
    offers: [
      {
        id: 'dijlah-offer-1',
        name: 'باقة الحديقة الملكية لحفلات الخطوبة والتخرج (50 شخص)',
        price: 520000,
        originalPrice: 650000,
        discount: '20%',
        category: 'offers',
        popular: true,
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&auto=format&fit=crop&q=80',
        description: 'جلسات خارجية فندقية راقية + بوفيه مشاوي حية ومقبلات فاخرة + كيك احتفالي طبقتين + دي جي وإضاءة فييري لايتس ساحرة.'
      }
    ],
    menu: [
      {
        id: 'item-dijlah-bbq',
        name: 'وجبة مشاوي نهرية خاصة مع رز برياني فاخر',
        price: 16500,
        category: 'individual',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80',
        description: 'مشويات ع الصاج مع رز زعفران ومكسرات وصلصة دجلة الحارة.'
      }
    ]
  },
  {
    id: 'beiti-lounge-karrada',
    name: 'بيتي لاونج & مطعم - الكرادة',
    category: 'لاونج عصري ومناسبات شبابية',
    location: 'بغداد - الكرادة داخل، قرب ساحة كهرمانة',
    city: 'بغداد',
    rating: 4.7,
    reviewsCount: 88,
    capacityMin: 15,
    capacityMax: 50,
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
    features: ['ديكور بوهيمي راقي', 'شاشات عرض واحتفالات', 'موسيقى هادئة', 'ضيافة قهوة'],
    offers: [
      {
        id: 'beiti-offer-1',
        name: 'باقة احتفال أعياد الميلاد والترقية (لـ 25 شخص)',
        price: 280000,
        originalPrice: 340000,
        discount: '18%',
        category: 'offers',
        popular: true,
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=80',
        description: 'بوفيه مقبلات وفنجر فود + بيتزا إيطالية ميني وسلايدر برجر + كيكة عيد ميلاد بالاسم + ستاند تصوير بالونات مميز.'
      }
    ],
    menu: [
      {
        id: 'item-beiti-sliders',
        name: 'بوكس سلايدر برجر ميني (12 قطعة)',
        price: 24000,
        category: 'individual',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
        description: 'ميني برجر أنجوس مع جبن الشيدر وصوص بيتي السري.'
      }
    ]
  }
];

export const STANDALONE_SERVICES: StandaloneService[] = [
  // محلات الكيك والتجهيزات
  {
    id: 'cake-tulip-large',
    name: 'قالب كيك افتتاح مخصص (حجم كبير VIP)',
    vendor: 'محل كيك توليب - المنصور',
    category: 'cakes',
    categoryLabel: 'محلات الكيك والحلويات',
    price: 45000,
    icon: '🎂',
    popular: true,
    tag: 'الأكثر طلباً للافتتاحات',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=500&auto=format&fit=crop&q=80',
    description: 'كيكة اسفنجية فاخرة بطبقات الشوكولاتة والكراميل، مزينة بلوجو العيادة أو المناسبة وتكفي 30 إلى 40 شخص.',
    includedItems: ['كتابة الإهداء واللوجو مجاناً', 'سيت شموع احتفالية وسكين تقطيع فاخرة']
  },
  {
    id: 'cake-graduation-tier',
    name: 'قالب كيك طبقتين ثيم تخرج أو خطوبة بالاسم',
    vendor: 'حلويات فانيلا ديلايت',
    category: 'cakes',
    categoryLabel: 'محلات الكيك والحلويات',
    price: 65000,
    icon: '🎓',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=500&auto=format&fit=crop&q=80',
    description: 'تصميم أنيق مع مجسم قبعة التخرج أو الورود الطبيعية وكتابة الاسم بالذهب الغذائي (تكفي 45 شخص).',
    includedItems: ['كيكة طبقتين بنكهات مكس', 'مجسمات عجينة سكر احترافية']
  },
  {
    id: 'khitan-favors-box',
    name: 'سيت توزيعات وحلويات ميني (30 علبة للمباركة والختان)',
    vendor: 'أفراح بغداد للتوزيعات',
    category: 'cakes',
    categoryLabel: 'محلات الكيك والحلويات',
    price: 35000,
    icon: '👶',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=80',
    description: 'علب توزيعات فاخرة مطبوعة باسم الطفل تحتوي شوكولاتة بلجيكية ومكسرات وبطاقة تهنئة مخصصة.'
  },

  // كوادر الضيافة والخدمة
  {
    id: 'staff-waiters-elite',
    name: 'كادر ضيافة ويترز (3 شباب - 4 ساعات زي رسمي موحد)',
    vendor: 'شركة النخبة للضيافة والبروتوكول',
    category: 'staff',
    categoryLabel: 'كوادر ضيافة وخدمة',
    price: 120000,
    icon: '🤵',
    popular: true,
    tag: 'موصى به للافتتاحات',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&auto=format&fit=crop&q=80',
    description: 'طاقم مدرب باحترافية على البروتوكول واستقبال الضيوف وتقديم المشروبات والحلويات بزي أسود وربطة عنق أنيقة.',
    includedItems: ['3 ويترز محترفين', 'مدة 4 ساعات متواصلة', 'صواني وملاقط تقديم فندقية']
  },
  {
    id: 'staff-hostesses-ladies',
    name: 'كادر مضيفات تقديم وبنات استقبال (3 مضيفات - 4 ساعات)',
    vendor: 'دار السلام لخدمات المناسبات',
    category: 'staff',
    categoryLabel: 'كوادر ضيافة وخدمة',
    price: 140000,
    icon: '👩‍💼',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    description: 'طاقم مضيفات لبقات لاستقبال الضيفات وتنظيم توزيع الضيافة والكيك والعصائر في الحفلات الخاصة والعيادات النسائية.'
  },
  {
    id: 'staff-arabic-coffee',
    name: 'مقدم قهوة عربية بالزي الفلكلوري العراقي (دلة ومباخر)',
    vendor: 'المضايف البغدادية الأصيلة',
    category: 'staff',
    categoryLabel: 'كوادر ضيافة وخدمة',
    price: 60000,
    icon: '☕',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80',
    description: 'صباب محترف يرتدي الزي العراقي الأصيل يقدم القهوة العربية الأصيلة بالهيل مع التمر الملكي المحشو والمباخر.'
  },

  // محطات طهي وعربات لايف
  {
    id: 'live-shawarma-station',
    name: 'محطة وشيف شاورما لايف بموقعك (سيخ كامل + صمون فريش)',
    vendor: 'فريق الشاورما الملكية',
    category: 'live_stations',
    categoryLabel: 'محطات طهي وعربات لايف',
    price: 320000,
    icon: '🥙',
    popular: true,
    tag: 'الخدمة الأكثر طلباً 🔥',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500&auto=format&fit=crop&q=80',
    description: 'نجيب ماكينة الشاورما والغاز وشيف محترف يقص الشاورما طازجة أمام ضيوفك مع صمون عراقي فريش وثوميات ومخللات وبطاطا مقلية ساخنة.',
    includedItems: ['سيخ شاورما يكفي 50 إلى 60 شخص', 'شيف شاورما + مساعد', 'مقبلات، ثومية، عمبة، بطاطا مقلية', 'صمون حار من الفرن']
  },
  {
    id: 'live-coffee-bar',
    name: 'عربة قهوة مختصة لايف بموقعك (50 كوب مع باريستا)',
    vendor: 'بار القهوة المتنقل (Coffee Cart VIP)',
    category: 'live_stations',
    categoryLabel: 'محطات طهي وعربات لايف',
    price: 180000,
    icon: '☕',
    popular: true,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format&fit=crop&q=80',
    description: 'عربة خشبية مودرن مع ماكينة إسبريسو إيطالية وباريستا محترف لإعداد اللاتيه والكابتشينو والمشروبات الباردة والساخنة.',
    includedItems: ['50 كوب قهوة مختصة بأنواعها', 'أكواب مطبوعة باسم مناسبتك', 'سيروبات بنكهات الكراميل والبندق والفانيلا']
  },
  {
    id: 'live-bbq-grill',
    name: 'ستيشن باربكيو ومشاوي عراقية ع الفحم بموقعك',
    vendor: 'شيف المشويات البغدادية',
    category: 'live_stations',
    categoryLabel: 'محطات طهي وعربات لايف',
    price: 380000,
    icon: '🍢',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=80',
    description: 'شواء فوري على الفحم لكباب الغنم والتكة والشيش طاووق مع خبز حار وبصل وسماق وطماطة مشوية أمام المعازيم.'
  },
  {
    id: 'live-waffle-crepe-cart',
    name: 'عربة وافل وكريب ونوتيلا لايف للأطفال والمناسبات',
    vendor: 'سويت كارافان (Sweet Caravan)',
    category: 'live_stations',
    categoryLabel: 'محطات طهي وعربات لايف',
    price: 150000,
    icon: '🥞',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=500&auto=format&fit=crop&q=80',
    description: 'عربة وردية ساحرة تصنع وافل ستيك وكريب بالنوتيلا واللوتس والفواكه الطازجة مع آيس كريم.'
  },

  // ديكور وتصوير
  {
    id: 'decor-balloon-arch',
    name: 'قوس بالونات مع ستاند خلفية مخصصة وإضاءة نيون',
    vendor: 'لمسات بغداد للديكور',
    category: 'decor_sound',
    categoryLabel: 'ديكور وصوتيات وتصوير',
    price: 85000,
    icon: '🎈',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&auto=format&fit=crop&q=80',
    description: 'خلفية دائرية مع لوحة خشبية أو أكريليك باسم المحتفى به مع تشكيلة بالونات كروم راقية وإضاءة نيون جذابة للتصوير.'
  },
  {
    id: 'photographer-reels',
    name: 'مصور احترافي (فوتو + فيديو ريلز فوري لساعتين)',
    vendor: 'استوديو لحظات للإنتاج',
    category: 'decor_sound',
    categoryLabel: 'ديكور وصوتيات وتصوير',
    price: 95000,
    icon: '📸',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=80',
    description: 'تغطية احترافية بكاميرات سينمائية سوني، تسليم أكثر من 80 صورة معدلة + فيديو ريلز جاهز للنشر خلال ساعتين فقط!'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'booking-101',
    bookingCode: 'LAMMA-2026-7841',
    occasion: 'افتتاح عيادة',
    eventDate: '2026-11-15',
    eventTime: '18:00',
    guestCount: 45,
    items: [
      {
        id: 'cake-tulip-large',
        title: 'قالب كيك افتتاح مخصص (حجم كبير VIP)',
        price: 45000,
        vendor: 'محل كيك توليب - المنصور',
        quantity: 1,
        serviceType: 'service'
      },
      {
        id: 'staff-waiters-elite',
        title: 'كادر ضيافة ويترز (3 شباب - 4 ساعات)',
        price: 120000,
        vendor: 'شركة النخبة للضيافة والبروتوكول',
        quantity: 1,
        serviceType: 'service'
      },
      {
        id: 'live-coffee-bar',
        title: 'عربة قهوة مختصة لايف بموقعك (50 كوب)',
        price: 180000,
        vendor: 'بار القهوة المتنقل (Coffee Cart VIP)',
        quantity: 1,
        serviceType: 'service'
      }
    ],
    totalAmount: 345000,
    depositAmount: 85000,
    remainingAmount: 260000,
    paymentMethod: 'zain_cash',
    customerName: 'د. حسام باسم',
    customerPhone: '07701234567',
    city: 'بغداد',
    district: 'حي الحارثية - شارع الكندي',
    addressNotes: 'عيادة طب الأسنان التخصصية، الطابق الثاني',
    status: 'vendor_confirmed',
    createdAt: '2026-10-28'
  }
];
