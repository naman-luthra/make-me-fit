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
            await fetch('http://localhost:8080/api/submit-user-info',{
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
            const response  = await fetch('http://localhost:8080/api/get-user-data',{
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
            return {type: 'success', bodyMetrics: response.bodyMetrics, fitnessPlans: response.fitnessPlans, activeFitnessPlan: response.activeFitnessPlan, mealPlan: response.mealPlan, workoutRoutine: response.workoutRoutine, newUser: response.newUser};
        } catch (error) {
            return {type: 'error', message: error.toString()};
        }
    }
);

export const creatMealPlan = createAsyncThunk(
    'data/creatMealPlan',
    async ({regenerate, mealPlanName, cuisine, place, breakfast, lunch, dinner, snacks}, {getState}) => {
        try {
            const reqObject = {
                user_id: getState().auth.userDetails.user_id,
                fitnessPlanId: getState().data.activeFitnessPlan?.id,
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
            const response = await fetch('http://localhost:8080/api/create-meal-plan',{
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
    async ({regenerate, workoutRoutineName, goal, equipment}, {getState}) => {
        try {
            const reqObject = {
                user_id: getState().auth.userDetails.user_id,
                fitnessPlanId: getState().data.activeFitnessPlan?.id,
                workoutRoutineId: regenerate ? getState().data.activeWorkoutRoutine.id : null,
                workoutRoutineName,
                goal,
                equipment
            }
            const body=JSON.stringify(reqObject);
            const response = await fetch('http://localhost:8080/api/create-workout-routine',{
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
            const response = await fetch('http://localhost:8080/api/create-fitness-plan',{
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