import { Cart, SlideCartState } from 'contexts/SlideCartContext/type';

const storagePrefix = 'hades_shop_' as const;

export const storage = {
  setToken: (accessToken: string) => {
    window.localStorage.setItem(`${storagePrefix}accessToken`, JSON.stringify(accessToken));
  },
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}accessToken`) as string);
  },
  removeToken: () => {
    window.localStorage.removeItem(`${storagePrefix}accessToken`);
  },
  setCarts: (carts: Cart[]) => {
    window.localStorage.setItem(`${storagePrefix}carts`, JSON.stringify(carts));
  },
  getCarts: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}carts`) as string);
  },
  removeCarts: () => {
    window.localStorage.removeItem(`${storagePrefix}carts`);
  },
  setTotalCart: (totalCart: Omit<SlideCartState, 'carts'>) => {
    window.localStorage.setItem(`${storagePrefix}total_cart`, JSON.stringify(totalCart));
  },
  getTotalCart: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}total_cart`) as string);
  },
  removeTotalCart: () => {
    window.localStorage.removeItem(`${storagePrefix}total_cart`);
  }
};
