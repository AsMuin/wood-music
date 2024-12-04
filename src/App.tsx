import { Suspense } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/UI/Display';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Drawer from './components/UI/Drawer';
function App() {
    return (
        <Drawer>
            <div className="h-screen bg-back p-2">
                <div className="flex h-[90%] pb-2">
                    <Sidebar></Sidebar>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Display>
                            <Navbar></Navbar>
                            <Outlet />
                        </Display>
                    </Suspense>
                </div>
                <Player></Player>
            </div>
        </Drawer>
    );
}
export default App;
