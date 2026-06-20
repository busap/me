'use client';

import React from 'react';
import Image from 'next/image';
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
    const backgroundSize = isMobile ? 200 : 300;
    const profileSize = isMobile ? 250 : 350;
    const r = backgroundSize / 2;
    const clipMid = profileSize - r;
    const profileClip = `path('M 0 0 L ${backgroundSize} 0 L ${backgroundSize} ${clipMid} A ${r} ${r} 0 0 1 0 ${clipMid} Z')`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ x: horizontalOffset }}
            transition={{ duration: 0.5, ease: 'linear', delay: 1 }}
            className="relative z-10"
            style={{ width: backgroundSize, height: backgroundSize }}
        >
            <div className="absolute inset-0 flex overflow-hidden rounded-full shadow-xl border border-teal-600">
                <AnimatedImage
                    src="/bg-dev.png"
                    alt="Background Left"
                    imageSize={{
                        width: backgroundSize,
                        height: backgroundSize,
                    }}
                    containerClassName={'relative'}
                    className="h-full w-full object-cover object-left"
                    animation={{ width: leftWidth }}
                    priority
                    quality={100}
                />
                <AnimatedImage
                    src="/bg-travel.png"
                    alt="Background Right"
                    imageSize={{
                        width: backgroundSize,
                        height: backgroundSize,
                    }}
                    containerClassName={'relative'}
                    className="h-full w-full object-cover object-right"
                    animation={{ width: rightWidth }}
                    priority
                    quality={100}
                />
            </div>
            <Image
                src="/me.png"
                alt="Profile"
                width={500}
                height={500}
                className="pointer-events-none absolute bottom-0 left-0 object-cover"
                style={{ width: profileSize, height: profileSize, clipPath: profileClip }}
                priority
                quality={100}
            />
        </motion.div>
    );
};
