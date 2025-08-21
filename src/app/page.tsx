'use client';

import { Title } from '@/src/app/components/title/title';
import { Photo } from '@/src/app/components/photo/photo';
import React, { useState } from 'react';
import { Links } from '@/src/app/components/links/links';
import { socialsLinks, travelLinks } from '@/src/app/data/links';
import { Role } from '@/src/app/components/role/role';
import { FaGlobeAsia } from 'react-icons/fa';
import { professionalFont, travelFont } from '@/src/app/styles/fonts';

export default function Home() {
    const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);

    const renderBackgrounds = () => {
        return (
            <>
                <div className={`absolute inset-0 w-1/2 bg-cyan-50 transition-transform duration-300 origin-left ${
                    hoverSide === 'left' ? 'scale-110 z-10' : 'scale-100'
                }`}></div>
                <div className={`absolute inset-0 left-1/2 w-1/2 bg-indigo-50 transition-transform duration-300 origin-right ${
                    hoverSide === 'right' ? 'scale-110 z-10' : 'scale-100'
                }`}></div>
            </>
        );
    }

    const renderHovers = () => {
        return (
            <>
                <div
                    className="absolute inset-0 w-1/2 z-20 cursor-code"
                    onMouseEnter={() => setHoverSide('left')}
                    onMouseLeave={() => setHoverSide(null)}
                />
                <div
                    className="absolute inset-0 left-1/2 w-1/2 z-20 cursor-plane"
                    onMouseEnter={() => setHoverSide('right')}
                    onMouseLeave={() => setHoverSide(null)}
                />
            </>
        );
    }

    const renderTitle = () => {
        return <div className="flex justify-center">
            <Title />
        </div>;
    }

    const renderPhoto = () => {
        return <div className="flex justify-center">
            <Photo />
        </div>;
    }

    const renderDevContent = () => {
        return <div className={`flex flex-col items-start gap-8 transition-all duration-300 ${
            hoverSide === 'left' ? 'scale-110' :
                hoverSide === 'right' ? 'opacity-20' : 'opacity-100'
        }`}>
            <Links items={socialsLinks} />
            <Role
                className={professionalFont.className}
                mainLeft="Frontend"
                mainRight="Developer"
                leftAdornmentText="<"
                rightAdornmentText="/>"
            />
        </div>;
    }

    const renderTravelContent = () => {
        return <div className={`flex flex-col items-end gap-8 transition-all duration-300 ${
            hoverSide === 'right' ? 'scale-110' :
                hoverSide === 'left' ? 'opacity-20' : 'opacity-100'
        }`}>
            <Links items={travelLinks} />
            <Role
                className={travelFont.className}
                mainLeft="Traveler"
                rightIconAdornment={FaGlobeAsia}
            />
        </div>;
    }

    const renderTop = () => {
        return <>
            {renderTitle()}
            {renderPhoto()}
        </>;
    }

    const renderBottom = () => {
        return <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">
            {renderDevContent()}
            {renderTravelContent()}
        </div>;
    }

    return (
        <div className="relative w-full min-h-screen">
            {renderBackgrounds()}
            {renderHovers()}
            <div className="relative z-10 flex flex-col justify-between gap-8 p-8 sm:p-20 min-h-screen">
                {renderTop()}
                {renderBottom()}
            </div>
        </div>
    );
}
