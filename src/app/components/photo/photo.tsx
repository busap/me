'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const Photo = () => {
    const [scrollRatio, setScrollRatio] = useState(0.5);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const screenWidth = window.innerWidth;
            const cursorX = event.clientX;

            const ratio = cursorX / screenWidth;

            let adjustedRatio;
            if (ratio <= 0.25) {
                adjustedRatio = 0;
            } else if (ratio >= 0.75) {
                adjustedRatio = 1;
            } else {
                adjustedRatio = (ratio - 0.25) / 0.5;
            }

            setScrollRatio(adjustedRatio);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const leftWidth = `${(1 - scrollRatio) * 100}%`;
    const rightWidth = `${scrollRatio * 100}%`;

    return (
        <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.7 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full shadow-xl"
        >
            <div className="absolute inset-0 flex">
                <div style={{ width: leftWidth }}>
                    <Image
                        src="/me-dev.png"
                        alt="Profile Left"
                        width={256}
                        height={256}
                        priority
                        className="h-full w-full object-cover object-left"
                    />
                </div>
                <div style={{ width: rightWidth }}>
                    <Image
                        src="/me-travel.png"
                        alt="Profile Right"
                        width={256}
                        height={256}
                        priority
                        className="h-full w-full object-cover object-right"
                    />
                </div>
            </div>
        </motion.div>
    );
};
