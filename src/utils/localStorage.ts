import { Cart } from 'contexts/SlideCartContext/type';

export const localStorage = {
  setToken: (accessToken: string) => {
    window.localStorage.setItem('accessToken', JSON.stringify(accessToken));
  },
  getToken: () => {
    return JSON.parse(window.localStorage.getItem('accessToken') as string);
  },
  removeToken: () => {
    window.localStorage.removeItem('accessToken');
  },
  setCarts: (carts: Cart[]) => {
    window.localStorage.setItem('carts', JSON.stringify(carts));
  },
  getCarts: () => {
    return JSON.parse(window.localStorage.getItem('carts') as string);
  },
  removeCarts: () => {
    window.localStorage.removeItem('carts');
  }
};
