import SongItem from '@/components/SongItem';
import { IQueryList } from '@/service/api';
import { getSongList } from '@/service/api/song';
import usePlayerStore from '@/service/store/Player';
import { useEffect } from 'react';
import useSWR from 'swr';

export interface ISong {
    _id: string;
    name: string;
    desc: string;
    album: string;
    image: string;
    file: string;
    duration: string;
}

function Song() {
    const {
        data: songListResponse,
        error,
        isLoading
    } = useSWR({ key: 'songList', pageIndex: 0, pageSize: 100 }, ({ pageIndex, pageSize }) =>
        getSongList<IQueryList<ISong[]>>({ pageIndex, pageSize })
    );
    const updateSongList = usePlayerStore(state => state.actions.updateSongList);
    const songList = songListResponse?.data?.itemList || [];
    useEffect(() => {
        if (songListResponse) {
            updateSongList(prevSongList => prevSongList.concat(songList));
        }
    }, [songListResponse, updateSongList]);
    return (
        <div className="mb-4 overflow-y-auto">
            <h1 className="mb-5 text-2xl font-bold">所有歌曲</h1>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {songList.map(song => (
                    <SongItem key={song._id} id={song._id} {...song} />
                ))}
            </div>
        </div>
    );
}

export default Song;
