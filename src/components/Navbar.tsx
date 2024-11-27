import { assets } from '@/assets/assets';

function Navbar() {
    return (
        <>
            <div className="flex w-full items-center justify-between font-semibold">
                <div className="flex items-center gap-2">
                    <img className="w-8 cursor-pointer rounded-2xl bg-base p-2" src={assets.arrow_left} alt="" />
                    <img className="w-8 cursor-pointer rounded-2xl bg-base p-2" src={assets.arrow_right} alt="" />
                </div>
                <div className="flex items-center gap-4">
                    <p className="hidden cursor-pointer rounded-2xl bg-main px-4 py-1 text-[15px] text-invert md:block hover:bg-muted hover:text-muted duration-200">开通会员</p>
                    <p className="cursor-pointer rounded-2xl bg-base px-3 py-1 text-[15px]">安装应用程序</p>
                    <p className="flex h-7 w-7 items-center justify-center rounded-full bg-highlight text-invert hover:scale-125 duration-500">A</p>
                </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
                <p className="cursor-pointer rounded-2xl bg-white px-4 py-1 text-black">所有</p>
                <p className="cursor-pointer rounded-2xl bg-base px-4 py-1">音乐</p>
            </div>
        </>
    );
}

export default Navbar;
