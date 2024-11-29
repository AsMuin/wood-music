import { albumsData, assets, songsData } from '@/assets/assets';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DisplayContext } from '@/components/Display';
function Album() {
    const { id } = useParams();
    const albumData = albumsData.find(album => album.id === Number(id));
    const displayRef = useContext(DisplayContext);
    useEffect(() => {
        if (!displayRef) return;
        const display = displayRef.current;
        if (display && id) {
            const album = albumsData.find(album => album.id === Number(id));
            if (album) {
                // 获取根元素
                const root = document.documentElement;
                const baseColor = getComputedStyle(root).getPropertyValue('--color-bg-base');
                display.style.backgroundImage = `linear-gradient(${album.bgColor}, rgb(${baseColor}) 50%)`; //背景高已经设为200%了, 这里50%是从  整个高度50%  处开始渐变 也就是原高度100%
                display.style.backgroundPosition = "center top"
            }
        }
        return () => {
            if (display) {
                display.style.backgroundPosition = "center bottom";
            }
        };
    }, [])
    return (
        <>
            <div className="md:item-end mt-10 flex flex-col gap-8 md:flex-row">
                <img className="w-48 rounded" src={albumData?.image} alt="" />
                <div className="flex flex-col">
                    <p>播放列表</p>
                    <h2 className="text-5x; mb-4 font-bold md:text-7xl">{albumData?.name}</h2>
                    <h4>{albumData?.desc}</h4>
                    <div className="mt-1">
                        <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
                        <b>Spotify</b>
                        <ul className="ml-4 inline-flex gap-4">
                            <li className="list-inside list-disc">13,254,898 收藏</li>
                            <li className="list-inside list-disc">
                                <b>50 首歌</b>
                            </li>
                            <li className="list-inside list-disc">接近 2 小时 30 分钟</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mb-4 mt-10 grid grid-cols-3 gap-2 p-2 text-main sm:grid-cols-4">
                <p>
                    <b className="mr-4">#</b>歌曲名
                </p>
                <p>专辑</p>
                <p className="hidden sm:block">发布时间</p>
                <img className="m-auto w-4" src={assets.clock_icon} alt="" />
            </div>
            <hr />
            {songsData.map((song, index) => (
                <div className="grid cursor-pointer grid-cols-3 items-center gap-2 p-2 text-main hover:bg-[#ffffff2b] sm:grid-cols-4" key={song.id}>
                    <p className="">
                        <b className="mr-4">{index + 1}</b>
                        <img className="mr-5 inline w-10" src={song.image} alt="" />
                        {song.name}
                    </p>
                    <p className="text-[#15]">{albumData?.name}</p>
                    <p className="hidden text-[15px] sm:block">5 天前</p>
                    <p className="text-center text-[15px]">{song.duration}</p>
                </div>
            ))}
        </>
    );
}

export default Album;
