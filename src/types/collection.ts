import { BaseEntity } from './base';
import { Product } from './product';

export type Collection = {
  slug: string;
  name: string;
  products: Product[];
} & BaseEntity;
