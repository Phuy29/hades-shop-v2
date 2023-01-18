import React, { createContext, useState } from 'react';

export type SlideCartContextType = {
  openSlideCart: boolean;
  setOpenSlideCart: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SlideContext = createContext<SlideCartContextType | null>(null);

type SlideContextProviderProps = {
  children: React.ReactNode;
};

export const SlideContextProvider = ({ children }: SlideContextProviderProps) => {
  const [openSlideCart, setOpenSlideCart] = useState(false);

  return (
    <SlideContext.Provider value={{ openSlideCart, setOpenSlideCart }}>
      {children}
    </SlideContext.Provider>
  );
};
