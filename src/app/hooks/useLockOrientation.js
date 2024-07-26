import { useState, useEffect, useCallback } from 'react';

function useLockOrientation(desiredOrientation = 'portrait-primary') {
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const { innerWidth, innerHeight } = window;
      const isPortrait = innerHeight > innerWidth;
      if (
        (desiredOrientation === 'portrait-primary' && !isPortrait) ||
        (desiredOrientation === 'landscape-primary' && isPortrait)
      ) {
        setLocked(true);
      } else {
        setLocked(false);
      }
    };

    const handleResize = () => {
      checkOrientation();
    };

    // Initial check
    checkOrientation();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [desiredOrientation]);

  return { locked };
}

export default useLockOrientation;
