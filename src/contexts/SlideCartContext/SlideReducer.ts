import { Cart, SlideCartState } from './type';

export const slideCartInitialState: SlideCartState = {
  carts: [],
  totalPrice: 0,
  totalQuantity: 0
};

type ACTIONTYPE = { type: 'addCartItem'; payload: Cart };

export const slideCartReducer = (state: SlideCartState, action: ACTIONTYPE): SlideCartState => {
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
          cartQuantity: (existingCartItem.cartQuantity += 1)
        };
      } else {
        const tempCartItems = { ...action.payload, cartQuantity: 1 };
        state.carts = [...state.carts, tempCartItems];
      }

      return {
        carts: [...state.carts],
        totalPrice: state.totalPrice,
        totalQuantity: state.totalQuantity
      };

    default:
      return state;
  }
};
