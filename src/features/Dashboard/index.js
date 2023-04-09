import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../Login/authSlice";
import { getUserData } from "../userData/dataThunk";
import { useEffect, useState } from "react";
import { activeFitnessPlan, bodyMetrics, mealPlan, newUser, workoutRoutine } from "../userData/dataSlice";
import { CreateFitnessPlan } from "../CreateFitnessPlan";
import { MealPlanTable } from "../generalComponents/MealPlanTable";
import { WorkoutRoutineTable } from "../generalComponents/WorkoutRoutineTable";
import { GettingStarted } from "../GettingStarted";

export const Dashborad = () => {
    const userBasic = useSelector(userDetails);
    const userBodyMetrics = useSelector(bodyMetrics);
    const activeFitnessPlanId = useSelector(activeFitnessPlan);
    const activeMealPlan = useSelector(mealPlan);
    const activeWorkoutRoutine = useSelector(workoutRoutine);
    const newUserBoolean = useSelector(newUser);
    const [ openCreatePlan, setOpenCreatePlan ] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(userBodyMetrics===null) dispatch(getUserData());
    },[userBodyMetrics, dispatch]);
    return (
        newUserBoolean ? 
        <GettingStarted /> :
        <div className="flex h-screen justify-center items-center">
            <div className="w-2/3 text-center">
                <div className="text-4xl font-semibold">
                    <span className="text-gray-700">Welcome </span>
                    <span className="text-gray-900">{userBasic.firstName}!</span>
                </div>
                {
                    activeFitnessPlanId===null ?
                    <>
                        <div className="mt-4 text-xl"> Our custom fitness plan is tailored to your body metrics, activity level, and dietary preferences. Whether you want to lose weight, build muscle, or just improve your overall health, we've got you covered. Our plan is individualized to fit your unique needs. Click the button below to create your personalized fitness plan and start your journey towards a healthier, happier you!</div>
                        <button onClick={()=>setOpenCreatePlan(true)} className="mt-4 py-3 px-6 rounded-md text-xl font-bold border-4 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">Create Plan</button>
                        {
                            openCreatePlan ?
                            <CreateFitnessPlan /> :
                            null
                        }
                    </>
                    :
                    <div className="grid grid-cols-2 gap-4 items-center mt-4 text-left">
                        <MealPlanTable mealPlan={activeMealPlan} className="h-96"/>
                        <WorkoutRoutineTable workoutRoutine={activeWorkoutRoutine} className="h-96"/>
                    </div>
                }
            </div>
        </div>
    );
}