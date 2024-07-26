'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './OurServices.scss';
import WebService from '../WebService/WebService';
import RoboticsService from '../RoboticsService/RoboticsService';
import AppService from '../App/AppService';
import useElementInViewport from '../../hooks/useElementInViewport';

interface OurServicesProps {
    id: string;
    ourServicesIsVisible: boolean;
    appIsVisible: boolean;
    roboticsIsVisible: boolean;
    webIsVisible: boolean;
}

const OurServices: React.FC<OurServicesProps> = ({id, ourServicesIsVisible, appIsVisible, roboticsIsVisible, webIsVisible}) => {
const appRef = useElementInViewport('app');
const [divHeight, setDivHeight] = useState('auto');

useEffect(() => {
    if (appRef.topCoordinate !== 0) {
        setDivHeight(`${appRef.bottomCoordinate && appRef.bottomCoordinate}px`);
    }
}, [appRef]);

    return (
        <div id={id} className='our-services' style={{height: divHeight}}>
            <h2 className="title">Our<br/>Services</h2>
            <RoboticsService roboticsIsVisible={roboticsIsVisible} />
            <WebService webIsVisible={webIsVisible} />
            <AppService appIsVisible={appIsVisible} />
        </div>
    )
}

export default OurServices;