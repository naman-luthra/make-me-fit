import { useDispatch, useSelector } from "react-redux";
import { logOut, userDetails } from "./features/Login/authSlice";
import { GettingStarted } from "./features/GettingStarted";

export const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(userDetails);
  if(user===null) return (<div className="flex"><div className="place-self-center">Authorising...</div></div>);
  return (
    <div className="App p-4">
      <div className="flex justify-end fixed z-50 top-0 left-0 w-full p-4">
        <button onClick={()=>dispatch(logOut())} className="py-1.5 px-3 rounded-md bg-gray-600 text-white hover:opacity-90">
          Sign Out
        </button>
      </div>
      {
        user.newUser ?
        <GettingStarted /> :
        <></>
      }
    </div>
  );
}