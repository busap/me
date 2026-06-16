'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { travelFont } from '@/src/app/styles/fonts';

// stroke colours from travel/stone palette
const STROKE = '#57534e';
const ACCENT = '#0d9488';
const NAVY = '#2b4a6f';

// loop: draw → hold → erase → (repeat)
// keyframes: [full (erased), 0 (drawn), 0 (hold), full (erase back)]
const loopPath = (dashLen: number, duration: number, delay: number) => {
    const hold = 2; // extra seconds held fully drawn
    const drawLen = duration * 0.35;
    const holdLen = duration * 0.35 + hold;
    const eraseLen = duration * 0.3;
    const total = drawLen + holdLen + eraseLen;
    return {
        strokeDasharray: dashLen,
        animate: { strokeDashoffset: [dashLen, 0, 0, dashLen] },
        transition: {
            duration: total,
            times: [0, drawLen / total, (drawLen + holdLen) / total, 1],
            ease: 'easeInOut' as const,
            repeat: Infinity,
            delay,
        },
    };
};

// compass — circle perimeter ≈ 57, polygon perimeter ≈ 22
const CompassIcon = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <motion.circle cx="12" cy="12" r="9" {...loopPath(57, 3.8, 0)} />
        <motion.polygon points="16 8 13 13 8 16 11 11" stroke={ACCENT} {...loopPath(22, 3.8, 0.4)} />
    </svg>
);

// globe — circle ≈ 57, horizontal line = 18, two vertical arcs ≈ 56
const GlobeIcon = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <motion.circle cx="12" cy="12" r="9" {...loopPath(57, 4.0, 1.2)} />
        <motion.path d="M3 12h18" stroke={ACCENT} {...loopPath(18, 4.0, 1.6)} />
        <motion.path d="M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke={ACCENT} {...loopPath(56, 4.0, 1.9)} />
    </svg>
);

// map pin — teardrop path ≈ 48, inner circle ≈ 16
const MapPinIcon = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <motion.path d="M12 21s7-6.5 7-11a7 7 0 0 0-14 0c0 4.5 7 11 7 11z" {...loopPath(48, 3.6, 2.4)} />
        <motion.circle cx="12" cy="10" r="2.5" stroke={ACCENT} {...loopPath(16, 3.6, 2.8)} />
    </svg>
);

// luggage — rect perimeter ≈ 52, handle ≈ 9, each strap ≈ 5
const LuggageIcon = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <motion.rect x="5" y="8" width="14" height="12" rx="2" {...loopPath(52, 4.2, 4.8)} />
        <motion.path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke={ACCENT} {...loopPath(9, 4.2, 5.3)} />
        <motion.path d="M9 12v5" {...loopPath(5, 4.2, 5.6)} />
        <motion.path d="M15 12v5" {...loopPath(5, 4.2, 5.8)} />
    </svg>
);

// mountains — small sun circle ≈ 13, ridge path ≈ 46
const MountainsIcon = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <motion.circle cx="17" cy="6" r="2" stroke={ACCENT} {...loopPath(13, 3.8, 3.6)} />
        <motion.path d="M3 20l5-8 4 5 3-4 6 7z" {...loopPath(46, 3.8, 3.9)} />
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
        viewBox="0 0 270 14"
        preserveAspectRatio="none"
        style={{ display: 'block', marginTop: -1 }}
    >
        <path d="M0 0 L270 0 L270 4 Q135 18 0 4 Z" fill={NAVY} />
    </svg>
);

// Simple filled plane for the navy header (static, no draw-loop)
const HeaderPlane = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2A1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
    </svg>
);

const FieldRow = ({ fields }: { fields: { label: string; value: string }[] }) => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${fields.length}, 1fr)`, gap: '0 0.5rem', marginBottom: '0.45rem' }}>
        {fields.map(({ label, value }) => (
            <div key={label}>
                <div className={travelFont.className} style={{ fontSize: '0.42rem', letterSpacing: '0.14em', color: STROKE, opacity: 0.55, marginBottom: '0.15rem' }}>{label}</div>
                <div style={{ fontSize: label === 'FROM' || label === 'TO' ? '0.95rem' : '0.6rem', fontWeight: label === 'FROM' || label === 'TO' ? 700 : 600, color: NAVY, letterSpacing: label === 'FROM' || label === 'TO' ? '0.06em' : undefined, lineHeight: 1 }}>{value}</div>
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
        style={{ position: 'absolute', right: '-4%', top: '6%', transform: 'rotate(6deg)' }}
    >
        <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
                width: 205,
                background: '#ffffff',
                borderRadius: 11,
                boxShadow: '0 8px 32px rgba(43,74,111,0.18), 0 2px 8px rgba(0,0,0,0.08)',
                overflow: 'hidden',
            }}
        >
            {/* navy header with plane */}
            <div style={{ background: NAVY, padding: '0.6rem 0 0 0.8rem', textAlign: 'left' }}>
                <HeaderPlane />
            </div>
            <HeaderScallop />

            {/* fields */}
            <div style={{ padding: '0.55rem 0.8rem 0.6rem' }}>
                <FieldRow fields={[{ label: 'FROM', value: 'VIE' }, { label: 'TO', value: 'AMS' }]} />
                <FieldRow fields={[{ label: 'PASSENGER', value: 'P. BUŠINA' }, { label: 'DATE', value: '12 JUN' }]} />
                <FieldRow fields={[{ label: 'FLIGHT', value: 'OS 376' }, { label: 'SEAT', value: '14A' }]} />

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

            {/* compass — below boarding pass, right side */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                style={{ position: 'absolute', right: '39%', top: '20%' }}
            >
                <motion.div
                    animate={{ y: [0, 7, 0] }}
                    transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                >
                    <CompassIcon />
                </motion.div>
            </motion.div>

            {/* globe — mid-right, clear of boarding pass */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                style={{ position: 'absolute', right: '30%', top: '9%' }}
            >
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
                >
                    <GlobeIcon />
                </motion.div>
            </motion.div>

            {/* map pin — right-center, lower */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.1 }}
                style={{ position: 'absolute', right: '21%', top: '45%' }}
            >
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
                >
                    <MapPinIcon />
                </motion.div>
            </motion.div>

            {/* luggage — below boarding pass, left of it */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.7 }}
                style={{ position: 'absolute', right: '9%', top: '40%' }}
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
                >
                    <LuggageIcon />
                </motion.div>
            </motion.div>

            {/* mountains — left of boarding pass, mid-height */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.4 }}
                style={{ position: 'absolute', right: '34%', top: '31%' }}
            >
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 7.1, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                >
                    <MountainsIcon />
                </motion.div>
            </motion.div>
        </div>
    );
};
