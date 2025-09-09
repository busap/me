'use client';

import React from 'react';
import { LinkIcon } from '@/src/app/components/link/link';
import {useMobileDetection} from "@/src/app/hooks/useMobileDetection";

export type LinkItem = {
    href: string;
    Icon: React.ComponentType<{ size?: number }>;
    target?: string;
};

export type LinksProps = {
    items: LinkItem[];
    textColor?: string;
};

export const Links: React.FC<LinksProps> = ({ items, textColor }) => {
    const isMobile = useMobileDetection();
    const size = isMobile ? 24 : 48;
    const delayStart = 1.3;
    const delayStep = 0.1;

    return (
        <div className={'flex gap-x-8 text-4xl'}>
            {items.map((item, index) => {
                const { Icon } = item;
                const delay = delayStart + index * delayStep;
                return (
                    <LinkIcon
                        key={`${item.href}-${index}`}
                        href={item.href}
                        delay={delay}
                        target={item.target}
                        textColor={textColor}
                    >
                        <Icon size={size} />
                    </LinkIcon>
                );
            })}
        </div>
    );
};
