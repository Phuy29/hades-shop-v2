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
  | { type: 'removeCartItem'; payload: Cart }
  | { type: 'decreaseQuantity'; payload: Cart }
  | { type: 'increaseQuantity'; payload: Cart };

export const slideCartReducer = (state: SlideCartState, action: ACTIONTYPE): SlideCartState => {
  let newState: SlideCartState;

  const getTotal = () => {
    const total = state.carts.reduce(
      (cartTotal, cartItem) => {
        const { cartQuantity, price } = cartItem;
        const totalCartPrice = cartQuantity * price;

        cartTotal.price += totalCartPrice;
        cartTotal.quantity += cartQuantity;

        return cartTotal;
      },
      {
        price: 0,
        quantity: 0
      }
    );

    state.totalPrice = total.price;
    state.totalQuantity = total.quantity;
  };

  switch (action.type) {
    case 'addCartItem': {
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
          cartQuantity: (existingCartItem.cartQuantity += 1)
        };
      } else {
        const tempCartItems = { ...action.payload, cartQuantity: 1 };
        state.carts = [...state.carts, tempCartItems];
      }

      localStorage.setCarts(state.carts);

      getTotal();

      newState = {
        carts: state.carts,
        totalPrice: state.totalPrice,
        totalQuantity: state.totalQuantity
      };
      break;
    }
    case 'removeCartItem': {
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

      getTotal();

      newState = {
        carts: state.carts,
        totalPrice: state.totalPrice,
        totalQuantity: state.totalQuantity
      };
      break;
    }

    case 'decreaseQuantity': {
      const cartIndex = state.carts.findIndex(
        (item) =>
          item.name === action.payload.name &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );

      if (state.carts[cartIndex].cartQuantity > 1) {
        state.carts[cartIndex].cartQuantity -= 1;
      } else if (state.carts[cartIndex].cartQuantity === 1) {
        if (cartIndex >= 0) {
          state.carts.splice(cartIndex, 1);
        }
      }

      localStorage.setCarts(state.carts);

      getTotal();

      newState = {
        carts: state.carts,
        totalPrice: state.totalPrice,
        totalQuantity: state.totalQuantity
      };
      break;
    }

    case 'increaseQuantity': {
      const cartIndex = state.carts.findIndex(
        (item) =>
          item.name === action.payload.name &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );
      state.carts[cartIndex].cartQuantity += 1;

      localStorage.setCarts(state.carts);

      getTotal();

      newState = {
        carts: state.carts,
        totalPrice: state.totalPrice,
        totalQuantity: state.totalQuantity
      };
      break;
    }

    default:
      return state;
  }
  return newState;
};
