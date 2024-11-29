import { albumsData, songsData } from '@/assets/assets';
import AlbumItem from '@/components/AlbumItem';
import SongItem from '@/components/SongItem';
import useHorizontalScroll from '@/Hooks/UI/useHorizontalScroll';
function Home() {
    const albumsContainer = useHorizontalScroll();
    const songsContainer = useHorizontalScroll();
    return (
        <>
            <div className="mb-4">
                <h1 className="my-5 text-2xl font-bold">精选歌单</h1>
                <div className="flex snap-x scroll-pl-3 gap-3 overflow-auto hide-scrollbar" ref={albumsContainer}>
                    {albumsData.map(album => (
                        <AlbumItem key={album.id} {...album} />
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <h1 className="my-5 text-2xl font-bold">今日推荐</h1>
                <div className="flex snap-x scroll-pl-3 gap-3 overflow-auto hide-scrollbar" ref={songsContainer}>
                    {songsData.map(song => (
                        <SongItem key={song.id} {...song} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
