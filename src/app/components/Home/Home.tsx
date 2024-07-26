'use client';
import React, { useEffect, useState } from 'react';
import InicialText from "../InicialText/InicialText";
import IntroText from "../IntroText/IntroText";
import Persons from "../Persons/Persons";
import './Home.scss';
import MatrixAnimation from '../MatrixAnimation/MatrixAnimation';
import useScrollYPosition from '@/app/hooks/useScrollYPosition';
import useDeviceType from '@/app/hooks/useDeviceType';
import IconScroll from '../icon-scroll/icon-scroll';

interface InicialTextProps {
    inicialTextIsVisible: boolean,
    introTextIsVisible: boolean,
    personsIsVisible: boolean 
}
const Home: React.FC<InicialTextProps> = ({inicialTextIsVisible, introTextIsVisible, personsIsVisible}) => {
    const scrollY = useScrollYPosition();
    const { isMobile, isTablet, isDesktop } = useDeviceType();
    const [bgOpacity, setBgOpacity] = useState(0);
    const [matrixOpacity, setMatrixOpacity] = useState(0);

    const [topPosition, setTopPosition] = useState('');
    const [isFixed, setIsFixed] = useState(true);

    useEffect(() => {
        if(isMobile || isTablet) {
            setIsFixed(false);
        } else {
            if (scrollY >= 350) {
                setTopPosition('335rem');
                setIsFixed(false);
            } else {
                setTopPosition('0');
                setIsFixed(true);
            }
        }

    if (isDesktop && scrollY >= 0 && scrollY <= 100) {
        const opacity = scrollY * 0.008; 
        setBgOpacity(opacity);
        setMatrixOpacity(0)
    } else if (isDesktop && scrollY > 100 && scrollY <= 250) {
        const opacity = (scrollY - 150) * 0.008; 
        setBgOpacity(1);
        setMatrixOpacity(opacity)
    } else if (isDesktop && scrollY > 250 && scrollY <= 350) {
        const opacity = 0.8 - ((scrollY - 250) * 0.008); 
        setBgOpacity(opacity);
        setMatrixOpacity(opacity)
    } else {
        setBgOpacity(0); 
    }

    }, [scrollY, isTablet, isMobile, isDesktop]);
    
    const bgnStyles = {
        opacity: bgOpacity
    }

    const matrixAnimationStyles = {
        opacity: matrixOpacity
    }

    return (
        <div id='home' style={{top: topPosition, position: isFixed ? 'fixed' : 'relative'}}>
            <InicialText inicialTextIsVisible={inicialTextIsVisible}/>
            <IntroText introTextIsVisible={introTextIsVisible}/>
            <Persons personsIsVisible={personsIsVisible} />
            <MatrixAnimation animationStyles={matrixAnimationStyles} />
            <IconScroll />

            {isDesktop ?
            <div className='desktop-blueprint' style={bgnStyles}></div>
            : 
            <div className='mobile-blueprint'></div>
            }
            
        </div>
    );
}

export default Home;
