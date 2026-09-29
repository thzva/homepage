'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { Publication } from '@/types/publication';
import { cn } from '@/lib/utils';
import { useMessages } from '@/lib/i18n/useMessages';
import PublicationLinks from './PublicationLinks';

interface PublicationCardProps {
    pub: Publication;
    index: number;
    embedded?: boolean;
}

// Publication card shared by the Publications page and the homepage's Selected Publications
export default function PublicationCard({ pub, index, embedded = false }: PublicationCardProps) {
    const messages = useMessages();
    const [abstractExpanded, setAbstractExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-all duration-200"
        >
            <div className="flex flex-col md:flex-row gap-6">
                {pub.preview && (
                    <div className="w-full md:w-48 flex-shrink-0">
                        <div className="aspect-video md:aspect-[4/3] relative rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                            <Image
                                src={`/papers/${pub.preview}`}
                                alt={pub.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </div>
                )}
                <div className="flex-grow">
                    <h3 className={`${embedded ? "text-lg" : "text-xl"} font-semibold text-primary mb-2 leading-tight`}>
                        {pub.url ? (
                            <a href={pub.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                                {pub.title}
                            </a>
                        ) : pub.title}
                    </h3>
                    <p className={`${embedded ? "text-sm" : "text-base"} text-neutral-600 dark:text-neutral-400 mb-2`}>
                        {pub.authors.map((author, idx) => (
                            <span key={idx}>
                                <span className={`${author.isHighlighted ? 'font-semibold text-accent' : ''} ${''}`}>
                                    {author.name}
                                </span>
                                {author.isCoAuthor && (
                                    <sup className={`ml-0 ${author.isHighlighted ? 'text-accent' : 'text-neutral-600 dark:text-neutral-400'}`}>*</sup>
                                )}
                                {author.isCorresponding && (
                                    <sup className={`ml-0 ${author.isHighlighted ? 'text-accent' : 'text-neutral-600 dark:text-neutral-400'}`}>†</sup>
                                )}
                                {idx < pub.authors.length - 1 && ', '}
                            </span>
                        ))}
                    </p>
                    <p className="text-sm font-medium text-neutral-800 dark:text-neutral-600 mb-3">
                        {pub.journal || pub.conference}
                    </p>

                    {pub.description && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-4 line-clamp-3">
                            {pub.description}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-2 mt-auto">
                        <PublicationLinks pub={pub} />
                        {pub.abstract && (
                            <button
                                onClick={() => setAbstractExpanded(!abstractExpanded)}
                                className={cn(
                                    "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium transition-colors",
                                    abstractExpanded
                                        ? "bg-accent text-white"
                                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-accent hover:text-white"
                                )}
                            >
                                <DocumentTextIcon className="h-3 w-3 mr-1.5" />
                                {messages.publications.abstract}
                            </button>
                        )}
                    </div>

                    <AnimatePresence>
                        {abstractExpanded && pub.abstract ? (
                            <motion.div
                                key="abstract"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden mt-4"
                            >
                                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                                    <p className="text-sm text-neutral-600 dark:text-neutral-500 leading-relaxed">
                                        {pub.abstract}
                                    </p>
                                </div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
