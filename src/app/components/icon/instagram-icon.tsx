'use client';

import type { HTMLMotionProps, Variants } from 'framer-motion';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
} from 'react';

export interface InstagramIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface InstagramIconProps extends HTMLMotionProps<'div'> {
    size?: number;
}

const InstagramIcon = forwardRef<InstagramIconHandle, InstagramIconProps>(
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
            normal: { scale: 1, rotate: 0 },
            animate: {
                scale: [1, 1.08, 0.95, 1],
                rotate: [0, -2, 2, 0],
                transition: { duration: 1.3, ease: 'easeInOut', repeat: 0 },
            },
        };

        const drawVariants: Variants = {
            normal: { pathLength: 1, opacity: 1 },
            animate: {
                pathLength: [0, 1],
                opacity: [0.7, 1],
                transition: { duration: 1.5, ease: 'easeInOut', repeat: 0 },
            },
        };

        const pulseVariants: Variants = {
            normal: { scale: 1, opacity: 1 },
            animate: {
                scale: [1, 1.4, 1],
                opacity: [1, 0.4, 1],
                transition: { duration: 1, repeat: 0, ease: 'easeInOut' },
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
                    <motion.rect
                        width="20"
                        height="20"
                        x="2"
                        y="2"
                        rx="5"
                        ry="5"
                        variants={drawVariants}
                    />
                    <motion.path
                        d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                        variants={drawVariants}
                    />
                    <motion.line
                        x1="17.5"
                        x2="17.51"
                        y1="6.5"
                        y2="6.5"
                        variants={pulseVariants}
                    />
                </motion.svg>
            </motion.div>
        );
    }
);

InstagramIcon.displayName = 'InstagramIcon';
export { InstagramIcon };
