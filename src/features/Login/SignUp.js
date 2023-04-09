import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { validateSignUp } from "./authThunks";
import { isAuthorised, setStatus, status } from "./authSlice";
import { Loading } from "../generalComponents/Loading";
import { Navigate } from "react-router-dom";

export const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
    const [alert, setAlert] = useState(null);
    const dispatch = useDispatch();

    const statusState = useSelector(status);
    const isAuthorisedState = useSelector(isAuthorised);

    useEffect(()=>{
        dispatch(setStatus('idle'));
        document.title="Sign Up";
    },[dispatch]);

    if(isAuthorisedState) return <Navigate to='/' />;

    return (
        <div className="flex gap-5 justify-center items-center h-screen">
            <img src="./img/logo.png" alt="" className="rounded-md h-56"/>
            <div className="">
                <div className="font-semibold text-2xl flex gap-3 items-center text-gray-600">
                    <span>I am</span>
                    <div className="flex gap-2">
                        <input type="text" value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="John" className={`bg-gray-200 text-gray-800 p-1 focus:outline-none text-center focus:placeholder-gray-200 border-2 rounded-md ${alert ? (alert.code===1 && !firstName) ? 'border-red-500' : 'border-gray-200' : 'border-gray-200'}`} style={{width:`${Math.max(5,firstName.length+1)}ch`}}/>
                        <input type="text" value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="Doe" className={`bg-gray-200 text-gray-800 p-1 focus:outline-none text-center focus:placeholder-gray-200 border-2 rounded-md ${alert ? (alert.code===1 && !lastName) ? 'border-red-500' : 'border-gray-200' : 'border-gray-200'}`} style={{width:`${Math.max(4,lastName.length+1)}ch`}}/>
                    </div>
                </div>
                <div className="font-bold text-2xl flex gap-3 items-center text-gray-600 mt-3">
                    <span>My email is</span>
                    <input type="text" value={email} onChange={e=>setEmail(e.target.value)} placeholder="johndoe@mail.com" className={`bg-gray-200 text-gray-800 p-1 focus:outline-none text-center focus:placeholder-gray-200 border-2 rounded-md ${alert ? (alert.code===1 && !email) ? 'border-red-500' : 'border-gray-200' : 'border-gray-200'}`} style={{width:`${Math.max(16,email.length+1)}ch`}}/>
                </div>
                <div className="font-bold text-2xl flex gap-3 items-center text-gray-600 mt-3">
                    <div className={`bg-gray-200 text-gray-800 p-2 flex gap-1 items-center border-2 rounded-md ${alert ? ((alert.code===2 && password!==passwordConfirm) || (alert.code===1 && !password)) ? 'border-red-500' : 'border-gray-200' : 'border-gray-200'}`}>
                        <input type={passwordVisible ? "text" : "password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="focus:outline-none bg-transparent text-center focus:placeholder-gray-200" style={{width:`${passwordVisible ? Math.max(8,password.length) : Math.max(8,password.length-2)}ch`}}/>
                        {
                            passwordVisible ? 
                            <AiFillEye className="text-gray-600" onClick={()=>setPasswordVisible(false)}/> :
                            <AiFillEyeInvisible className="text-gray-600" onClick={()=>setPasswordVisible(true)}/>
                        }
                    </div>
                    <div className={`bg-gray-200 text-gray-800 p-2 flex gap-1 items-center border-2 rounded-md ${alert ? ((alert.code===2 && password!==passwordConfirm) || (alert.code===1 && !passwordConfirm)) ? 'border-red-500' : 'border-gray-200' : 'border-gray-200'}`}>
                        <input type={passwordConfirmVisible ? "text" : "password"} value={passwordConfirm} onChange={e=>setPasswordConfirm(e.target.value)} placeholder="Confirm" className="focus:outline-none bg-transparent text-center focus:placeholder-gray-200" style={{width:`${passwordConfirmVisible ? Math.max(8,passwordConfirm.length) : Math.max(8,passwordConfirm.length-2)}ch`}}/>
                        {
                            passwordConfirmVisible ?
                            <AiFillEye className="text-gray-600" onClick={()=>setPasswordConfirmVisible(false)}/> :
                            <AiFillEyeInvisible className="text-gray-600" onClick={()=>setPasswordConfirmVisible(true)}/>
                        }
                    </div>
                </div>
                <div className="text-red-500 text-xs h-4 mt-1">
                    {
                        alert ? 
                            (alert.code===1 && (!firstName || !lastName || !email || !password || !passwordConfirm)) ? alert.message :
                            (alert.code===2 && (password!==passwordConfirm)) ? alert.message :
                            '' :
                        ''
                    }
                    {
                        statusState.slice(0,5)==='Error' && alert===null ?
                            statusState.slice(7)==='409' ? "Email already exists!" :
                            '' :
                        ''
                    }
                </div>
                <button onClick={()=>{
                    if(!firstName || !lastName || !email || !password || !passwordConfirm){
                        return setAlert({code:1,message:"Please fill all the fields!"});
                    }
                    else if(password!==passwordConfirm){
                        return setAlert({code:2,message:"Passwords do not match!"});
                    }
                    dispatch(validateSignUp({firstName,lastName,email,password}));
                    setAlert(null);
                }}  disabled={statusState==='loading'}
                className="py-1.5 px-3 w-32 text-xl font-semibold rounded-md bg-gray-600 text-white hover:opacity-90 mt-2">
                    {
                        statusState==='loading' ?
                        <Loading width={28} height={28} stroke="white" className="mx-auto"/> :
                        "Sign Up"
                    }
                </button>
            </div>
        </div>
    );
}