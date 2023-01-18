import { SlideCartContextType, SlideContext } from 'providers/SlideContext';
import { useContext } from 'react';
import { Slide } from './Slide';

export const SlideCart = () => {
  const { openSlideCart, setOpenSlideCart } = useContext(SlideContext) as SlideCartContextType;

  const handleClose = () => {
    setOpenSlideCart(false);
  };
  return (
    <Slide title="Cart" isOpen={openSlideCart} onClose={handleClose}>
      Cart
    </Slide>
  );
};
