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
                        <img src={item.icon} alt="" />
                        <p className="font-bold">{item.name}</p>
                    </div>
                ))}
            </div>
            <div className="h-[85%] rounded bg-[#121212]"></div>
        </div>
    );
}

export default Sidebar;
