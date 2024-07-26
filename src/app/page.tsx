'use client';
import React, { useState, useEffect, useRef } from 'react';
import { CSSProperties } from 'react';
import MenuIcon from "./components/MenuIcon/MenuIcon";
import Menu from "./components/Menu/Menu";
import Home from './components/Home/Home';
import OurServices from './components/OurServices/OurServices';
import ContactUs from './components/ContactUs/ContactUs';
import useScrollTo from './hooks/useScrollTo';
import FixedFrame from './components/FixedFrame/FixedFrame';
import UnmuteButton from './components/UnmuteButton/UnmuteButton';
import Development from './components/Development/Development';
import Loader from './components/Loader/Loader';
import CustomCursor from './components/CustomCursor/CustomCursor';
import useDeviceType from './hooks/useDeviceType';
import useElementInViewport from './hooks/useElementInViewport';
import useLockOrientation from './hooks/useLockOrientation';
import Cookiespolicy from './components/Cookiespolicy/Cookiespolicy';

export default function MainPage({}) {
    const [active, setActive] = useState(false);
    const [bgColor, setBgColor] = useState("var(--primary-color)");
    const [loading, setLoading] = useState(true);
    const [mainHeight, setMainHeight] = useState('784rem');
    const [contactusTopPosition, setContactusTopPosition] = useState(1020);
    const [showCursor, setShowCursor] = useState(false);
    const [animatedCursor, setAnimatedCursor] = useState(false);
    const [lockScreen, setLockScreen] = useState(false);
    const [activePage, setActivePage] = useState('home');

    const mainRef = useRef(null);

    // Sections Refs
    const homeRef = useElementInViewport('home');
    const inicialTextRef = useElementInViewport('inicial-text');
    const IntroTextRef = useElementInViewport('intro-text');
    const personsRef = useElementInViewport('persons');
    const developmentRef = useElementInViewport('development');
    const ourServicesRef = useElementInViewport('our-services');
    const roboticsRef = useElementInViewport('robotics');
    const webRef = useElementInViewport('web');
    const AppRef = useElementInViewport('app');
    const constactUsRef = useElementInViewport('contact-us');
    const contactusFooterRef = useElementInViewport('contact-us-footer');

    const { isDesktop, isTablet, isMobile } = useDeviceType();
    const scrollTo = useScrollTo();
    const { locked } = useLockOrientation('portrait-primary');

    const [cookiespolicyVisible, setCookiespolicyVisible] = useState<string | null>(null);

    useEffect(() => {
        const storedPolicy = window.localStorage.getItem('modalVisible');
        setCookiespolicyVisible(storedPolicy === null ? 'true' : storedPolicy);
    }, []);

    useEffect(() => {
        if (cookiespolicyVisible !== null) {
            window.localStorage.setItem('modalVisible', cookiespolicyVisible);
        }
    }, [cookiespolicyVisible]);

    const handleShowMenu = () => {
        setActive(prevActive => !prevActive);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 600);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        if (ourServicesRef.isVisible) {
            setBgColor("var(--secondary-color)");
        } else {
            setBgColor("var(--primary-color)");
        }
    }, [ourServicesRef]);

    useEffect(() => {
        if (ourServicesRef && ourServicesRef.bottomCoordinate) {
            setContactusTopPosition(ourServicesRef.bottomCoordinate + 150);

            if (constactUsRef.bottomCoordinate !== 0) {
                setMainHeight(`${constactUsRef.bottomCoordinate}px`);
            }
        }
    }, [ourServicesRef, constactUsRef]);

    const getButtonStyle = (): CSSProperties => {
        if (isMobile) {
            return { top: '15px' };
        }

        if (isTablet) {
            return { top: '50px' };
        }

        if (contactusFooterRef.isVisible && constactUsRef.topCoordinate !== null) {
            if (active && constactUsRef.topCoordinate !== null) {
                return { top: `${constactUsRef.topCoordinate + 80}px` };
            } else {
                return { top: `${constactUsRef.topCoordinate + 50}px` };
            }
        }

        return { top: 'auto' };
    };

    const buttonStyle = getButtonStyle();

    const handleMenuIconMouseEnter = () => {
        setShowCursor(true);
    };

    const handleMenuIconMouseLeave = () => {
        setShowCursor(false);
    };;

    const handleScroll = (targetId: string | null) => {
        if (targetId === 'home') {
            scrollTo(null, false, true); // Scroll to top
        } else if (targetId === 'contact-us') {
            scrollTo(null, true); // Scroll to bottom
        } else if (targetId) {
            scrollTo(targetId); // Scroll to specific element
        }
        setActive(false);
    };
    
    const handleLinkClick = (targetId: string | null) => {
        handleScroll(targetId);
    };
    
    useEffect(() => {
        setLockScreen(locked);
    }, [locked]);

    const handleEnterCursor = () => setAnimatedCursor(true);

    const handleLeaveCursor = () => setAnimatedCursor(false);

    const handleToggleModalCookies = () => {
        setCookiespolicyVisible('false');
        setShowCursor(false);
    };

    function isNavigationBarVisible() {
        const windowHeight = window.innerHeight;
        const screenHeight = window.screen.height;
    
        // Verifica si hay una diferencia notable en las alturas
        return screenHeight - windowHeight > 100; // Ajusta el valor según tus pruebas
    }

    window.addEventListener('resize', () => {
        // Ejecutar la lógica necesaria cuando cambia el tamaño de la ventana
        if (isNavigationBarVisible()) {
            console.log("La barra de navegación está visible.");
        } else {
            console.log("La barra de navegación no está visible.");
        }
    });

    useEffect(() => {
        if (homeRef.isVisible) {
            setActivePage('home');
        } else if (ourServicesRef.isVisible) {
            setActivePage('our-services');
        } else if (constactUsRef.isVisible) {
            setActivePage('contact-us');
        }
    }, [ homeRef, ourServicesRef, constactUsRef ]);
    

    return (
        <main
            ref={mainRef}
            className="main"
            style={{
                minHeight: cookiespolicyVisible === 'true' ? '100vh' : mainHeight,
                backgroundColor: bgColor,
            }}
        >
            {!isDesktop && lockScreen ? <div className='lock-screen'>Debes girar la pantalla a vertical para ver esta sección.</div> : (
                <>
                    {cookiespolicyVisible === 'true' && <Cookiespolicy 
                        onMouseEnter={handleMenuIconMouseEnter}
                        onMouseOver={handleMenuIconMouseEnter}
                        onMouseLeave={handleMenuIconMouseLeave}
                        modalVisible= {handleToggleModalCookies}
                    />}
                    
                    {loading && <Loader />}
                    <>
                        <Home
                            inicialTextIsVisible={inicialTextRef.isVisible}
                            introTextIsVisible={IntroTextRef.isVisible}
                            personsIsVisible={personsRef.isVisible}
                        />
                        <Development developmentIsVisible={developmentRef.isVisible} />
                        <OurServices
                            id={'our-services'}
                            ourServicesIsVisible={ourServicesRef.isVisible}
                            roboticsIsVisible={roboticsRef.isVisible}
                            webIsVisible={webRef.isVisible}
                            appIsVisible={AppRef.isVisible}
                        />
                        <ContactUs topPosition={contactusTopPosition} />
                        {(isDesktop || isTablet) &&
                            <CustomCursor
                                blueCursor={showCursor}
                                animatedCursor={animatedCursor}
                            />}
                        <FixedFrame zIndex={0} />
                        <UnmuteButton
                            className={`unmute-button ${contactusFooterRef.isVisible ? '' : 'fixed'}`}
                            style={buttonStyle}
                            onMouseEnter={handleEnterCursor}
                            onMouseLeave={handleLeaveCursor}
                        />
                        <MenuIcon
                            showMenu={handleShowMenu}
                            active={active}
                            onMouseEnter={handleEnterCursor}
                            onMouseLeave={handleLeaveCursor}
                        />
                        <Menu
                            activeItem={activePage}
                            showMenu={handleShowMenu}
                            active={active}
                            onLinkClick={handleLinkClick}
                            isDesktop={isDesktop}
                            onMouseEnter={handleMenuIconMouseEnter}
                            onMouseLeave={handleMenuIconMouseLeave}
                        />
                    </>
                </>
            )}
        </main>
    );
}
