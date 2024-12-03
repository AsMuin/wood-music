import { useEffect, useRef } from "react";

function Dialog({ visible, setVisible, children }: { visible: boolean, setVisible: (visible: boolean) => void, children?: React.ReactNode }) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) {
            return
        }
        if (visible) {
            dialog.showModal()
        } else {
            dialog.close()
        }
    }, [visible])

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) {
            return
        }
        function onClose() {
            setVisible(false)
        }
        function onShow() {
            setVisible(true)
        }
        dialog.addEventListener("close", onClose)
        dialog.addEventListener("show", onShow)
        return () => {
            dialog.removeEventListener("close", onClose)
            dialog.removeEventListener("show", onShow)
        }
    }, [])

    return (
        <dialog ref={dialogRef} className="modal">
            <div className="modal-box bg-main/90">
                {children}
                <div className="modal-action">
                    <form method="dialog" >
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-invert">✕</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
export default Dialog;