'use client';
import { useEffect, useState  } from 'react';
import Image from 'next/image';
import useScrollYPosition from '@/app/hooks/useScrollYPosition';
import './Persons.scss';
import useDeviceType from '@/app/hooks/useDeviceType';

interface PersosnsProps {
  personsIsVisible: boolean
}

const Persons: React.FC<PersosnsProps> = ({ personsIsVisible }) => {
  const scrollY = useScrollYPosition();
  const [isFixed, setIsFixed] = useState(true);
  const {isMobile, isTablet, isDesktop } = useDeviceType();
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
      }  else {
        setIsFixed(true);
      } 
    }
    }, [scrollY, isMobile, isTablet]);

  const startScroll = 200; 
  const maxScroll = 50;    

  const startFadeScroll = 274;
  const endFadeScroll = 320;
  const fadeScrollRange = endFadeScroll - startFadeScroll;

  const calculatePosition = (scrollY: number, startScroll: number, maxScroll: number, start: number, end: number): number => {
    const adjustedScrollY = scrollY - startScroll;
    const progress = Math.min(Math.max(adjustedScrollY / maxScroll, 0), 1);
    return start + progress * (end - start);
  };

  const calculateOpacity = (scrollY: number, startScroll: number, maxScroll: number): number => {
    const adjustedScrollY = scrollY - startScroll;
    return Math.min(Math.max(adjustedScrollY / maxScroll, 0), 1);
  };

  const calculateFadeOpacity = (scrollY: number, startFadeScroll: number, fadeScrollRange: number, inverse: boolean = false): number => {
    const adjustedScrollY = scrollY - startFadeScroll;
    const progress = Math.min(Math.max(adjustedScrollY / fadeScrollRange, 0), 1);
    return inverse ? 1 - progress : progress;
  };

  const womanOpacity = calculateOpacity(scrollY, startScroll, maxScroll) * calculateFadeOpacity(scrollY, startFadeScroll, fadeScrollRange, true);
  const manOpacity = calculateOpacity(scrollY, startScroll, maxScroll) * calculateFadeOpacity(scrollY, startFadeScroll, fadeScrollRange, true);
  const robotOpacity = calculateOpacity(scrollY, startScroll, maxScroll) * calculateFadeOpacity(scrollY, startFadeScroll, fadeScrollRange, true);
  const outlineOpacity = calculateFadeOpacity(scrollY, startFadeScroll, fadeScrollRange);

  const womanPosition = calculatePosition(scrollY, startScroll, maxScroll, -50, 0); 
  const manPosition = calculatePosition(scrollY, startScroll, maxScroll, 50, 0);    
  const robotPosition = calculatePosition(scrollY, startScroll, maxScroll, -50, 0); 

  const womanStyle = {
    transform: `translateY(${womanPosition}rem)`,
    opacity: womanOpacity,
  };

  const manStyle = {
    transform: `translateX(${manPosition}rem)`,
    opacity: manOpacity,
  };

  const robotStyle = {
    transform: `translateX(${robotPosition}rem)`,
    opacity: robotOpacity,
  };

  const outlineStyle = {
    opacity: outlineOpacity,
  };

  useEffect(() => {
    if (personsIsVisible) {
      setAnimationKey(prevKey => prevKey + 1);
    }
  }, [personsIsVisible]);
  
  return (
    <>
      {isMobile || isTablet ?
        <div 
          id="persons"
          className="persons"
          key={animationKey}
          >
          <Image 
            width={634}
            height={620} 
            src="/robot.png" 
            alt="Robot" className='person-image robot' 
          />
          <Image 
            width={514}
            height={84} 
            src="/woman.png" 
            alt="Woman" className='person-image woman' 
          />
          <Image 
            width={660}
            height={707} 
            src="/man.png" 
            alt="Man" className='person-image man' 
          />
          <Image 
            width={0}
            height={0} 
            src="/persons-outline.svg" 
            alt="Persons Outline" className='person-image persons-outline'/>  
        </div>
        :
        <div className="persons">
          <Image 
            width={514}
            height={510} 
            src="/robot.png" 
            alt="Robot" 
            style={robotStyle} 
            className={`person-image robot ${isFixed ? 'fixed' : ''}`} 
          />
          <Image 
            width={414}
            height={680} 
            src="/woman.png" 
            alt="Woman" 
            style={womanStyle} 
            className={`person-image woman ${isFixed ? 'fixed' : ''}`} 
          />
          <Image 
            width={540}
            height={577} 
            src="/man.png" 
            alt="Man" 
            style={manStyle} 
            className={`person-image man ${isFixed ? 'fixed' : ''}`} 
          />
          <Image 
            width={0}
            height={0} 
            src="/persons-outline.svg" 
            alt="Persons Outline" 
            style={outlineStyle} 
            className={`person-image persons-outline  ${isFixed ? 'fixed' : ''}`} 
          />
        </div>}
    </>
  );
};

export default Persons;
