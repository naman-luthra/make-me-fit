import { useSelector } from "react-redux";
import { userDetails } from "./features/Login/authSlice";
import { GettingStarted } from "./features/GettingStarted";
import { Dashborad } from "./features/Dashboard";
import { Navbar } from "./features/generalComponents/Navbar";

export const App = () => {
  const user = useSelector(userDetails);
  if(user===null) return (<div className="flex"><div className="place-self-center">Authorising...</div></div>);
  return (
    <div className="App">
      <Navbar />
      {
        user.newUser ?
        <GettingStarted /> :
        <Dashborad />
      }
    </div>
  );
}