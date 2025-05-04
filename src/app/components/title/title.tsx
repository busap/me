"use client";

import {motion, useMotionValue, useSpring, useTransform} from "framer-motion";
import React, {useRef} from "react";

export const Title = () => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x);
    const springY = useSpring(y);

    const background = useTransform(
        [springX, springY],
        ([latestX, latestY]) =>
            `radial-gradient(
                150px circle at ${latestX}px ${latestY}px,
                oklch(60.9% 0.126 221.723),
                oklch(70.4% 0.14 182.503),
                transparent 80%
            )`
    )

    const handleNameMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (ref.current === null) return;
        const bounds = ref.current.getBoundingClientRect();
        x.set(e.clientX - bounds.left);
        y.set(e.clientY - bounds.top);
    }

    const renderName = () => {
        return <motion.div
            ref={ref}
            onMouseMove={handleNameMouseMove}
            className={"relative"}
            transition={{ type: "spring", damping: 40 }}
        >
            <motion.h1
                className={"text-3xl sm:text-7xl font-bold text-slate-600 leading-normal"}
                initial={{opacity: 0, y: -30, x: -30, scale: 0.7}}
                whileInView={{opacity: 1, y: 0, x: 0, scale: 1}}
                transition={{duration: 0.3}}
            >
                PAVEL BUŠINA
            </motion.h1>
            <motion.h1
                className={"text-3xl sm:text-7xl font-bold absolute top-0 left-0 text-transparent bg-clip-text leading-normal"}
                style={{
                    backgroundImage: background
                }}
                initial={{opacity: 0, y: -30, x: -30, scale: 0.7}}
                whileInView={{opacity: 1, y: 0, x: 0, scale: 1}}
                transition={{duration: 0.3, ease: 'easeInOut'}}
            >
                PAVEL BUŠINA
            </motion.h1>
        </motion.div>;
    }

    const renderFrontend = () => {
        return <motion.span
            className={"bg-gradient-to-r from-zinc-400 to-slate-900 bg-clip-text text-transparent"}
            initial={{opacity: 0, y: -20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.3, delay: 0.3}}
        >
            {`Frontend `}
        </motion.span>
    }

    const renderDeveloper = () => {
        return <motion.span
            className={"bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent"}
            initial={{opacity: 0, y: -20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.3, delay: 0.5}}
        >
            {` Developer`}
        </motion.span>
    }

    const renderColoredText = (text: string, delay: number) => {
        return <motion.span
            className={"text-teal-600 font-bold"}
            initial={{x: 20, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            transition={{duration: 0.2, delay}}
        >
            {text}
        </motion.span>;
    }

    return <div className={"flex flex-col items-center gap-y-2"}>
        {renderName()}
        <div className={"flex justify-center text-2xl sm:text-4xl whitespace-break-spaces flex-wrap"}>
            <div className={"flex justify-center"}>
                {renderColoredText("<", 0.8)}
                {renderFrontend()}
                {renderColoredText("/>", 1)}
            </div>
            {renderDeveloper()}
        </div>
    </div>;
}