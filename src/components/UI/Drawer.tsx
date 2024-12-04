import useToggle from "@/Hooks/state/useToggle"
import { createContext, useEffect, useRef } from "react"
import DrawerContext from "@/service/context/Drawer"

function Drawer({ children }: { children: React.ReactNode }) {
    const [drawerVisible, { toggle: drawerToggle, setDefault: drawerClose, setReverse: drawerOpen }] = useToggle<boolean, boolean>(false, true)
    const drawerBtnRef = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        if (drawerVisible) {
            drawerBtnRef.current?.setAttribute('checked', 'checked')
        } else {
            drawerBtnRef.current?.removeAttribute('checked')
        }
    }, [drawerVisible])
    return (
        <DrawerContext.Provider value={
            {
                drawerVisible,
                drawerToggle,
                drawerClose,
                drawerOpen
            }
        }>
            <div className="drawer drawer-end">
                <input ref={drawerBtnRef} type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {children}
                </div>
                <div className="drawer-side">
                    <label onClick={drawerToggle} aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
            </div>
        </DrawerContext.Provider>
    )
}
export default Drawer