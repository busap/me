'use client';

import React from 'react';
import { titleFont } from '@/src/app/styles/fonts';

export const Title = () => {
    const text = 'PAVEL BUŠINA';
    return (
        <h1
            className={`${titleFont.className} text-3xl sm:text-7xl font-extrabold text-slate-700`}
        >
            <span className="blur-word">
                {Array.from(text).map((char, index) => (
                    <span
                        key={`${char}-${index}`}
                        className="blur-char"
                        style={{ ['--i' as any]: index }}
                    >
                        {char}
                    </span>
                ))}
            </span>
        </h1>
    );
};
