import { createSlice } from '@reduxjs/toolkit';
import { creatMealPlan, createFitnessPlan, createWorkoutRoutine, getUserData, submitBasicInfo } from './dataThunk';

const initialState = {
    bodyMetrics: null,
    fitnessPlans: [],
    activeFitnessPlan: null,
    mealPlan: null,
    workoutRoutine: null,
    status: 'idle',
    newUser: false,
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setDataStatus: (state,action)=>{
            state.status=action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitBasicInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(submitBasicInfo.fulfilled, (state, action) => {
                if(action.payload.type==='success'){
                    state.status = 'success';
                    state.bodyMetrics = action.payload.bodyMetrics;
                    state.newUser = false;
                } else {
                    state.status = action.payload.message;
                }
            })
            .addCase(getUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                if(action.payload.type==='success'){
                    state.status = 'success';
                    state.bodyMetrics = action.payload.bodyMetrics;
                    state.fitnessPlans = action.payload.fitnessPlans;
                    state.activeFitnessPlan = action.payload.activeFitnessPlan;
                    state.mealPlan = action.payload.mealPlan;
                    state.workoutRoutine = action.payload.workoutRoutine;
                    state.newUser = action.payload.newUser;
                } else {
                    state.status = action.payload.message;
                }
            })
            .addCase(creatMealPlan.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(creatMealPlan.fulfilled, (state, action) => {
                if(action.payload.type==='success'){
                    state.status = 'success';
                    const mealPlanTable =  action.payload.mealPlan.split('\n').map((item)=>item.split('|'));
                    const mealPlanObj = ['1','2','3','4','5','6','7'].map((day)=>{
                        const dayPlan = {};
                        mealPlanTable.forEach((item)=>{
                            if(item[0]===day){
                                dayPlan[item[1].toLowerCase()] = {
                                    name: item[2],
                                    calories: item[3],
                                };
                            }
                        });
                        return dayPlan;
                    })
                    state.mealPlan = {
                        id: action.payload.mealPlanId,
                        data: mealPlanObj,
                    }                      
                } else {
                    state.status = action.payload.message;
                }
            })
            .addCase(createWorkoutRoutine.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createWorkoutRoutine.fulfilled, (state, action) => {
                if(action.payload.type==='success'){
                    state.status = 'success';
                    const workoutRoutineTable =  action.payload.workoutRoutine.split('\n').map((item)=>item.split('|'));
                    const workoutRoutineObj = ['1','2','3','4','5','6','7'].map((day)=>{
                        const dayPlan = [];
                        workoutRoutineTable.forEach((item)=>{
                            if(item[0]===day){
                                dayPlan.push({
                                    name: item[1],
                                    sets: item[2],
                                    reps: item[3],
                                    muscleGroup: item[4],
                                });
                            }
                        });
                        return dayPlan;
                    })
                    state.workoutRoutine = {
                        id: action.payload.workoutRoutineId,
                        data: workoutRoutineObj,
                    }                      
                } else {
                    state.status = action.payload.message;
                }
            })
            .addCase(createFitnessPlan.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createFitnessPlan.fulfilled, (state, action) => {
                if(action.payload.type==='success'){
                    state.status = 'success';
                    state.fitnessPlans = [...state.fitnessPlans, action.payload.fitnessPlanId];
                    state.activeFitnessPlan = action.payload.fitnessPlanId;
                } else {
                    state.status = action.payload.message;
                }
            });
    }
});

export const { setDataStatus } = dataSlice.actions;
export const dataStatus = state => state.data.status;
export const bodyMetrics = state => state.data.bodyMetrics;
export const fitnessPlans = state => state.data.fitnessPlans;
export const activeFitnessPlan = state => state.data.activeFitnessPlan;
export const mealPlan = state => state.data.mealPlan;
export const workoutRoutine = state => state.data.workoutRoutine;
export const newUser = state => state.data.newUser;