import { WorldeeLogo } from '@/src/app/components/logo/worldeeLogo';
import { MailsIcon } from '@/src/app/components/icon/mail-icon';
import { InstagramIcon } from '@/src/app/components/icon/instagram-icon';
import { LinkedInIcon } from '@/src/app/components/icon/linkedin-icon';
import { GithubIcon } from '@/src/app/components/icon/github-icon';
import { GlobeIcon } from '@/src/app/components/icon/globe-icon';
import type { LinkItem } from '@/src/app/components/links/links';

export const socialsLinks: LinkItem[] = [
    {
        href: 'mailto:businapavel@gmail.com',
        Icon: MailsIcon,
        target: '_self',
    },
    {
        href: 'https://www.linkedin.com/in/businapavel',
        Icon: LinkedInIcon,
    },
    {
        href: 'https://github.com/busap',
        Icon: GithubIcon,
    },
];

export const travelLinks: LinkItem[] = [
    {
        href: 'https://www.worldee.com/busa',
        Icon: WorldeeLogo,
    },
    {
        href: 'https://www.instagram.com/businapavel/',
        Icon: InstagramIcon,
    },
    {
        href: 'https://travelthemes.vercel.app',
        Icon: GlobeIcon,
    },
];
