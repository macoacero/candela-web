import React from "react";
import './IconScroll.scss'
 const IconScroll = () => {

    return (
        <div className="icon-scroll-container">
            <svg width="30" height="50" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-scroll">
                <rect x="1" y="1" width="38" height="58" rx="19" stroke="white" strokeWidth="2"/>
                <rect x="18" y="6" width="3" height="8" rx="1.5" fill="white" className="animated"/>
            </svg>
            <span>scroll to ignite!</span>
        </div>
    )
}


export default IconScroll;