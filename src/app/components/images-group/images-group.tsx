'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSplitRatio } from '@/src/app/hooks/useSplitRatio';
import {AnimatedImage} from "@/src/app/components/animated-image/animated-image";

export const ImagesGroup = () => {
    const splitRatio = useSplitRatio(0.25, 0.75);
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

    const renderProfilePictures = () => (
        <div className="absolute inset-0 flex z-10">
            <AnimatedImage
                src="/me-dev.png"
                alt="Profile Left"
                imageSize={{
                    width: 294,
                    height: 294
                }}
                containerClassName={"relative"}
                className="h-full w-full object-cover object-left"
                style={{ filter: leftFilter }}
                animation={{ width: leftWidth }}
                priority
                quality={100}
            />
            <AnimatedImage
                src="/me-travel.png"
                alt="Profile Right"
                imageSize={{
                    width: 294,
                    height: 294
                }}
                containerClassName={"relative"}
                className="h-full w-full object-cover object-right"
                style={{ filter: rightFilter }}
                animation={{ width: rightWidth }}
                priority
                quality={100}
            />
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.7 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ x: horizontalOffset }}
            transition={{ duration: 0.5, ease: 'linear' }}
            className="relative w-46 h-46 sm:w-60 sm:h-60 rounded-full shadow-xl"
        >
            {renderProfilePictures()}
        </motion.div>
    );
};
