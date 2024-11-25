import { Suspense } from 'react';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
function App() {
    return (
        <div className="h-screen bg-black">
            <div className="flex h-[90%]">
                <Sidebar></Sidebar>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
}
export default App;
