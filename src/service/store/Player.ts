import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { songsData } from '@/assets/assets';
interface ISongData {
    id: number;
    desc: string;
    name: string;
    file: string;
    image: string;
    duration: string;
}
interface PlayerStore {
    audio: React.MutableRefObject<HTMLAudioElement | null> | null;
    songList: ISongData[];
    songIndex: number;
    songData: ISongData;
    background: string;
    barWidth: number;
    playStatus: boolean;
    trackTime: number;
    actions: {
        setAudio: (player: React.MutableRefObject<HTMLAudioElement | null> | null) => void;
        resetAudio: () => void;
        resetSongData: () => void;
        pause: () => void;
        play: () => void;
        togglePlay: () => void;
        updateTrackTime: (time: number) => void;
        updateSongData: (id: number) => void;
        updateSongIndex: (updateIndex: number | ((prevIndex: number) => number)) => void;
    };
}
const usePlayerStore = create<PlayerStore>()(
    devtools(
        (set, get) => {
            return {
                audio: null,
                background: '#000',
                barWidth: 0,
                songList: songsData,
                songIndex: 0,
                songData: { id: 0, name: '', desc: '', file: '', image: '', duration: '' },
                playStatus: false,
                trackTime: 0,
                actions: {
                    setAudio: audio => set({ audio }, undefined, 'audio/set'),
                    resetAudio: () => set({ audio: null }, undefined, 'audio/reset'),
                    resetSongData: () =>
                        set({ songData: { id: 0, name: '', desc: '', file: '', image: '', duration: '' } }, undefined, 'songData/reset'),
                    pause: () => set({ playStatus: false }, undefined, 'playStatus/pause'),
                    play: () => set({ playStatus: true }, undefined, 'playStatus/play'),
                    togglePlay: () => set(state => ({ playStatus: !state.playStatus }), undefined, `playStatus/toggle=>${!get().playStatus}`),
                    updateTrackTime: (time: number) => set({ trackTime: time }, undefined, 'trackTime/update'),
                    updateSongData: (id: number) =>
                        set(state => {
                            const songData = state.songList.find(song => song.id === id);
                            return {
                                songData,
                                songIndex: state.songList.indexOf(songData || state.songData) ?? -1,
                                playStatus: true
                            };
                        }),
                    updateSongIndex: (updateIndex: number | ((prevIndex: number) => number)) =>
                        set(
                            state => {
                                const prevIndex = state.songIndex;
                                const newIndex = typeof updateIndex === 'function' ? updateIndex(prevIndex) : updateIndex;
                                const songData = state.songList[newIndex];
                                if (newIndex >= 0 && newIndex < state.songList.length && songData) {
                                    return {
                                        songData,
                                        songIndex: newIndex,
                                        playStatus: true
                                    };
                                } else {
                                    return state;
                                }
                            },
                            undefined,
                            'songData/updateIndex'
                        )
                }
            };
        },
        { name: 'Player', store: 'PlayerStore' }
    )
);
export default usePlayerStore;
