'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { professionalFont } from '@/src/app/styles/fonts';

const MAIN_LINES = [
    'const me = {',
    "  role: 'developer',",
    "  stack: 'TypeScript',",
    "  home: 'Czechia',",
    '};',
];

const TYPING_SPEED_MS = 60;
const LINE_PAUSE_MS = 200;
const LOOP_PAUSE_MS = 1400;

export const CodeSnippets = () => {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [activeLine, setActiveLine] = useState(0);
    const [activeChar, setActiveChar] = useState(0);
    const [looping, setLooping] = useState(false);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        const typeNext = (lineIdx: number, charIdx: number, lines: string[]) => {
            const target = MAIN_LINES[lineIdx];

            if (charIdx <= target.length) {
                const updated = [...lines];
                updated[lineIdx] = target.slice(0, charIdx);
                setDisplayedLines(updated);
                setActiveLine(lineIdx);
                setActiveChar(charIdx);

                timeout = setTimeout(
                    () => typeNext(lineIdx, charIdx + 1, updated),
                    TYPING_SPEED_MS,
                );
            } else if (lineIdx < MAIN_LINES.length - 1) {
                timeout = setTimeout(
                    () => typeNext(lineIdx + 1, 0, lines),
                    LINE_PAUSE_MS,
                );
            } else {
                // finished — pause, then restart
                setLooping(true);
                timeout = setTimeout(() => {
                    setLooping(false);
                    setDisplayedLines([]);
                    setActiveLine(0);
                    setActiveChar(0);
                    timeout = setTimeout(() => typeNext(0, 0, []), 100);
                }, LOOP_PAUSE_MS);
            }
        };

        // initial delay to align with page entrance
        timeout = setTimeout(() => typeNext(0, 0, []), 1200);
        return () => clearTimeout(timeout);
    }, []);

    const accent = '#0d9488';
    const base = '#334155';

    const colorLine = (line: string) => {
        // very light syntax colouring — just keys vs values
        return line
            .replace(/^(const|let|const) /, '<k>$1</k> ')
            .replace(/(role|stack|home)(:)/, '<p>$1</p>$2');
    };

    const renderLine = (line: string, idx: number) => {
        const isActive = idx === activeLine && !looping;
        const parts = colorLine(line);

        // split on our markers for teal key coloring
        const segments = parts.split(/(<k>.*?<\/k>|<p>.*?<\/p>)/g);

        return (
            <div key={idx} className="flex items-center leading-relaxed">
                <span>
                    {segments.map((seg, i) => {
                        if (seg.startsWith('<k>'))
                            return <span key={i} style={{ color: accent }}>{seg.replace(/<\/?k>/g, '')}</span>;
                        if (seg.startsWith('<p>'))
                            return <span key={i} style={{ color: accent }}>{seg.replace(/<\/?p>/g, '')}</span>;
                        return <span key={i}>{seg}</span>;
                    })}
                </span>
                {isActive && activeChar <= (MAIN_LINES[idx]?.length ?? 0) && (
                    <span
                        style={{ color: accent, animation: 'caret-blink 1s step-end infinite', marginLeft: '1px' }}
                    >|</span>
                )}
            </div>
        );
    };

    return (
        <div className={`absolute left-0 top-0 h-full pointer-events-none select-none ${professionalFont.className}`}>
            {/* main typing block */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                style={{
                    position: 'absolute',
                    left: '7%',
                    top: '14%',
                    fontSize: '0.72rem',
                    color: base,
                    minWidth: '13rem',
                    lineHeight: 1.7,
                }}
            >
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    {MAIN_LINES.map((_, idx) => renderLine(displayedLines[idx] ?? '', idx))}
                </motion.div>
            </motion.div>

            {/* small drifting snippet 1 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                style={{
                    position: 'absolute',
                    left: '17%',
                    top: '38%',
                    fontSize: '0.68rem',
                    color: base,
                    whiteSpace: 'nowrap',
                }}
            >
                <motion.span
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    style={{ display: 'block' }}
                >
                    <span style={{ color: accent }}>if</span>
                    {' (isDeployed) '}
                    <span style={{ color: '#7c3aed' }}>fly</span>
                    {'();'}
                </motion.span>
            </motion.div>

            {/* small drifting snippet 2 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.1 }}
                style={{
                    position: 'absolute',
                    left: '4%',
                    top: '55%',
                    fontSize: '0.68rem',
                    color: base,
                    whiteSpace: 'nowrap',
                }}
            >
                <motion.span
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    style={{ display: 'block' }}
                >
                    <span style={{ color: accent }}>while</span>
                    {' (traveling) '}
                    <span style={{ color: '#7c3aed' }}>explore</span>
                    {'();'}
                </motion.span>
            </motion.div>

            <style>{`
                @keyframes caret-blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};
