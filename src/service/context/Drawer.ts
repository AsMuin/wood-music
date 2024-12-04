import { createContext } from "react";
interface IDrawerContext {
    drawerVisible: boolean;
    drawerToggle: () => void;
    drawerClose: () => void;
    drawerOpen: () => void;
}
const DrawerContext = createContext<IDrawerContext | null>(null)

export default DrawerContext