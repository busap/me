'use client';

import React, { useEffect, useMemo, useState } from 'react';
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
    typingDelayMs?: number;
    typingSpeedMs?: number;
};

export const Role = (props: RoleProps) => {
    const {
        mainLeft = '',
        mainRight = '',
        leftAdornmentText,
        rightAdornmentText,
        rightIconAdornment,
        className,
        textColor = 'text-slate-600',
        typingDelayMs = 1500,
        typingSpeedMs = 50,
    } = props;
    const wrapperBaseCls =
        'flex justify-center text-2xl sm:text-4xl whitespace-break-spaces flex-wrap gap-2';
    const textCls = `text-lg sm:text-xl lg:text-3xl font-extrabold tracking-wide text-shadow-xs ${textColor}`;
    const coloredCls =
        'text-lg sm:text-xl lg:text-3xl text-teal-600 font-bold tracking-wide';
    const wrapperCls = `${wrapperBaseCls} ${className ? className : ''}`;
    const [typedText, setTypedText] = useState<string>('');
    const [hasStartedTyping, setHasStartedTyping] = useState<boolean>(false);
    const [hasFinishedTyping, setHasFinishedTyping] = useState<boolean>(false);
    const targetText = useMemo(() => {
        const parts: string[] = [];
        if (mainLeft) parts.push(mainLeft);
        if (mainRight) parts.push(mainRight);
        return parts.join(' ');
    }, [mainLeft, mainRight]);

    useEffect(() => {
        let typingTimer: number | undefined;

        const startTimer = window.setTimeout(
            () => {
                setHasStartedTyping(true);
                let index = 0;
                typingTimer = window.setInterval(
                    () => {
                        index += 1;
                        setTypedText(targetText.slice(0, index));
                        if (index >= targetText.length) {
                            window.clearInterval(typingTimer);
                            setHasFinishedTyping(true);
                        }
                    },
                    Math.max(typingSpeedMs, 10)
                );
            },
            Math.max(typingDelayMs, 0)
        );

        return () => {
            if (startTimer) window.clearTimeout(startTimer);
            if (typingTimer) window.clearInterval(typingTimer);
        };
    }, [targetText, typingDelayMs, typingSpeedMs]);

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
                initial={{ x: 20, y: -20, opacity: 0 }}
                whileInView={{ x: 0, y: 0, opacity: 1 }}
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
                    ? renderColoredText(leftAdornmentText, 1.2)
                    : null}
                <span className={textCls}>
                    {typedText}
                    {!hasFinishedTyping && hasStartedTyping ? (
                        <span className="inline-block w-[0.6ch]">|</span>
                    ) : null}
                </span>
                {rightAdornmentText
                    ? renderColoredText(rightAdornmentText, 1.3)
                    : null}
            </div>
            <div className={'flex justify-center items-start'}>
                {rightIconAdornment && hasFinishedTyping
                    ? renderRightIconAdornment(0.1)
                    : null}
            </div>
        </div>
    );
};
