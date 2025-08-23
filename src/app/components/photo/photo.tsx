'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const Photo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.7 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full shadow-xl"
        >
            <div className="absolute inset-0 flex">
                <div className="w-1/2">
                    <Image
                        src="/me-dev.png"
                        alt="Profile Left"
                        width={256}
                        height={256}
                        priority
                        className="h-full object-cover object-left"
                    />
                </div>
                <div className="w-1/2">
                    <Image
                        src="/me-travel.png"
                        alt="Profile Right"
                        width={256}
                        height={256}
                        priority
                        className="h-full object-cover object-right"
                    />
                </div>
            </div>
        </motion.div>
    );
};
