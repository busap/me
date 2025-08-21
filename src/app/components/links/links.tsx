'use client';

import React from 'react';
import { useViewportWidth } from '@/src/app/hooks/viewport';
import { LinkIcon } from '@/src/app/components/link/link';

export type LinkItem = {
    href: string;
    Icon: React.ComponentType<{ size?: number }>;
    target?: string;
    rel?: string;
    className?: string;
};

export type LinksProps = {
    items: LinkItem[];
    textColor?: string;
};

export const Links: React.FC<LinksProps> = ({ items, textColor }) => {
    const { screenWidth } = useViewportWidth();
    const size = screenWidth > 640 ? 48 : 24;
    const delayStart = 1.6;
    const delayStep = 0.2;

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
