import useToggle from '@/Hooks/state/useToggle';
import { useDrawerContext, DrawerContext } from '@/service/context/Drawer';
function Drawer({ children }: { children: React.ReactNode }) {
    const [drawerVisible, { toggle: drawerToggle, setDefault: drawerClose, setReverse: drawerOpen }] = useToggle<boolean, boolean>(false, true);
    return (
        <DrawerContext.Provider
            value={{
                drawerVisible,
                drawerToggle,
                drawerClose,
                drawerOpen
            }}>
            <div className="drawer drawer-end">
                <input type="checkbox" className="drawer-toggle" checked={drawerVisible} onChange={drawerToggle} />
                {children}
            </div>
        </DrawerContext.Provider>
    );
}
Drawer.PageContent = function DrawerPageContent({ children }: { children: React.ReactNode }) {
    return <div className="drawer-content">{children}</div>;
};
Drawer.Content = function DrawerContent({ children }: { children: React.ReactNode }) {
    const { drawerToggle } = useDrawerContext();
    return (
        <div className="drawer-side">
            <label onClick={drawerToggle} className="drawer-overlay"></label>
            <div className="menu min-h-full w-[60%] bg-nav text-main md:w-80 md:p-4">{children}</div>
        </div>
    );
};
export default Drawer;
