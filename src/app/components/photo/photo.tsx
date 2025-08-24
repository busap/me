'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSplitRatio } from '@/src/app/hooks/useSplitRatio';

export const Photo = () => {
    const splitRatio = useSplitRatio(0.4, 0.6);
    const leftWidth = `${(1 - splitRatio) * 100}%`;
    const rightWidth = `${splitRatio * 100}%`;
    const leftWidthPercent = (1 - splitRatio) * 100;
    const rightWidthPercent = splitRatio * 100;
    const leftFilter = leftWidthPercent < 50
        ? `saturate(${(leftWidthPercent / 50) * 0.8})`
        : `none`
    const rightFilter = rightWidthPercent < 50
        ? `saturate(${(rightWidthPercent / 50) * 0.8})`
        : `none`;
    const horizontalOffset = (splitRatio - 0.5) * 30;

    return (
        <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.7 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ x: horizontalOffset }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full shadow-xl"
        >
            <div className="absolute inset-0 flex">
                <motion.div
                    animate={{ width: leftWidth }}
                >
                    <Image
                        src="/me-dev.png"
                        alt="Profile Left"
                        width={256}
                        height={256}
                        priority
                        quality={100}
                        className="h-full w-full object-cover object-left"
                        style={{ filter: leftFilter }}
                    />
                </motion.div>
                <motion.div
                    animate={{ width: rightWidth }}
                >
                    <Image
                        src="/me-travel.png"
                        alt="Profile Right"
                        width={256}
                        height={256}
                        priority
                        quality={100}
                        className="h-full w-full object-cover object-right"
                        style={{ filter: rightFilter }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};
