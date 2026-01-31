import { useRef, useEffect } from 'react';
import type { CSSProperties } from 'react';

export const BackgroundCode = ({
    canvasStyle,
}: {
    canvasStyle?: CSSProperties;
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);
    const letters = useRef<
        {
            char: string;
            color: string;
            targetColor: string;
        }[]
    >([]);
    const grid = useRef({ columns: 0, rows: 0 });
    const context = useRef<CanvasRenderingContext2D | null>(null);
    const lastGlitchTime = useRef(Date.now());
    const speed = 50;
    const colors = ['#2b4539', '#61dca3', '#61b3dc'];
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789';
    const lettersAndSymbols = Array.from(characters);
    const fontSize = 16;
    const charWidth = 10;
    const charHeight = 20;

    const getRandomChar = () => {
        return lettersAndSymbols[
            Math.floor(Math.random() * lettersAndSymbols.length)
        ];
    };

    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const calculateGrid = (width: number, height: number) => {
        const columns = Math.ceil(width / charWidth);
        const rows = Math.ceil(height / charHeight);
        return { columns, rows };
    };

    const initializeLetters = (columns: number, rows: number) => {
        grid.current = { columns, rows };
        const totalLetters = columns * rows;
        letters.current = Array.from({ length: totalLetters }, () => ({
            char: getRandomChar(),
            color: getRandomColor(),
            targetColor: getRandomColor(),
        }));
    };

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;

        const rect = parent.getBoundingClientRect();

        canvas.width = rect.width;
        canvas.height = rect.height;
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        const { columns, rows } = calculateGrid(rect.width, rect.height);
        initializeLetters(columns, rows);
        drawLetters();
    };

    const drawLetters = () => {
        if (!context.current || letters.current.length === 0) return;
        const ctx = context.current;
        const { width, height } = canvasRef.current!.getBoundingClientRect();
        ctx.clearRect(0, 0, width, height);
        ctx.font = `${fontSize}px monospace`;

        letters.current.forEach((letter, index) => {
            const x = (index % grid.current.columns) * charWidth;
            const y = Math.floor(index / grid.current.columns) * charHeight;
            ctx.fillStyle = letter.color;
            ctx.fillText(letter.char, x, y);
        });
    };

    const updateLetters = () => {
        if (!letters.current || letters.current.length === 0) return;

        const updateCount = Math.max(
            1,
            Math.floor(letters.current.length * 0.05)
        );

        for (let i = 0; i < updateCount; i++) {
            const index = Math.floor(Math.random() * letters.current.length);
            if (!letters.current[index]) continue;

            letters.current[index].char = getRandomChar();
            letters.current[index].targetColor = getRandomColor();
            letters.current[index].color = letters.current[index].targetColor;
        }
    };

    const animate = () => {
        const now = Date.now();
        if (now - lastGlitchTime.current >= speed) {
            updateLetters();
            drawLetters();
            lastGlitchTime.current = now;
        }

        animationRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        context.current = canvas.getContext('2d');
        resizeCanvas();
        animate();

        let resizeTimeout: NodeJS.Timeout;

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                cancelAnimationFrame(animationRef.current as number);
                resizeCanvas();
                animate();
            }, 100);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationRef.current!);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div
            className={
                'relative w-full h-full overflow-hidden bg-black opacity-[70%]'
            }
        >
            <canvas
                ref={canvasRef}
                className={
                    'flex w-full h-full transition-transform duration-800'
                }
                style={canvasStyle}
            />
        </div>
    );
};
