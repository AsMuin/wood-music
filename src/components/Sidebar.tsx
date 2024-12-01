import { assets } from '@/assets/assets';
import Button from './UI/Button';
import Card from './UI/Card';
import { useNavigate } from 'react-router-dom';
function Sidebar() {
    const navigate = useNavigate();
    const NavList = [
        {
            name: '首页',
            icon: assets.home_icon,
            link: '/'
        },
        {
            name: '搜索',
            icon: assets.search_icon,
            link: '/search'
        }
    ];

    return (
        <div className="mr-2 hidden w-[25%] flex-col gap-2 text-main lg:flex">
            <div className="flex h-[15%] flex-col justify-around rounded bg-base">
                {NavList.map((item, index) => (
                    <div key={index} onClick={() => navigate(item.link)} className="flex cursor-pointer items-center gap-3 pl-8">
                        <img className="w-5" src={item.icon} alt="" />
                        <p className="font-bold">{item.name}</p>
                    </div>
                ))}
            </div>
            <div className="h-[85%] rounded bg-base">
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
                <Card>
                    <h1>添加新的播放列表</h1>
                    <p className="font-light">放心，我们会帮助你整理好你的音乐。</p>
                    <Button className="mt-4 rounded-full">创建播放列表</Button>
                </Card>
                <Card className="mt-4">
                    <h1>追随博客</h1>
                    <p className="font-light">我们将定期推送一些好玩的音乐资讯。</p>
                    <Button className="mt-4 rounded-full">浏览播客</Button>
                </Card>
            </div>
        </div>
    );
}

export default Sidebar;
