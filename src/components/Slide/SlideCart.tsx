import { useSlideCart } from 'hooks/useSlideCart';
import { Slide } from './Slide';

export const SlideCart = () => {
  const { shouldOpen, close } = useSlideCart();

  return (
    <Slide title="Cart" isOpen={shouldOpen} onClose={close}>
      Cart
    </Slide>
  );
};
