'use client';

import React from 'react';
import { titleFont } from '@/src/app/styles/fonts';

export const Title = () => {
    const lines = ['PAVEL', 'BUŠINA'];
    let charIndex = 0;
    return (
        <h1
            className={`${titleFont.className} flex flex-col items-center leading-[1.15] text-2xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-zinc-800`}
            style={{
                textShadow: '0 0 40px rgba(255,255,255,0.9), 0 0 80px rgba(255,255,255,0.5), 0 2px 8px rgba(0,0,0,0.18)',
            }}
        >
            {lines.map((line, lineIndex) => (
                <span key={lineIndex} className={'blur-word block'}>
                    {Array.from(line).map((char, ci) => {
                        const delay = (charIndex++ + 5) * 75;
                        return (
                            <span
                                key={`${char}-${lineIndex}-${ci}`}
                                className={'blur-char'}
                                style={{ animationDelay: `${delay}ms` }}
                            >
                                {char}
                            </span>
                        );
                    })}
                </span>
            ))}
        </h1>
    );
};
