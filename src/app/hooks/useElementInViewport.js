import { useEffect, useState } from 'react';

function useElementInViewport(elementId) {
    const [coordinates, setCoordinates] = useState({
        topCoordinate: null,
        bottomCoordinate: null,
        isVisible: false
    });

    useEffect(() => {
        function updateCoordinates() {
            const element = document.getElementById(elementId);
            if (!element) return;

            // Calcular coordenadas absolutas respecto al documento
            const topCoordinate = element.offsetTop;
            const bottomCoordinate = element.offsetTop + element.offsetHeight;

            // Verificar si el elemento está visible en el viewport
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            setCoordinates({
                topCoordinate,
                bottomCoordinate,
                isVisible
            });
        }

        function handleScroll() {
            updateCoordinates();
        }

        function handleResize() {
            updateCoordinates();
        }

        function handleLoad() {
            setTimeout(updateCoordinates, 800);
        }

        handleLoad();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleLoad);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleLoad);
        };
    }, [elementId]);

    return coordinates;
}

export default useElementInViewport;
