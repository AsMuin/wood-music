import { albumsData } from '@/assets/assets';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function Display({ ...props }) {
    const displayRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    const isAlbum = location.pathname.includes('album');
    const albumId = isAlbum ? location.pathname.split('/')[2] : null;
    useEffect(() => {
        const display = displayRef.current;
        if (display && albumId) {
            const album = albumsData.find(album => album.id === Number(albumId));
            if (album) {
                // 获取根元素
                const root = document.documentElement;
                const baseColor = getComputedStyle(root).getPropertyValue('--color-bg-base');
                display.style.background = `linear-gradient(${album.bgColor},rgb(${baseColor}))`;
            }
        }
        return () => {
            if (display) {
                display.style.backgroundColor = '';
            }
        };
    }, [albumId]);
    return <div ref={displayRef} className="w-[100%] overflow-auto rounded bg-base px-6 pt-4 text-main lg:ml-0 lg:w-[75%]" {...props}></div>;
}

export default Display;
