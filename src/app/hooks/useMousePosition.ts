import { useEffect, useState } from 'react';

export const useMousePosition = () => {
    const [screenWidth, setScreenWidth] = useState(0);
    const [cursorX, setCursorX] = useState(0);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setCursorX(prev => (prev !== event.clientX ? event.clientX : prev));
        };

        const handleResize = () => setScreenWidth(window.innerWidth);

        handleResize();

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { screenWidth, cursorX, notReady: screenWidth === 0 || cursorX === 0};
};
