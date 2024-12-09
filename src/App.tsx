import { Suspense } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/UI/Display';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Drawer from './components/UI/Drawer';
import UserInfo from './components/UserInfo';
import useUserStore from './service/store/User';
import useOnMounted from './Hooks/lifeCycle/onMounted';
import Message from './components/MessageManager';
import MessageManager from './components/MessageManager';
function App() {
    const getUserInfo = useUserStore(state => state.actions.getUserInfo);
    const isLogin = useUserStore(store => store.state.email);
    useOnMounted(() => {
        if (!isLogin && localStorage.getItem('token')) {
            getUserInfo();
        }
    });
    return (
        <>
            <MessageManager />
            <Drawer>
                <Drawer.PageContent>
                    <Message></Message>
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
                </Drawer.PageContent>
                <Drawer.Content>
                    {
                        isLogin && <UserInfo />
                    }
                </Drawer.Content>
            </Drawer>
        </>
    );
}
export default App;
