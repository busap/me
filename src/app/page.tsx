'use client';

import { Title } from '@/src/app/components/title/title';
import React, { useEffect, useState } from 'react';
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
import Image from 'next/image';

export default function Home() {
    const splitRatio = useSplitRatio();
    const hoverSide = useHoverSide(splitRatio);
    const cursor = useCursor(splitRatio);
    const isMobile = useMobileDetection();
    const [bgVisible, setBgVisible] = useState(false);
    const opacityDelayMs = 500;

    useEffect(() => {
        const t = setTimeout(() => setBgVisible(true), opacityDelayMs);
        return () => clearTimeout(t);
    }, []);

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

    const getBgTransform = () => {
        if (isMobile) return { scale: 1, rotation: 0 };
        if (hoverSide === 'left') return { scale: 1.08, rotation: 1.5 };
        if (hoverSide === 'right') return { scale: 1.08, rotation: -1.5 };
        return { scale: 1, rotation: 0 };
    };

    const renderCodeBackground = () => {
        const isHovered = !isMobile && hoverSide === 'left';
        const isOtherHovered = !isMobile && hoverSide === 'right';
        const baseOpacity = isMobile
            ? 0.2
            : isHovered
              ? 0.35
              : isOtherHovered
                ? 0.08
                : 0.2;
        const { scale, rotation } = getBgTransform();

        const maskEnd = isMobile ? '100%' : isHovered ? '80%' : isOtherHovered ? '35%' : '55%';
        const maskFade = isMobile ? '100%' : isHovered ? '95%' : isOtherHovered ? '50%' : '70%';

        return (
            <div
                className="absolute inset-0"
                style={{
                    opacity: bgVisible ? baseOpacity : 0,
                    transition:
                        'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), mask-image 0.5s cubic-bezier(0.4, 0, 0.2, 1), -webkit-mask-image 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: bgVisible && baseOpacity > 0 ? `${opacityDelayMs}ms` : '0ms',
                    maskImage:
                        `linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${maskEnd}, rgba(0,0,0,0.3) ${maskFade}, rgba(0,0,0,0) 100%)`,
                    WebkitMaskImage:
                        `linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${maskEnd}, rgba(0,0,0,0.3) ${maskFade}, rgba(0,0,0,0) 100%)`,
                }}
            >
                <Image
                    src="/bg-dev.png"
                    alt=""
                    fill
                    className="object-cover object-center"
                    style={{
                        transform: `scale(${scale}) rotate(${rotation}deg)`,
                        transformOrigin: 'center center',
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    priority
                />
            </div>
        );
    };

    const renderTravelBackground = () => {
        const isHovered = !isMobile && hoverSide === 'right';
        const isOtherHovered = !isMobile && hoverSide === 'left';
        const baseOpacity = isMobile
            ? 0.2
            : isHovered
              ? 0.35
              : isOtherHovered
                ? 0.08
                : 0.2;
        const { scale, rotation } = getBgTransform();

        const maskEnd = isMobile ? '100%' : isHovered ? '80%' : isOtherHovered ? '35%' : '55%';
        const maskFade = isMobile ? '100%' : isHovered ? '95%' : isOtherHovered ? '50%' : '70%';

        return (
            <div
                className="absolute inset-0"
                style={{
                    opacity: bgVisible ? baseOpacity : 0,
                    transition:
                        'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), mask-image 0.5s cubic-bezier(0.4, 0, 0.2, 1), -webkit-mask-image 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: bgVisible && baseOpacity > 0 ? `${opacityDelayMs}ms` : '0ms',
                    maskImage:
                        `linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${maskEnd}, rgba(0,0,0,0.3) ${maskFade}, rgba(0,0,0,0) 100%)`,
                    WebkitMaskImage:
                        `linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${maskEnd}, rgba(0,0,0,0.3) ${maskFade}, rgba(0,0,0,0) 100%)`,
                }}
            >
                <Image
                    src="/bg-travel.png"
                    alt=""
                    fill
                    className="object-cover object-center"
                    style={{
                        transform: `scale(${scale}) rotate(${rotation}deg)`,
                        transformOrigin: 'center center',
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    priority
                />
            </div>
        );
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
        radial-gradient(ellipse 1000px 1200px at 0% 50%, rgba(107, 114, 128, 0.22) 0%, rgba(107, 114, 128, 0.14) 25%, rgba(107, 114, 128, 0.08) 40%, transparent 60%),
        radial-gradient(ellipse 800px 900px at 10% 30%, rgba(75, 85, 99, 0.16) 0%, rgba(75, 85, 99, 0.10) 30%, transparent 55%),
        radial-gradient(ellipse 900px 1000px at 5% 70%, rgba(55, 65, 81, 0.14) 0%, rgba(55, 65, 81, 0.08) 25%, transparent 50%),
        linear-gradient(to right, rgba(249, 250, 251, 0.4) 0%, rgba(249, 250, 251, 0.2) 30%, transparent 60%)
    `,
                    maskImage:
                        'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 85%)',
                    WebkitMaskImage:
                        'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 85%)',
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
                radial-gradient(ellipse 1000px 1200px at 100% 50%, rgba(217, 119, 6, 0.22) 0%, rgba(217, 119, 6, 0.14) 25%, rgba(217, 119, 6, 0.08) 40%, transparent 60%),
                radial-gradient(ellipse 800px 900px at 90% 30%, rgba(180, 83, 9, 0.16) 0%, rgba(180, 83, 9, 0.10) 30%, transparent 55%),
                radial-gradient(ellipse 900px 1000px at 95% 70%, rgba(146, 64, 14, 0.14) 0%, rgba(146, 64, 14, 0.08) 25%, transparent 50%),
                linear-gradient(to left, rgba(255, 251, 235, 0.4) 0%, rgba(255, 251, 235, 0.2) 30%, transparent 60%)
            `,
                    maskImage:
                        'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 85%)',
                    WebkitMaskImage:
                        'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 85%)',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            />
        );
    };

    const renderBackgrounds = () => {
        return (
            <>
                {renderLeftBackground()}
                {renderRightBackground()}
                {renderCodeBackground()}
                {renderTravelBackground()}
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
                <Links items={socialsLinks} textColor="text-slate-800" delayStart={2.6} />
                <Role
                    className={professionalFont.className}
                    mainLeft="frontend"
                    mainRight="developer"
                    leftAdornmentText="<"
                    rightAdornmentText="/>"
                    textColor="text-slate-800"
                    typingDelayMs={2100}
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
                    textColor={'text-neutral-800'}
                    delayStart={3.4}
                />
                <Role
                    className={travelFont.className}
                    mainLeft="Traveler"
                    rightIconAdornment={FaGlobeAsia}
                    textColor="text-neutral-800"
                    typingDelayMs={3200}
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
            {renderBackgrounds()}
            <div className="relative flex flex-col justify-between gap-8 p-8 sm:p-20 min-h-screen">
                {renderTop()}
                {renderBottom()}
            </div>
        </div>
    );
}
