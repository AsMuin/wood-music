import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { songsData } from '@/assets/assets';
interface PlayerStore {
    audio: React.MutableRefObject<HTMLAudioElement | null> | null;
    songData: null | {
        desc: string;
        name: string;
        file: string;
        image: string;
        duration: string;
    };
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
    };
}
const usePlayerStore = create<PlayerStore>()(
    devtools(
        (set, get) => {
            return {
                audio: null,
                background: '#000',
                barWidth: 0,
                songData: songsData[0],
                playStatus: false,
                trackTime: 0,
                actions: {
                    setAudio: audio => set({ audio }, undefined, 'audio/set'),
                    resetAudio: () => set({ audio: null }, undefined, 'audio/reset'),
                    resetSongData: () => set({ songData: { name: '', desc: '', file: '', image: '', duration: '' } }, undefined, 'songData/reset'),
                    pause: () => set({ playStatus: false }, undefined, 'playStatus/pause'),
                    play: () => set({ playStatus: true }, undefined, 'playStatus/play'),
                    togglePlay: () => set(state => ({ playStatus: !state.playStatus }), undefined, `playStatus/toggle=>${!get().playStatus}`),
                    updateTrackTime: (time: number) => set({ trackTime: time }, undefined, 'trackTime/update'),
                    updateSongData: (id: number) => set({ songData: songsData[id], playStatus: true }, undefined, 'SongData/update')
                }
            };
        },
        { name: 'Player', store: 'PlayerStore' }
    )
);
export default usePlayerStore;
