'use client';

import { Title } from '@/src/app/components/title/title';
import { Photo } from '@/src/app/components/photo/photo';
import React, { useState, useEffect } from 'react';
import { Links } from '@/src/app/components/links/links';
import { socialsLinks, travelLinks } from '@/src/app/data/links';
import { Role } from '@/src/app/components/role/role';
import { FaGlobeAsia } from 'react-icons/fa';
import { professionalFont, travelFont } from '@/src/app/styles/fonts';

export default function Home() {
    const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const screenWidth = window.innerWidth;
            const cursorX = event.clientX;

            if (cursorX < screenWidth / 2) {
                setHoverSide('left');
            } else {
                setHoverSide('right');
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const getCursorClass = () => {
        return hoverSide === 'left'
            ? 'cursor-code'
            : hoverSide === 'right'
              ? 'cursor-plane'
              : '';
    };

    const getDevContentHoverClass = () => {
        return hoverSide === 'left'
            ? 'scale-110'
            : hoverSide === 'right'
              ? 'opacity-20'
              : 'opacity-100';
    };

    const getTravelContentHoverClass = () => {
        return hoverSide === 'right'
            ? 'scale-110'
            : hoverSide === 'left'
              ? 'opacity-20'
              : 'opacity-100';
    };

    const renderBackgrounds = () => {
        return (
            <>
                <div
                    className={`absolute inset-0 w-1/2 transition-transform duration-300 origin-left ${
                        hoverSide === 'left' ? 'scale-150' : 'scale-100'
                    }`}
                    style={{
                        background: `
                            linear-gradient(to right, rgba(107, 114, 128, 0.25) 0%, rgba(107, 114, 128, 0.15) 50%, transparent 100%),
                            linear-gradient(to right, rgba(75, 85, 99, 0.20) 20%, rgba(75, 85, 99, 0.10) 60%, transparent 100%),
                            linear-gradient(to right, rgba(55, 65, 81, 0.18) 10%, rgba(55, 65, 81, 0.08) 40%, transparent 80%),
                            linear-gradient(to right, rgba(249, 250, 251, 0.4) 0%, transparent 100%)
                        `,
                    }}
                ></div>
                <div
                    className={`absolute inset-0 left-1/2 w-1/2 transition-transform duration-300 origin-right ${
                        hoverSide === 'right' ? 'scale-150' : 'scale-100'
                    }`}
                    style={{
                        background: `
                            linear-gradient(to left, rgba(217, 119, 6, 0.25) 0%, rgba(217, 119, 6, 0.15) 50%, transparent 100%),
                            linear-gradient(to left, rgba(180, 83, 9, 0.20) 20%, rgba(180, 83, 9, 0.10) 60%, transparent 100%),
                            linear-gradient(to left, rgba(146, 64, 14, 0.18) 10%, rgba(146, 64, 14, 0.08) 40%, transparent 80%),
                            linear-gradient(to left, rgba(255, 251, 235, 0.4) 0%, transparent 100%)
                        `,
                    }}
                ></div>
            </>
        );
    };

    const renderTitle = () => {
        return (
            <div className="flex justify-center">
                <Title />
            </div>
        );
    };

    const renderPhoto = () => {
        return (
            <div className="flex justify-center">
                <Photo />
            </div>
        );
    };

    const renderDevContent = () => {
        return (
            <div
                className={`flex flex-col items-start gap-8 transition-all duration-300 ${getDevContentHoverClass()}`}
            >
                <Links items={socialsLinks} />
                <Role
                    className={professionalFont.className}
                    mainLeft="frontend"
                    mainRight="developer"
                    leftAdornmentText="<"
                    rightAdornmentText="/>"
                />
            </div>
        );
    };

    const renderTravelContent = () => {
        return (
            <div
                className={`flex flex-col items-end gap-8 transition-all duration-300 ${getTravelContentHoverClass()}`}
            >
                <Links items={travelLinks} textColor="text-neutral-600" />
                <Role
                    className={travelFont.className}
                    mainLeft="Traveler"
                    rightIconAdornment={FaGlobeAsia}
                    textColor="text-neutral-600"
                />
            </div>
        );
    };

    const renderTop = () => {
        return (
            <>
                {renderTitle()}
                {renderPhoto()}
            </>
        );
    };

    const renderBottom = () => {
        return (
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">
                {renderDevContent()}
                {renderTravelContent()}
            </div>
        );
    };

    return (
        <div
            className={`relative w-full min-h-screen overflow-hidden ${getCursorClass()}`}
        >
            {renderBackgrounds()}
            <div className="relative flex flex-col justify-between gap-8 p-8 sm:p-20 min-h-screen">
                {renderTop()}
                {renderBottom()}
            </div>
        </div>
    );
}
