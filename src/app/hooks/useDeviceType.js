import { useEffect, useState } from 'react';

const MOBILE_MAX_WIDTH = 430;
const TABLET_MAX_WIDTH = 1024;

const useDeviceType = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            if (windowWidth <= MOBILE_MAX_WIDTH) {
                setIsMobile(true);
                setIsTablet(false);
                setIsDesktop(false);
            } else if (windowWidth <= TABLET_MAX_WIDTH) {
                setIsMobile(false);
                setIsTablet(true);
                setIsDesktop(false);

                if( windowWidth === 1024 && windowHeight === 600) { 
                    setIsMobile(false);
                    setIsTablet(false);
                    setIsDesktop(true);
                } 
            } else {
                setIsMobile(false);
                setIsTablet(false);
                setIsDesktop(true);
            }
        };

        handleResize(); // Initial call

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { isMobile, isTablet, isDesktop };
};

export default useDeviceType;
