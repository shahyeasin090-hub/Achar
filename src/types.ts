export type Language = 'bn' | 'en';

export type CategoryId = 'all' | 'pickle' | 'spice' | 'fruit' | 'shutki' | 'combo';

export interface WeightOption {
  id: string;
  labelBn: string;
  labelEn: string;
  gramsLabel: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  category: Exclude<CategoryId, 'all'>;
  nameBn: string;
  nameEn: string;
  subtitleBn: string;
  subtitleEn: string;
  shortDescBn: string;
  shortDescEn: string;
  longDescBn: string;
  longDescEn: string;
  ingredientsBn: string[];
  ingredientsEn: string[];
  /**
   * Image path — replace with real photos in `/public/images/...` or `/src/assets/images/...`
   */
  image: string;
  basePrice: number;
  defaultWeightLabel: string;
  weightOptions: WeightOption[];
  popular?: boolean;
  heroShelf?: boolean;
  tagBn?: string;
  tagEn?: string;
  spiceLevel?: 'mild' | 'medium' | 'hot' | 'none';
  originBn: string;
  originEn: string;
}

export interface CartItem {
  key: string; // productId + '__' + weightId
  productId: string;
  weightId: string;
  weightLabelBn: string;
  weightLabelEn: string;
  nameBn: string;
  nameEn: string;
  image: string;
  unitPrice: number;
  quantity: number;
}

export type DeliveryArea = 'dhaka' | 'outside';

export interface OrderRecord {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  address: string;
  deliveryArea: DeliveryArea;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
}

export interface ReviewItem {
  id: string;
  nameBn: string;
  nameEn: string;
  cityBn: string;
  cityEn: string;
  productBn: string;
  productEn: string;
  rating: number;
  commentBn: string;
  commentEn: string;
  dateBn: string;
  dateEn: string;
}
