import {FaInstagram} from "react-icons/fa";
import {ReactNode} from "react";
import {WorldeeLogo} from "@/src/app/components/travel-links/worldeeLogo";
import {useViewportWidth} from "@/src/app/hooks/viewport";

export const TravelLinks = () => {
    const {screenWidth} = useViewportWidth();

    const renderLink = (icon: ReactNode, link: string) => {
        return <a
            href={link}
            target={"_blank"}
            className={"transition transform duration-300 hover:scale-125 hover:text-teal-600"}
        >
            {icon}
        </a>;
    }

    return <div className={"flex gap-x-8 text-4xl"}>
        {renderLink(<WorldeeLogo size={screenWidth > 640 ? 36 : 24} />, "https://www.worldee.com/busa")}
        {renderLink(<FaInstagram size={screenWidth > 640 ? 36 : 24} />, "https://www.instagram.com/businapavel/")}
    </div>;
}