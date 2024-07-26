import { useEffect, useState } from 'react';
import useScrollYPosition from '@/app/hooks/useScrollYPosition';
import './IntroText.scss';
import useDeviceType from '@/app/hooks/useDeviceType';

interface IntroTextProps {
  introTextIsVisible: boolean;
}

const IntroText: React.FC<IntroTextProps> = ({introTextIsVisible}) => {
  const scrollY = useScrollYPosition();
  const [isFixed, setIsFixed] = useState(true);
  const [visibleLetters, setVisibleLetters] = useState(0);
  const { isMobile, isTablet, isDesktop } = useDeviceType();
  const [animationKey, setAnimationKey] = useState<number>(0);
  
  useEffect(() => {
    if (isMobile || isTablet) {
      setIsFixed(false);
    } else {
      if (scrollY >= 350) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
  
      const startScroll = 20;
      const endScroll = 78;
      if (scrollY > startScroll && scrollY < endScroll) {
        const percentage = (scrollY - startScroll) / (endScroll - startScroll);
        setVisibleLetters(Math.floor(percentage * text.length));
      } else if (scrollY >= endScroll) {
        setVisibleLetters(text.length);
      } else {
        setVisibleLetters(0);
      }
    }
  }, [scrollY, isMobile, isTablet]);

  const text = "Software in";

  useEffect(() => {
    if (introTextIsVisible) {
      setAnimationKey(prevKey => prevKey + 1);
    }
  }, [introTextIsVisible]);

  return (
    <div 
      className={`animated-text ${isFixed ? 'fixed' : 'absolute'}`} 
      key={animationKey}
      > 
        {isDesktop && text.split('').map((letter, index) => (
          <span key={index} className={`letter ${index < visibleLetters ? 'visible' : 'hidden'}`}>
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
        {!isDesktop && <span>{text}</span>}
    </div>
  );
};

export default IntroText;
