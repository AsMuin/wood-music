import { useEffect, useRef } from 'react';

function useHorizontalScroll(sensitivity: number = 2) {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const eventTempRef = useRef(Date.now());
    useEffect(() => {
        if (!elementRef.current) {
            return;
        }
        const element = elementRef.current;
        function handleWheel(event: WheelEvent) {
            event.preventDefault();
            const currentTime = Date.now();
            if (currentTime - eventTempRef.current < 200) {
                return;
            }
            if (elementRef.current) {
                elementRef.current.scrollLeft += event.deltaY * sensitivity;
                eventTempRef.current = currentTime;
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
