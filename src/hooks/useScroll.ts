import { useEffect, useState } from 'react';

export const useScroll = () => {
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setShouldScroll(true) : setShouldScroll(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return shouldScroll;
};
