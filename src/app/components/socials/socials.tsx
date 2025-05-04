"use client";

import {FaEnvelope, FaGithub, FaLinkedin} from "react-icons/fa";
import {ReactNode} from "react";
import {motion} from "framer-motion";
import {useViewportWidth} from "@/src/app/hooks/viewport";

export const Socials = () => {
    const {screenWidth} = useViewportWidth();

    const renderLink = (icon: ReactNode, link: string, delay: number) => {
        return <motion.a
            href={link}
            target={"_blank"}
            className={"transition transform duration-300 hover:scale-125 hover:text-teal-600"}
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 0.3, delay: delay}}
        >
            {icon}
        </motion.a>
    }

    return <div className={"flex gap-x-8 text-4xl"}>
        {renderLink(<FaEnvelope size={screenWidth > 640 ? 36 : 24} />, "mailto:businapavel@gmail.com", 1.6)}
        {renderLink(<FaLinkedin size={screenWidth > 640 ? 36 : 24} />, "https://www.linkedin.com/in/pavel-busina-481240159", 1.8)}
        {renderLink(<FaGithub size={screenWidth > 640 ? 36 : 24} />, "https://github.com/busap", 2)}
    </div>;
}