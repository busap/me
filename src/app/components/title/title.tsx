'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { titleFont } from '@/src/app/styles/fonts';

export const Title = () => {
    return (
        <motion.h1
            className={`${titleFont.className} text-3xl sm:text-7xl font-extrabold text-slate-700`}
            initial={{ opacity: 0, y: -10, scale: 0.7 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
            PAVEL BUŠINA
        </motion.h1>
    );
};
