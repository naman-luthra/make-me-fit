import { useSelector } from "react-redux";
import { Dashborad } from "./features/Dashboard";
import { Navbar } from "./features/generalComponents/Navbar";
import { userDetails } from "./features/Login/authSlice";

export const App = () => {
  const user = useSelector(userDetails);
  if(user===null) return (<div className="flex"><div className="place-self-center">Authorising...</div></div>);
  return (
    <div className="App">
      <Navbar />
      <Dashborad />
    </div>
  );
}