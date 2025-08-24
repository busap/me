import { useEffect, useState } from 'react';
import { useMousePosition } from './useMousePosition';

export const useSplitRatio = () => {
    const [splitRatio, setSplitRatio] = useState(0.5);
    const { screenWidth, cursorX, notReady } = useMousePosition();

    useEffect(() => {
        if (notReady) return;

        const ratio = cursorX / screenWidth;

        let adjustedRatio;
        if (ratio <= 0.25) {
            adjustedRatio = 0;
        } else if (ratio >= 0.75) {
            adjustedRatio = 1;
        } else {
            adjustedRatio = (ratio - 0.25) / 0.5;
        }

        setSplitRatio(adjustedRatio);
    }, [screenWidth, cursorX, notReady]);

    return splitRatio;
};
