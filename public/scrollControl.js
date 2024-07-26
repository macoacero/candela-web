(() => {
  let isTouchpad = false;
  let scrollTimeout;

  function handleScroll(event) {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
      isTouchpad = false;
    }, 100);

    if (Math.abs(event.deltaY) < 50) {
      isTouchpad = true;
    }

    if (isTouchpad) {
      event.preventDefault();
      window.scrollBy({
        top: event.deltaY,
        left: 0,
        behavior: 'auto'
      });
    }
  }

  function initScrollControl() {
    document.addEventListener('wheel', handleScroll, { passive: false });

    let startY = 0;
    document.addEventListener('touchmove', function(event) {
      event.preventDefault();
      window.scrollBy({
        top: event.touches[0].clientY - startY,
        left: 0,
        behavior: 'auto'
      });
      startY = event.touches[0].clientY;
    }, { passive: false });

    document.addEventListener('touchstart', function(event) {
      startY = event.touches[0].clientY;
    }, { passive: false });
  }

  if (typeof window !== 'undefined') {
    initScrollControl();
  }
})();
