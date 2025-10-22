'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSplitRatio } from '@/src/app/hooks/useSplitRatio';
import { AnimatedImage } from '@/src/app/components/animated-image/animated-image';
import { useMobileDetection } from '@/src/app/hooks/useMobileDetection';
import { BackgroundCode } from '@/src/app/components/animated-background/background-code';

export const ImagesGroup = () => {
    const isMobile = useMobileDetection();
    const splitRatio = useSplitRatio(0.25, 0.75);
    const leftWidth = isMobile ? '50%' : `${(1 - splitRatio) * 100}%`;
    const rightWidth = isMobile ? '50%' : `${splitRatio * 100}%`;
    const horizontalOffset = (splitRatio - 0.5) * 30;

    const renderProfilePictures = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ x: horizontalOffset }}
            transition={{ duration: 0.5, ease: 'linear' }}
            className="relative z-10 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-full shadow-xl"
        >
            <div className="absolute inset-0 flex z-10">
                <AnimatedImage
                    src="/me-dev.png"
                    alt="Profile Left"
                    imageSize={{
                        width: 200,
                        height: 200,
                    }}
                    containerClassName={'relative'}
                    className="h-full w-full object-cover object-left"
                    animation={{ width: leftWidth }}
                    priority
                    quality={100}
                />
                <AnimatedImage
                    src="/me-travel.png"
                    alt="Profile Right"
                    imageSize={{
                        width: 200,
                        height: 200,
                    }}
                    containerClassName={'relative'}
                    className="h-full w-full object-cover object-right"
                    animation={{ width: rightWidth }}
                    priority
                    quality={100}
                />
            </div>
        </motion.div>
    );

    const renderBackground = () => {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                animate={{ x: horizontalOffset * 0.5 }}
                transition={{ duration: 0.5, ease: 'linear' }}
                className="flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden"
                style={{
                    width: isMobile ? 160 : 450,
                    height: isMobile ? 160 : 250,
                }}
            >
                <div className="w-[50%] h-full">
                    <BackgroundCode />
                </div>
                <div className="w-[50%] h-full">
                    <BackgroundCode />
                </div>
            </motion.div>
        );
    };

    return (
        <div className="relative">
            {renderProfilePictures()}
            {renderBackground()}
        </div>
    );
};
