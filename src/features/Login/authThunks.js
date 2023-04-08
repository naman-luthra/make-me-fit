import { createAsyncThunk } from "@reduxjs/toolkit";

export const validateSignIn = createAsyncThunk(
    'auth/validateSignIn',
    async ({ email, password } ) => {
        try {
            const reqObject={
                email,
                password,
            };
            const body=JSON.stringify(reqObject);
            const response = await fetch('http://localhost:8080/api/signin',{
                method: "post",
                headers: { "Content-Type": "application/json" },
                body,
            }).then(res=>{
                if(res.status!==200) throw new Error(`${res.status}`);
                return res;
            }).then(res=>res.json());
            const { token } = response;
            return {type: 'success', token};
        } catch (error) {
            return {type: 'error', message: error.toString()};
        }
    }
);

export const validateSignUp = createAsyncThunk(
    'auth/validateSignUp',
    async ({ firstName, lastName, email, password } ) => {
        try {
            const reqObject={
                firstName,
                lastName,
                email,
                password,
            };
            const body=JSON.stringify(reqObject);
            const response = await fetch('http://localhost:8080/api/signup',{
                method: "post",
                headers: { "Content-Type": "application/json" },
                body,
            }).then(res=>{
                if(res.status!==200) throw new Error(`${res.status}`);
                return res;
            }).then(res=>res.json());
            const { token } = response;
            return {type: 'success', token};
        } catch (error) {
            return {type: 'error', message: error.toString()};
        }
    }
);

export const submitBasicInfo = createAsyncThunk(
    'auth/submitBasicInfo',
    async ({ age, gender, weight, height, diet, activity, weightGoal, activityGoal  }, {dispatch, getState} ) => {
        try {
            const reqObject={
                user_id: getState().auth.userDetails.user_id,
                age,
                gender,
                weight,
                height,
                diet,
                activity,
                weightGoal,
                activityGoal
            };
            const body=JSON.stringify(reqObject);
            const response = await fetch('http://localhost:8080/api/submit-user-info',{
                method: "post",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getState().auth.JWT}`
                },
                body,
            }).then(res=>{
                if(res.status!==200) throw new Error(`${res.status}`);
                return res;
            }).then(res=>res.json());
            const { token } = response;
            return {type: 'success', token};
        } catch (error) {
            return {type: 'error', message: error.toString()};
        }
    }
);