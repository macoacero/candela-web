import { useEffect, useRef, useState } from 'react';
import './MatrixAnimation.scss';
import useDeviceType from '@/app/hooks/useDeviceType';

interface MatrixAnimationProps {
  animationStyles: {
    opacity: number;
  }; 
}

const MatrixAnimation: React.FC<MatrixAnimationProps> = ({ animationStyles }) => {
  const { isMobile, isTablet } = useDeviceType();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drops = useRef<number[]>([]);
  const columns = useRef<number>(0);
  const drawInterval = useRef<NodeJS.Timeout | null>(null); 
  const [fontSize, setFontSize] = useState<number>(isMobile || isTablet ? 20 : 50);

  useEffect(() => { 
    setFontSize(isMobile || isTablet ? 20 : 50);
  }, [isMobile, isTablet]);

  useEffect(() => { 
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);

      columns.current = Math.floor(window.innerWidth / fontSize);

      if (drops.current.length === 0 || drops.current.length !== columns.current) {
        drops.current = [];
        for (let i = 0; i < columns.current; i++) {
          drops.current[i] = Math.floor(Math.random() * window.innerHeight / fontSize);
        }
      }
    };

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 80, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

      ctx.fillStyle = '#b5c6ec'; 
      ctx.font = `${fontSize}px 'Courier'`; 

      const letters = '0123456789'; 

      for (let i = 0; i < columns.current; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const yPos = drops.current[i] * fontSize;
        ctx.fillText(text, i * fontSize, yPos);

        drops.current[i]++;

        if (yPos > window.innerHeight && Math.random() > 0.95) {
          drops.current[i] = 0;
        }
      }
    };

    drawInterval.current = setInterval(draw, 50);

    return () => {
      if (drawInterval.current) {
        clearInterval(drawInterval.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [fontSize]); 

  return <canvas ref={canvasRef} style={animationStyles} />;
};

export default MatrixAnimation;
