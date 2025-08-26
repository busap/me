'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSplitRatio } from '@/src/app/hooks/useSplitRatio';
import {AnimatedImage} from "@/src/app/components/animated-image/animated-image";

export const ImagesGroup = () => {
    const splitRatio = useSplitRatio(0.4, 0.6);
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

    const getLeftPictureFilter = () => {
        return leftWidthPercent < 50
            ? `saturate(${(leftWidthPercent / 50) * 0.8}) opacity(${(leftWidthPercent / 50) * 0.9 + 0.1})`
            : `none`;
    };

    const getRightPictureFilter = () => {
        return rightWidthPercent < 50
            ? `saturate(${(rightWidthPercent / 50) * 0.8}) opacity(${(rightWidthPercent / 50) * 0.9 + 0.1})`
            : `none`;
    };

    const renderClickUpImage = () => (
        <AnimatedImage
            src="/clickup.png"
            alt="ClickUp"
            position={{
                left: '-100px',
                bottom: '-34px'
            }}
            size={{
                width: '220px',
                height: '220px'
            }}
            imageSize={{
                width: 220,
                height: 220
            }}
            style={{ filter: getLeftPictureFilter() }}
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
                left: '-34px',
                bottom: '-34px'
            }}
            size={{
                width: '115px',
                height: '115px'
            }}
            imageSize={{
                width: 115,
                height: 115
            }}
            rotate="-20deg"
            style={{ filter: getLeftPictureFilter() }}
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
                right: '-90px',
                bottom: '60px'
            }}
            size={{
                width: '230px',
                height: '230px'
            }}
            imageSize={{
                width: 100,
                height: 70
            }}
            rotate="120deg"
            style={{ filter: getRightPictureFilter() }}
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
                    width: 294,
                    height: 294
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
                    width: 294,
                    height: 294
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
            className="relative w-46 h-46 sm:w-60 sm:h-60 rounded-full shadow-xl"
        >
            {renderClickUpImage()}
            {renderMacImage()}
            {renderBoardingPassImage()}
            {renderProfilePictures()}
        </motion.div>
    );
};
