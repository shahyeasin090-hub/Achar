import React, { useMemo, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND_CONFIG } from '../data/products';
import { UI_COPY, formatBdt, toBengaliDigits } from '../data/translations';
import { CartItem, DeliveryArea, Language, OrderRecord } from '../types';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  lang: Language;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearCart: () => void;
  onSaveOrder: (order: OrderRecord) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  lang,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onSaveOrder,
}) => {
  const t = UI_COPY[lang].cart;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState<DeliveryArea>('dhaka');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);
  const [copied, setCopied] = useState(false);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items]
  );

  const qualifiesFreeDelivery = subtotal >= BRAND_CONFIG.freeDeliveryThreshold;
  const deliveryCharge =
    items.length === 0
      ? 0
      : qualifiesFreeDelivery
      ? 0
      : deliveryArea === 'dhaka'
      ? BRAND_CONFIG.dhakaDeliveryFee
      : BRAND_CONFIG.outsideDhakaDeliveryFee;
  const total = subtotal + deliveryCharge;
  const remainingForFree = Math.max(0, BRAND_CONFIG.freeDeliveryThreshold - subtotal);

  const buildOrderMessage = (order: OrderRecord) => {
    const itemLines = order.items
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.nameBn} (${item.weightLabelBn}) x${item.quantity} = ৳${
            item.unitPrice * item.quantity
          }`
      )
      .join('\n');

    const areaText =
      order.deliveryArea === 'dhaka'
        ? 'ঢাকার ভেতরে (Inside Dhaka)'
        : 'ঢাকার বাইরে (Outside Dhaka)';

    return [
      `🌿 *Pahari Shad by Kakoli — New COD Order*`,
      `অর্ডার আইডি: ${order.id}`,
      ``,
      `📦 *পণ্যসমূহ:*`,
      itemLines,
      ``,
      `সাবটোটাল: ৳${order.subtotal}`,
      `ডেলিভারি চার্জ (${areaText}): ${
        order.deliveryCharge === 0 ? 'ফ্রি' : `৳${order.deliveryCharge}`
      }`,
      `*সর্বমোট (Cash on Delivery): ৳${order.total}*`,
      ``,
      `👤 *গ্রাহকের তথ্য:*`,
      `নাম: ${order.customerName}`,
      `মোবাইল: ${order.phone}`,
      `ঠিকানা: ${order.address}`,
    ].join('\n');
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanAddress = address.trim();

    if (cleanName.length < 2 || cleanPhone.length < 10 || cleanAddress.length < 5) {
      setErrorMsg(t.validationError);
      return;
    }

    setErrorMsg('');
    const newOrder: OrderRecord = {
      id: `PSK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      customerName: cleanName,
      phone: cleanPhone,
      address: cleanAddress,
      deliveryArea,
      items: [...items],
      subtotal,
      deliveryCharge,
      total,
    };

    onSaveOrder(newOrder);
    onClearCart();
    setConfirmedOrder(newOrder);
  };

  const handleCopySummary = async () => {
    if (!confirmedOrder) return;
    try {
      await navigator.clipboard.writeText(buildOrderMessage(confirmedOrder));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard fallback ignored cleanly
    }
  };

  const resetAfterOrder = () => {
    setConfirmedOrder(null);
    setName('');
    setPhone('');
    setAddress('');
    onClose();
  };

  if (!isOpen) return null;

  const orderMessageText = confirmedOrder ? buildOrderMessage(confirmedOrder) : '';
  const whatsappUrl = confirmedOrder
    ? `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        orderMessageText
      )}`
    : '#';
  const messengerUrl = confirmedOrder
    ? `${BRAND_CONFIG.messengerUrl}?text=${encodeURIComponent(orderMessageText)}`
    : '#';

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      onClick={onClose}
    >
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-md flex-col bg-[#FFF8EC] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1B2A1E]/10 px-5 py-4 bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#2E6B34]" />
            <h2
              id="cart-drawer-title"
              className="text-lg font-bold text-[#1B2A1E]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {t.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2E9D8] text-[#1B2A1E] hover:bg-[#E5DAC4] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {confirmedOrder ? (
            <div className="space-y-4 rounded-3xl bg-white p-5 ring-1 ring-[#2E6B34]/20 shadow-sm">
              <div className="flex items-center gap-3 text-[#2E6B34]">
                <CheckCircle2 className="h-8 w-8 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-[#1B2A1E]">{t.successTitle}</h3>
                  <p className="text-xs font-semibold text-[#2E6B34] tabular-nums">
                    {t.orderIdLabel}: #{confirmedOrder.id}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-[#556358]">
                {t.successDesc}
              </p>

              {/* Summary box */}
              <div className="rounded-2xl bg-[#FFF8EC] p-3.5 text-xs space-y-1.5 ring-1 ring-[#1B2A1E]/8">
                {confirmedOrder.items.map((item) => (
                  <div key={item.key} className="flex justify-between gap-2">
                    <span className="text-[#1B2A1E]">
                      {lang === 'bn' ? item.nameBn : item.nameEn} ({lang === 'bn' ? item.weightLabelBn : item.weightLabelEn}) ×{item.quantity}
                    </span>
                    <span className="font-semibold tabular-nums">
                      {formatBdt(item.unitPrice * item.quantity, lang)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-[#1B2A1E]/10 pt-1.5 flex justify-between font-bold text-sm text-[#2E6B34]">
                  <span>{t.total}</span>
                  <span className="tabular-nums">{formatBdt(confirmedOrder.total, lang)}</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-[#0F2A16] shadow-sm hover:brightness-95 transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{t.sendWhatsapp}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <a
                  href={messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#0084FF] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:brightness-95 transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{t.sendMessenger}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="flex min-h-[42px] w-full items-center justify-center gap-2 rounded-full bg-[#F2E9D8] px-4 py-2 text-xs font-semibold text-[#1B2A1E] hover:bg-[#E5DAC4] cursor-pointer"
                >
                  {copied ? <Check className="h-4 w-4 text-[#2E6B34]" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? t.copied : t.copySummary}</span>
                </button>

                <button
                  type="button"
                  onClick={resetAfterOrder}
                  className="w-full py-2 text-xs font-semibold text-[#556358] hover:text-[#1B2A1E] cursor-pointer"
                >
                  {t.newOrder}
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFE6D5] text-[#2E6B34] mb-4">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-[#1B2A1E]">{t.emptyTitle}</h3>
              <p className="mt-1 max-w-xs text-xs sm:text-sm text-[#556358]">{t.emptyDesc}</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-5 min-h-[42px] rounded-full bg-[#2E6B34] px-6 py-2 text-sm font-semibold text-white hover:bg-[#235428] cursor-pointer"
              >
                {t.browseBtn}
              </button>
            </div>
          ) : (
            <>
              {/* Free shipping progress indicator */}
              <div className="rounded-2xl bg-white p-3.5 ring-1 ring-[#1B2A1E]/8">
                <p className="text-xs font-semibold text-[#2E6B34]">
                  {qualifiesFreeDelivery
                    ? t.freeShippingUnlocked
                    : t.freeShippingProgress.replace(
                        '{amount}',
                        formatBdt(remainingForFree, lang)
                      )}
                </p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#EFE6D5]">
                  <div
                    className="h-full rounded-full bg-[#2E6B34] transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.round((subtotal / BRAND_CONFIG.freeDeliveryThreshold) * 100)
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Cart Items */}
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.key}
                    className="flex gap-3 rounded-2xl bg-white p-3 ring-1 ring-[#1B2A1E]/8"
                  >
                    <div className="h-18 w-18 shrink-0 overflow-hidden rounded-xl bg-[#F2E9D8]">
                      <ResilientImage
                        src={item.image}
                        alt={lang === 'bn' ? item.nameBn : item.nameEn}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-[#1B2A1E] truncate">
                            {lang === 'bn' ? item.nameBn : item.nameEn}
                          </h3>
                          <p className="text-xs text-[#556358]">
                            {lang === 'bn' ? item.weightLabelBn : item.weightLabelEn} ·{' '}
                            <span className="tabular-nums">
                              {formatBdt(item.unitPrice, lang)}
                            </span>
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.key)}
                          aria-label="Remove item"
                          className="p-1 text-[#556358] hover:text-[#C62828] cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, -1)}
                            aria-label="Decrease quantity"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2E9D8] text-[#1B2A1E] hover:bg-[#E5DAC4] cursor-pointer"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold tabular-nums">
                            {lang === 'bn' ? toBengaliDigits(item.quantity) : item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, 1)}
                            aria-label="Increase quantity"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2E6B34] text-white hover:bg-[#235428] cursor-pointer"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-[#2E6B34] tabular-nums">
                          {formatBdt(item.unitPrice * item.quantity, lang)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Totals Summary */}
              <div className="rounded-2xl bg-white p-4 ring-1 ring-[#1B2A1E]/8 space-y-2 text-sm">
                <div className="flex justify-between text-[#556358]">
                  <span>{t.subtotal}</span>
                  <span className="font-semibold text-[#1B2A1E] tabular-nums">
                    {formatBdt(subtotal, lang)}
                  </span>
                </div>
                <div className="flex justify-between text-[#556358]">
                  <span>{t.delivery}</span>
                  <span className="font-semibold text-[#1B2A1E] tabular-nums">
                    {deliveryCharge === 0 ? t.free : formatBdt(deliveryCharge, lang)}
                  </span>
                </div>
                <div className="border-t border-[#1B2A1E]/10 pt-2 flex justify-between font-bold text-base text-[#1B2A1E]">
                  <span>{t.total}</span>
                  <span className="text-[#2E6B34] tabular-nums">{formatBdt(total, lang)}</span>
                </div>
              </div>

              {/* Cash on Delivery Checkout Form */}
              <form
                onSubmit={handleConfirmOrder}
                className="rounded-2xl bg-white p-4 ring-1 ring-[#1B2A1E]/8 space-y-3.5"
              >
                <h3 className="text-sm font-bold text-[#1B2A1E]">{t.checkoutTitle}</h3>

                <div>
                  <label className="block text-xs font-semibold text-[#556358] mb-1">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full min-h-[42px] rounded-xl bg-[#FFF8EC] px-3.5 py-2 text-sm text-[#1B2A1E] ring-1 ring-[#1B2A1E]/12 focus:outline-none focus:ring-2 focus:ring-[#2E6B34]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#556358] mb-1">
                    {t.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.phonePlaceholder}
                    className="w-full min-h-[42px] rounded-xl bg-[#FFF8EC] px-3.5 py-2 text-sm text-[#1B2A1E] ring-1 ring-[#1B2A1E]/12 focus:outline-none focus:ring-2 focus:ring-[#2E6B34]"
                  />
                </div>

                <div>
                  <span className="block text-xs font-semibold text-[#556358] mb-1.5">
                    {t.areaLabel}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryArea('dhaka')}
                      className={`min-h-[42px] rounded-xl px-3 py-2 text-xs font-semibold text-left transition-all cursor-pointer ${
                        deliveryArea === 'dhaka'
                          ? 'bg-[#2E6B34] text-white'
                          : 'bg-[#FFF8EC] text-[#1B2A1E] ring-1 ring-[#1B2A1E]/12'
                      }`}
                    >
                      {t.areaDhaka}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryArea('outside')}
                      className={`min-h-[42px] rounded-xl px-3 py-2 text-xs font-semibold text-left transition-all cursor-pointer ${
                        deliveryArea === 'outside'
                          ? 'bg-[#2E6B34] text-white'
                          : 'bg-[#FFF8EC] text-[#1B2A1E] ring-1 ring-[#1B2A1E]/12'
                      }`}
                    >
                      {t.areaOutside}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#556358] mb-1">
                    {t.addressLabel}
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t.addressPlaceholder}
                    className="w-full rounded-xl bg-[#FFF8EC] px-3.5 py-2 text-sm text-[#1B2A1E] ring-1 ring-[#1B2A1E]/12 focus:outline-none focus:ring-2 focus:ring-[#2E6B34]"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs font-semibold text-[#C62828]" role="alert">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="min-h-[48px] w-full rounded-full bg-[#2E6B34] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#235428] active:scale-[0.98] transition-all cursor-pointer"
                >
                  {t.confirmBtn} · {formatBdt(total, lang)}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.aside>
    </div>
  );
};
