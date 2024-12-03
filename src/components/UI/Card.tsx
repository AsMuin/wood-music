function Card({ className = '', ...props }: any) {
    return <div {...props} className={className + ' m-2 flex flex-col items-start justify-start gap-1 rounded bg-nav p-4 font-semibold'}></div>;
}
export default Card;
