import React, {useEffect, useRef, useState} from 'react';
import type { CSSProperties } from 'react';
import './background-airport.scss';

interface Flight {
  id: string;
  destination: string;
  time: string;
  flight: string;
}

interface CharFlip {
  prev: string;
  curr: string;
  delayMs: number;
  nonce: number;
}

const FLIGHT_SLOTS = 7;
const DEST_SLOTS = 12;
const TIME_SLOTS = 5;

const DESTINATIONS = [
  'NEW YORK','LONDON','TOKYO','PARIS','DUBAI','SYDNEY','FRANKFURT','SINGAPORE','MADRID','ROME','AMSTERDAM','MUNICH','ZURICH','VIENNA','STOCKHOLM','COPENHAGEN','MOSCOW','ISTANBUL','ATHENS','BARCELONA','MILAN','BERLIN','HAMBURG','COLOGNE'
];
const AIRLINES = [
  'AA','UA','DL','BA','LH','AF','KL','LX','OS','SK','EK','QR','EY','QF','SQ','CX','IB','AZ','TK','NH','JL','SU','OS','SN','HV','VA','WN','AS','AC'
];

const randomFlightCode = () => {
  const carrier = AIRLINES[Math.floor(Math.random()*AIRLINES.length)];
  const num = Math.floor(Math.random()*900 + 100);
  const maybeExtraNum = Math.random() < 0.25 ? Math.floor(Math.random()*10).toString() : '';
  return `${carrier} ${num}${maybeExtraNum}`;
};

const getRandomFlight = (): Flight => {
  const destination = DESTINATIONS[Math.floor(Math.random()*DESTINATIONS.length)];
  const hour = Math.floor(Math.random()*12)+6;
  const minute = Math.floor(Math.random()*60);
  const time = `${hour.toString().padStart(2,'0')}:${minute.toString().padStart(2,'0')}`;
  const flight = randomFlightCode();
  return { id: Math.random().toString(36).slice(2,9), destination, time, flight };
};

const useDebouncedResize = (cb: () => void, delay = 100) => {
  useEffect(() => {
    let t: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(cb, delay);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, [cb, delay]);
};

const padTo = (text: string, slots: number) => {
  const trimmed = text.slice(0, slots);
  return trimmed.padEnd(slots, ' ');
};

const textToFlips = (prevText: string, nextText: string, baseDelay = 0, stagger = 50): CharFlip[] => {
  const maxLen = Math.max(prevText.length, nextText.length);
  const res: CharFlip[] = [];
  for (let i=0;i<maxLen;i++) {
    const prev = prevText[i] ?? ' ';
    const curr = nextText[i] ?? ' ';
    res.push({ prev, curr, delayMs: baseDelay + i*stagger + Math.floor(Math.random()*30), nonce: Date.now()+i });
  }
  return res;
};

const FlapChar: React.FC<{ flip: CharFlip }>= ({ flip }) => {
  return (
    <span className="tile" style={{ animationDelay: `${flip.delayMs}ms` }} key={flip.nonce}>
      <span className="tile-hinge" />
      <span className="tile-full">
        <span className="tile-text">{flip.curr}</span>
      </span>
      <span className="tile-flip-top">
        <span className="tile-text">{flip.prev}</span>
      </span>
      <span className="tile-flip-bottom">
        <span className="tile-text">{flip.curr}</span>
      </span>
    </span>
  );
};

export const BackgroundAirport: React.FC<{ containerStyle?: CSSProperties }>= ({ containerStyle }) => {
    const wrapRef = useRef<HTMLDivElement|null>(null);
    const [flights, setFlights] = useState<Flight[]>([]);
    const flightsRef = useRef<Flight[]>([]);
    const [timeFlips, setTimeFlips] = useState<CharFlip[][]>([]);
    const [destFlips, setDestFlips] = useState<CharFlip[][]>([]);
    const [flightFlips, setFlightFlips] = useState<CharFlip[][]>([]);
    const lastUpdateRef = useRef<number>(Date.now());
    const updateInterval = 1000;

    useEffect(() => {
        flightsRef.current = flights;
    }, [flights]);

    const recomputeRows = () => {
        const el = wrapRef.current;
        if (!el) return;

        const newFlights = Array.from({length: 20}, getRandomFlight);
        flightsRef.current = newFlights;
        setFlights(newFlights);

        const tf: CharFlip[][] = [];
        const df: CharFlip[][] = [];
        const ff: CharFlip[][] = [];
        newFlights.forEach((f, i) => {
            const base = (i % 3) * 80;
            tf[i] = textToFlips(padTo('', TIME_SLOTS), padTo(f.time, TIME_SLOTS), base);
            df[i] = textToFlips(padTo('', DEST_SLOTS), padTo(f.destination.toUpperCase(), DEST_SLOTS), base+100);
            ff[i] = textToFlips(padTo('', FLIGHT_SLOTS), padTo(f.flight.toUpperCase(), FLIGHT_SLOTS), base+140);
        });
        setTimeFlips(tf);
        setDestFlips(df);
        setFlightFlips(ff);
    };

    useEffect(() => { recomputeRows(); }, []);
    useDebouncedResize(recomputeRows, 120);

    useEffect(() => {
        let raf: number;
        const loop = () => {
            const now = Date.now();
            if (now - lastUpdateRef.current >= updateInterval && flightsRef.current.length>0) {
                const next = [...flightsRef.current];
                const updates = Math.floor(Math.random() * 5) + 1;
                for (let k = 0; k < updates; k++) {
                    const idx = Math.floor(Math.random() * next.length);
                    const nf = getRandomFlight();
                    next[idx] = nf;
                    const base = (idx % 3) * 80;
                    setTimeFlips(prev => {
                        const copy = prev.map(arr => arr.slice());
                        const prevText = padTo(prev[idx]?.map(c => c.curr).join('') || '', TIME_SLOTS);
                        copy[idx] = textToFlips(prevText, padTo(nf.time, TIME_SLOTS), base);
                        return copy;
                    });
                    setDestFlips(prev => {
                        const copy = prev.map(arr => arr.slice());
                        const prevText = padTo(prev[idx]?.map(c => c.curr).join('') || '', DEST_SLOTS);
                        copy[idx] = textToFlips(prevText, padTo(nf.destination.toUpperCase(), DEST_SLOTS), base + 100);
                        return copy;
                    });
                    setFlightFlips(prev => {
                        const copy = prev.map(arr => arr.slice());
                        const prevText = padTo(prev[idx]?.map(c => c.curr).join('') || '', FLIGHT_SLOTS);
                        copy[idx] = textToFlips(prevText, padTo(nf.flight.toUpperCase(), FLIGHT_SLOTS), base + 140);
                        return copy;
                    });
                    setFlights(next);
                    flightsRef.current = next;
                    lastUpdateRef.current = now;
                }
            }
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, []);

    const renderFlights = () => {
        return <div className="board">
            {flights.map((f, i) => (
                <div className="row" key={f.id+"-"+i}>
                    <div className="col col-flight">
                        {(flightFlips[i]||[]).map((flip, j) => (
                            <FlapChar flip={flip} key={`f-${i}-${j}-${flip.nonce}`} />
                        ))}
                    </div>
                    <div className="col col-dest">
                        {(destFlips[i]||[]).map((flip, j) => (
                            <FlapChar flip={flip} key={`d-${i}-${j}-${flip.nonce}`} />
                        ))}
                    </div>
                    <div className="col col-time">
                        {(timeFlips[i]||[]).map((flip, j) => (
                            <FlapChar flip={flip} key={`t-${i}-${j}-${flip.nonce}`} />
                        ))}
                    </div>
                </div>
            ))}
        </div>;
    }

    return <div
        className={
            'relative w-full h-full overflow-hidden bg-black opacity-[60%]'
        }
    >
        <div
            ref={wrapRef}
            className={
                'flex w-full h-full transition-transform duration-800 opacity-[50%]'
            }
            style={containerStyle}
        >
            {renderFlights()}
        </div>
    </div>
};
