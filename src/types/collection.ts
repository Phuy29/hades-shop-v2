import { BaseEntity } from './base';
import { Product } from './product';

export type Collection = {
  name: string;
  products: Product[];
} & BaseEntity;
