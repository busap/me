'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type RoleProps = {
    mainLeft?: string;
    mainRight?: string;
    leftAdornmentText?: string;
    rightAdornmentText?: string;
    rightIconAdornment?: React.ComponentType<{
        size?: number;
        className?: string;
    }>;
    className?: string;
    textColor?: string;
};

export const Role: React.FC<RoleProps> = ({
    mainLeft = '',
    mainRight = '',
    leftAdornmentText,
    rightAdornmentText,
    rightIconAdornment,
    className,
    textColor = 'text-slate-600'
}) => {
    const wrapperBaseCls =
        'flex justify-center text-2xl sm:text-4xl whitespace-break-spaces flex-wrap gap-2';
    const textCls =
        `text-xl sm:text-3xl font-extrabold tracking-wide ${textColor}`;
    const coloredCls = 'text-xl sm:text-3xl text-teal-600 font-bold tracking-wide';
    const wrapperCls = `${wrapperBaseCls} ${className ? className : ''}`;

    const renderMainLeft = () =>
        mainLeft ? (
            <motion.span
                className={textCls}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
                {mainLeft}
            </motion.span>
        ) : null;

    const renderMainRight = () =>
        mainRight ? (
            <motion.span
                className={textCls}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
            >
                {mainRight}
            </motion.span>
        ) : null;

    const renderColoredText = (text: string, delay: number) => (
        <motion.span
            className={coloredCls}
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay }}
        >
            {text}
        </motion.span>
    );

    const renderRightIconAdornment = (delay: number) => {
        if (!rightIconAdornment) return null;
        const Icon = rightIconAdornment;
        return (
            <motion.span
                className={coloredCls}
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2, delay }}
            >
                <Icon size={20} className="align-middle" />
            </motion.span>
        );
    };

    return (
        <div className={wrapperCls}>
            <div className={'flex justify-center items-center gap-2'}>
                {leftAdornmentText
                    ? renderColoredText(leftAdornmentText, 0.8)
                    : null}
                {renderMainLeft()}
                {rightAdornmentText
                    ? renderColoredText(rightAdornmentText, 0.8)
                    : null}
            </div>
            <div className={'flex justify-center items-start'}>
                {renderMainRight()}
                {rightIconAdornment && renderRightIconAdornment(1.0)}
            </div>
        </div>
    );
};
