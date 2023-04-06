export const Loading = ({className, width, height, stroke}) => {
    return (
        <svg height="110" width="110" viewBox="0 0 110 110" style={{width, height}} className={`${className} animate-spin`}>
            <path d={`M5 55 A50 50 0 0 1 105 55`} stroke={stroke} strokeWidth={10} fill="none"/>
            <path d={`M105 54 A50 50 0 0 1 55 105`} stroke={stroke} strokeWidth={10} fill="none"/>
        </svg>
    );
}