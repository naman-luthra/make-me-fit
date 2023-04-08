import { createSlice } from '@reduxjs/toolkit';
import { validateSignIn, validateSignUp } from "./authThunks";

const initialState = {
    isAuthorised: false,
    userDetails: null,
    JWT: null,
    status: 'idle'
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setJWT: (state,action)=>{
            localStorage.setItem('token', action.payload);
            state.JWT = action.payload;
        },
        setUserData: (state,action)=>{
            const {JWT} = state;
            if(JWT){
                const encodedUserData = JWT.split('.')[1];
                state.userDetails = JSON.parse(atob(encodedUserData));
                state.isAuthorised=true;
            }
        },
        getJWTFromStorage: (state)=>{
            const token = localStorage.getItem('token');
            state.JWT=token;
        },
        setStatus: (state,action)=>{
            state.status=action.payload;
        },
        logOut: (state)=>{
            localStorage.removeItem("token");
            state.isAuthorised = false;
            state.userDetails = null;
            state.JWT = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(validateSignIn.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(validateSignIn.fulfilled, (state, action) => {
                if(action.payload.type==='success'){
                    state.status = 'success';
                    state.JWT = action.payload.token;
                    localStorage.setItem('token', action.payload.token);
                    state.isAuthorised = true;
                } else {
                    state.status = action.payload.message;
                }
            })
            .addCase(validateSignUp.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(validateSignUp.fulfilled, (state, action) => {
                if(action.payload.type==='success'){
                    state.status = 'success';
                    state.JWT = action.payload.token;
                    localStorage.setItem('token', action.payload.token);
                    state.isAuthorised = true;
                } else {
                    state.status = action.payload.message;
                }
            });
    },
});

export const status = state=>state.auth.status;
export const userDetails = state=>state.auth.userDetails;
export const isAuthorised = state=>state.auth.isAuthorised;
export const { setJWT, setUserData, getJWTFromStorage, setStatus, logOut } = authSlice.actions;
