import React from 'react';

const useScrollTo = () => {
    const scrollTo = (targetId, isLastLink = false, isFirstLink = false) => {
        const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const scroll = (targetOffsetTop, duration) => {
            const initialScroll = window.scrollY;
            const distance = targetOffsetTop - initialScroll;
            const startTime = performance.now();

            const animateScroll = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                window.scrollTo(0, easeInOutQuad(elapsedTime, initialScroll, distance, duration));
                if (elapsedTime < duration) {
                    requestAnimationFrame(animateScroll);
                }
            };

            requestAnimationFrame(animateScroll);
        };

        if (isLastLink) {
            const targetOffsetTop = document.documentElement.scrollHeight - window.innerHeight + 200;
            const duration = 3500; 
            scroll(targetOffsetTop, duration);
        } else if (isFirstLink) {
            const targetOffsetTop = 0;
            const duration = 3500;
            scroll(targetOffsetTop, duration);
        } else {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const targetOffsetTop = targetElement.offsetTop;
                const duration = 3500;
                scroll(targetOffsetTop, duration);
            }
        }
    };

    return scrollTo;
};

export default useScrollTo;
