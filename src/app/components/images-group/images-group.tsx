'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSplitRatio } from '@/src/app/hooks/useSplitRatio';
import { AnimatedImage } from '@/src/app/components/animated-image/animated-image';
import { useMobileDetection } from '@/src/app/hooks/useMobileDetection';

export const ImagesGroup = () => {
    const isMobile = useMobileDetection();
    const splitRatio = useSplitRatio(0.4, 0.6);
    const leftWidth = isMobile ? '50%' : `${(1 - splitRatio) * 100}%`;
    const rightWidth = isMobile ? '50%' : `${splitRatio * 100}%`;
    const horizontalOffset = isMobile ? 0 : (splitRatio - 0.5) * 30;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ x: horizontalOffset }}
            transition={{ duration: 0.5, ease: 'linear', delay: 1 }}
            className="relative z-10 w-[150px] h-[150px] sm:w-[225px] sm:h-[225px] rounded-full shadow-xl border border-teal-600"
        >
            <div className="absolute inset-0 flex z-10">
                <AnimatedImage
                    src="/me-dev.png"
                    alt="Profile Left"
                    imageSize={{
                        width: 225,
                        height: 225,
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
                        width: 225,
                        height: 225,
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
};
