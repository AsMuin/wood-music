import { useEffect, useRef } from "react";

function useImageLazyLoad(){
    const imageRef = useRef<HTMLImageElement|null>(null);
    useEffect(()=>{
        const image = imageRef.current;
        if(!image){
            return;
        }
        const oberver = new IntersectionObserver((entries,oberver)=>{
            entries.forEach(entry=>{
                 if(entry.isIntersecting){
                     (entry.target as HTMLImageElement).src = image.dataset.src??'';
                     oberver.unobserve(entry.target);
                 }
            })
        })
        oberver.observe(image);
        return ()=>{
            oberver.unobserve(image);
        }
    },[])
    return imageRef;
}
export default useImageLazyLoad;