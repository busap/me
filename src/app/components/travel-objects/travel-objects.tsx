'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { travelFont } from '@/src/app/styles/fonts';

// stroke colours from travel/stone palette
const STROKE = '#57534e';
const ACCENT = '#0d9488';
const AMBER = '#d97706';
const NAVY = '#2b4a6f';

// loop: draw → hold → erase → (repeat)
// keyframes: [full (erased), 0 (drawn), 0 (hold), full (erase back)]
const loopPath = (dashLen: number, duration: number, delay: number) => ({
    strokeDasharray: dashLen,
    animate: { strokeDashoffset: [dashLen, 0, 0, dashLen] },
    transition: {
        duration,
        times: [0, 0.35, 0.7, 1],
        ease: 'easeInOut' as const,
        repeat: Infinity,
        delay,
    },
});

const LuggageIcon = () => (
    <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* body */}
        <motion.rect
            x="6" y="12" width="24" height="18" rx="2"
            {...loopPath(88, 3.6, 0)}
        />
        {/* handle */}
        <motion.path
            d="M13 12V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3"
            {...loopPath(28, 3.6, 0.3)}
        />
        {/* wheels */}
        <motion.circle cx="12" cy="31" r="1.2" stroke={ACCENT}
            {...loopPath(8, 3.6, 0.5)}
        />
        <motion.circle cx="24" cy="31" r="1.2" stroke={ACCENT}
            {...loopPath(8, 3.6, 0.55)}
        />
        {/* centre stripe */}
        <motion.line x1="18" y1="12" x2="18" y2="30" stroke={AMBER} strokeWidth="1.2"
            {...loopPath(18, 3.6, 0.65)}
        />
    </svg>
);

const PalmIcon = () => (
    <svg
        width="36"
        height="40"
        viewBox="0 0 36 40"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* trunk */}
        <motion.path
            d="M18 38 C16 30 19 22 17 14"
            {...loopPath(30, 3.8, 1.4)}
        />
        {/* left frond */}
        <motion.path
            d="M17 14 C10 8 4 10 3 6 C8 5 13 9 17 14"
            fill="none" stroke={ACCENT} strokeWidth="1.4"
            {...loopPath(36, 3.8, 1.7)}
        />
        {/* right frond */}
        <motion.path
            d="M17 14 C24 8 30 10 32 6 C27 5 22 9 17 14"
            fill="none" stroke={ACCENT} strokeWidth="1.4"
            {...loopPath(36, 3.8, 1.95)}
        />
        {/* top frond */}
        <motion.path
            d="M17 14 C16 6 18 2 20 1"
            fill="none" stroke={ACCENT} strokeWidth="1.4"
            {...loopPath(16, 3.8, 2.15)}
        />
        {/* coconuts */}
        <motion.circle cx="17" cy="15" r="2" stroke={AMBER} strokeWidth="1.2"
            {...loopPath(14, 3.8, 2.35)}
        />
    </svg>
);

const PlaneIcon = () => (
    <svg
        width="40"
        height="36"
        viewBox="0 0 40 36"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* fuselage */}
        <motion.path
            d="M4 18 Q18 14 36 18"
            {...loopPath(36, 4.0, 2.8)}
        />
        {/* main wing */}
        <motion.path
            d="M14 18 L10 26 L24 22 L20 18"
            stroke={ACCENT} strokeWidth="1.4"
            {...loopPath(44, 4.0, 3.1)}
        />
        {/* tail wing */}
        <motion.path
            d="M30 18 L28 22 L36 20 L34 18"
            stroke={ACCENT} strokeWidth="1.2"
            {...loopPath(26, 4.0, 3.35)}
        />
        {/* nose */}
        <motion.path
            d="M36 18 Q39 17 38 19 Q37 20 36 18"
            {...loopPath(12, 4.0, 3.55)}
        />
    </svg>
);

// SVG barcode — alternating bars of varying widths
const Barcode = () => {
    const bars = [2,1,3,1,2,1,1,3,2,1,3,2,1,2,1,3,1,2,1,1,2,3,1,2];
    let x = 0;
    const rects: { x: number; w: number }[] = [];
    bars.forEach((w, i) => {
        if (i % 2 === 0) rects.push({ x, w });
        x += w + 1;
    });
    const totalW = x - 1;
    return (
        <svg width={totalW} height="28" viewBox={`0 0 ${totalW} 28`}>
            {rects.map((r, i) => (
                <rect key={i} x={r.x} y="0" width={r.w} height="28" fill="#1e293b" />
            ))}
        </svg>
    );
};

// Scallop curve along the bottom of the navy header
const HeaderScallop = () => (
    <svg
        width="100%" height="14"
        viewBox="0 0 220 14"
        preserveAspectRatio="none"
        style={{ display: 'block', marginTop: -1 }}
    >
        <path d="M0 0 L220 0 L220 4 Q110 18 0 4 Z" fill={NAVY} />
    </svg>
);

// Simple filled plane for the navy header (static, no draw-loop)
const HeaderPlane = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
        <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2A1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
    </svg>
);

const FieldRow = ({ fields }: { fields: { label: string; value: string }[] }) => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${fields.length}, 1fr)`, gap: '0 0.5rem', marginBottom: '0.65rem' }}>
        {fields.map(({ label, value }) => (
            <div key={label}>
                <div className={travelFont.className} style={{ fontSize: '0.42rem', letterSpacing: '0.14em', color: STROKE, opacity: 0.55, marginBottom: '0.15rem' }}>{label}</div>
                <div style={{ fontSize: label === 'FROM' || label === 'TO' ? '1.15rem' : '0.7rem', fontWeight: label === 'FROM' || label === 'TO' ? 700 : 600, color: NAVY, letterSpacing: label === 'FROM' || label === 'TO' ? '0.06em' : undefined, lineHeight: 1 }}>{value}</div>
                <div style={{ height: 1, background: NAVY, opacity: 0.25, marginTop: '0.25rem' }} />
            </div>
        ))}
    </div>
);

const BoardingPass = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        style={{ position: 'absolute', right: '3%', top: '8%' }}
    >
        <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
                width: 215,
                background: '#ffffff',
                borderRadius: 14,
                boxShadow: '0 8px 32px rgba(43,74,111,0.18), 0 2px 8px rgba(0,0,0,0.08)',
                overflow: 'hidden',
            }}
        >
            {/* navy header with plane */}
            <div style={{ background: NAVY, padding: '1rem 0 0', textAlign: 'center' }}>
                <HeaderPlane />
            </div>
            <HeaderScallop />

            {/* fields */}
            <div style={{ padding: '0.75rem 1rem 0.85rem' }}>
                <FieldRow fields={[{ label: 'FROM', value: 'VIE' }, { label: 'TO', value: 'AMS' }]} />
                <FieldRow fields={[{ label: 'PASSENGER', value: 'P. BUŠINA' }, { label: 'DATE', value: '12 JUN' }]} />
                <FieldRow fields={[{ label: 'FLIGHT', value: 'OS 376' }, { label: 'SEAT', value: '14A' }]} />
                <FieldRow fields={[{ label: 'GATE', value: 'B7' }]} />

                {/* barcode */}
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '0.1rem' }}>
                    <Barcode />
                </div>
            </div>
        </motion.div>
    </motion.div>
);

export const TravelObjects = () => {
    return (
        <div className="absolute right-0 top-0 h-full w-1/2 pointer-events-none select-none">
            <BoardingPass />

            {/* luggage — mid-right, upper-mid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                style={{ position: 'absolute', right: '13%', top: '54%' }}
            >
                <motion.div
                    animate={{ y: [0, 7, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                    <LuggageIcon />
                </motion.div>
            </motion.div>

            {/* palm — far right, lower */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.9 }}
                style={{ position: 'absolute', right: '33%', top: '58%' }}
            >
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                >
                    <PalmIcon />
                </motion.div>
            </motion.div>

            {/* plane — mid-right, between boarding pass and palm */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.2 }}
                style={{ position: 'absolute', right: '34%', top: '28%' }}
            >
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                >
                    <PlaneIcon />
                </motion.div>
            </motion.div>
        </div>
    );
};
