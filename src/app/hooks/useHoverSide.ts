import { useState, useEffect } from 'react';

export const useHoverSide = (splitRatio: number) => {
    const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);

    useEffect(() => {
        if (splitRatio >= 0.4 && splitRatio <= 0.6) {
            setHoverSide(null);
        } else if (splitRatio < 0.4) {
            setHoverSide('left');
        } else {
            setHoverSide('right');
        }
    }, [splitRatio]);

    return hoverSide;
};
