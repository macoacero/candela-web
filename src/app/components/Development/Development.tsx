'use client';
import React, { useEffect, useState } from 'react';
import useScrollYPosition from '@/app/hooks/useScrollYPosition';
import useScrollXCalculations from '@/app/hooks/useScrollXCalculations';
import './Development.scss';
import useDeviceType from '@/app/hooks/useDeviceType';
import Image from 'next/image';
import useElementInViewport from '@/app/hooks/useElementInViewport';

const Development: React.FC<{developmentIsVisible: boolean}> = ({developmentIsVisible}) => {
  const { isDesktop, isTablet, isMobile } = useDeviceType();
  const scrollY = useScrollYPosition()
  const [isFixed, setIsFixed] = useState(false);
  const [topPosition, setTopPosition] = useState('');
  const [animationKey, setAnimationKey] = useState<number>(0);

  const startScroll = 450;
  const endScroll = 520;
  const imageWidth = 400;
  const { position } = useScrollXCalculations(scrollY, startScroll, endScroll, imageWidth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
      if (scrollY < 450) {
        setIsFixed(false);
        setTopPosition('460rem');
      } else if (scrollY >= 430 && scrollY < 530) {
        setIsFixed(true);
        setTopPosition('0');
      } else {
        setIsFixed(false);
        setTopPosition('526rem');
      }
  }, [scrollY]);

  useEffect(() => {
    if (developmentIsVisible) {
      setAnimationKey(prevKey => prevKey + 1);
    }
  }, [developmentIsVisible]);

  const imageStyle = {
    transform: `translateX(${position}rem)`,
  };

  return (
    <div 
      id='development' 
      key={animationKey}
      className="development" 
      style={{ top: isDesktop ? topPosition : '101vh', position: isFixed ? 'fixed' : 'absolute' }}
    >
      <Image 
        width={isDesktop ? imageWidth : 2600}
        height={isDesktop ? 76.81 : 396.5}
        src="/development.svg"
        alt="Development"
        className='development-image'
        style={isDesktop ? imageStyle : {}}
        priority={false}
      />
    </div>
  );
};

export default Development;
