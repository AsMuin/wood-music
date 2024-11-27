import { useEffect, useRef } from 'react';

function useHorizontalScroll() {
    const elementRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!elementRef.current) return;
        const element = elementRef.current;
        function handleWheel(event: WheelEvent) {
            event.preventDefault();
            if (elementRef.current) {
                elementRef.current.scrollLeft += event.deltaY;
            }
        }
        if (element) {
            element.style.scrollBehavior = 'smooth';
            element.addEventListener('wheel', handleWheel);
        }
        return () => {
            element?.removeEventListener('wheel', handleWheel);
        };
    }, [elementRef.current]);

    return elementRef;
}
export { useHorizontalScroll };
