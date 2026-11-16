/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CartDrawer } from './components/CartDrawer';
import { CatalogSection } from './components/CatalogSection';
import { FooterAndFloatingChat } from './components/FooterAndFloatingChat';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { OfferCarousel } from './components/OfferCarousel';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProfileOrdersSheet } from './components/ProfileOrdersSheet';
import { ReviewsCarousel } from './components/ReviewsCarousel';
import { SocialVlogSection } from './components/SocialVlogSection';
import { StoryAndTrust } from './components/StoryAndTrust';
import { PRODUCTS } from './data/products';
import { UI_COPY } from './data/translations';
import {
  CartItem,
  CategoryId,
  Language,
  OrderRecord,
  Product,
  WeightOption,
} from './types';

const CART_STORAGE_KEY = 'pahari_swad_cart_v1';
const ORDERS_STORAGE_KEY = 'pahari_swad_orders_v1';
const LANG_STORAGE_KEY = 'pahari_swad_lang_v1';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      return saved === 'en' ? 'en' : 'bn';
    } catch {
      return 'bn';
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as OrderRecord[]) : [];
    } catch {
      return [];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<
    'home' | 'menu' | 'cart' | 'offers' | 'profile'
  >('home');
  const [toastText, setToastText] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore storage quota errors
    }
  }, [orders]);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Ignore storage quota errors
    }
  }, [lang]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const shelfProducts = useMemo(
    () => PRODUCTS.filter((p) => p.heroShelf).slice(0, 4),
    []
  );

  const showAddedToast = (productName: string) => {
    const suffix = UI_COPY[lang].catalog.addedToast;
    setToastText(`${productName} — ${suffix}`);
    window.setTimeout(() => {
      setToastText(null);
    }, 2000);
  };

  const addToCart = (product: Product, weight: WeightOption, quantity: number) => {
    const key = `${product.id}__${weight.id}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key
            ? { ...item, quantity: Math.min(30, item.quantity + quantity) }
            : item
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          weightId: weight.id,
          weightLabelBn: weight.labelBn,
          weightLabelEn: weight.labelEn,
          nameBn: product.nameBn,
          nameEn: product.nameEn,
          image: product.image,
          unitPrice: weight.price,
          quantity,
        },
      ];
    });
    showAddedToast(lang === 'bn' ? product.nameBn : product.nameEn);
  };

  const handleQuickAdd = (product: Product) => {
    const defaultWeight =
      product.weightOptions.find((w) => w.price === product.basePrice) ||
      product.weightOptions[0];
    addToCart(product, defaultWeight, 1);
  };

  const handleUpdateQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const handleSaveOrder = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev].slice(0, 10));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleMobileTabClick = (
    tab: 'home' | 'menu' | 'cart' | 'offers' | 'profile'
  ) => {
    setActiveMobileTab(tab);
    if (tab === 'home') {
      scrollToSection('home');
    } else if (tab === 'menu') {
      scrollToSection('menu');
    } else if (tab === 'cart') {
      setIsCartOpen(true);
    } else if (tab === 'offers') {
      setSelectedCategory('combo');
      scrollToSection('offers');
    } else if (tab === 'profile') {
      setIsProfileOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8EC] text-[#1B2A1E]">
      <Navbar
        lang={lang}
        onToggleLang={setLang}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main>
        <HeroSection
          lang={lang}
          shelfProducts={shelfProducts}
          onOrderNow={() => scrollToSection('menu')}
          onViewCombos={() => {
            setSelectedCategory('combo');
            scrollToSection('menu');
          }}
          onSelectProduct={setSelectedProduct}
        />

        <OfferCarousel
          lang={lang}
          onSelectComboOffer={() => {
            setSelectedCategory('combo');
            scrollToSection('menu');
          }}
          onBrowseMenu={() => {
            setSelectedCategory('all');
            scrollToSection('menu');
          }}
        />

        <CatalogSection
          lang={lang}
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectProduct={setSelectedProduct}
          onQuickAdd={handleQuickAdd}
        />

        <StoryAndTrust lang={lang} />

        <ReviewsCarousel lang={lang} />

        <SocialVlogSection lang={lang} />
      </main>

      <FooterAndFloatingChat
        lang={lang}
        cartCount={cartCount}
        activeMobileTab={activeMobileTab}
        onMobileTabClick={handleMobileTabClick}
      />

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            lang={lang}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
          />
        )}
      </AnimatePresence>

      {/* Slide-Over Cart & COD Checkout Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            lang={lang}
            items={cart}
            onClose={() => setIsCartOpen(false)}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onClearCart={() => setCart([])}
            onSaveOrder={handleSaveOrder}
          />
        )}
      </AnimatePresence>

      {/* Mobile Profile & Recent Orders Sheet */}
      <AnimatePresence>
        {isProfileOpen && (
          <ProfileOrdersSheet
            isOpen={isProfileOpen}
            lang={lang}
            orders={orders}
            onClose={() => setIsProfileOpen(false)}
            onToggleLang={setLang}
          />
        )}
      </AnimatePresence>

      {/* Subtle Added-to-Cart Toast */}
      <AnimatePresence>
        {toastText && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-[#1B2A1E] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xl"
          >
            <Check className="h-4 w-4 text-[#E8A317]" />
            <span className="whitespace-nowrap">{toastText}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
