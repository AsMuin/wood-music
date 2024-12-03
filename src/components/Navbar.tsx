import { assets } from '@/assets/assets';
import Button from './UI/Button';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import { useState } from 'react';
import useUserStore from '@/service/store/User';
import defaultAvatar from '@/assets/spotify_logo.png'
function Navbar() {
    const navigate = useNavigate();
    const avatar = useUserStore(state => state.avatar)
    const [dialogVisible, setDialogVisible] = useState(false)
    return (
        <>
            <div className="flex w-full items-center justify-between font-semibold">
                <div className="flex items-center gap-2">
                    <img onClick={() => navigate(-1)} className="w-8 cursor-pointer rounded-2xl bg-base p-2" src={assets.arrow_left} alt="" />
                    <img onClick={() => navigate(1)} className="w-8 cursor-pointer rounded-2xl bg-base p-2" src={assets.arrow_right} alt="" />
                </div>
                <div className="flex items-center gap-4">
                    <Button className="hidden rounded-2xl md:block">开通会员</Button>
                    <Button type="secondary" className="rounded-2xl">
                        安装应用程序
                    </Button>
                    <img onClick={() => { setDialogVisible(true) }} src={avatar || defaultAvatar} className="flex h-7 w-7 items-center justify-center rounded-full   duration-500 hover:scale-125" />
                </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
                <p className="cursor-pointer rounded-2xl bg-white px-4 py-1 text-black">所有</p>
                <p className="cursor-pointer rounded-2xl bg-base px-4 py-1">音乐</p>
            </div>
            <Login visible={dialogVisible} setVisible={setDialogVisible} ></Login>
        </>
    );
}

export default Navbar;
