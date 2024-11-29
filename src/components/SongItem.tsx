function SongItem({ name, image, desc, id }: { name: string; image: string; desc: string; id: number }) {
    // const imageRef = useImageLazyLoad();
    return (
        <div className="min-w-[180px] cursor-pointer snap-start rounded px-3 py-2 hover:bg-[#ffffff26]">
            <img className="rounded" src={image} loading="lazy" alt="" />
            <p className="mb-1 mt-2 font-bold">{name}</p>
            <p className="text-sm text-main">{desc}</p>
        </div>
    );
}

export default SongItem;
