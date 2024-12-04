import useToggle from '@/Hooks/state/useToggle';
import { useEffect, useRef } from 'react';
import DrawerContext from '@/service/context/Drawer';

function Drawer({ children, content }: { children: React.ReactNode; content: React.ReactNode }) {
    const [drawerVisible, { toggle: drawerToggle, setDefault: drawerClose, setReverse: drawerOpen }] = useToggle<boolean, boolean>(false, true);
    const drawerBtnRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        if (drawerVisible) {
            drawerBtnRef.current?.setAttribute('checked', 'checked');
        } else {
            drawerBtnRef.current?.removeAttribute('checked');
        }
    }, [drawerVisible]);
    return (
        <DrawerContext.Provider
            value={{
                drawerVisible,
                drawerToggle,
                drawerClose,
                drawerOpen
            }}>
            <div className="drawer drawer-end">
                <input ref={drawerBtnRef} type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">{children}</div>
                <div className="drawer-side">
                    <label onClick={drawerToggle} aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu min-h-full w-[60%] bg-nav text-main md:w-80 md:p-4">{content}</div>
                </div>
            </div>
        </DrawerContext.Provider>
    );
}
export default Drawer;
