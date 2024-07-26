import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './WebService.scss';
import useScrollYPosition from '@/app/hooks/useScrollYPosition';
import useDeviceType from '@/app/hooks/useDeviceType';

interface WebProps {
  webIsVisible: boolean;
}

const WebService: React.FC<WebProps> = ({ webIsVisible }) => {
  const scrollY = useScrollYPosition();
  const { isMobile, isTablet } = useDeviceType();

  const startScroll = 790; 
  const endScroll = 850; 
  const totalImages = 3;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile && !isTablet) {
        const progress = Math.min(Math.max((scrollY - startScroll) / (endScroll - startScroll), 0), 1);
        const newIndex = Math.floor(progress * (totalImages - 1));
        setCurrentIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY, startScroll, endScroll, totalImages, isMobile, isTablet]);

  useEffect(() => {
    if (isMobile || isTablet && webIsVisible) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % totalImages);
      }, 1000); 

      return () => {
        clearInterval(interval);
      };
    }
  }, [isMobile, isTablet, webIsVisible, totalImages]);

  return (
    <div id="web" className="web-service">
      <div className='text-container'>
        <h2>Websites, Webshops, Marketplaces, or your own idea.</h2>
        <p>The limit is your imagination. From design to implementation, from domain registration to server setup, we can help you rocket your business or launch your own idea.</p>
      </div>
      <div className="image-container">
        {Array.from({ length: totalImages }, (_, index) => (
          <Image 
            width={813}
            height={119.7}
            key={index}
            src={`/web-animation/${index + 1}.png`}
            alt="web"
            className={`image-web ${currentIndex === index && (!isMobile || webIsVisible) ? 'visible' : 'hidden'}`}
            priority={false}
          />
        ))}
        <div className="circle">
          <Image 
            width={100}
            height={100}
            src={'plus-icon.svg'}
            alt='plus icon'
            className='plus-icon'
          />
        </div>
      </div>
    </div>
  );
};

export default WebService;
