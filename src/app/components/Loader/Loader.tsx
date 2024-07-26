// components/Loader.js
import React from 'react';
import Image from 'next/image';
import './Loader.scss';

const Loader = () => {
  return (
    <div className='loader-container'>
      <div className='spinner'>
        <div className='double-bounce-1'></div>
        <div className='double-bounce-2'></div>
      </div>
    </div>
  );
};

export default Loader;
