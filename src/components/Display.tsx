import { createContext, useRef } from 'react';

export const DisplayContext = createContext<React.MutableRefObject<HTMLDivElement | null> | null>(null);

function Display({ ...props }: any) {
    const displayRef = useRef<HTMLDivElement | null>(null);
    return (
        <div
            ref={displayRef}
            className="from-base to-base w-full overflow-auto rounded bg-gradient-to-b to-10% bg-[length:200%_200%] bg-[center_bottom] px-6 pt-4 text-main duration-1000 lg:ml-0 lg:w-[75%]"
            {...props}>
            <DisplayContext.Provider value={displayRef}>{props.children} </DisplayContext.Provider>
        </div>
    );
}

export default Display;
