import { useState, useEffect } from 'react';

const useScrollYPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [remBase, setRemBase] = useState(10); // Base rem value

  useEffect(() => {
    const calculateRemBase = () => {
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      setRemBase(rootFontSize);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentScrollYInRem = currentScrollY / remBase;
      setScrollPosition(currentScrollYInRem);
    };

    // Set initial rem base and scroll position
    calculateRemBase();
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', calculateRemBase);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateRemBase);
    };
  }, [remBase]);

  return scrollPosition;
};

export default useScrollYPosition;
