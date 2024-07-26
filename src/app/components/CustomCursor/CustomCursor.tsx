'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import './CustomCursor.scss';

interface CustomCursorProps {
  blueCursor: boolean;
  animatedCursor: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({blueCursor, animatedCursor}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const coordinatesRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [prevPosition, setPrevPosition] = useState<{ x: number; y: number } | null>(null);
  const [cursorYPosition, setCursorYPosition] = useState(0);

  const lerp = (start: number, end: number, t: number) => {
    return start + t * (end - start);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY, pageX, pageY } = event;

      if (prevPosition) {
        const deltaX = pageX - prevPosition.x;
        const deltaY = pageY - prevPosition.y;
        const targetAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

        const smoothedAngle = lerp(rotation, targetAngle, 0.1);
        setRotation(smoothedAngle);
      }

      setPrevPosition({ x: pageX, y: pageY });

      requestAnimationFrame(() => {
        if (cursorRef.current) {
          const cursorWidth = cursorRef.current.offsetWidth;
          const cursorHeight = cursorRef.current.offsetHeight;
          const newLeft = clientX - cursorWidth / 2;
          const newTop = clientY - cursorHeight / 2;

          cursorRef.current.style.left = `${newLeft}px`;
          cursorRef.current.style.top = `${newTop}px`;
        }

        if (coordinatesRef.current) {
          const newCoordLeft = clientX + 20;
          const newCoordTop = clientY + 20;

          coordinatesRef.current.style.left = `${newCoordLeft}px`;
          coordinatesRef.current.style.top = `${newCoordTop}px`;

          setCursorYPosition(newCoordTop);
        }
      });
    };

    const handleScroll = () => {
      if (prevPosition && cursorRef.current && coordinatesRef.current) {
        const scrollX = window.scrollX;
        const cursorWidth = cursorRef.current.offsetWidth;
        const cursorHeight = cursorRef.current.offsetHeight;
        const newLeft = prevPosition.x - scrollX - cursorWidth / 2;
        const newTop = cursorYPosition - cursorHeight; // Suma de 6 píxeles

        cursorRef.current.style.left = `${newLeft}px`;
        cursorRef.current.style.top = `${newTop}px`;

        const newCoordLeft = prevPosition.x - scrollX + 20;
        const newCoordTop = cursorYPosition;

        coordinatesRef.current.style.left = `${newCoordLeft}px`;
        coordinatesRef.current.style.top = `${newCoordTop}px`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevPosition, rotation, cursorYPosition]);

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <svg width="49" height="35" viewBox="0 0 49 35" fill="none" className={animatedCursor ? 'animated-cursor' : ''}>
          <path 
            className='point'
            d="M24.6602 13.3398C22.451 13.3398 20.6602 15.1307 20.6602 17.3398C20.6602 19.549 22.451 21.3398 24.6602 21.3398C26.8693 21.3398 28.6602 19.549 28.6602 17.3398C28.6602 15.1307 26.8693 13.3398 24.6602 13.3398Z" 
            fill={blueCursor ? "var(--secondary-color)" : animatedCursor ? "none" : "white"}
            stroke="white" strokeWidth="1" strokeMiterlimit="10"
            vectorEffect="non-scaling-stroke"
          />
          <path 
            d="M7.68994 34.3101C3.18944 29.8092 0.661139 23.705 0.66114 17.3401C0.66114 10.9751 3.18944 4.87092 7.68994 0.370117" 
            stroke={blueCursor ? "var(--secondary-color)" : "white"} strokeWidth={animatedCursor ? "0" : "1"} strokeMiterlimit="10"
          />
          <path 
            d="M41.63 0.370361C46.1151 4.85556 48.6422 10.9338 48.6591 17.2767C48.676 23.6196 46.1811 29.7113 41.72 34.2203" 
            stroke={blueCursor ? "var(--secondary-color)" : "white"} strokeWidth={animatedCursor ? "0" : "1"} strokeMiterlimit="10"
          />
        </svg>
        <div className={`line ${blueCursor ? 'blue' : ''}`}></div>
      </div>
      {prevPosition && (
        <div
          ref={coordinatesRef}
          className={`coordinates ${blueCursor ? 'blue' : ''}`}
        >
          {`x:${prevPosition.x}px`}<br />
          {`y:${prevPosition.y}px`}
        </div>
      )}
    </>
  );
};

export default CustomCursor;
