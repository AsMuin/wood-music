function AlbumItem({ image, name, desc, id }: { image: string; name: string; desc: string; id: number }) {
    return (
        <div className="min-w-[180px] cursor-pointer rounded p-2 px-3 hover:bg-[#ffffff26]">
            <img className="rounded" src={image} alt="" />
            <p className="mb-1 mt-2 font-bold">{name}</p>
            <p className="text-sm text-main">{desc}</p>
        </div>
    );
}

export default AlbumItem;
