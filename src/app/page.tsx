'use client';

import { Title } from '@/src/app/components/title/title';
import { Photo } from '@/src/app/components/photo/photo';
import React from 'react';
import { Links } from '@/src/app/components/links/links';
import { socialsLinks, travelLinks } from '@/src/app/data/links';
import { Role } from '@/src/app/components/role/role';
import { FaGlobeAsia } from 'react-icons/fa';
import { professionalFont, travelFont } from '@/src/app/styles/fonts';

export default function Home() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-between gap-8 p-8 sm:p-20">
            <div className="flex justify-center">
                <Title />
            </div>

            <div className="flex justify-center">
                <Photo />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">
                <div className="flex flex-col items-start gap-8">
                    <Links items={socialsLinks} />
                    <Role
                        className={professionalFont.className}
                        mainLeft="Frontend"
                        mainRight="Developer"
                        leftAdornmentText="<"
                        rightAdornmentText="/>"
                    />
                </div>

                <div className="flex flex-col items-end gap-8">
                    <Links items={travelLinks} />
                    <Role
                        className={travelFont.className}
                        mainLeft="Traveler"
                        rightIconAdornment={FaGlobeAsia}
                    />
                </div>
            </div>
        </div>
    );
}
