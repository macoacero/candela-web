import { useEffect, useState } from 'react';

const MOBILE_MAX_WIDTH = 430;
const TABLET_MAX_WIDTH = 2064;

const useDeviceType = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const isVertical = windowHeight > windowWidth;

            if (windowWidth <= MOBILE_MAX_WIDTH && isVertical) {
                setIsMobile(true);
                setIsTablet(false);
                setIsDesktop(false);
            } else if (windowWidth <= TABLET_MAX_WIDTH && isVertical) {
                setIsMobile(false);
                setIsTablet(true);
                setIsDesktop(false);
            } else if (windowWidth > TABLET_MAX_WIDTH || !isVertical) {
                setIsMobile(false);
                setIsTablet(false);
                setIsDesktop(true);
            }
        };

        handleResize(); 

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { isMobile, isTablet, isDesktop };
};

export default useDeviceType;
