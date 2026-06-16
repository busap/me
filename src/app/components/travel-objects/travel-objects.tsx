'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { travelFont } from '@/src/app/styles/fonts';

// stroke colours from travel/stone palette
const STROKE = '#57534e';
const ACCENT = '#0d9488';
const AMBER = '#d97706';

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

export const TravelObjects = () => {
    return (
        <div className="absolute right-0 top-0 h-full w-1/2 pointer-events-none select-none">
            {/* boarding pass — original compact design */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                style={{
                    position: 'absolute',
                    right: '3%',
                    top: '12%',
                    background: 'rgba(248,250,252,0.9)',
                    border: '1.5px solid rgba(87,83,78,0.2)',
                    borderRadius: '10px',
                    padding: '0.9rem 1.1rem',
                    minWidth: '200px',
                    backdropFilter: 'blur(4px)',
                }}
            >
                <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                    {/* header */}
                    <div
                        className={`${travelFont.className}`}
                        style={{
                            fontSize: '0.55rem',
                            letterSpacing: '0.18em',
                            color: STROKE,
                            marginBottom: '0.6rem',
                            opacity: 0.7,
                        }}
                    >
                        BOARDING PASS
                    </div>

                    {/* route */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '1.3rem', fontWeight: 700, color: STROKE, letterSpacing: '0.05em' }}>VIE</span>
                        <svg width="28" height="10" viewBox="0 0 28 10" fill="none">
                            <path
                                d="M2 5 L24 5 M20 2 L24 5 L20 8"
                                stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                            />
                        </svg>
                        <span style={{ fontSize: '1.3rem', fontWeight: 700, color: STROKE, letterSpacing: '0.05em' }}>AMS</span>
                    </div>

                    {/* dashed divider */}
                    <div style={{
                        borderTop: '1.5px dashed rgba(87,83,78,0.25)',
                        margin: '0.55rem 0',
                    }} />

                    {/* details */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem 0.5rem' }}>
                        {[
                            { label: 'PASSENGER', value: 'P. BUŠINA' },
                            { label: 'SEAT', value: '14A' },
                            { label: 'GATE', value: 'B7' },
                            { label: 'CLASS', value: 'EXPLORER' },
                        ].map(({ label, value }) => (
                            <div key={label}>
                                <div style={{ fontSize: '0.48rem', letterSpacing: '0.12em', color: STROKE, opacity: 0.55 }}>{label}</div>
                                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: STROKE }}>{value}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* luggage — mid-right, upper-mid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                style={{ position: 'absolute', right: '18%', top: '44%' }}
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
                style={{ position: 'absolute', right: '4%', top: '52%' }}
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
                style={{ position: 'absolute', right: '12%', top: '34%' }}
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
