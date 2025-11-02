import { Aboreto, JetBrains_Mono, Goldman } from 'next/font/google';

export const titleFont = Goldman({
    subsets: ['latin'],
    weight: ['400', '700'],
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
