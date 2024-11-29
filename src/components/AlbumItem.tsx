import { useNavigate } from 'react-router-dom';

function AlbumItem({ image, name, desc, id }: { image: string; name: string; desc: string; id: number }) {
    // const imageRef = useImageLazyLoad();
    const navigate = useNavigate();
    return (
        <div
            onClick={() => {
                navigate(`album/${id}`);
            }}
            className="min-w-[180px] cursor-pointer snap-start rounded px-3 py-2 hover:bg-[#ffffff26]">
            <img className="rounded" src={image} loading="lazy" alt="" />
            <p className="mb-1 mt-2 font-bold">{name}</p>
            <p className="text-sm text-main">{desc}</p>
        </div>
    );
}

export default AlbumItem;
