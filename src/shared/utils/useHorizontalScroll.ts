'use client';
import { useRef, useEffect } from 'react';

export default function useHorizontalScroll() {
  const elRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          return;
        }
        e.preventDefault();
        el.classList.add('scrolling-active');
        const scrollAmount = e.deltaY * 0.8;
        el.scrollLeft += scrollAmount;
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          el.classList.remove('scrolling-active');
        }, 150);
      };

      el.addEventListener('wheel', onWheel);

      return () => {
        el.removeEventListener('wheel', onWheel);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, []);

  return elRef;
}
