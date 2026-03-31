'use client';
import { useRef, useEffect } from 'react';

export default function useHorizontalScroll() {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        if (isTouch) return;

        const onWheel = (e: WheelEvent) => {
            if (e.deltaY === 0 || e.shiftKey) return;

            const isAtLeft = el.scrollLeft <= 0;
            const isAtRight = Math.abs(el.scrollLeft + el.clientWidth - el.scrollWidth) <= 1;

            if ((isAtLeft && e.deltaY < 0) || (isAtRight && e.deltaY > 0)) {
                return;
            }

            e.preventDefault();
            
            el.scrollBy({
                left: e.deltaY > 0 ? 350 : -350,
                behavior: 'smooth'
            });
        };

        el.addEventListener('wheel', onWheel, { passive: false });
        
        return () => {
            el.removeEventListener('wheel', onWheel);
        };
    }, []);
    
    return elRef;
}
