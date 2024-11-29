import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
interface PlayerStore {
    player: HTMLAudioElement | null;
    setPlayer: (player: HTMLAudioElement | null) => void;
}
const usePlayerStore = create<PlayerStore>()(
    devtools(
        (set, get) => {
            return {
                player: null,
                setPlayer: player => set({ player }, undefined, 'player/set')
            };
        },
        { name: 'Player', store: 'PlayerStore' }
    )
);
export default usePlayerStore;
