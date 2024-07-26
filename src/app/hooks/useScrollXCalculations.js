const useScrollXCalculations = (scrollY, startScroll, endScroll, imageWidth) => {
  const scrollRange = endScroll - startScroll;

  const calculatePosition = () => {
    if (scrollY < startScroll) return 0;
    if (scrollY > endScroll) return -imageWidth;
    const progress = (scrollY - startScroll) / scrollRange;
    return -imageWidth * progress;
  };

  const calculateOpacity = (index, letterScrollStart, endScroll) => {
    if (scrollY < letterScrollStart) return 0;
    if (scrollY > endScroll) return 1;
    const progress = (scrollY - letterScrollStart) / (endScroll - letterScrollStart);
    return Math.min(progress, 1);
  };

  const position = calculatePosition();

  return { position, calculateOpacity };
};

export default useScrollXCalculations;
