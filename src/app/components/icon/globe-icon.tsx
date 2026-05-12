'use client';

import type { HTMLMotionProps, Variants } from 'framer-motion';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
} from 'react';

export interface GlobeIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface GlobeIconProps extends HTMLMotionProps<'div'> {
    size?: number;
}

const GlobeIcon = forwardRef<GlobeIconHandle, GlobeIconProps>(
    ({ onMouseEnter, onMouseLeave, size = 28, ...props }, ref) => {
        const controls = useAnimation();
        const reduced = useReducedMotion();
        const isControlled = useRef(false);

        useImperativeHandle(ref, () => {
            isControlled.current = true;
            return {
                startAnimation: () =>
                    reduced
                        ? controls.start('normal')
                        : controls.start('animate'),
                stopAnimation: () => controls.start('normal'),
            };
        });

        const handleEnter = useCallback(
            (e?: React.MouseEvent<HTMLDivElement>) => {
                if (reduced) return;
                if (!isControlled.current) controls.start('animate');
                else onMouseEnter?.(e as React.MouseEvent<HTMLDivElement>);
            },
            [controls, reduced, onMouseEnter]
        );

        const handleLeave = useCallback(
            (e?: React.MouseEvent<HTMLDivElement>) => {
                if (!isControlled.current) controls.start('normal');
                else onMouseLeave?.(e as React.MouseEvent<HTMLDivElement>);
            },
            [controls, onMouseLeave]
        );

        const iconVariants: Variants = {
            normal: { rotate: 0 },
            animate: {
                rotate: 360,
                transition: { duration: 1.6, ease: 'easeInOut', repeat: 0 },
            },
        };

        const drawVariants: Variants = {
            normal: { pathLength: 1, opacity: 1 },
            animate: {
                pathLength: [0, 1],
                opacity: [0.7, 1],
                transition: { duration: 1.4, ease: 'easeInOut', repeat: 0 },
            },
        };

        return (
            <motion.div
                className={'inline-flex items-center justify-center'}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                {...props}
            >
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={controls}
                    initial="normal"
                    variants={iconVariants}
                >
                    <motion.circle cx="12" cy="12" r="10" variants={drawVariants} />
                    <motion.path
                        d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
                        variants={drawVariants}
                    />
                    <motion.path d="M2 12h20" variants={drawVariants} />
                </motion.svg>
            </motion.div>
        );
    }
);

GlobeIcon.displayName = 'GlobeIcon';
export { GlobeIcon };
