import { createAsyncThunk } from "@reduxjs/toolkit";

export const submitBasicInfo = createAsyncThunk(
    'data/submitBasicInfo',
    async ({ dob, gender, weight, height, diet, activity, weightGoal, activityGoal  }, {getState} ) => {
        try {
            const reqObject={
                user_id: getState().auth.userDetails.user_id,
                dob,
                gender,
                weight,
                height,
                diet,
                activity,
                weightGoal,
                activityGoal
            };
            const body=JSON.stringify(reqObject);
            await fetch(`${process.env.BACKEND_URL}/api/submit-user-info`,{
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
            return {type: 'success', bodyMetrics: {dob, gender, weight, height, diet, activity, weightGoal, activityGoal}};
        } catch (error) {
            return {type: 'error', message: error.toString()};
        }
    }
);

export const getUserData = createAsyncThunk(
    'data/getUserData',
    async ( _ , {getState} ) => {
        try {
            const reqObject = {
                user_id: getState().auth.userDetails.user_id
            }
            const body=JSON.stringify(reqObject);
            const response  = await fetch(`${process.env.BACKEND_URL}/api/get-user-data`,{
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
            return {
                type: 'success', 
                bodyMetrics: response.bodyMetrics, 
                fitnessPlans: response.fitnessPlans, 
                activeFitnessPlan: response.activeFitnessPlan, 
                newUser: response.newUser, 
                image: response.image,
                todayHistory: response.todayHistory,
            };
        } catch (error) {
            return {type: 'error', message: error.toString()};
        }
    }
);

export const creatMealPlan = createAsyncThunk(
    'data/creatMealPlan',
    async ({regenerate, plan, mealPlanName, cuisine, place, breakfast, lunch, dinner, snacks}, {getState}) => {
        try {
            const reqObject = {
                user_id: getState().auth.userDetails.user_id,
                fitnessPlanId: plan==="fitness" ? null : getState().data.activeFitnessPlan?.id,
                mealPlanId: regenerate ? getState().data.mealPlan.id : null,
                mealPlanName,
                cuisine,
                place,
                breakfast,
                lunch,
                dinner,
                snacks
            }
            const body=JSON.stringify(reqObject);
            const response = await fetch(`${process.env.BACKEND_URL}/api/create-meal-plan`,{
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
            return {type: 'success', mealPlan: response, regenerate};
        } catch (error) {
            return {type: 'error', message: error.toString()};
        }
    }
);

export const createWorkoutRoutine = createAsyncThunk(
    'data/createWorkoutRoutine',
    async ({regenerate, plan, workoutRoutineName, goal, equipment}, {getState}) => {
        try {
            const reqObject = {
                user_id: getState().auth.userDetails.user_id,
                fitnessPlanId: plan==="fitness" ? null : getState().data.activeFitnessPlan?.id,
                workoutRoutineId: regenerate ? getState().data.activeWorkoutRoutine.id : null,
                workoutRoutineName,
                goal,
                equipment
            }
            const body=JSON.stringify(reqObject);
            const response = await fetch(`${process.env.BACKEND_URL}/api/create-workout-routine`,{
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getState().auth.JWT}`
                },
                body,
            }).then(res=>{
                if(res.status!==200) throw new Error(`${res.status}`);
                return res;
            }
            ).then(res=>res.json());
            return {type: 'success', workoutRoutine: response, regenerate};
        } catch (error) {
            return {type: 'error', message: error.toString()};
        }
    }
);

export const createFitnessPlan = createAsyncThunk(
    'data/createFitnessPlan',
    async ({planName}, {getState}) => {
        try {
            const reqObject = {
                user_id: getState().auth.userDetails.user_id,
                planName,
                mealPlanId: getState().data.activeMealPlan.id,
                workoutRoutineId: getState().data.activeWorkoutRoutine.id,
            }
            const body=JSON.stringify(reqObject);
            const response = await fetch(`${process.env.BACKEND_URL}/api/create-fitness-plan`,{
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getState().auth.JWT}`
                },
                body,
            }).then(res=>{
                if(res.status!==200) throw new Error(`${res.status}`);
                return res;
            }
            ).then(res=>res.json());
            return {type: 'success', fitnessPlanId: response.fitnessPlanId, fitnessPlanName: planName};
        } catch (error) {
            console.log(error);
            return {type: 'error', message: error.toString()};
        }
    }
);

export const setUserImage = createAsyncThunk(
    'data/setUserImage',
    async ({image}, {getState}) => {
        try {
            const toBase64 = file => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
            const imageString = await toBase64(image);
            const reqObject = {
                user_id: getState().auth.userDetails.user_id,
                image: imageString,
            }
            console.log(reqObject);
            const body=JSON.stringify(reqObject);
            await fetch(`${process.env.BACKEND_URL}/api/upload-user-image`,{
                method: "post",
                headers:  {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getState().auth.JWT}`
                },
                body,
            }).then(res=>{
                if(res.status!==200) throw new Error(`${res.status}`);
                return res;
            }).then(res=>res.json());
            return {type: 'success', image: imageString};
        } catch (error) {
            if(error) return {type: 'error', message: error.toString()};
        }
    }
);

export const updateUserMetrics = createAsyncThunk(
    'data/updateUserMetrics',
    async ({weight, height, weightGoal, gender}, {getState}) => {
        try {
            const reqObject = {
                user_id: getState().auth.userDetails.user_id,
                weight,
                height,
                weightGoal,
                gender,
            }
            const body=JSON.stringify(reqObject);
            await fetch(`${process.env.BACKEND_URL}/api/update-user-metrics`,{
                method: "post",
                headers:  {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getState().auth.JWT}`
                },
                body,
            }).then(res=>{
                if(res.status!==200) throw new Error(`${res.status}`);
                return res;
            }).then(res=>res.json());
            const {dob, diet, activity, activityGoal} = getState().data.bodyMetrics;
            return {type: 'success', bodyMetrics: {dob, gender, weight, height, diet, activity, weightGoal, activityGoal}};
        } catch (error) {
            if(error) return {type: 'error', message: error.toString()};
        }
    }
);
export const getPlanData = createAsyncThunk(
    'data/getPlanData',
    async ({planId}, {getState}) => {
        try {
            const reqObject = {
                user_id: getState().auth.userDetails.user_id,
                plan_id: planId,
            };
            const body=JSON.stringify(reqObject);
            const response = await fetch(`${process.env.BACKEND_URL}/api/get-plan-data`,{
                method: "post",
                headers:  {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getState().auth.JWT}`
                },
                body,
            }).then(res=>{
                if(res.status!==200) throw new Error(`${res.status}`);
                return res;
            }).then(res=>res.json());
            return {type: 'success', activeFitnessPlan: response.activeFitnessPlan};
        } catch (error) {
            if(error) return {type: 'error', message: error.toString()};
        }

    }
);

export const saveUserProgress = createAsyncThunk(
    'data/saveUserProgress',
    async ({weight,water,food,excercise}, {getState}) => {
        try {
            const reqObject = {
                user_id: getState().auth.userDetails.user_id,
                weight,
                water,
                food,
                excercise,
            };
            const body=JSON.stringify(reqObject);
            await fetch(`${process.env.BACKEND_URL}/api/save-user-progress`,{
                method: "post",
                headers:  {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getState().auth.JWT}`
                },
                body,
            }).then(res=>{
                if(res.status!==200) throw new Error(`${res.status}`);
                return res;
            }).then(res=>res.json());
            return {
                type: 'success', 
                todayHistory: {
                    weight,
                    water,
                    food,
                    excercise,
                }
            };
        } catch (error) {
            if(error) return {type: 'error', message: error.toString()};
        }
    }
);

export const getUserHistory = createAsyncThunk(
    'data/getUserHistory',
    async (_, {getState}) => {
        try {
            const reqObject = {
                user_id: getState().auth.userDetails.user_id,
            };
            const body=JSON.stringify(reqObject);
            const response = await fetch(`${process.env.BACKEND_URL}/api/get-user-history`,{
                method: "post",
                headers:  {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getState().auth.JWT}`
                },
                body,
            }).then(res=>{
                if(res.status!==200) throw new Error(`${res.status}`);
                return res;
            }).then(res=>res.json());
            return {type: 'success', userHistory: response.userHistory};
        } catch (error) {
            if(error) return {type: 'error', message: error.toString()};   
        }
    }
);