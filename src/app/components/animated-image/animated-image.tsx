'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export interface AnimatedImageProps {
    src: string;
    alt: string;
    position?: {
        left?: string;
        right?: string;
        bottom?: string;
        top?: string;
    };
    size?: {
        width: string;
        height: string;
    };
    imageSize: {
        width: number;
        height: number;
    };
    rotate?: string;
    animation?: {
        x?: number;
        width?: string;
    } | Record<string, string | number>;
    className?: string;
    style?: React.CSSProperties;
    containerClassName?: string;
    priority?: boolean;
    quality?: number;
}

export const AnimatedImage: React.FC<AnimatedImageProps> = ({
    src,
    alt,
    position,
    size,
    imageSize,
    rotate,
    animation,
    className = "w-full h-full object-contain",
    style,
    containerClassName = "absolute",
    priority,
    quality
}) => (
    <motion.div
        className={containerClassName}
        style={{
            ...position,
            ...(size && { width: size.width, height: size.height }),
            rotate,
            ...style
        }}
        animate={animation}
    >
        <Image
            src={src}
            alt={alt}
            width={imageSize.width}
            height={imageSize.height}
            className={className}
            priority={priority}
            quality={quality}
        />
    </motion.div>
);
