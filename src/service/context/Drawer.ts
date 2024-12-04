import { createContext, useContext } from 'react';
interface IDrawerContext {
    drawerVisible: boolean;
    drawerToggle: () => void;
    drawerClose: () => void;
    drawerOpen: () => void;
}
const DrawerContext = createContext<IDrawerContext | null>(null);
function useDrawerContext() {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('useDrawerContext must be used within a DrawerProvider');
    }
    return context;
}

export { DrawerContext, useDrawerContext };
