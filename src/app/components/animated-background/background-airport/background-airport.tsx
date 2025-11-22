import React from 'react';
import type { CSSProperties } from 'react';
import travel from "./travel.gif";

export const BackgroundAirport: React.FC<{
    containerStyle?: CSSProperties;
}> = ({ containerStyle }) => {
    return (
        <div
            className={
                'relative w-full h-full overflow-hidden bg-black opacity-[60%]'
            }
        >
            <div
                className={
                    'flex w-full h-full transition-transform duration-800 opacity-[50%]'
                }
                style={containerStyle}
            >
                <img src={travel.src} alt="airport" className="airport" />
            </div>
        </div>
    );
};
