function Button({...props}){
    if(props.type==='main' || !props.type){
        return (
            <button {...props}  className={(props.className ?? '') + ' bg-main px-4 py-1.5 text-[15px] text-invert duration-200 hover:bg-muted hover:text-muted hover:scale-105'}></button>
       )
    }else if(props.type==='secondary'){
        return (
            <button {...props} className={(props.className?? '') +' bg-base px-4 py-1.5 text-[15px] text-main duration-200 hover:bg-nav hover:text-muted hover:scale-105'}></button>
        )
    }
}
export default Button;