import React, { createContext, useState } from 'react';

export type SlideCartContextType = {
  shouldOpenSlideCart: boolean;
  close: () => void;
  open: () => void;
};

export const SlideCartContext = createContext<SlideCartContextType>({
  shouldOpenSlideCart: false,
  close: () => null,
  open: () => null
});

type SlideContextProviderProps = {
  children: React.ReactNode;
};

export const SlideContextProvider = ({ children }: SlideContextProviderProps) => {
  const [shouldOpenSlideCart, setShouldOpenSlideCart] = useState(false);

  const close = () => {
    setShouldOpenSlideCart(false);
  };

  const open = () => {
    setShouldOpenSlideCart(true);
  };

  return (
    <SlideCartContext.Provider value={{ shouldOpenSlideCart, close, open }}>
      {children}
    </SlideCartContext.Provider>
  );
};
