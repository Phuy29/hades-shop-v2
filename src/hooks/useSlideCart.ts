import { SlideCartContext } from 'contexts/SlideCartContext/SlideCartContext';
import { useContext } from 'react';

export const useSlideCart = () => {
  const {
    shouldOpenSlideCart: shouldOpen,
    close,
    open,
    state,
    addCartItem,
    removeCartItem,
    decreaseQuantity,
    increaseQuantity
  } = useContext(SlideCartContext);

  return {
    shouldOpen,
    close,
    open,
    state,
    addCartItem,
    removeCartItem,
    decreaseQuantity,
    increaseQuantity
  };
};
