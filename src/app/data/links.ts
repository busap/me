import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { WorldeeLogo } from '@/src/app/components/logo/worldeeLogo';
import type { LinkItem } from '@/src/app/components/links/links';

export const socialsLinks: LinkItem[] = [
    {
        href: 'mailto:businapavel@gmail.com',
        Icon: FaEnvelope,
        target: '_self',
    },
    {
        href: 'https://www.linkedin.com/in/businapavel',
        Icon: FaLinkedin,
    },
    {
        href: 'https://github.com/busap',
        Icon: FaGithub,
    },
];

export const travelLinks: LinkItem[] = [
    {
        href: 'https://www.worldee.com/busa',
        Icon: WorldeeLogo,
    },
    {
        href: 'https://www.instagram.com/businapavel/',
        Icon: FaInstagram,
    },
];
