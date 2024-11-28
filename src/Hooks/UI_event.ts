import { useEffect, useRef } from 'react';

function useHorizontalScroll(sensitivity: number = 2, throttleInterval: number = 200) {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const eventTempRef = useRef(Date.now());

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();
            const currentTime = Date.now();
            if (currentTime - eventTempRef.current >= throttleInterval) {
                element.scrollTo({
                    left: element.scrollLeft + event.deltaY * sensitivity,
                    behavior: 'smooth'
                });
                eventTempRef.current = currentTime;
            }
        };

        element.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            element.removeEventListener('wheel', handleWheel);
        };
    }, [sensitivity, throttleInterval]);

    return elementRef;
}

function useImageLazyLoad() {
    const imageRef = useRef<HTMLImageElement | null>(null);
    useEffect(() => {
        if (!imageRef.current) {
            return;
        }
        const image = imageRef.current;
        const imageURL = image.dataset.src;
        const oberver = new IntersectionObserver((entries, oberver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    (entry.target as HTMLImageElement).src = imageURL ?? '';
                    oberver.unobserve(entry.target);
                }
            });
        });
        oberver.observe(image);
        return () => {
            oberver.unobserve(image);
        };
    }, [imageRef.current]);
    return imageRef;
}
export { useHorizontalScroll, useImageLazyLoad };
