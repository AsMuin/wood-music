import { albumsData } from '@/assets/assets';
import AlbumItem from '@/components/AlbumItem';
import { useHorizontalScroll } from '@/Hooks/UI_event';
function Home() {
    const albumsContainer = useHorizontalScroll();
    return (
        <div className="mb-4">
            <h1 className="my-5 text-2xl font-bold">精选歌单</h1>
            <div className="hide-scrollbar flex overflow-auto" ref={albumsContainer}>
                {albumsData.map(album => (
                    <AlbumItem key={album.id} {...album} />
                ))}
            </div>
        </div>
    );
}

export default Home;
