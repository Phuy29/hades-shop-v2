import React, { createContext, ReactNode, useState } from 'react';

export type SlideSearchContextType = {
  shoulOpen: boolean;
  close: () => void;
  open: () => void;
};

export const SlideSearchContext = createContext<SlideSearchContextType>({
  shoulOpen: false,
  close: () => null,
  open: () => null
});

type SlideSearchContextProviderProps = {
  children: ReactNode;
};

export const SlideSearchContextProvider = ({ children }: SlideSearchContextProviderProps) => {
  const [shoulOpen, setShoulOpen] = useState(false);

  const open = () => {
    setShoulOpen(true);
  };

  const close = () => {
    setShoulOpen(false);
  };

  return (
    <SlideSearchContext.Provider value={{ shoulOpen, open, close }}>
      {children}
    </SlideSearchContext.Provider>
  );
};
