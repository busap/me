import { useEffect, useState } from 'react';

export const useMousePosition = () => {
    const [screenWidth, setScreenWidth] = useState(0);
    const [cursorX, setCursorX] = useState(0);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setScreenWidth(window.innerWidth);
            setCursorX(event.clientX);
        };

        setScreenWidth(window.innerWidth);

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return { screenWidth, cursorX, notReady: screenWidth === 0 || cursorX === 0};
};
