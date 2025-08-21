import { useEffect, useState } from 'react';

export const useViewportWidth = () => {
    const [screenWidth, setScreen] = useState<number>(0);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => setScreen(window.innerWidth);

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        screenWidth,
    };
};
