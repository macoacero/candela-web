import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './AppService.scss';
import useScrollYPosition from '@/app/hooks/useScrollYPosition';
import useDeviceType from '@/app/hooks/useDeviceType';

interface AppProps {
  appIsVisible: boolean;
}

const AppService: React.FC<AppProps> = ({ appIsVisible }) => {
  const scrollY = useScrollYPosition();
  const { isMobile, isTablet } = useDeviceType();

  const startScroll = 890;
  const endScroll = 950;
  const totalImages = 3;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile) {
        const progress = Math.min(Math.max((scrollY - startScroll) / (endScroll - startScroll), 0), 1);
        const newIndex = Math.floor(progress * (totalImages - 1));
        setCurrentIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY, startScroll, endScroll, totalImages, isMobile]);

  useEffect(() => {
    if (isMobile || isTablet && appIsVisible) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % totalImages);
      }, 1000); 

      return () => {
        clearInterval(interval);
      };
    }
  }, [isMobile, isTablet, appIsVisible, totalImages]);

  return (
    <div id="app" className="app-service">
      <div className="image-container">
        {Array.from({ length: totalImages }, (_, index) => (
          <Image 
            width={813}
            height={1197}
            key={index}
            src={`/app-animation/${index + 1}.png`}
            alt="app"
            className={`image-app ${currentIndex === index && (!isMobile || appIsVisible) ? 'visible' : 'hidden'}`}
            priority={false}
          />
        ))}
        <div className="circle">
          <div className="text">Create your own digital world here</div>
        </div>
      </div>
      <div className='text-container'>
        <h2>Turn your vision into reliable apps, from concept to app store.</h2>
        <p>At our company, we are dedicated to using the latest industry standards to ensure that your apps are not only scalable but also highly reliable. Whether you start with a simple concept or a fully formed idea, we are committed to turning your vision into a comprehensive app that meets all your needs. </p>
      </div>
    </div>
  );
};

export default AppService;
