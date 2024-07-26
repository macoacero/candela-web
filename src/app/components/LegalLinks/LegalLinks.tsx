import React from 'react';
import Link from 'next/link';

interface LegalLinksProps {
  handleLegalLinkClick?: () => void;
}

const LegalLinks: React.FC<LegalLinksProps> = ({ handleLegalLinkClick }) => {
  return (
    <div className='contact-info-slogan'>
      <div className='slogan'>
        Candelasoft: Setting the Standard for Bright, Reliable, and Scalable Software. Our commitment to imagination lets us go a little further. 
      </div>
      <div className='footer-links'>
        <Link href='/imprint' onClick={handleLegalLinkClick}>
          Imprint
        </Link>{' '}
        <span>|</span>{' '}
        <Link href='/gtcs' onClick={handleLegalLinkClick}>
          GTCs
        </Link>{' '}
        <span>|</span>{' '}
        <Link href='/dataprivacy' onClick={handleLegalLinkClick}>
          DataPrivacy
        </Link>{' '}
        <span>|</span> <span>2024 Candelasoft</span>
      </div>
      <div className='version'>Version: 1.0.0</div>
    </div>
  );
};

export default LegalLinks;
