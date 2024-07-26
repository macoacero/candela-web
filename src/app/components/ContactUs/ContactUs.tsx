import React, { useState } from 'react';
import Image from 'next/image';
import './ContactUs.scss';
import useDeviceType from '@/app/hooks/useDeviceType';
import Link from 'next/link';
import ContactForm from '../ContactForm/ContactForm';
import LegalLinks from '../LegalLinks/LegalLinks';

interface ContactUsProps {
  topPosition: number;
  zIndex?: number;
  handleLegalLinkClick?: () => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ topPosition, zIndex, handleLegalLinkClick }) => {
  const { isDesktop } = useDeviceType();
  const [formVisible, setFormVisible] = useState(false);

  return (
    <div id='contact-us' className='contact-us' style={{ top: `${topPosition}px`, zIndex: zIndex }}>
      <div className='container-left'>
        <h1>Contact<br />us</h1>
        <div id='contact-us-footer' className='footer'>
          <div className='footer-links'>
            <Link href='/imprint' onClick={handleLegalLinkClick} >Imprint</Link> <span>|</span> 
            <Link href='/gtcs' onClick={handleLegalLinkClick}>GTCs</Link> <span>|</span> 
            <Link href='/dataprivacy' onClick={handleLegalLinkClick}>Data privacy</Link> | &copy; 2024 Candelasoft
          </div>
        </div>
      </div>
      <div className='container-right'>
        {formVisible ? (
          <ContactForm closeForm={() => setFormVisible(false)} />
        ) : (
          <div className='logo-container'>
            <div className='logo'>
              <Image width={100} height={100} src='./logo.svg' alt='logo' />
            </div>
            <div className='contact-info'>
              <div className='contact-info-link'>
                <a href='#' onClick={(event) => { event?.preventDefault(); setFormVisible(true); }} >
                  <span className='text'>¡Write us here!</span>
                  <span className='text'>¡Escríbenos aquí!</span>
                  <span className='text'>Schreiben Sie uns hier!</span>
                </a>
              </div>
              {isDesktop ? (
                <div className='contact-info-phone'>
                  <p>hi@candelasoft.com</p>
                  <p>Address: Johannes-Kepler-Straße 14, 51377 Leverkusen, Germany</p>
                </div>
              ) : (
                <div className='contact-info-phone'>
                  <p className='email'>hi@candelasoft.com</p>
                  <p>
                    Address:
                    <br />
                     Johannes-Kepler-Straße 14, 51377 Leverkusen, Germany
                  </p>
                </div>
              )}
              <LegalLinks handleLegalLinkClick={handleLegalLinkClick} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
