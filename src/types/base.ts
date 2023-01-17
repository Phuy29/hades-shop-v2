export type BaseEntity = {
  _id: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Params = {
  collectionSlug: string;
  productSlug: string;
};
