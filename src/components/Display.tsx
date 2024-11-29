import { useRef } from 'react';
import DisplayContext from '@/service/context/Display';

function Display({ ...props }: any) {
    const displayRef = useRef<HTMLDivElement | null>(null);
    return (
        <div
            ref={displayRef}
            className="w-full overflow-auto rounded bg-gradient-to-b from-base to-base to-10% bg-[length:200%_200%] bg-[center_bottom] px-6 pt-4 text-main duration-1000 lg:ml-0 lg:w-[75%]"
            {...props}>
            <DisplayContext.Provider value={displayRef}>{props.children} </DisplayContext.Provider>
        </div>
    );
}

export default Display;
