import { createSlice } from '@reduxjs/toolkit';
import { creatMealPlan, createFitnessPlan, createWorkoutRoutine, getUserData, submitBasicInfo } from './dataThunk';

const initialState = {
    bodyMetrics: null,
    fitnessPlans: [],
    activeFitnessPlan: null,
    activeMealPlan: null,
    activeWorkoutRoutine: null,
    status: 'idle',
    newUser: false,
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setDataStatus: (state,action)=>{
            state.status=action.payload;
        },
        setActiveMealPlan: (state,action)=>{
            state.activeMealPlan=action.payload;
        },
        setActiveWorkoutRoutine: (state,action)=>{
            state.activeWorkoutRoutine=action.payload;
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
                    if(action.payload.activeFitnessPlan){
                        state.activeMealPlan =  action.payload.activeFitnessPlan.mealPlans.find(plan=>plan.id===action.payload.activeFitnessPlan.activeMealPlanId);
                        state.activeWorkoutRoutine = action.payload.activeFitnessPlan.workoutRoutines.find(routine=>routine.id===action.payload.activeFitnessPlan.activeWorkoutRoutineId);
                    }
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
                    const filteredPlans = action.payload.regenerate ? state.activeFitnessPlan.mealPlans.filter(plan=>plan.id!==state.activeMealPlan.id) : null;
                    state.activeMealPlan = action.payload.mealPlan;
                    if(state.activeFitnessPlan) 
                        state.activeFitnessPlan.mealPlans = action.payload.regenerate ? [...filteredPlans, action.payload.mealPlan] : [...state.activeFitnessPlan.mealPlans, action.payload.mealPlan];          
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
                    const filteredRoutines = action.payload.regenerate ? state.activeFitnessPlan.workoutRoutines.filter(routine=>routine.id!==state.activeWorkoutRoutine.id) : null;
                    state.activeWorkoutRoutine = action.payload.workoutRoutine;
                    if(state.activeFitnessPlan) 
                        state.activeFitnessPlan.workoutRoutines = action.payload.regenerate ? [...filteredRoutines, action.payload.workoutRoutine] : [...state.activeFitnessPlan.workoutRoutines, action.payload.workoutRoutine];                  
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
                    state.activeFitnessPlan = {
                        id: action.payload.fitnessPlanId,
                        name: action.payload.fitnessPlanName,
                        mealPlans: [ state.activeMealPlan ],
                        workoutRoutines: [ state.activeWorkoutRoutine ],
                        activeMealPlanId: state.activeMealPlan.id,
                        activeWorkoutRoutineId: state.activeWorkoutRoutine.id,
                    }
                } else {
                    state.status = action.payload.message;
                }
            });
    }
});

export const { setDataStatus, setActiveMealPlan, setActiveWorkoutRoutine } = dataSlice.actions;
export const dataStatus = state => state.data.status;
export const bodyMetrics = state => state.data.bodyMetrics;
export const fitnessPlans = state => state.data.fitnessPlans;
export const activeFitnessPlan = state => state.data.activeFitnessPlan;
export const mealPlan = state => state.data.activeMealPlan;
export const workoutRoutine = state => state.data.activeWorkoutRoutine;
export const newUser = state => state.data.newUser;