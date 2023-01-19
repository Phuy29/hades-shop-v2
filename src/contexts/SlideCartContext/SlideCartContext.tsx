import React, { createContext, useReducer, useState } from 'react';
import { slideCartInitialState, slideCartReducer } from './SlideReducer';
import { Cart, SlideCartState } from './type';

export type SlideCartContextType = {
  shouldOpenSlideCart: boolean;
  close: () => void;
  open: () => void;
  addCartItem: (cartItem: Cart) => void;
  state: SlideCartState;
};

export const SlideCartContext = createContext<SlideCartContextType>({
  shouldOpenSlideCart: false,
  close: () => null,
  open: () => null,
  addCartItem: () => null,
  state: slideCartInitialState
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

  return (
    <SlideCartContext.Provider value={{ state, shouldOpenSlideCart, close, open, addCartItem }}>
      {children}
    </SlideCartContext.Provider>
  );
};
