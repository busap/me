'use client';

import React from 'react';
import { titleFont } from '@/src/app/styles/fonts';

export const Title = () => {
    const text = 'PAVEL BUŠINA';
    return (
        <h1
            className={`${titleFont.className} text-3xl sm:text-5xl lg:text-7xl font-extrabold text-zinc-800`}
            style={{
                textShadow: '0 0 40px rgba(255,255,255,0.9), 0 0 80px rgba(255,255,255,0.5), 0 2px 8px rgba(0,0,0,0.18)',
            }}
        >
            <span className={'blur-word'}>
                {Array.from(text).map((char, index) => {
                    const delay = (index + 5) * 75;
                    return (
                        <span
                            key={`${char}-${index}`}
                            className={'blur-char'}
                            style={{ animationDelay: `${delay}ms` }}
                        >
                            {char}
                        </span>
                    );
                })}
            </span>
        </h1>
    );
};
