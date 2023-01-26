/* eslint-disable no-case-declarations */
import { localStorage } from 'utils/localStorage';
import { Cart, SlideCartState } from './type';

export const slideCartInitialState: SlideCartState = {
  carts: localStorage.getCarts() ?? [],
  totalPrice: 0,
  totalQuantity: 0
};

type ACTIONTYPE =
  | { type: 'addCartItem'; payload: Cart }
  | { type: 'removeCartItem'; payload: Cart };

export const slideCartReducer = (state: SlideCartState, action: ACTIONTYPE): SlideCartState => {
  let newState: SlideCartState;
  switch (action.type) {
    case 'addCartItem':
      // eslint-disable-next-line no-case-declarations
      let existingCartItem = state.carts.find(
        (item) =>
          item.name === action.payload.name &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );

      if (existingCartItem) {
        existingCartItem = {
          ...existingCartItem,
          ...action.payload,
          cartQuantity: existingCartItem.cartQuantity ? (existingCartItem.cartQuantity += 1) : 0
        };
      } else {
        const tempCartItems = { ...action.payload, cartQuantity: 1 };
        state.carts = [...state.carts, tempCartItems];
      }

      localStorage.setCarts(state.carts);

      newState = {
        carts: state.carts,
        totalPrice: state.totalPrice,
        totalQuantity: state.totalQuantity
      };
      break;
    case 'removeCartItem':
      const cartIndex = state.carts.findIndex(
        (item) =>
          item.name === action.payload.name &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );

      if (cartIndex >= 0) {
        state.carts.splice(cartIndex, 1);
      }

      localStorage.setCarts(state.carts);

      newState = {
        carts: state.carts,
        totalPrice: state.totalPrice,
        totalQuantity: state.totalQuantity
      };
      break;
    default:
      return state;
  }
  return newState;
};
