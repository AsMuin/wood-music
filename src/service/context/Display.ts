import { createContext } from 'react';

const DisplayContext = createContext<React.MutableRefObject<HTMLDivElement | null> | null>(null);
export default DisplayContext;
