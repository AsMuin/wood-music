import { assets } from '@/assets/assets';
function Sidebar() {
    const NavList = [
        {
            name: '首页',
            icon: assets.home_icon
        },
        {
            name: '搜索',
            icon: assets.search_icon
        }
    ];
    return (
        <div className="hidden h-full w-[25%] flex-col gap-2 p-2 text-white lg:flex">
            <div className="flex h-[15%] flex-col justify-around rounded bg-[#121212]">
                {NavList.map((item, index) => (
                    <div key={index} className="flex cursor-pointer items-center gap-3 pl-8">
                        <img className="w-5" src={item.icon} alt="" />
                        <p className="font-bold">{item.name}</p>
                    </div>
                ))}
            </div>
            <div className="h-[85%] rounded bg-[#121212]">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <img className="w-8" src={assets.stack_icon} alt="" />
                        <p className="font-semibold">资料库</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <img className="w-5" src={assets.arrow_icon} alt="" />
                        <img className="w-5" src={assets.plus_icon} alt="" />
                    </div>
                </div>
                <div className="-4 m-2 flex flex-col items-start justify-start gap-1 rounded bg-[#242424] p-4 font-semibold">
                    <h1>添加新的播放列表</h1>
                    <p className="font-light">放心，我们会帮助你整理好你的音乐。</p>
                    <button className="mt-4 rounded-full bg-white px-4 py-1.5 text-[15px] text-black">创建播放列表</button>
                </div>
                <div className="-4 m-2 mt-4 flex flex-col items-start justify-start gap-1 rounded bg-[#242424] p-4 font-semibold">
                    <h1>追随博客</h1>
                    <p className="font-light">我们将定期推送一些好玩的音乐资讯。</p>
                    <button className="mt-4 rounded-full bg-white px-4 py-1.5 text-[15px] text-black">浏览播客</button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
