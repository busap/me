import { useEffect, useState, useRef } from 'react';
import { useMobileDetection } from './useMobileDetection';

export const useMousePosition = () => {
    const [screenWidth, setScreenWidth] = useState(0);
    const [cursorX, setCursorX] = useState(0);
    const lastUpdateTime = useRef(0);
    const throttleDelay = 16; // ~60fps (1000ms / 60 ≈ 16ms)
    const isMobile = useMobileDetection();

    const handleMouseMove = (event: MouseEvent) => {
        const now = Date.now();
        if (now - lastUpdateTime.current < throttleDelay) {
            return;
        }
        lastUpdateTime.current = now;
        setCursorX(prev => (prev !== event.clientX ? event.clientX : prev));
    };

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);

        handleResize();

        if (!isMobile) {
            window.addEventListener('mousemove', handleMouseMove);
        }
        window.addEventListener('resize', handleResize);

        return () => {
            if (!isMobile) {
                window.removeEventListener('mousemove', handleMouseMove);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [isMobile]);

    return { screenWidth, cursorX, notReady: screenWidth === 0};
};
