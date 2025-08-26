import { useState, useEffect } from 'react';

export const useCursor = (splitRatio: number) => {
    const [cursor, setCursor] = useState<'cursor-code' | 'cursor-plane' | ''>('');

    useEffect(() => {
        if (splitRatio === 0.5) {
            setCursor('');
        } else if (splitRatio < 0.5) {
            setCursor('cursor-code');
        } else {
            setCursor('cursor-plane');
        }
    }, [splitRatio]);

    return cursor;
};
