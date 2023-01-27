import { SlideSearchContext } from 'contexts/SlideSearchContext/SlideSearchContext';
import { useContext } from 'react';

export const useSlideSearch = () => {
  const { shoulOpen, close, open } = useContext(SlideSearchContext);

  return {
    shoulOpen,
    close,
    open
  };
};
