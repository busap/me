'use client';

import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

export type LinkIconProps = {
    href: string;
    children: ReactNode;
    delay?: number;
    target?: string;
    textColor?: string;
};

export const LinkIcon: React.FC<LinkIconProps> = ({
    href,
    children,
    delay = 0,
    target = '_blank',
    textColor = 'text-slate-600',
}) => {
    return (
        <motion.a
            href={href}
            target={target}
            rel={'noopener noreferrer'}
            className={`${textColor} transition transform duration-300 hover:scale-125 hover:text-teal-600`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay }}
        >
            {children}
        </motion.a>
    );
};
