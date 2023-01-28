import { BaseEntity } from './base';

export type Product = {
  slug: string;
  name: string;
  price: string;
  colors: string[];
  sizes: string[];
  imgUrl: string;
  imgUrlHover: string;
  collectionId: string;
  deleted: boolean;
  deletedAt: string;
} & BaseEntity;
