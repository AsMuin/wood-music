import { assets, songsData } from '../assets/assets';
function Player() {
    return (
        <div className="flex h-[10%] items-center justify-between bg-black px-4 text-white">
            <div className="hidden items-center gap-4 lg:flex">
                <img className="w-12" src={songsData[0].image} alt="" />
                <div>
                    <p>{songsData[0].name}</p>
                    <p>{songsData[0].desc.slice(0, 12)}</p>
                </div>
            </div>
            <div className="m-auto flex flex-col items-center gap-1">
                <div className="flex gap-4">
                    <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="" />
                    <img className="w-4 cursor-pointer" src={assets.prev_icon} alt="" />
                    <img className="w-4 cursor-pointer" src={assets.play_icon} alt="" />
                    <img className="w-4 cursor-pointer" src={assets.next_icon} alt="" />
                    <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />
                </div>
                <div className="flex items-center gap-5">
                    <p>1:02</p>
                    <div className="w-[60vw] max-w-[500px] cursor-pointer rounded-full bg-gray-300">
                        <hr className="h-1 w-0 rounded-full border-none bg-green-800" />
                    </div>
                    <p>3:19</p>
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
        </div>
    );
}

export default Player;
