import { useEffect, useState } from 'react';
import { useMousePosition } from './useMousePosition';

export const useSplitRatio = (min: number = 0.25, max: number = 0.75) => {
    const [splitRatio, setSplitRatio] = useState(0.5);
    const { screenWidth, cursorX, notReady } = useMousePosition();

    useEffect(() => {
        if (notReady) return;

        const ratio = cursorX / screenWidth;

        let adjustedRatio;
        if (ratio <= min) {
            adjustedRatio = 0;
        } else if (ratio >= max) {
            adjustedRatio = 1;
        } else {
            adjustedRatio = (ratio - min) / (max - min);
        }

        setSplitRatio((prev) =>
            prev !== adjustedRatio ? adjustedRatio : prev
        );
    }, [screenWidth, cursorX, notReady, min, max]);

    return splitRatio;
};
