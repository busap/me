'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { professionalFont } from '@/src/app/styles/fonts';

const TYPING_SPEED_MS = 60;
const LINE_PAUSE_MS = 200;
const LOOP_PAUSE_MS = 1400;

const accent = '#0d9488';
const base = '#334155';
const purple = '#7c3aed';

type LineSpec = { color?: 'accent' | 'purple' | 'base' };

// useTyping: drives line-by-line typing for an array of lines, loops forever
function useTyping(lines: string[], startDelay: number) {
    const [displayed, setDisplayed] = useState<string[]>([]);
    const [activeLine, setActiveLine] = useState(0);
    const [activeChar, setActiveChar] = useState(0);
    const [looping, setLooping] = useState(false);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        const typeNext = (lineIdx: number, charIdx: number, cur: string[]) => {
            const target = lines[lineIdx];
            if (charIdx <= target.length) {
                const updated = [...cur];
                updated[lineIdx] = target.slice(0, charIdx);
                setDisplayed(updated);
                setActiveLine(lineIdx);
                setActiveChar(charIdx);
                timeout = setTimeout(() => typeNext(lineIdx, charIdx + 1, updated), TYPING_SPEED_MS);
            } else if (lineIdx < lines.length - 1) {
                timeout = setTimeout(() => typeNext(lineIdx + 1, 0, cur), LINE_PAUSE_MS);
            } else {
                setLooping(true);
                timeout = setTimeout(() => {
                    setLooping(false);
                    setDisplayed([]);
                    setActiveLine(0);
                    setActiveChar(0);
                    timeout = setTimeout(() => typeNext(0, 0, []), 100);
                }, LOOP_PAUSE_MS);
            }
        };

        timeout = setTimeout(() => typeNext(0, 0, []), startDelay);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { displayed, activeLine, activeChar, looping, total: lines.length };
}

// TypingBlock: renders lines with per-line coloring + a blinking caret on the active char
function TypingBlock({
    lines,
    lineSpecs,
    startDelay,
    rotate,
    floatY,
    floatDuration,
    floatDelay,
    entranceDelay,
    style,
}: {
    lines: string[];
    lineSpecs: LineSpec[];
    startDelay: number;
    rotate: number;
    floatY: number;
    floatDuration: number;
    floatDelay: number;
    entranceDelay: number;
    style?: React.CSSProperties;
}) {
    const { displayed, activeLine, activeChar, looping, total } = useTyping(lines, startDelay);

    const renderLine = (lineIdx: number) => {
        const text = displayed[lineIdx] ?? '';
        const spec = lineSpecs[lineIdx];
        const isActive = lineIdx === activeLine && !looping;
        const caretVisible = isActive && activeChar <= (lines[lineIdx]?.length ?? 0);

        let content: React.ReactNode;

        if (spec?.color === 'accent') {
            content = <span style={{ color: accent }}>{text}</span>;
        } else if (spec?.color === 'purple') {
            content = <span style={{ color: purple }}>{text}</span>;
        } else {
            // default: light syntax coloring — keywords teal, function names purple
            const colored = text
                .replace(/^(const|let|if|while)\b/, '\x00k\x01$1\x02')
                .replace(/(role|stack|home|seen|places)(:)/, '\x00k\x01$1\x02$2')
                .replace(/(fly|explore|filter|map)(\()/, '\x00p\x01$1\x02$2');

            const parts = colored.split(/(\x00k\x01.*?\x02|\x00p\x01.*?\x02)/g);
            content = (
                <>
                    {parts.map((seg, i) => {
                        if (seg.startsWith('\x00k\x01'))
                            return <span key={i} style={{ color: accent }}>{seg.slice(3, -1)}</span>;
                        if (seg.startsWith('\x00p\x01'))
                            return <span key={i} style={{ color: purple }}>{seg.slice(3, -1)}</span>;
                        return <span key={i}>{seg}</span>;
                    })}
                </>
            );
        }

        return (
            <div key={lineIdx} className="flex items-center leading-relaxed" style={{ whiteSpace: 'pre' }}>
                <span>{content}</span>
                {caretVisible && (
                    <span style={{ color: accent, animation: 'caret-blink 1s step-end infinite', marginLeft: '1px' }}>|</span>
                )}
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: entranceDelay }}
            style={style}
        >
            <motion.div
                animate={{ y: [0, floatY, 0], rotate }}
                transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
            >
                {Array.from({ length: total }).map((_, idx) => renderLine(idx))}
            </motion.div>
        </motion.div>
    );
}

// Block 1: const me = { … }
const BLOCK1_LINES = [
    'const me = {',
    "  role: 'developer',",
    "  stack: 'TypeScript',",
    "  home: 'Czechia'",
    '};',
];
const BLOCK1_SPECS: LineSpec[] = [
    { color: 'base' },
    { color: 'base' },
    { color: 'base' },
    { color: 'base' },
    { color: 'base' },
];

// Block 2: if (isDeployed) fly();
const BLOCK2_LINES = ['if (isDeployed) fly();'];
const BLOCK2_SPECS: LineSpec[] = [{ color: 'base' }];

// Block 3: const seen = places…
const BLOCK3_LINES = [
    'const seen = places',
    '  .filter(worthIt)',
    '  .map(explore);',
];
const BLOCK3_SPECS: LineSpec[] = [
    { color: 'base' },
    { color: 'base' },
    { color: 'base' },
];

export const CodeSnippets = () => {
    return (
        <div className={`absolute left-0 top-0 h-full w-1/2 pointer-events-none select-none ${professionalFont.className}`}
            style={{ fontSize: '0.72rem', color: base, lineHeight: 1.7 }}
        >
            {/* Block 1 — main, top-left */}
            <TypingBlock
                lines={BLOCK1_LINES}
                lineSpecs={BLOCK1_SPECS}
                startDelay={1200}
                rotate={-2}
                floatY={-6}
                floatDuration={5}
                floatDelay={0}
                entranceDelay={1.0}
                style={{ position: 'absolute', left: '12%', top: '14%', minWidth: '13rem' }}
            />

            {/* Block 2 — mid, single line */}
            <TypingBlock
                lines={BLOCK2_LINES}
                lineSpecs={BLOCK2_SPECS}
                startDelay={2600}
                rotate={2.5}
                floatY={8}
                floatDuration={6}
                floatDelay={1}
                entranceDelay={1.6}
                style={{ position: 'absolute', left: '22%', top: '30%', whiteSpace: 'nowrap' }}
            />

            {/* Block 3 — lower-left, 3-line seen snippet */}
            <TypingBlock
                lines={BLOCK3_LINES}
                lineSpecs={BLOCK3_SPECS}
                startDelay={4200}
                rotate={-1.5}
                floatY={-7}
                floatDuration={7}
                floatDelay={2}
                entranceDelay={2.1}
                style={{ position: 'absolute', left: '9%', top: '44%', whiteSpace: 'nowrap' }}
            />

            <style>{`
                @keyframes caret-blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};
