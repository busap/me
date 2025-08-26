'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSplitRatio } from '@/src/app/hooks/useSplitRatio';
import { useHoverSide } from '@/src/app/hooks/useHoverSide';
import {AnimatedImage} from "@/src/app/components/animated-image/animated-image";

export const ImagesGroup = () => {
    const splitRatio = useSplitRatio(0.4, 0.6);
    const hoverSide = useHoverSide(splitRatio);
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
    const horizontalOffset = (splitRatio - 0.5) * 20;

    const getLeftPictureOpacity = () => {
        return hoverSide === 'left' ? 1 : hoverSide === 'right' ? 0.2 : 0.9;
    };

    const getRightPictureOpacity = () => {
        return hoverSide === 'right' ? 1 : hoverSide === 'left' ? 0.2 : 0.9;
    };

    const renderClickUpImage = () => (
        <AnimatedImage
            src="/clickup.png"
            alt="ClickUp"
            position={{
                left: '-90px',
                bottom: '-30px'
            }}
            size={{
                width: '200px',
                height: '200px'
            }}
            imageSize={{
                width: 200,
                height: 200
            }}
            opacity={getLeftPictureOpacity()}
            animation={{
                x: -(leftWidthPercent - 50) * 0.2
            }}
        />
    );

    const renderMacImage = () => (
        <AnimatedImage
            src="/macc.png"
            alt="Mac"
            position={{
                left: '-30px',
                bottom: '-30px'
            }}
            size={{
                width: '100px',
                height: '100px'
            }}
            imageSize={{
                width: 100,
                height: 100
            }}
            rotate="-20deg"
            opacity={getLeftPictureOpacity()}
            animation={{
                x: -(leftWidthPercent - 50) * 0.15
            }}
        />
    );

    const renderBoardingPassImage = () => (
        <AnimatedImage
            src="/boarding-pass.png"
            alt="Boarding Pass"
            position={{
                right: '-80px',
                bottom: '50px'
            }}
            size={{
                width: '200px',
                height: '200px'
            }}
            imageSize={{
                width: 90,
                height: 60
            }}
            rotate="120deg"
            opacity={getRightPictureOpacity()}
            animation={{
                x: rightWidthPercent * 0.2
            }}
        />
    );

    const renderProfilePictures = () => (
        <div className="absolute inset-0 flex z-10">
            <AnimatedImage
                src="/me-dev.png"
                alt="Profile Left"
                imageSize={{
                    width: 256,
                    height: 256
                }}
                containerClassName=""
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
                    width: 256,
                    height: 256
                }}
                containerClassName=""
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
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full shadow-xl"
        >
            {renderClickUpImage()}
            {renderMacImage()}
            {renderBoardingPassImage()}
            {renderProfilePictures()}
        </motion.div>
    );
};
