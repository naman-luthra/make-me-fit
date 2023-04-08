import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom';
import { validateSignIn } from "./authThunks";
import { status, isAuthorised, setJWT, setUserData, setStatus } from "./authSlice";
import { useDispatch } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";
import { MdLock } from "react-icons/md";
import { Loading } from "../generalComponents/Loading";

export const SignIn = ()=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const isAuthorisedState = useSelector(isAuthorised);
    const statusState = useSelector(status);
    const [ emailAlert, setEmailAlert ] = useState(false);
    const [ passwordAlert, setPasswordAlert ] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSignIn = () => {
        if(!email || !password){
            if(!email) setEmailAlert(true);
            if(!password) setPasswordAlert(true);
            return;
        }  
        dispatch(validateSignIn({email,password,setJWT,setUserData}));
    }

    useEffect(()=>{
        dispatch(setStatus('idle'));
        document.title="Sign In";
    },[dispatch]);

    if(isAuthorisedState) return <Navigate to='/' />;

    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="grid grid-cols-4 gap-6 w-fit">
                <img src="./img/logo.png" alt="" className="rounded-md h-52 w-52"/>
                <div className="col-span-3 flex flex-col justify-between">
                    <div className={`flex mx-auto border w-full bg-white ${(statusState==='Error: 401' || statusState==='Error: 404' || statusState==='Error: 500' || emailAlert) ? "border-red-600 border" : ""} text-[#6B6B6B] rounded-2xl py-4 px-3 placeholder:font-thin`}>
                        <IoMdMail className="h-6 w-6 mr-4 text-basys-blue" />
                        <input className="grow focus:outline-none text-basys-blue placeholder:text-basys-blue placeholder:text-opacity-70 placeholder:font-medium" value={email} onChange={e=>{setEmail(e.target.value); setEmailAlert(false);}} type="text" placeholder="Email Address"/>
                    </div>
                    <div className={`flex mx-auto mt-4 w-full border ${(statusState==='Error: 401' || statusState==='Error: 500' || passwordAlert) ? "border-red-600 border" : ""} bg-white text-[#6B6B6B] rounded-2xl py-4 px-3 placeholder:font-thin`}>
                        <MdLock className="h-6 w-6 mr-4 text-basys-blue" />
                        <input className="grow focus:outline-none text-basys-blue placeholder:text-basys-blue placeholder:text-opacity-70 placeholder:font-medium" value={password} onKeyDown={e=>{if(e.key==='Enter') handleSignIn();}} onChange={e=>{setPassword(e.target.value); setPasswordAlert(false);}} type={passwordVisible ? "text" : "password"}  placeholder="Password"/>
                        {
                            passwordVisible ?
                            <AiFillEye onClick={()=>{setPasswordVisible(!passwordVisible)}} className="h-6 w-6 text-basys-blue"/> :
                            <AiFillEyeInvisible onClick={()=>{setPasswordVisible(!passwordVisible)}} className="h-6 w-6 text-basys-blue"/>
                        }
                    </div>
                    <div className="my-2">
                        <div className="w-full h-4">
                            {
                                statusState==='Error: 401' &&
                                <div className="text-red-600 text-xs">
                                    Wrong email or password!
                                </div>
                            }
                            {
                                statusState==='Error: 404' &&
                                <div className="text-red-600 text-xs">
                                    User doesn't exist!
                                </div>
                            }
                            {
                                (emailAlert || passwordAlert) &&
                                <div className="text-red-600 text-xs">
                                    All fields are mandatory!
                                </div>
                            }
                        </div>
                        <div className="flex justify-between items-center">
                            <div onClick={()=>{navigate('/signup')}} className="cursor-pointer hover:opacity-70">Don't have an account?</div>
                            <button disabled={statusState==='loading'} onClick={handleSignIn} className={`mt-2 w-1/3 bg-gray-800 text-white font-semibold p-2 rounded hover:opacity-70`}>
                                {
                                    statusState==='loading' ?
                                    <Loading width={24} height={24} stroke="white" className="mx-auto"/> :
                                    "Sign In"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}