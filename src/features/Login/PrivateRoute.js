import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getJWTFromStorage, isAuthorised, setStatus, setUserData, status }  from './authSlice';
export const PrivateRoute = ({children})=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getJWTFromStorage());
        dispatch(setUserData());
        dispatch(setStatus('checkedAuth'));
    },[dispatch]);
    const isAuthorisedState = useSelector(isAuthorised);
    const statusState = useSelector(status);

    if(!isAuthorisedState && statusState==='checkedAuth') return <Navigate to='/signin' />
    else if(!isAuthorisedState) return <div className="flex"><div className="place-self-center">Authorising...</div></div>

    return children;
}