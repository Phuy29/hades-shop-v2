import { BaseEntity } from './base';

export type Collection = {
  name: string;
  product: string[];
} & BaseEntity;
