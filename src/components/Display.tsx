import { createContext, useEffect, useRef } from 'react';

export const DisplayContext = createContext<React.MutableRefObject<HTMLDivElement | null> | null>(null);

function Display({ ...props }) {
    const displayRef = useRef<HTMLDivElement | null>(null);
    return (
        <div ref={displayRef} className="w-full overflow-auto rounded bg-gradient-to-b from-base to-base to-10% px-6 pt-4 text-main lg:ml-0 lg:w-[75%] duration-1000 bg-[length:200%_200%] bg-[center_bottom]" {...props}>
            <DisplayContext.Provider value={displayRef}>
                {props.children}
            </DisplayContext.Provider>
        </div>
    )
}

export default Display;
