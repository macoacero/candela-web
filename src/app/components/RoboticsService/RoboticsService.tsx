import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './RoboticsService.scss';
import useScrollYPosition from '@/app/hooks/useScrollYPosition';
import useDeviceType from '@/app/hooks/useDeviceType';

interface RobotProps {
  roboticsIsVisible: boolean;
}

const RoboticsService: React.FC<RobotProps> = ({ roboticsIsVisible }) => {
  const scrollY = useScrollYPosition();
  const { isMobile, isTablet } = useDeviceType();

  const startScroll = 680; 
  const endScroll = 730; 
  const totalImages = 4; 

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile || !isTablet) {
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
    if (isMobile || isTablet && roboticsIsVisible) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % totalImages);
      }, 1000); 

      return () => {
        clearInterval(interval);
      };
    }
  }, [isMobile, isTablet, roboticsIsVisible, totalImages]);

  return (
    <div id="robotics" className="robotics-service">
        <div className="image-container">
        {Array.from({ length: totalImages }, (_, index) => (
          <Image 
            width={813}
            height={1197}
            key={index}
            src={`/robot-animation/${index + 1}.png`}
            alt="robotics"
            className={`image-robotics ${currentIndex === index && (!isMobile || !isTablet || roboticsIsVisible) ? 'visible' : 'hidden'}`}
          />
        ))}
      <div className="circle">
        <div className="text">Meet to “Sir. Edwards” Robotic hand</div>
      </div>
    </div>
    <div className='text-container'>
        <h2>Your Smart Helper for Automation</h2>
        <p>At the forefront of technological innovation, we utilize the most modern components on the market to set up state-of-the-art robotic arms. These advanced solutions are designed to seamlessly integrate into your production line, enhancing efficiency and precision. .</p>
    </div>
    </div>

  );
};

export default RoboticsService;
