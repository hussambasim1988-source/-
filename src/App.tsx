import React, { useState, useEffect } from 'react';
import { OccasionType, CartItem, Booking, StandaloneService, MenuItem } from './types';
import { INITIAL_BOOKINGS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { WizardScreen } from './components/WizardScreen';
import { VenueDetailScreen } from './components/VenueDetailScreen';
import { ServicesMenuScreen } from './components/ServicesMenuScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { BookingSuccessModal } from './components/BookingSuccessModal';
import { MyBookingsScreen } from './components/MyBookingsScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ProductsScreen, UnifiedProduct } from './components/ProductsScreen';
import { PdfGuideModal } from './components/PdfGuideModal';
import { Signal, Wifi, Battery } from 'lucide-react';

export default function App() {
  // Navigation & Screen states
  const [activeTab, setActiveTab] = useState<TabType>('wizard');
  const [currentSubScreen, setCurrentSubScreen] = useState<'wizard' | 'venue' | 'services' | 'checkout'>('wizard');
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // Wizard Planner states
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('عيد ميلاد');
  const [eventDate, setEventDate] = useState('2026-11-20');
  const [eventTime, setEventTime] = useState('19:00');
  const [guestCount, setGuestCount] = useState(35);
  const [selectedVenueId, setSelectedVenueId] = useState('saj-al-reef-mansour');

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'saj-offer-1',
      title: 'سيت منيو صاج الريف للمناسبات',
      price: 240000,
      vendor: 'مطعم صاج الريف - المنصور',
      quantity: 1,
      serviceType: 'venue_package',
    },
  ]);

  // Bookings state with LocalStorage persistence
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('lamma_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // Successful booking modal
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // PDF Guide Modal state
  const [showPdfGuide, setShowPdfGuide] = useState(false);

  // Sync bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lamma_bookings', JSON.stringify(bookings));
    } catch {
      // storage error fallback
    }
  }, [bookings]);

  // Cart Item Counts lookup
  const cartItemCounts: Record<string, number> = {};
  cart.forEach((item) => {
    cartItemCounts[item.id] = item.quantity;
  });

  // Cart Handlers
  const handleAddToCartAndCheckout = (title: string, price: number, vendor: string) => {
    setCart([
      {
        id: 'item-' + Date.now(),
        title,
        price,
        vendor,
        quantity: 1,
        serviceType: 'venue_package',
      },
    ]);
    setActiveTab('wizard');
    setCurrentSubScreen('checkout');
  };

  const handleAddMenuItemToCart = (item: MenuItem, vendor: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: item.id,
          title: item.name,
          price: item.price,
          vendor,
          quantity: 1,
          serviceType: 'menu_item',
        },
      ];
    });
  };

  const handleAddServiceToCart = (service: StandaloneService) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === service.id);
      if (existing) {
        return prev.map((i) => (i.id === service.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: service.id,
          title: service.name,
          price: service.price,
          vendor: service.vendor,
          quantity: 1,
          serviceType: 'service',
        },
      ];
    });
  };

  const handleAddUnifiedProductToCart = (product: UnifiedProduct) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.name,
          price: product.price,
          vendor: product.vendor,
          quantity: 1,
          serviceType: product.category === 'food' ? 'menu_item' : 'service',
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Order Placement
  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    setConfirmedBooking(newBooking);
    setCart([]);
  };

  // Tab switcher
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'wizard') {
      setCurrentSubScreen('wizard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0b1329] p-0 sm:p-4 text-slate-800">
      {/* Container: Smartphone mockup or Wide Desktop View */}
      <div
        className={`w-full transition-all duration-300 bg-slate-50 overflow-hidden flex flex-col relative shadow-2xl ${
          isMobileFrame
            ? 'sm:max-w-[420px] h-screen sm:h-[840px] sm:rounded-[40px] border-0 sm:border-8 border-slate-800'
            : 'sm:max-w-4xl h-screen sm:h-[880px] sm:rounded-3xl border-0 sm:border-2 border-slate-800'
        }`}
      >
        {/* شريط الحالة (Status Bar for mobile style) */}
        <div className="h-7 bg-slate-900 flex justify-between items-center px-6 text-white text-xs select-none shrink-0 border-b border-slate-800/60">
          <span className="font-bold tracking-wider text-[11px]">10:30</span>
          <div className="flex gap-2 items-center text-[10px] text-slate-300">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* رأس التطبيق (Header) */}
        <Header
          cart={cart}
          onOpenCart={() => {
            setActiveTab('wizard');
            setCurrentSubScreen('checkout');
          }}
          isMobileFrame={isMobileFrame}
          onToggleFrame={() => setIsMobileFrame((prev) => !prev)}
          onOpenPdfGuide={() => setShowPdfGuide(true)}
        />

        {/* مساحة الشاشات المتغيرة (Main Screen Viewport) */}
        <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
          {/* TAB 1: رتّب لمّتك (Wizard & Sub-screens) */}
          {activeTab === 'wizard' && (
            <>
              {currentSubScreen === 'wizard' && (
                <WizardScreen
                  selectedOccasion={selectedOccasion}
                  onSelectOccasion={setSelectedOccasion}
                  eventDate={eventDate}
                  onChangeDate={setEventDate}
                  eventTime={eventTime}
                  onChangeTime={setEventTime}
                  guestCount={guestCount}
                  onChangeGuests={setGuestCount}
                  onNavigateToVenue={(venueId) => {
                    if (venueId) setSelectedVenueId(venueId);
                    setCurrentSubScreen('venue');
                  }}
                  onNavigateToServices={() => setCurrentSubScreen('services')}
                  onQuickBookService={(serviceId) => {
                    setCurrentSubScreen('services');
                  }}
                  onOpenPdfGuide={() => setShowPdfGuide(true)}
                  onNavigateToProducts={() => setActiveTab('products')}
                />
              )}

              {currentSubScreen === 'venue' && (
                <VenueDetailScreen
                  currentVenueId={selectedVenueId}
                  onSelectVenueId={setSelectedVenueId}
                  onBackToWizard={() => setCurrentSubScreen('wizard')}
                  onAddPackageAndCheckout={handleAddToCartAndCheckout}
                  onAddMenuItemToCart={handleAddMenuItemToCart}
                  cartItemCounts={cartItemCounts}
                />
              )}

              {currentSubScreen === 'services' && (
                <ServicesMenuScreen
                  onBackToWizard={() => setCurrentSubScreen('wizard')}
                  onQuickBookService={handleAddToCartAndCheckout}
                  onAddToCart={handleAddServiceToCart}
                  cartItemCounts={cartItemCounts}
                />
              )}

              {currentSubScreen === 'checkout' && (
                <CheckoutScreen
                  cart={cart}
                  occasion={selectedOccasion}
                  eventDate={eventDate}
                  eventTime={eventTime}
                  guestCount={guestCount}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onBack={() => setCurrentSubScreen('wizard')}
                  onConfirmBooking={handleConfirmBooking}
                />
              )}
            </>
          )}

          {/* TAB: المنتجات والتجهيزات (كل ايتم وصورته وسعره) */}
          {activeTab === 'products' && (
            <ProductsScreen
              onAddToCart={handleAddUnifiedProductToCart}
              onUpdateQuantity={handleUpdateQuantity}
              cartItemCounts={cartItemCounts}
              onGoToCheckout={() => {
                setActiveTab('wizard');
                setCurrentSubScreen('checkout');
              }}
              cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
            />
          )}

          {/* TAB 2: استكشف (Explore directory) */}
          {activeTab === 'explore' && (
            <ExploreScreen
              onSelectVenue={(venueId) => {
                setSelectedVenueId(venueId);
                setActiveTab('wizard');
                setCurrentSubScreen('venue');
              }}
              onAddToCartService={handleAddServiceToCart}
              onQuickBookService={handleAddToCartAndCheckout}
              cartItemCounts={cartItemCounts}
            />
          )}

          {/* TAB 3: حجوزاتي (My Bookings) */}
          {activeTab === 'bookings' && (
            <MyBookingsScreen
              bookings={bookings}
              onStartNewBooking={() => {
                setActiveTab('wizard');
                setCurrentSubScreen('wizard');
              }}
            />
          )}

          {/* TAB 4: حسابي (Profile) */}
          {activeTab === 'profile' && (
            <ProfileScreen onOpenPdfGuide={() => setShowPdfGuide(true)} />
          )}
        </main>

        {/* شريط التنقل السفلي الثابت (Bottom Nav Bar) */}
        <BottomNav
          currentTab={activeTab}
          onChangeTab={handleTabChange}
          bookingsCount={bookings.filter((b) => b.status !== 'completed').length}
        />

        {/* Celebratory Success Modal */}
        {confirmedBooking && (
          <BookingSuccessModal
            booking={confirmedBooking}
            onGoToBookings={() => {
              setConfirmedBooking(null);
              setActiveTab('bookings');
            }}
            onNewBooking={() => {
              setConfirmedBooking(null);
              setActiveTab('wizard');
              setCurrentSubScreen('wizard');
            }}
          />
        )}

        {/* Full PDF Guide Modal */}
        <PdfGuideModal
          isOpen={showPdfGuide}
          onClose={() => setShowPdfGuide(false)}
        />
      </div>
    </div>
  );
}
