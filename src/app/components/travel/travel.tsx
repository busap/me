"use client";

import React from "react";
import {motion} from "framer-motion";
import {FaGlobeAsia} from "react-icons/fa";
import {TravelAnimation} from "@/src/app/components/travel-animation/travel-animation";
import {TravelLinks} from "@/src/app/components/travel-links/travel-links";

export const Travel = () => {
    return <motion.div
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{duration: 0.3, delay: 2.5}}
    >
        <div className={"absolute bottom-0 left-0"}>
            <TravelAnimation/>
        </div>
        <motion.div
            className={"relative flex flex-col gap-y-4 self-start z-10"}
            initial={{opacity: 0, scale: 0.5}}
            whileInView={{opacity: 1, scale: 1}}
            transition={{duration: 0.5, delay: 3.5}}
        >
            <TravelLinks/>
            <div className={"flex gap-x-2 items-center text-teal-600 text-sm font-bold"}>
                Sometimes I travel!<FaGlobeAsia/>
            </div>
        </motion.div>
    </motion.div>
};