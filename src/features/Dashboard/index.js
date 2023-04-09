import { useSelector } from "react-redux";
import { userDetails } from "../Login/authSlice";

export const Dashborad = () => {
    const user = useSelector(userDetails);
    return (
        <div className="p-4 pt-20">
            <div className="text-4xl font-semibold">
                <span className="text-gray-700">Welcome </span>
                <span className="text-gray-900">{user.firstName}!</span>
            </div>
        </div>
    
    );
}