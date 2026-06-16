'use client';

import { Title } from '@/src/app/components/title/title';
import React from 'react';
import { Links } from '@/src/app/components/links/links';
import { socialsLinks, travelLinks } from '@/src/app/data/links';
import { Role } from '@/src/app/components/role/role';
import { FaGlobeAsia } from 'react-icons/fa';
import { professionalFont, travelFont } from '@/src/app/styles/fonts';
import { useSplitRatio } from '@/src/app/hooks/useSplitRatio';
import { useHoverSide } from '@/src/app/hooks/useHoverSide';
import { useCursor } from '@/src/app/hooks/useCursor';
import { ImagesGroup } from '@/src/app/components/images-group/images-group';
import { useMobileDetection } from '@/src/app/hooks/useMobileDetection';
import { CodeSnippets } from '@/src/app/components/code-snippets/code-snippets';
import { TravelObjects } from '@/src/app/components/travel-objects/travel-objects';

export default function Home() {
    const splitRatio = useSplitRatio();
    const hoverSide = useHoverSide(splitRatio);
    const cursor = useCursor(splitRatio);
    const isMobile = useMobileDetection();

    const getCursorClass = () => {
        return isMobile ? '' : cursor;
    };

    const getDevContentHoverClass = () => {
        if (isMobile) return 'opacity-100';
        return hoverSide === 'left'
            ? 'scale-110'
            : hoverSide === 'right'
              ? 'opacity-20'
              : 'opacity-100';
    };

    const getTravelContentHoverClass = () => {
        if (isMobile) return 'opacity-100';
        return hoverSide === 'right'
            ? 'scale-110'
            : hoverSide === 'left'
              ? 'opacity-20'
              : 'opacity-100';
    };

    const getFloatDevOpacity = () => {
        if (isMobile) return 1;
        if (hoverSide === 'left') return 1;
        if (hoverSide === 'right') return 0.3;
        return 1;
    };

    const getFloatTravelOpacity = () => {
        if (isMobile) return 1;
        if (hoverSide === 'right') return 1;
        if (hoverSide === 'left') return 0.3;
        return 1;
    };

    const getFloatDevScale = () => {
        if (isMobile || hoverSide !== 'left') return 1;
        return 1.04;
    };

    const getFloatTravelScale = () => {
        if (isMobile || hoverSide !== 'right') return 1;
        return 1.04;
    };

    const renderLeftBackground = () => {
        return (
            <div
                className={`absolute inset-0 origin-left ${
                    isMobile
                        ? 'scale-100'
                        : hoverSide === 'left'
                          ? 'scale-150'
                          : 'scale-100'
                }`}
                style={{
                    width: '100%',
                    background: `
        radial-gradient(ellipse 1300px 1300px at 0% 50%, rgba(107, 114, 128, 0.34) 0%, rgba(107, 114, 128, 0.22) 30%, rgba(107, 114, 128, 0.11) 52%, transparent 75%),
        radial-gradient(ellipse 1000px 1000px at 10% 30%, rgba(75, 85, 99, 0.24) 0%, rgba(75, 85, 99, 0.14) 35%, transparent 68%),
        radial-gradient(ellipse 1100px 1100px at 5% 70%, rgba(55, 65, 81, 0.20) 0%, rgba(55, 65, 81, 0.11) 32%, transparent 62%),
        linear-gradient(to right, rgba(249, 250, 251, 0.5) 0%, rgba(249, 250, 251, 0.25) 38%, transparent 68%)
    `,
                    maskImage:
                        'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 44%, rgba(0,0,0,0.7) 62%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 96%)',
                    WebkitMaskImage:
                        'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 44%, rgba(0,0,0,0.7) 62%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 96%)',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            />
        );
    };

    const renderRightBackground = () => {
        return (
            <div
                className={`absolute inset-0 origin-right ${
                    isMobile
                        ? 'scale-100'
                        : hoverSide === 'right'
                          ? 'scale-150'
                          : 'scale-100'
                }`}
                style={{
                    width: '100%',
                    background: `
                radial-gradient(ellipse 1300px 1300px at 100% 50%, rgba(217, 119, 6, 0.34) 0%, rgba(217, 119, 6, 0.22) 30%, rgba(217, 119, 6, 0.11) 52%, transparent 75%),
                radial-gradient(ellipse 1000px 1000px at 90% 30%, rgba(180, 83, 9, 0.24) 0%, rgba(180, 83, 9, 0.14) 35%, transparent 68%),
                radial-gradient(ellipse 1100px 1100px at 95% 70%, rgba(146, 64, 14, 0.20) 0%, rgba(146, 64, 14, 0.11) 32%, transparent 62%),
                linear-gradient(to left, rgba(255, 251, 235, 0.5) 0%, rgba(255, 251, 235, 0.25) 38%, transparent 68%)
            `,
                    maskImage:
                        'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 44%, rgba(0,0,0,0.7) 62%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 96%)',
                    WebkitMaskImage:
                        'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 44%, rgba(0,0,0,0.7) 62%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 96%)',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            />
        );
    };

    const renderFloatingLayers = () => {
        if (isMobile) return null;
        return (
            <>
                <div
                    style={{
                        opacity: getFloatDevOpacity(),
                        transform: `scale(${getFloatDevScale()})`,
                        transformOrigin: 'left center',
                        transition: 'opacity 0.4s cubic-bezier(0.4,0,0.2,1), transform 0.4s cubic-bezier(0.4,0,0.2,1)',
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: 'none',
                    }}
                >
                    <CodeSnippets />
                </div>
                <div
                    style={{
                        opacity: getFloatTravelOpacity(),
                        transform: `scale(${getFloatTravelScale()})`,
                        transformOrigin: 'right center',
                        transition: 'opacity 0.4s cubic-bezier(0.4,0,0.2,1), transform 0.4s cubic-bezier(0.4,0,0.2,1)',
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: 'none',
                    }}
                >
                    <TravelObjects />
                </div>
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

    const renderImagesGroup = () => {
        return (
            <div className="flex justify-center">
                <ImagesGroup />
            </div>
        );
    };

    const renderDevContent = () => {
        return (
            <div
                className={`flex flex-col items-start gap-8 transition-all duration-200 ${getDevContentHoverClass()}`}
            >
                <Links items={socialsLinks} textColor="text-zinc-700" hoverColor="#0d9488" delayStart={2.1} />
                <Role
                    className={professionalFont.className}
                    mainLeft="frontend"
                    mainRight="developer"
                    leftAdornmentText="<"
                    rightAdornmentText="/>"
                    textColor="text-zinc-800"
                    accentColor="text-teal-600"
                    typingDelayMs={1600}
                    typingSpeedMs={50}
                />
            </div>
        );
    };

    const renderTravelContent = () => {
        return (
            <div
                className={`flex flex-col items-end gap-8 transition-all duration-200 ${getTravelContentHoverClass()}`}
            >
                <Links
                    items={travelLinks}
                    textColor={'text-stone-700'}
                    hoverColor="#0d9488"
                    delayStart={2.9}
                />
                <Role
                    className={travelFont.className}
                    mainLeft="Traveler"
                    rightIconAdornment={FaGlobeAsia}
                    textColor="text-stone-800"
                    accentColor="text-teal-600"
                    typingDelayMs={2700}
                    typingSpeedMs={50}
                />
            </div>
        );
    };

    const renderTop = () => {
        return (
            <>
                {renderTitle()}
                {renderImagesGroup()}
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
            {renderLeftBackground()}
            {renderRightBackground()}
            {renderFloatingLayers()}
            <div className="relative flex flex-col justify-between gap-8 p-8 sm:p-20 min-h-screen" style={{ zIndex: 1 }}>
                {renderTop()}
                {renderBottom()}
            </div>
        </div>
    );
}
