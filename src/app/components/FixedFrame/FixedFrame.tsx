import React from "react";
import Image from 'next/image';
import "./FixedFrame.scss";

interface FixedFrameProps {
  zIndex: number
}

const FixedFrame: React.FC<FixedFrameProps> = ({zIndex}) => {

    return (
    <div className="fixed-frame" style={{zIndex: zIndex}}>
      <div className="line-top-1"></div>
      <div className="line-top-2"></div>
      <div className="line-right"></div>
      <div className="line-left"></div>
      <div className="line-bottom"></div>
      <Image
        src="/logo-candela.svg" 
        className="candela-logo" 
        alt="fixed-frame" 
        width={204.7}
        height={27.31}
        priority={false}
      />
    </div>
);
}   

export default FixedFrame;