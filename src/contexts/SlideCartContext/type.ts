export type Cart = {
  id: string;
  name: string;
  imgUrl: string;
  slug: string;
  price: number;
  color: string[];
  size: string[];
  cartQuantity: number;
};

export type SlideCartState = {
  carts: Cart[];
  totalPrice: number;
  totalQuantity: number;
};
