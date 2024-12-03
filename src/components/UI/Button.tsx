function Button({ className = '', type, ...props }: any) {
    if (type === 'main' || !type) {
        return (
            <button
                {...props}
                className={
                    className + ' bg-main px-4 py-1.5 text-[15px] text-invert duration-200 hover:scale-105 hover:bg-muted hover:text-muted'
                }></button>
        );
    } else if (type === 'secondary') {
        return (
            <button
                {...props}
                className={
                    className + ' bg-base px-4 py-1.5 text-[15px] text-main duration-200 hover:scale-105 hover:bg-nav hover:text-muted'
                }></button>
        );
    }
}
export default Button;
