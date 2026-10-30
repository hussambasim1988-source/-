import React, { useState } from 'react';
import { VENUES_DATA, STANDALONE_SERVICES } from '../data/mockData';
import { MenuItem, StandaloneService } from '../types';
import { Plus, Minus, Check, ShoppingBag, Sparkles, Search } from 'lucide-react';

export interface UnifiedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  vendor: string;
  category: 'food' | 'cakes' | 'live_stations' | 'staff' | 'decor';
  categoryLabel: string;
  description?: string;
  popular?: boolean;
}

interface ProductsScreenProps {
  onAddToCart: (item: UnifiedProduct) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  cartItemCounts: Record<string, number>;
  onGoToCheckout: () => void;
  cartCount: number;
}

export const ProductsScreen: React.FC<ProductsScreenProps> = ({
  onAddToCart,
  onUpdateQuantity,
  cartItemCounts,
  onGoToCheckout,
  cartCount,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Collect all products into a clean unified list
  const allProducts: UnifiedProduct[] = [
    // Venue offers & food items
    ...VENUES_DATA[0].offers.map((offer) => ({
      id: offer.id,
      name: offer.name,
      price: offer.price,
      originalPrice: offer.originalPrice,
      discount: offer.discount,
      image: offer.image || 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=500',
      vendor: VENUES_DATA[0].name,
      category: 'food' as const,
      categoryLabel: 'باقات وأطعمة',
      description: offer.description,
      popular: offer.popular,
    })),
    ...VENUES_DATA[0].menu.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image || 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500',
      vendor: VENUES_DATA[0].name,
      category: 'food' as const,
      categoryLabel: 'وجبات صاج ومشاوي',
      description: item.description,
      popular: item.popular,
    })),
    // Standalone services (Cakes, Stations, Staff, Decor)
    ...STANDALONE_SERVICES.map((s) => ({
      id: s.id,
      name: s.name,
      price: s.price,
      image: s.image || 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=500',
      vendor: s.vendor,
      category: s.category as any,
      categoryLabel: s.categoryLabel,
      description: s.description,
      popular: s.popular,
    })),
  ];

  // Category filter tabs
  const categories = [
    { id: 'all', label: 'الكل ✨' },
    { id: 'food', label: 'صاج ومشاوي 🥙' },
    { id: 'cakes', label: 'كيك وحلويات 🎂' },
    { id: 'live_stations', label: 'محطات لايف 🎪' },
    { id: 'staff', label: 'كوادر ضيافة 🤵' },
    { id: 'decor_sound', label: 'ديكور وتصوير 📸' },
  ];

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      product.category === selectedCategory ||
      (selectedCategory === 'decor_sound' && product.category === 'decor');
    const matchesSearch =
      !searchQuery.trim() ||
      product.name.includes(searchQuery) ||
      product.vendor.includes(searchQuery) ||
      product.categoryLabel.includes(searchQuery);

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="space-y-4 text-slate-800 pb-16">
      {/* Title & Simple Explanatory Header */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
            <span>قائمة المنتجات والتجهيزات</span>
            <span>🛍️</span>
          </h2>
          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
            {filteredProducts.length} منتج
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          كل صنف مع صورته الحقيقية وسعره المباشر بالدينار العراقي - بساطة وسرعة في الحجز
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن صاج، كيك، شاورما، أو قهوة..."
          className="w-full bg-white border border-slate-200 rounded-2xl py-2.5 pr-9 pl-3 text-xs font-bold text-slate-800 outline-none focus:border-amber-500 shadow-2xs transition"
        />
        <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
      </div>

      {/* Clean Category Filters */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition active:scale-95 cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Products (Clear Picture, Title, Price, and Quick Add) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {filteredProducts.map((item) => {
          const count = cartItemCounts[item.id] || 0;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-amber-400/80 hover:shadow-md transition flex flex-col justify-between group"
            >
              {/* Product Image */}
              <div className="relative h-28 sm:h-32 w-full bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />

                {/* Popular or Discount Badge */}
                {item.discount && (
                  <span className="absolute top-2 right-2 bg-slate-950/85 backdrop-blur-xs text-amber-400 text-[9px] font-black px-1.5 py-0.5 rounded-md">
                    خصم {item.discount}
                  </span>
                )}
                {item.popular && !item.discount && (
                  <span className="absolute top-2 right-2 bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
                    الأكثر طلباً 🔥
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold truncate">
                    {item.vendor}
                  </span>
                  <h4 className="text-xs font-black text-slate-900 leading-snug line-clamp-2 mt-0.5">
                    {item.name}
                  </h4>
                </div>

                {/* Price and Add Control */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    {item.originalPrice && (
                      <span className="text-[9px] line-through text-slate-400 block -mb-0.5">
                        {item.originalPrice.toLocaleString('ar-IQ')} د.ع
                      </span>
                    )}
                    <span className="text-xs font-black text-amber-600 block">
                      {item.price.toLocaleString('ar-IQ')} د.ع
                    </span>
                  </div>

                  {/* Add / Quantity Buttons */}
                  {count > 0 ? (
                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-300 rounded-xl px-1.5 py-0.5 text-slate-900">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-slate-700 hover:text-slate-950 font-bold p-0.5 cursor-pointer"
                        title="تقليل"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-black px-1">{count}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="text-slate-700 hover:text-slate-950 font-bold p-0.5 cursor-pointer"
                        title="زيادة"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onAddToCart(item)}
                      className="bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-[11px] font-black px-2.5 py-1.5 rounded-xl transition active:scale-95 flex items-center gap-1 cursor-pointer shadow-xs"
                      title="إضافة للسلة"
                    >
                      <Plus className="w-3 h-3" />
                      <span>إضافة</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Cart Bar (if user added items) */}
      {cartCount > 0 && (
        <div className="fixed bottom-16 left-0 right-0 p-3 z-30 flex justify-center pointer-events-none">
          <div className="w-full max-w-sm sm:max-w-md bg-slate-950 text-white p-3 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center justify-between pointer-events-auto animate-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-black block">
                  {cartCount} أصناف مختارة بالسلة
                </span>
                <span className="text-[10px] text-amber-400">جاهز للتأكيد ودفع العربون</span>
              </div>
            </div>

            <button
              onClick={onGoToCheckout}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black px-4 py-2 rounded-xl transition active:scale-95 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              متابعة الحجز ←
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
