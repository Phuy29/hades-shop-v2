import React, { createContext, useReducer, useState } from 'react';
import { slideCartInitialState, slideCartReducer } from './SlideReducer';
import { Cart, SlideCartState } from './type';

export type SlideCartContextType = {
  shouldOpenSlideCart: boolean;
  close: () => void;
  open: () => void;
  state: SlideCartState;
  addCartItem: (cartItem: Cart) => void;
  removeCartItem: (cartItem: Cart) => void;
  decreaseQuantity: (cartItem: Cart) => void;
  increaseQuantity: (cartItem: Cart) => void;
};

export const SlideCartContext = createContext<SlideCartContextType>({
  shouldOpenSlideCart: false,
  close: () => null,
  open: () => null,
  state: slideCartInitialState,
  addCartItem: () => null,
  removeCartItem: () => null,
  decreaseQuantity: () => null,
  increaseQuantity: () => null
});

type SlideContextProviderProps = {
  children: React.ReactNode;
};

export const SlideContextProvider = ({ children }: SlideContextProviderProps) => {
  const [shouldOpenSlideCart, setShouldOpenSlideCart] = useState(false);
  const [state, dispatch] = useReducer(slideCartReducer, slideCartInitialState);

  const close = () => {
    setShouldOpenSlideCart(false);
  };

  const open = () => {
    setShouldOpenSlideCart(true);
  };

  const addCartItem = (cartItem: Cart) => {
    dispatch({ type: 'addCartItem', payload: cartItem });
  };

  const removeCartItem = (cartItem: Cart) => {
    dispatch({ type: 'removeCartItem', payload: cartItem });
  };

  const decreaseQuantity = (cartItem: Cart) => {
    dispatch({ type: 'decreaseQuantity', payload: cartItem });
  };

  const increaseQuantity = (cartItem: Cart) => {
    dispatch({ type: 'increaseQuantity', payload: cartItem });
  };

  return (
    <SlideCartContext.Provider
      value={{
        state,
        shouldOpenSlideCart,
        close,
        open,
        addCartItem,
        removeCartItem,
        decreaseQuantity,
        increaseQuantity
      }}>
      {children}
    </SlideCartContext.Provider>
  );
};
