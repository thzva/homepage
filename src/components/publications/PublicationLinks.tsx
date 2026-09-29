'use client';

import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';

const linkButtonClassName = "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-accent hover:text-white transition-colors";

// Paper / Code / Project / Dataset / DOI buttons, shown only for the links a publication has
export default function PublicationLinks({ pub }: { pub: Publication }) {
    const messages = useMessages();
    const links = [
        { href: pub.url, label: messages.publications.paper },
        { href: pub.code, label: messages.publications.code },
        { href: pub.project, label: messages.publications.project },
        { href: pub.dataset, label: messages.publications.dataset },
        { href: pub.doi && `https://doi.org/${pub.doi}`, label: 'DOI' },
    ].filter(link => link.href);

    return (
        <>
            {links.map(link => (
                <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkButtonClassName}
                >
                    {link.label}
                </a>
            ))}
        </>
    );
}
