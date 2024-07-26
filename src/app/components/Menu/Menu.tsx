import React from 'react';
import Image from 'next/image';
import './Menu.scss';
import { usePathname } from 'next/navigation';

interface MenuProps {
    active: boolean;
    showMenu: () => void;
    onLinkClick: (targetId: string) => void; 
    handleContactUsClick?: () => void;
    isDesktop: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    activePage: string;
}

const Menu: React.FC<MenuProps> = ({ 
    active, 
    showMenu, 
    onLinkClick, 
    isDesktop, 
    onMouseEnter, 
    onMouseLeave, 
    handleContactUsClick,
    activePage
}) => {
    
    const pathname = usePathname();
    const handleLinkClick = (targetId: string) => {
        if (handleContactUsClick && pathname !== '/' && targetId === 'contact-us') {
            handleContactUsClick();
        } else {
            sessionStorage.setItem('targetId', targetId);
            onLinkClick(targetId);
        }
    }

    return (
        <div 
            className={`menu-wrapper ${active ? 'active' : ''}`} 
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave}
        >
            {!isDesktop ? 
                <div className='menu-logo' >
                    <Image
                    src="/logo-candela.svg" 
                    alt="logo-candela"
                    width={160}
                    height={40}
                    priority={false}
                />
                </div>
                : 
                <div className='menu-logo' >
                    <Image
                        src="/blue-logo.svg" 
                        alt="logo-candela" 
                        width={320}
                        height={80}
                        className='menu-logo'
                        priority={false} 
                    />
                </div>
            }
            {!isDesktop ? 
            <>
            <div className='menu-logo-2' >
                <Image
                    src="/logo-menu-2.svg" 
                    alt="logo-candela" 
                    width={170}
                    height={170}
                    priority={false}
                /> 
            </div>
            <div className='close-menu' >
                <Image
                    src="/close-menu.svg" 
                    alt="close-menu"
                    width={20}
                    height={30}
                    onClick={showMenu}
                    priority={false}
                />
            </div>
            </>
                    : 
                    null
            }
            <ul>
                <li><a onClick={() => handleLinkClick('home')} className={activePage === 'home' ? 'active-item' : ''}>Home</a></li>
                {/* <li><a onClick={() => handleLinkClick('development')}>Section</a></li> */}
                <li><a onClick={() => handleLinkClick('our-services')} className={activePage === 'our-services' ? 'active-item' : ''}>Services</a></li>
                <li><a onClick={() => handleLinkClick('contact-us')} className={activePage === 'contact-us' ? 'active-item' : ''}>Contact Us</a></li>
            </ul>
            {!isDesktop && (
                <div className='copyright'>
                    ® Candelasoft 2024. | Version: 1.0.0
                </div>
            )}
        </div>
    );
};

export default Menu;