import { assets } from '@/assets/assets';
import Button from './UI/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import Login from './Login';
import { useState } from 'react';
import useUserStore from '@/service/store/User';
import defaultAvatar from '@/assets/spotify_logo.png';
import { useDrawerContext } from '@/service/context/Drawer';
import ThemeController from './ThemeController';
function Navbar() {
    const navigate = useNavigate();
    const avatar = useUserStore(store => store.state.avatar);
    const [dialogVisible, setDialogVisible] = useState(false);
    const { drawerOpen } = useDrawerContext();
    const isLogin = useUserStore(store => store.state.email);

    return (
        <>
            <div className="flex w-full items-center justify-between font-semibold">
                <div className="flex items-center gap-2">
                    <img onClick={() => navigate(-1)} className="w-8 cursor-pointer rounded-2xl bg-base p-2" src={assets.arrow_left} alt="" />
                    <img onClick={() => navigate(1)} className="w-8 cursor-pointer rounded-2xl bg-base p-2" src={assets.arrow_right} alt="" />
                </div>
                <div className="flex items-center gap-4">
                    <ThemeController />
                    <Button className="hidden rounded-2xl md:block">开通会员</Button>
                    <Button type="secondary" className="rounded-2xl">
                        安装应用程序
                    </Button>
                    <img
                        onClick={() => {
                            if (isLogin) {
                                drawerOpen();
                            } else {
                                setDialogVisible(true);
                            }
                        }}
                        src={avatar || defaultAvatar}
                        className="flex h-7 w-7 items-center justify-center rounded-full duration-500 hover:scale-125"
                        alt="avatar"
                    />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <NavLink to="/" className="cursor-pointer rounded-2xl px-4 py-1">
                    所有
                </NavLink>
                <NavLink to="/song" className="cursor-pointer rounded-2xl bg-base px-4 py-1">
                    音乐
                </NavLink>
            </div>
            <Login visible={dialogVisible} setVisible={setDialogVisible}></Login>
        </>
    );
}

export default Navbar;
