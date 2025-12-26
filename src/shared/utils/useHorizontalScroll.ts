'use client';
import { useRef, useEffect } from 'react';

export default function useHorizontalScroll() {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = elRef.current;
        if (el) {
            const onWheel = (e: WheelEvent) => {
                if (e.deltaY === 0) return;

                if (
                    (el.scrollLeft === 0 && e.deltaY < 0) ||
                    (Math.abs(el.scrollLeft + el.clientWidth - el.scrollWidth) < 1 && e.deltaY > 0)
                ) {
                    return;
                }

                e.preventDefault();
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY,
                    behavior: 'auto'
                });
            };

            el.addEventListener('wheel', onWheel, { passive: false });
            return () => el.removeEventListener('wheel', onWheel);
        }
    }, []);

    return elRef;
}
