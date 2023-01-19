import { SlideCartContext } from 'providers/SlideContext';
import { useContext } from 'react';

export const useSlideCart = () => {
  const { shouldOpenSlideCart: shouldOpen, close, open } = useContext(SlideCartContext);

  return { shouldOpen, close, open };
};
