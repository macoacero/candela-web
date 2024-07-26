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
import './dataprivacy.scss';
import Image from 'next/image';

export default function DataPrivacy() {
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
        <div className="datenschutz">
            <div className="datenschutz-content" style={{ display: showContent}}>
                <h1>Privacy Policy</h1>
                <div className="datenschutz-text">

                    <p><b><span>1. Introduction</span></b></p>

                    <p><span>Candelasoft.com (“us”, “we”, or “our”) is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <span>http://candelasoft.com/dataprivacy<span> </span>as</span> well as your rights in relation to that information.</span></p>

                    <p><b><span>2. Information We Collect</span></b></p>

                    <p><span>We may collect and process the following data about you:</span></p>

                    <p><b><span>2.1 Personal Identification Information</span></b></p>

                    <ul>
                    <li><span>Name</span></li>
                    <li><span>Email address</span></li>
                    <li><span>Telephone number</span></li>
                    <li><span>Address</span></li>
                    <li><span>Payment information</span></li>
                    </ul>

                    <p><b><span>2.2 Non-Personal Identification Information</span></b></p>

                    <ul>
                    <li><span>Browser type and version</span></li>
                    <li><span>Operating system</span></li>
                    <li><span>IP address</span></li>
                    <li><span>Referring website</span></li>
                    <li><span>Activity on our website</span></li>
                    </ul>

                    <p><b><span>3. How We Use Your Information</span></b></p>

                    <p><span>We use the information we collect in the following ways:</span></p>

                    <p><b><span>3.1 To Provide and Maintain Our Services</span></b></p>

                    <ul>
                    <li><span>To process your transactions and manage your orders</span></li>
                    <li><span>To provide customer support</span></li>
                    </ul>

                    <p><b><span>3.2 To Improve Our Website</span></b></p>

                    <ul>
                    <li><span>To understand how our website is used and to improve its functionality</span></li>
                    <li><span>To personalize your experience on our website</span></li>
                    </ul>

                    <p><b><span>3.3 To Communicate with You</span></b></p>

                    <ul>
                    <li><span>To send you updates, promotional materials, and other information related to our services</span></li>
                    <li><span>To respond to your inquiries and requests</span></li>
                    </ul>

                    <p><b><span>3.4 To Ensure Security and Compliance</span></b></p>

                    <ul>
                    <li><span>To monitor for fraudulent activity and ensure compliance with our terms and conditions</span></li>
                    <li><span>To protect our rights and the safety of our users</span></li>
                    </ul>

                    <p><b><span>4. How We Share Your Information</span></b></p>

                    <p><span>We do not sell, trade, or otherwise transfer your personal information to outside parties, except in the following circumstances:</span></p>

                    <ul>
                    <li><span>With service providers who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</span></li>
                    <li><span>When we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others rights&apos;, property, or safety.</span></li>
                    <li><span>In connection with a merger, acquisition, or sale of all or a portion of our assets.</span></li>
                    </ul>

                    <p><b><span>5. Data Retention</span></b></p>

                    <p><span>We will retain your personal information only for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.</span></p>

                    <p><b><span>6. Your Rights</span></b></p>

                    <p><span>Depending on your location, you may have the following rights regarding your personal information:</span></p>

                    <ul>
                    <li><b><span>Right to Access</span></b><span>: You can request a copy of the personal information we hold about you.</span></li>
                    <li><b><span>Right to Rectification</span></b><span>: You can request that we correct or update any inaccurate or incomplete information.</span></li>
                    <li><b><span>Right to Erasure</span></b><span>: You can request that we delete your personal information, subject to certain conditions.</span></li>
                    <li><b><span>Right to Restrict Processing</span></b><span>: You can request that we limit the processing of your personal information.</span></li>
                    <li><b><span>Right to Data Portability</span></b><span>: You can request to receive your personal information in a structured, commonly used, and machine-readable format.</span></li>
                    <li><b><span>Right to Object</span></b><span>: You can object to the processing of your personal information under certain circumstances.</span></li>
                    </ul>

                    <p><span>To exercise any of these rights, please contact us at [Your Contact Information].</span></p>

                    <p><b><span>7. Cookies</span></b></p>

                    <p><span>Our website uses cookies to enhance your experience. Cookies are small data files stored on your device that help us understand how you use our website and improve your experience. You can choose to disable cookies through your browser settings, but this may affect your ability to use certain features of our website.</span></p>

                    <p><b><span>8. Third-Party Links</span></b></p>

                    <p><span>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to read the privacy policies of any third-party sites you visit.</span></p>

                    <p><b><span>9. Security</span></b></p>

                    <p><span>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or method of electronic storage is completely secure, so we cannot guarantee its absolute security.</span></p>

                    <p><b><span>10. Changes to This Privacy Policy</span></b></p>

                    <p><span>We may update this Privacy Policy from time to time. Any changes we make will be posted on this page, and we will update the &quot;Last Updated&quot; date at the top of this policy. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.</span></p>

                    <p><b><span>11. Contact Us</span></b></p>

                    <p><span>If you have any questions about this Privacy Policy or our data practices, please contact us at:</span></p>

                    <p><span>Candelasoft.com<br/>Johannes-Kepler-Straße 14<br/>51377 Leverkusen<br/>E-Mail: hi@candelasoft.com</span></p>
                </div>
            </div>
            <div className="footer-links" style={{ display: showContent}}>
              <Link href='/imprint'>Imprint</Link> 
              <span>|</span> 
              <Link href='/gtcs'>GTCs</Link> 
              <span>|</span> 
              <Link href='#' className="active">Data privacy</Link> 
              <span>|</span>
              <span>2024 Candelasoft</span>
            </div>
            <div className="version-legal" style={{ display: isMobile ? showContent : 'none'}}>Version: 1.0.0</div>
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