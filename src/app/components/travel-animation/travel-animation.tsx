"use client";

import React from "react";
import {motion, Transition} from "framer-motion";
import { FaPlane } from "react-icons/fa";
import {useViewportWidth} from "@/src/app/hooks/viewport";

export const TravelAnimation = () => {
    const {screenWidth} = useViewportWidth();
    const path = "M0 33.5C0 33.5 71.4428 137.971 163.721 141.736C256 145.5 285.5 290.5 285.5 290.5";
    const transition: Transition = {
        duration: 1.5,
        delay: 2.5,
        ease: "easeInOut"
    }

    const renderPath = () => {
        return <motion.svg
            width="300" height={"300"} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path
                d={path}
                stroke={"lightgray"}
                strokeWidth={"1"}
                strokeDasharray={"4 4"}
                initial={{pathLength: 0}}
                animate={{pathLength: 1}}
                transition={transition}
            />
        </motion.svg>;
    }

    const renderPlane = () => {
        return <motion.div
            className="absolute"
            style={{
                left: 0,
                top: 0,
                offsetPath: `path("${path}")`,
            }}
            initial={{offsetDistance: "0%"}}
            animate={{offsetDistance: screenWidth > 640 ? "95%" : "80%"}}
            transition={transition}
        >
            <FaPlane className="w-[30px] h-[30px] text-teal-600"/>
        </motion.div>;
    }

    return (
        <div className="relative w-[300px] h-[240px] sm:h-[320px]">
            {renderPath()}
            {renderPlane()}
        </div>
    );
};