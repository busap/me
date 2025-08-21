'use client';

import React from 'react';
import Image from 'next/image';

export const Photo = () => {
    return (
        <Image
            src="/me.png"
            alt="Profile"
            width={256}
            height={256}
            priority
            className="w-40 h-40 sm:w-64 sm:h-64 object-cover rounded-full shadow-xl"
        />
    );
};
