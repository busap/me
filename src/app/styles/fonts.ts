import { Aboreto, JetBrains_Mono, Oswald } from 'next/font/google';

export const titleFont = Oswald({
    subsets: ['latin'],
    weight: ['700'],
    display: 'swap',
});

export const professionalFont = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['600', '700', '800'],
    display: 'swap',
});

export const travelFont = Aboreto({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',
});
