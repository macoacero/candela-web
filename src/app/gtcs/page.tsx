'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import './gtcs.scss';
import '../styles/globals.scss'
import ContactUs from "../components/ContactUs/ContactUs";
import FixedFrame from "../components/FixedFrame/FixedFrame";
import UnmuteButton from "../components/UnmuteButton/UnmuteButton";
import MenuIcon from "../components/MenuIcon/MenuIcon";
import Menu from "../components/Menu/Menu";
import useDeviceType from '../hooks/useDeviceType';
import CustomCursor from "../components/CustomCursor/CustomCursor";
import Image from 'next/image';

export default function Abg() {
    const [showCursor, setShowCursor] = useState(false);
    const [active, setActive] = useState(false);
    const [animatedCursor, setAnimatedCursor] = useState(false);
    const [showContent, setShowContent] = useState('flex');
    const {isDesktop, isTablet, isMobile} = useDeviceType();

    const buttonStyle = {
        top: active ? '80px' : '40px',
        zIndex: showContent === 'flex' ? 400 : 500,
    };

    const menIcinStyles = {
        zIndex: showContent === 'flex' ? 400 : 500,
    };

    const handleLinkClick = () => {
         window.location.href = '/'
    };

    const handleContactUsClick = () => {
        setShowContent( 'none');
        handleShowMenu();
    };

    const handleLegalLinkClick = () => {
        setShowContent('flex');
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
        
        <div className="gtcs">
            <div className="gtcs-content" style={{ display: showContent}}>
                <h1>General Terms and Conditions (GTCs)</h1>

                <div className="gtcs-text">
                    <h2>1. Introduction</h2>

                    <p>These General Terms and
                    Conditions (GTCs) govern your use of our website. By accessing or using our
                    website, you agree to comply with and be bound by these terms. If you do not
                    agree with any part of these terms, please do not use our website.</p>

                    <h2>2. Definitions</h2>

                    <ul >
                    <li>Website refers to
                        candelasoft.com</li>
                    <li>We,
                        Us, Our refers to CandelaSoft</li>
                    <li>User,
                        You, Your refers to any
                        individual or entity accessing our website.</li>
                    </ul>

                    <h2>3. Use of the Website</h2>

                    <p>3.1. You must be at least
                    18 years old to use our website. 3.2. You agree to use the website for lawful
                    purposes only and in a way that does not infringe the rights of, restrict, or
                    inhibit anyone else&apos;s use of the website.</p>

                    <h2>4. Intellectual Property</h2>

                    <p>4.1. All content on the
                    website, including text, graphics, logos, images, and software, is the property
                    of CandelaSoft
                    or its licensors and is protected by intellectual property laws. 4.2. You may
                    not reproduce, distribute, or create derivative works from any content on the
                    website without our express written permission.</p>

                    <h2>5. User Account</h2>

                    <p>5.1. To access certain
                    features of the website, you may need to create an account. You must provide
                    accurate and complete information when creating your account. 5.2. You are
                    responsible for maintaining the confidentiality of your account information and
                    for all activities that occur under your account.</p>

                    <h2>6. Privacy Policy</h2>

                    <p>6.1. Our privacy policy,
                    which explains how we collect, use, and protect your personal data, is
                    available http://candelasoft.com/dataprivacy. By using our website, you consent
                    to our privacy policy.</p>

                    <h2>7. Limitation of Liability</h2>

                    <p>7.1. We strive to ensure
                    that the information on our website is accurate and up-to-date. However, we do
                    not guarantee the accuracy, completeness, or timeliness of the information.
                    7.2. We are not liable for any direct, indirect, incidental, or consequential
                    damages arising from your use of the website.</p>

                    <h2>8. External Links</h2>

                    <p>8.1. Our website may
                    contain links to third-party websites. We are not responsible for the content
                    or practices of these third-party websites. 8.2. Inclusion of any external
                    links does not imply endorsement by us.</p>

                    <h2>9. Modification of Terms</h2>

                    <p>9.1. We reserve the right
                    to modify these GTCs at any time. Any changes will be effective immediately
                    upon posting on the website. 9.2. Your continued use of the website after any
                    changes indicates your acceptance of the modified terms.</p>

                    <h2>10. Governing Law</h2>

                    <p>10.1. These GTCs are
                    governed by and construed in accordance with the laws of Germany. 10.2. Any
                    disputes arising from or related to these GTCs will be subject to the exclusive
                    jurisdiction of the courts of Cologne Germany.</p>

                    <h2>11. Contact Information</h2>

                    <p>If you have any questions
                    or concerns about these GTCs, please contact us at hi@candelasoft.com</p>
                </div>
            </div>
            <div className="footer-links" style={{ display: showContent}}>
              <Link href='/imprint'>Imprint</Link> 
              <span>|</span>
              <Link href='#' className="active">GTCs</Link> 
              <span>|</span>
              <Link href='/dataprivacy'>Data Privacy</Link> 
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
                        src="back-icon.svg" 
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
                activePage='contact-us'
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