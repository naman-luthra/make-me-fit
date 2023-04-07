import { useDispatch } from "react-redux";
import { logOut } from "./features/Login/authSlice";

export const App = () => {
  const dispatch = useDispatch();
  return (
    <div className="App">
      <button onClick={()=>dispatch(logOut())} className="py-1.5 px-3 rounded-md bg-gray-600 text-white hover:opacity-90">
        Sign Out
      </button>
    </div>
  );
}