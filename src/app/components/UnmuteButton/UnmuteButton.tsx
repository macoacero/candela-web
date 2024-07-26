import React from "react";
import "./UnmuteButton.scss";
import { CSSProperties } from 'react';
import useAudio from '@/app/hooks/useAudio';
import useDeviceType from '@/app/hooks/useDeviceType';

interface UnmuteButtonProps {
  className: string;
  style?: CSSProperties;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const UnmuteButton: React.FC<UnmuteButtonProps> = ({className, style, onMouseEnter, onMouseLeave}) => {
  const [playing, toggle, volume, setVolume] = useAudio('/music-cs/shutterstock_516685.wav');
  const { isDesktop } = useDeviceType();
    
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);
    setVolume(Math.min(1, Math.max(0, newVolume))); 
};

    return (
    <div className={className} style={style}>
      {isDesktop && playing  &&
        <input
          className="range-input"
          aria-valuemin={0}
          type="range"
          min="0" 
          max="1" 
          step="0.01"
          value={volume} 
          onChange={handleVolumeChange} 
        />
      }
    <span>{playing ? 'Mute' : 'Unmute'}</span>
    <button 
      onClick={toggle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
       {playing ?
        
          <svg className="image" width="44" height="44" viewBox="0 0 64 64" fill="none">
            <g transform="translate(10, 10)">
                <path className="circle" d="M21.9102 42.53C33.3701 42.53 42.6602 33.2399 42.6602 21.78C42.6602 10.3201 33.3701 1.03003 21.9102 1.03003C10.4502 1.03003 1.16016 10.3201 1.16016 21.78C1.16016 33.2399 10.4502 42.53 21.9102 42.53Z" stroke="white" strokeMiterlimit="10"/>
                <path d="M30.2702 21.8C30.2784 22.9066 29.962 23.9913 29.3602 24.92C29.3081 25.0215 29.2357 25.1112 29.1474 25.1834C29.0592 25.2557 28.9569 25.3089 28.8471 25.3399C28.7374 25.3708 28.6223 25.3788 28.5093 25.3634C28.3962 25.3479 28.2876 25.3093 28.1902 25.25C28.0948 25.1876 28.013 25.1066 27.9496 25.0119C27.8861 24.9172 27.8424 24.8107 27.8209 24.6987C27.7994 24.5868 27.8006 24.4717 27.8246 24.3602C27.8485 24.2488 27.8946 24.1433 27.9602 24.05C28.3956 23.3822 28.6275 22.6022 28.6275 21.805C28.6275 21.0078 28.3956 20.2278 27.9602 19.56C27.8869 19.4684 27.834 19.3623 27.8047 19.2487C27.7754 19.1351 27.7704 19.0167 27.7903 18.9011C27.8101 18.7855 27.8543 18.6754 27.9198 18.5781C27.9853 18.4808 28.0706 18.3984 28.1703 18.3365C28.2699 18.2746 28.3815 18.2345 28.4978 18.2189C28.614 18.2033 28.7323 18.2125 28.8447 18.2459C28.9571 18.2793 29.0611 18.3361 29.15 18.4127C29.2389 18.4892 29.3105 18.5837 29.3602 18.69C29.9559 19.6178 30.2719 20.6975 30.2702 21.8Z" fill="white"/>
                <path d="M33.4601 21.78C33.4596 23.7148 32.8431 25.599 31.7 27.16C31.6109 27.3088 31.4764 27.4252 31.3161 27.4918C31.1559 27.5584 30.9786 27.5718 30.8102 27.53C30.6479 27.503 30.4986 27.4241 30.385 27.3051C30.2714 27.186 30.1996 27.0334 30.1801 26.87C30.1592 26.7504 30.1645 26.6277 30.1955 26.5103C30.2266 26.3929 30.2827 26.2836 30.3601 26.19C31.2943 24.917 31.7981 23.3791 31.7981 21.8C31.7981 20.2209 31.2943 18.683 30.3601 17.41C30.2791 17.3155 30.2179 17.2058 30.1801 17.0873C30.1424 16.9688 30.1288 16.8439 30.1401 16.72C30.1604 16.5553 30.2306 16.4009 30.3415 16.2775C30.4524 16.1541 30.5985 16.0677 30.7601 16.03C30.923 15.9911 31.0938 16.0016 31.2506 16.0604C31.4074 16.1192 31.543 16.2235 31.6401 16.36C32.3116 17.2603 32.8101 18.2776 33.1101 19.36C33.3341 20.1474 33.4518 20.9614 33.4601 21.78Z" fill="white"/>
                <path d="M25.8,12c-0.2-0.3-0.4-0.5-0.7-0.7c-0.3-0.2-0.6-0.2-1-0.2c-0.3,0-0.7,0.1-0.9,0.3l-8.6,5.3	c-0.2,0.1-0.4,0.2-0.6,0.2c-0.6,0-1.2,0-1.8,0c-0.2,0-0.5,0-0.7,0.1c-0.2,0.1-0.4,0.2-0.6,0.4c-0.2,0.2-0.3,0.4-0.4,0.6	c-0.1,0.2-0.1,0.5-0.1,0.7c0,2.1,0,4.2,0,6.3c0,0.2,0,0.5,0.1,0.7c0.1,0.2,0.2,0.4,0.4,0.6c0.2,0.2,0.4,0.3,0.6,0.4	c0.2,0.1,0.5,0.1,0.7,0.1c0.5,0,1,0,1.5,0c0.6-0.1,1.1,0.3,1.6,0.6l8,5c0.4,0.3,0.8,0.4,1.2,0.3c0.4-0.1,0.9-0.3,1.2-0.6 c0.3-0.3,0.4-0.8,0.4-1.2l0-17.8C26,12.6,26,12.3,25.8,12z M13.7,21.8c0,1,0,2.1,0,3.1c0,0.2,0,0.2-0.2,0.2h-1.2	c-0.2,0-0.3-0.1-0.3-0.3c0-2,0-4,0-6.1c0-0.2,0.1-0.3,0.3-0.3h1.2c0.2,0,0.2,0,0.2,0.2C13.7,19.7,13.7,20.8,13.7,21.8z M24.4,30.5	c0,0.1,0.1,0.3-0.1,0.3c-0.1,0.1-0.2,0-0.3-0.1c0,0-8.4-5-8.5-5.3c-0.2-0.2-0.1-0.7-0.1-1.1v-2.6c0-1.2,0-2.3,0-3.4	c0-0.1,0-0.1,0-0.2c0-0.1,0.1-0.1,0.1-0.1l8.5-5.2c0.1-0.1,0.2-0.2,0.3-0.1c0.1,0.1,0,0.2,0,0.3v0C24.4,14.7,24.4,30.5,24.4,30.5z" fill="white"/>
            </g>
          </svg>           
        :
        <svg 
            className="image" 
            width="44" 
            height="44" 
            viewBox="0 0 64 64" 
            fill="none"
          >
          <g transform="translate(10, 10)">
            <path className="circle"  d="M21.9102 42.53C33.3701 42.53 42.6602 33.2399 42.6602 21.78C42.6602 10.3201 33.3701 1.03003 21.9102 1.03003C10.4502 1.03003 1.16016 10.3201 1.16016 21.78C1.16016 33.2399 10.4502 42.53 21.9102 42.53Z" stroke="white" strokeMiterlimit="10"/>
            <path d="M30.2702 21.8C30.2784 22.9066 29.962 23.9913 29.3602 24.92C29.3081 25.0215 29.2357 25.1112 29.1474 25.1834C29.0592 25.2557 28.9569 25.3089 28.8471 25.3399C28.7374 25.3708 28.6223 25.3788 28.5093 25.3634C28.3962 25.3479 28.2876 25.3093 28.1902 25.25C28.0948 25.1876 28.013 25.1066 27.9496 25.0119C27.8861 24.9172 27.8424 24.8107 27.8209 24.6987C27.7994 24.5868 27.8006 24.4717 27.8246 24.3602C27.8485 24.2488 27.8946 24.1433 27.9602 24.05C28.3956 23.3822 28.6275 22.6022 28.6275 21.805C28.6275 21.0078 28.3956 20.2278 27.9602 19.56C27.8869 19.4684 27.834 19.3623 27.8047 19.2487C27.7754 19.1351 27.7704 19.0167 27.7903 18.9011C27.8101 18.7855 27.8543 18.6754 27.9198 18.5781C27.9853 18.4808 28.0706 18.3984 28.1703 18.3365C28.2699 18.2746 28.3815 18.2345 28.4978 18.2189C28.614 18.2033 28.7323 18.2125 28.8447 18.2459C28.9571 18.2793 29.0611 18.3361 29.15 18.4127C29.2389 18.4892 29.3105 18.5837 29.3602 18.69C29.9559 19.6178 30.2719 20.6975 30.2702 21.8Z" fill="white"/>
            <path d="M33.4601 21.78C33.4596 23.7148 32.8431 25.599 31.7 27.16C31.6109 27.3088 31.4764 27.4252 31.3161 27.4918C31.1559 27.5584 30.9786 27.5718 30.8102 27.53C30.6479 27.503 30.4986 27.4241 30.385 27.3051C30.2714 27.186 30.1996 27.0334 30.1801 26.87C30.1592 26.7504 30.1645 26.6277 30.1955 26.5103C30.2266 26.3929 30.2827 26.2836 30.3601 26.19C31.2943 24.917 31.7981 23.3791 31.7981 21.8C31.7981 20.2209 31.2943 18.683 30.3601 17.41C30.2791 17.3155 30.2179 17.2058 30.1801 17.0873C30.1424 16.9688 30.1288 16.8439 30.1401 16.72C30.1604 16.5553 30.2306 16.4009 30.3415 16.2775C30.4524 16.1541 30.5985 16.0677 30.7601 16.03C30.923 15.9911 31.0938 16.0016 31.2506 16.0604C31.4074 16.1192 31.543 16.2235 31.6401 16.36C32.3116 17.2603 32.8101 18.2776 33.1101 19.36C33.3341 20.1474 33.4518 20.9614 33.4601 21.78Z" fill="white"/>
            <path d="M31.7803 12.52C31.7511 12.3766 31.6822 12.2443 31.5814 12.1382C31.4806 12.0321 31.3519 11.9565 31.2102 11.92C31.0605 11.8735 30.9005 11.8714 30.7496 11.914C30.5987 11.9566 30.4635 12.042 30.3602 12.16L26.2703 16.26C26.2057 16.3283 26.1518 16.4058 26.1102 16.49L26.0303 16.43V12.94C26.0492 12.6001 25.9724 12.2618 25.8087 11.9633C25.645 11.6648 25.4008 11.4182 25.104 11.2516C24.8071 11.0849 24.4696 11.0048 24.1295 11.0205C23.7894 11.0361 23.4606 11.1469 23.1803 11.3401L14.5403 16.66C14.3624 16.778 14.1536 16.8406 13.9402 16.8401C13.3502 16.8401 12.7703 16.8401 12.1803 16.8401C11.9414 16.8387 11.7045 16.8849 11.4836 16.976C11.2628 17.0672 11.0623 17.2013 10.8938 17.3707C10.7253 17.5401 10.5923 17.7414 10.5024 17.9627C10.4125 18.1841 10.3676 18.4211 10.3702 18.66C10.3702 20.75 10.3702 22.83 10.3702 24.92C10.3689 25.1585 10.4147 25.395 10.5051 25.6158C10.5955 25.8365 10.7286 26.0373 10.8968 26.2064C11.065 26.3755 11.265 26.5097 11.4852 26.6013C11.7055 26.6929 11.9418 26.74 12.1803 26.74C12.67 26.765 13.1606 26.765 13.6503 26.74C14.2903 26.66 14.7102 27.04 15.2302 27.35L15.0102 27.54L12.3103 30.23C12.1918 30.3312 12.1037 30.4634 12.056 30.6117C12.0083 30.7601 12.0029 30.9188 12.0403 31.07C12.0757 31.2154 12.1502 31.3483 12.2558 31.4544C12.3615 31.5604 12.4941 31.6355 12.6394 31.6716C12.7846 31.7077 12.937 31.7033 13.0799 31.659C13.2229 31.6146 13.3509 31.532 13.4502 31.42L16.4502 28.42C16.4746 28.3906 16.5052 28.367 16.5398 28.3508C16.5744 28.3346 16.6121 28.3261 16.6503 28.3261C16.6884 28.3261 16.7262 28.3346 16.7607 28.3508C16.7953 28.367 16.8258 28.3906 16.8502 28.42L23.1803 32.32C23.542 32.5707 23.984 32.6776 24.4203 32.62C24.8682 32.5654 25.2796 32.3454 25.5737 32.0031C25.8679 31.6609 26.0235 31.2211 26.0102 30.77V19.06C26.0053 18.9841 26.017 18.9081 26.0447 18.8372C26.0723 18.7664 26.1153 18.7025 26.1703 18.6501C26.4903 18.3601 26.7802 18.05 27.0902 17.75L31.4602 13.37C31.5866 13.2716 31.6835 13.1401 31.74 12.9901C31.7964 12.8401 31.8104 12.6775 31.7803 12.52ZM13.6603 21.7801C13.6603 22.7801 13.6603 23.84 13.6603 24.87C13.6603 25.04 13.6602 25.09 13.4502 25.08H12.2602C12.0802 25.08 12.0002 25.01 12.0002 24.82C12.0002 22.82 12.0002 20.77 12.0002 18.74C12.0002 18.55 12.0702 18.47 12.2602 18.48H13.4502C13.6202 18.48 13.6603 18.48 13.6603 18.69C13.6603 19.72 13.6603 20.7501 13.6603 21.7801ZM24.2803 30.87C24.1603 30.94 24.0702 30.8701 23.9802 30.7801L17.9802 27.1L17.8702 27.0301L24.3502 20.54V30.54C24.3802 30.67 24.4303 30.8 24.2803 30.87ZM24.3802 13.02C24.3802 14.65 24.3802 16.28 24.3802 17.92C24.3809 17.9909 24.367 18.0612 24.3395 18.1266C24.312 18.1919 24.2714 18.2509 24.2202 18.3L16.5702 25.95C16.5467 25.9775 16.5177 25.9995 16.4849 26.0146C16.4521 26.0297 16.4164 26.0376 16.3802 26.0376C16.3441 26.0376 16.3084 26.0297 16.2756 26.0146C16.2428 25.9995 16.2136 25.9775 16.1902 25.95C15.9102 25.75 15.5002 25.64 15.3402 25.37C15.1802 25.1 15.3402 24.7 15.3402 24.37V21.75C15.3402 20.6 15.3402 19.46 15.3402 18.32C15.3332 18.2507 15.3477 18.181 15.3817 18.1201C15.4157 18.0593 15.4676 18.0104 15.5303 17.98L24.0102 12.77C24.1002 12.71 24.1902 12.59 24.3302 12.67C24.4702 12.75 24.3802 12.91 24.3802 13V13.02Z" fill="white"/>
          </g>
          </svg>  
      }
    </button>
    </div>
  );
}   

export default UnmuteButton;