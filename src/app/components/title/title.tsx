'use client';

import React from 'react';
import { titleFont } from '@/src/app/styles/fonts';

export const Title = () => {
    const text = 'PAVEL BUŠINA';
    return (
        <h1
            className={`${titleFont.className} text-3xl sm:text-7xl font-extrabold text-slate-700 text-shadow-md`}
        >
            <span className={"blur-word"}>
                {Array.from(text).map((char, index) => {
                    const delay = (index + 5) * 75;
                    return <span
                        key={`${char}-${index}`}
                        className={"blur-char"}
                        style={{animationDelay: `${delay}ms`}}
                    >
                        {char}
                    </span>
                })}
            </span>
        </h1>
    );
};
