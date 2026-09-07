export type ConditionGrade = 'PRISTINE' | 'EXCELLENT' | 'GOOD' | 'ARCHIVAL WEAR';

export type ProductStatus = 'AVAILABLE' | 'SOLD';

export type Category =
  | 'OUTERWEAR'
  | 'TOPS'
  | 'BOTTOMS'
  | 'FOOTWEAR'
  | 'ACCESSORIES'
  | 'JEWELRY';

export interface Measurement {
  label: string;
  value: string;
}

export interface ProductImage {
  id: string;
  angle: 'FRONT' | 'BACK' | 'DETAIL' | 'TAG' | 'HARDWARE' | 'FLAW' | 'SOLE' | 'SIDE';
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  brand: string;
  brandSlug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  size: string;
  category: Category;
  color: string;
  year?: number;
  condition: ConditionGrade;
  conditionScore: number;
  conditionNotes: string;
  description: string;
  archiveNotes?: string;
  measurements: Measurement[];
  images: ProductImage[];
  tags: string[];
  status: ProductStatus;
  isOneOfOne: boolean;
  dateAdded: string;
  soldDate?: string;
}

export interface Designer {
  name: string;
  slug: string;
  location: string;
  description: string;
}

export interface CartLine {
  productId: string;
  qty: number;
}

export interface SourceRequest {
  designer: string;
  item: string;
  size: string;
  budget: string;
  email: string;
  phone?: string;
}

export interface AlertSubscription {
  id: string;
  designer: string;
  size?: string;
  category?: string;
  createdAt: string;
}
