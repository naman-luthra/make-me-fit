import { useDispatch } from "react-redux";
import { logOut } from "../Login/authSlice";

export const Navbar = () => {
    const dispatch = useDispatch();
    return (
        <div className="flex items-center justify-between fixed z-50 top-0 left-0 w-full p-4 bg-gray-200">
            <img src="./img/logo-no-bg.png" alt="" className="h-12" />
            <button onClick={()=>dispatch(logOut())} className="py-1.5 px-3 rounded-md bg-gray-600 text-white hover:opacity-90 h-fit">
                Sign Out
            </button>
        </div>
    );
}