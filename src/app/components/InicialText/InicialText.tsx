import { useEffect, useState } from 'react';
import Image from 'next/image';
import useScrollYPosition from '@/app/hooks/useScrollYPosition';
import './InicialText.scss';
import useDeviceType from '@/app/hooks/useDeviceType';

interface InicialTextProps {
  inicialTextIsVisible: boolean;
}

const InicialText: React.FC<InicialTextProps> = ({ inicialTextIsVisible }) => {
  const scrollY = useScrollYPosition();
  const [isFixed, setIsFixed] = useState(true);
  const { isMobile, isTablet } = useDeviceType();
  const [animationKey, setAnimationKey] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isMobile || isTablet) {
      setIsFixed(false);
    } else {
      if (scrollY >= 350) { // rem
        setIsFixed(false);
      } else if (scrollY > 50 && scrollY < 280) { // rem
        setIsFixed(true);
      }
    }
  }, [scrollY, isMobile, isTablet]);

  useEffect(() => {
    if (inicialTextIsVisible) {
      setAnimationKey(prevKey => prevKey + 1);
    }
  }, [inicialTextIsVisible]);

  const maxScroll = 100;
  const maxPosition = 426;
  const position = Math.min((scrollY / maxScroll) * maxPosition, maxPosition);

  return (
    <div 
      id="inicial-text"
      key={animationKey}
      className={`inicial-text ${isFixed ? 'fixed' : ''}`}
    >
      <Image        
        src="/mask.svg" 
        alt="" 
        width={1400} 
        height={290} 
        style={{ transform: isMobile ? 'translateX(0)' : `translateX(${position}rem)` }}
        className="mask"
      />
    </div>
  );
};

export default InicialText;
