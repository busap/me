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
        >
            <Image
                src="/me.png"
                alt="Profile"
                width={256}
                height={256}
                priority
                className="w-40 h-40 sm:w-56 sm:h-56 object-cover rounded-full shadow-xl"
            />
        </motion.div>
    );
};
