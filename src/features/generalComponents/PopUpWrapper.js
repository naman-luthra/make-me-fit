export const PopUpWrapper = ({children, className, show, setShow}) => {
    if(!show) return <></>;
    return (
        <div onClick={()=>setShow(false)} className={`fixed z-50 top-0 left-0 w-full h-screen bg-black bg-opacity-20 flex justify-center items-center`}>
            <div onClick={e=>e.stopPropagation()} className={`${className}`}>
                {
                    children
                }
            </div>
        </div>
    );
}