import usePlayerStore from '@/service/store/Player';
import { assets } from '../assets/assets';
import { useCallback, useEffect, useRef, useState } from 'react';
import { formatTime } from '@/utils/formatTime';
import { useShallow } from 'zustand/shallow';
function Player() {
    const songData = usePlayerStore(useShallow(state => state.songData));
    const playStatus = usePlayerStore(state => state.playStatus);
    const { togglePlay, pause, play, updateSongIndex } = usePlayerStore(state => state.actions);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const barRef = useRef<HTMLHRElement | null>(null);
    const barContainerRef = useRef<HTMLDivElement | null>(null);
    const [currentTime, setCurrentTime] = useState<string>('00:00');
    const onPlayerEnded = useCallback(() => {
        pause();
        const audio = audioRef.current;
        if (!audio) {
            return;
        }
        audio.currentTime = 0;
        const bar = barRef.current;
        setCurrentTime('00:00');
        if (!bar) {
            return;
        }
        bar.style.width = '0%';
    }, [pause]);
    const onUpdateBar = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent, changeCurrentTime: boolean = false) => {
        const audio = audioRef.current;
        const bar = barRef.current;
        const barContainer = barContainerRef.current;

        if (!audio || !bar || !barContainer) {
            return;
        }

        const duration = audio.duration;
        const rect = barContainer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        // 限制 newWidth 范围在 0-1 之间
        const newWidth = Math.max(0, Math.min(x / rect.width, 1));
        const newTime = newWidth * duration;
        audio.currentTime = newTime;
        setCurrentTime(formatTime(newTime, 'mm:ss'));
        bar.style.width = `${newWidth * 100}%`;
        if (changeCurrentTime) {
            audio.currentTime = newTime;
        }
    }, []);
    function handlePlayerBar(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const audio = audioRef.current;
        const bar = barRef.current;
        if (!audio || !bar) {
            return;
        }

        const rect = (e.target as HTMLDivElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newWidth = x / rect.width;
        const duration = audio.duration;
        const newTime = newWidth * duration;
        audio.currentTime = newTime;
        setCurrentTime(formatTime(newTime, 'mm:ss'));
        bar.style.width = `${newWidth * 100}%`;
        if (!playStatus) {
            togglePlay();
        }
    }
    function moveBar(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const audio = audioRef.current;
        const bar = barRef.current;
        if (!audio || !bar) {
            return;
        }

        audio.pause();
        document.body.style.userSelect = 'none';
        audio.removeEventListener('ended', onPlayerEnded);

        onUpdateBar(e);
        const finishMove = (e: MouseEvent) => {
            document.body.style.userSelect = 'auto';
            onUpdateBar(e, true);
            if (!playStatus) {
                play();
            } else {
                audio.play();
            }
            audio.addEventListener('ended', onPlayerEnded);
            window.removeEventListener('mousemove', onUpdateBar);
            window.removeEventListener('mouseup', finishMove);
        };
        window.addEventListener('mousemove', onUpdateBar);
        window.addEventListener('mouseup', finishMove);
    }
    useEffect(() => {
        const audio = audioRef.current;
        const bar = barRef.current;
        console.log('useEffect', playStatus, songData);
        if (!audio || !bar) {
            return;
        }
        if (playStatus) {
            audio.play();
            audio.ontimeupdate = () => {
                const currentTime = audio.currentTime;
                const duration = audio.duration;
                const newWidth = (currentTime / duration) * 100;
                setCurrentTime(formatTime(currentTime, 'mm:ss'));
                bar.style.width = `${newWidth}%`;
            };
            audio.addEventListener('ended', onPlayerEnded);
        } else {
            audio.pause();
        }
        return () => {
            audio.ontimeupdate = null;
            audio.removeEventListener('ended', onPlayerEnded);
        };
    }, [playStatus, pause, songData, onPlayerEnded]);

    return (
        <div className="flex h-[10%] items-center justify-between bg-nav px-4 py-1 text-main">
            <div className="hidden items-center gap-4 lg:flex">
                <img className="w-12" src={songData?.image ?? ''} alt="" />
                <div>
                    <p>{songData?.name ?? ''}</p>
                    <p>{songData?.desc?.slice(0, 12) ?? ''}</p>
                </div>
            </div>
            <div className="m-auto flex flex-col items-center gap-1">
                <div className="flex gap-4">
                    <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="" />
                    <img onClick={() => updateSongIndex(prevIndex => prevIndex - 1)} className="w-4 cursor-pointer" src={assets.prev_icon} alt="" />
                    <img onClick={togglePlay} className="w-4 cursor-pointer" src={playStatus ? assets.pause_icon : assets.play_icon} alt="" />
                    <img onClick={() => updateSongIndex(prevIndex => prevIndex + 1)} className="w-4 cursor-pointer" src={assets.next_icon} alt="" />
                    <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />
                </div>
                <div className="flex items-center gap-5">
                    <p>{currentTime ?? 0}</p>
                    <div
                        ref={barContainerRef}
                        onClick={handlePlayerBar}
                        onMouseDown={moveBar}
                        className="w-[60vw] max-w-[500px] cursor-pointer rounded-full bg-gray-300">
                        <hr ref={barRef} className="pointer-events-none h-1 w-0 rounded-full border-none bg-green-800" />
                    </div>
                    <p>{songData?.duration ?? '00:00'}</p>
                </div>
            </div>
            <div className="hidden items-center gap-2 opacity-75 lg:flex">
                <img className="w-4" src={assets.plays_icon} alt="" />
                <img className="w-4" src={assets.mic_icon} alt="" />
                <img className="w-4" src={assets.queue_icon} alt="" />
                <img className="w-4" src={assets.speaker_icon} alt="" />
                <img className="w-4" src={assets.volume_icon} alt="" />
                <div className="h-1 w-20 rounded bg-slate-50"></div>
                <img className="w-4" src={assets.mini_player_icon} alt="" />
                <img className="w-4" src={assets.zoom_icon} alt="" />
            </div>
            <audio ref={audioRef} src={songData?.file ?? ''}></audio>
        </div>
    );
}

export default Player;
