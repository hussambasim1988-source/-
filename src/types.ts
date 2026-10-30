export type OccasionType = 
  | 'عيد ميلاد' 
  | 'افتتاح عيادة' 
  | 'تخرج' 
  | 'خطوبة/حنة' 
  | 'ختان' 
  | 'اجتماع/عمل'
  | 'عزيمة ولمّة عائلية';

export interface OccasionOption {
  id: string;
  name: OccasionType;
  icon: string;
  badge?: string;
  recommendedGuests: number;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number; // in Iraqi Dinars (IQD)
  description?: string;
  category: 'offers' | 'individual' | 'beverage';
  discount?: string;
  originalPrice?: number;
  popular?: boolean;
  image?: string;
}

export interface Venue {
  id: string;
  name: string;
  category: string;
  location: string;
  city: string;
  rating: number;
  reviewsCount: number;
  capacityMin: number;
  capacityMax: number;
  coverImage?: string;
  features: string[];
  offers: MenuItem[];
  menu: MenuItem[];
}

export interface StandaloneService {
  id: string;
  name: string;
  vendor: string;
  category: 'cakes' | 'staff' | 'live_stations' | 'decor_sound';
  categoryLabel: string;
  price: number;
  icon: string;
  description: string;
  popular?: boolean;
  tag?: string;
  includedItems?: string[];
  image?: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  vendor: string;
  quantity: number;
  serviceType: 'venue_package' | 'menu_item' | 'service';
  notes?: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  occasion: string;
  eventDate: string;
  eventTime: string;
  guestCount: number;
  items: CartItem[];
  totalAmount: number;
  depositAmount: number;
  remainingAmount: number;
  paymentMethod: 'zain_cash' | 'qi_card' | 'cash';
  customerName: string;
  customerPhone: string;
  city: string;
  district: string;
  addressNotes?: string;
  status: 'confirmed' | 'vendor_confirmed' | 'preparing' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
}
