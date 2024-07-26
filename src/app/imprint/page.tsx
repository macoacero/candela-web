'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import '../styles/globals.scss'
import ContactUs from "../components/ContactUs/ContactUs";
import FixedFrame from "../components/FixedFrame/FixedFrame";
import UnmuteButton from "../components/UnmuteButton/UnmuteButton";
import MenuIcon from "../components/MenuIcon/MenuIcon";
import Menu from "../components/Menu/Menu";
import useDeviceType from '../hooks/useDeviceType';
import CustomCursor from "../components/CustomCursor/CustomCursor";
import './imprint.scss';
import Image from 'next/image';


export default function Imprint() {
    const [showCursor, setShowCursor] = useState(false);
    const [active, setActive] = useState(false);
    const [targetId, setTargetId] = useState<string | null>(null);
    const [animatedCursor, setAnimatedCursor] = useState(false);
    const [showContent, setShowContent] = useState('flex');
    const { isDesktop, isTablet, isMobile } = useDeviceType();

    const buttonStyle = {
        top: active ? '80px' : '40px',
        zIndex: showContent === 'flex' ? 400 : 500,
    };

    const menIcinStyles = {
        zIndex: showContent === 'flex' ? 400 : 500,
    };

    const handleLinkClick = (targetId: string) => {
         window.location.href = '/'
         setTargetId(targetId);
         handleShowMenu();
    };

    const handleContactUsClick = () => {
        setShowContent( 'none');
        handleShowMenu();
    };

    const handleLegalLinkClick = () => {
        console.log('Legal link clicked');
        setShowContent( 'flex');
    }

    const handleShowMenu = () => {
        setActive(prevActive => !prevActive);
    };

    const handleMenuIconMouseEnter = () => {
        setShowCursor(true);
    };

    const handleMenuIconMouseLeave = () => {
        setShowCursor(false);
    };

    const handleEnterCursor = () => setAnimatedCursor(true);  

    const handleLeaveCursor = () => setAnimatedCursor(false);

    return (
        <div className="imprint">
            <div className="imprint-content" style={{ display: showContent}}>
                <div className="imprint-text">
                <h1>Imprint</h1>

                <p>CandelaSoft is a Company of the:</p>

                <p>Troeger Com GmbH<br/>
                Johannes-Kepler-Straße 14<br/> 
                51377 Leverkusen<br/>
                E-Mail: hi@candelasoft.com</p>
                
                <p>Vertretungsberechtigter Geschäftsführer: Helmut Troeger<br/>
                Registergericht: Amtsgericht Köln<br/>
                Registernummer: HRB 118658</p>
            </div>
        </div>
        <div className="footer-links" style={{ display: showContent}}>
            <Link href='#' className="active">Imprint</Link> 
            <span>|</span> 
            <Link href='/gtcs'>GTCs</Link>
            <span>|</span> 
            <Link href='/dataprivacy'>Data privacy</Link> 
            <span>|</span>
            <span>2024 Candelasoft</span>
        </div>
        <div className="version-legal" style={{ display: isMobile ? showContent : 'none'}}>Version: 1.1.2</div>
        {(isDesktop || isTablet) && 
        <CustomCursor
            blueCursor={showCursor} 
            animatedCursor={animatedCursor}
        />
        }
        <UnmuteButton
            className='unmute-button fixed'
            onMouseEnter={handleEnterCursor}
            onMouseLeave={handleLeaveCursor}
            style={buttonStyle}
        />
        {showContent === 'flex' && 
            <Link href={'/'}>
                <Image
                    src="/back-icon.svg" 
                    alt="close-menu"
                    width={35}
                    height={35}
                    priority={false}
                    className="close-modal"
                    onMouseEnter={handleEnterCursor}
                    onMouseLeave={handleLeaveCursor}
                />
            </Link>
        }
        <MenuIcon
            showMenu={handleShowMenu} 
            active={ active }  
            onMouseEnter={handleEnterCursor}
            onMouseLeave={handleLeaveCursor}
            menIcinStyles={menIcinStyles}
        />
        <Menu
            showMenu={handleShowMenu} 
            active={active} 
            onLinkClick={handleLinkClick} 
            isDesktop={isDesktop} 
            onMouseEnter={handleMenuIconMouseEnter}
            onMouseLeave={handleMenuIconMouseLeave}
            handleContactUsClick={handleContactUsClick}
        />
        <FixedFrame zIndex={401} />
        <div className="bg" style={{ display: showContent}}></div>
        <ContactUs 
            topPosition={0} 
            zIndex={showContent === 'none' ? 450 : 200}
            handleLegalLinkClick={handleLegalLinkClick}
            />
    </div>
    );
}