import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../Login/authSlice";
import { getUserData } from "../userData/dataThunk";
import { useEffect, useState } from "react";
import { activeFitnessPlan as activeFitness, bodyMetrics, fitnessPlans, mealPlan, newUser, setActiveMealPlan, setActiveWorkoutRoutine, workoutRoutine } from "../userData/dataSlice";
import { CreatePlan } from "../CreatePlan";
import { GettingStarted } from "../GettingStarted";
import { Table } from "../generalComponents/Table";
import { AiFillEdit } from "react-icons/ai";

export const Dashborad = () => {
    const dispatch = useDispatch();

    const userBasic = useSelector(userDetails);
    const userBodyMetrics = useSelector(bodyMetrics);
    const activeFitnessPlan = useSelector(activeFitness);
    const activeMealPlan = useSelector(mealPlan);
    const activeWorkoutRoutine = useSelector(workoutRoutine);
    const newUserBoolean = useSelector(newUser);
    const userFitnessPlans = useSelector(fitnessPlans);

    const [ openCreatePlan, setOpenCreatePlan ] = useState(false);
    const [ openSwitchPlan, setOpenSwitchPlan ] = useState(false);
    const [ plan, setPlan ] = useState("fitness");

    const today = new Date().getDay();
    const todayMealPlan =  activeMealPlan?.data[today];
    const todayWorkoutRoutine = activeWorkoutRoutine?.data[today];

    useEffect(()=>{
        if(userBodyMetrics===null) dispatch(getUserData());
    },[userBodyMetrics, dispatch]);

    return (
        newUserBoolean ? 
        <GettingStarted /> :
        activeFitnessPlan===null ?
        <div className="flex h-screen justify-center items-center">
            <div className="text-center w-2/3 font-medium">
                <div className="text-3xl">Welcome {userBasic.firstName}!</div>
                <div className="mt-4 text-xl"> Our custom fitness plan is tailored to your body metrics, activity level, and dietary preferences. Whether you want to lose weight, build muscle, or just improve your overall health, we've got you covered. Our plan is individualized to fit your unique needs. Click the button below to create your personalized fitness plan and start your journey towards a healthier, happier you!</div>
                <button onClick={()=>setOpenCreatePlan(true)} className="mt-4 py-3 px-6 rounded-md text-xl font-bold border-4 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">Create Plan</button>
                {
                    openCreatePlan ?
                    <CreatePlan plan={plan} setShowCreate={setOpenCreatePlan}/> :
                    null
                }
            </div>
        </div> :
        <div className="p-4 pt-24 flex flex-col">
            <div className="grid grid-cols-5 gap-6 mt-4">
                <div className="flex flex-col gap-4 col-span-2">
                    <div className="rounded-md bg-gray-100 p-4 flex gap-8 items-center h-fit">
                        <div className="w-32 h-32 rounded-full overflow-hidden">
                            <img src="./img/default-dp.jpeg" alt="" className="w-32 h-32"/>
                        </div>
                        <div className="grow">
                            <div className="text-2xl font-semibold">{userBasic.firstName} {userBasic.lastName}</div>
                            <div className="text-xl font-medium text-gray-500">{userBasic.email}</div>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-1 text-base leading-4 font-semibold text-gray-800">
                                    <div>{userBodyMetrics?.weight} kg</div>
                                    <div>|</div>
                                    <div>{userBodyMetrics?.height} cm</div>
                                </div>
                            </div>
                            <div className="text-sm mt-2 font-semibold text-gray-600 flex items-center gap-1">
                                <div>Manage profile</div>
                                <AiFillEdit className="text-base"/>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        <div className="col-span-4 font-bold text-xl px-3 p-2 bg-gray-100 rounded-md flex gap-2">
                            <div className="grow">{activeFitnessPlan.name}</div>
                            <button onClick={()=>{
                                setOpenSwitchPlan(true);
                            }} className="text-sm font-semibold bg-gray-800 text-white p-1 px-2 rounded-md hover:opacity-90">Switch</button>
                            <button onClick={()=>{
                                setPlan("fitness");
                                setOpenCreatePlan(true);
                            }} className="text-sm font-semibold bg-gray-800 text-white p-1 px-2 rounded-md hover:opacity-90">Create New</button>
                        </div>
                        <div className="text-center col-span-2 p-2 bg-gray-100 rounded-md">
                            <div className="text-lg font-semibold">Meal Plans</div>
                            <div className="overflow-scroll h-[6.5rem] mt-2 flex flex-col gap-2">
                                {
                                    activeFitnessPlan.mealPlans.map((mealPlan, index)=>(
                                        <div onClick={()=>{dispatch(setActiveMealPlan(mealPlan))}} key={index} className={`p-1 ${activeMealPlan.id === mealPlan.id ? 'bg-gray-300' : 'bg-gray-200'} rounded-md cursor-pointer hover:opacity-80`}>
                                            <div>{mealPlan.name}</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div onClick={()=>{
                                setPlan("meal");
                                setOpenCreatePlan(true);
                            }} className="p-1 bg-gray-800 text-white font-semibold rounded-md hover:opacity-90 cursor-pointer">
                                <div>Add Plan</div>
                            </div>
                        </div>
                        <div className="text-center col-span-2 p-2 bg-gray-100 rounded-md">
                            <div className="text-xl font-semibold">Workout Routines</div>
                            <div className="overflow-scroll h-[6.5rem] mt-2 flex flex-col gap-2">
                                {
                                    activeFitnessPlan.workoutRoutines.map((workoutRoutine, index)=>(
                                        <div onClick={()=>{
                                            dispatch(setActiveWorkoutRoutine(workoutRoutine));
                                        }} key={index} className={`p-1 ${activeWorkoutRoutine.id === workoutRoutine.id ? 'bg-gray-300' : 'bg-gray-200'} rounded-md cursor-pointer hover:opacity-80`}>
                                            <div>{workoutRoutine.name}</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div onClick={()=>{
                                setPlan("workout");
                                setOpenCreatePlan(true);
                            }} className="p-1 bg-gray-800 text-white font-semibold rounded-md hover:opacity-90 cursor-pointer">
                                <div>Add Plan</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="text-3xl font-bold text-gray-800">Today's Plan</div>
                    <div className="text-xl font-semibold text-gray-700 mt-2">Mealplan</div>
                    <Table className="mt-1"
                        colSpan={[1,4,1]}
                        header={["Meal","Food","Calories"]}
                        rows={
                            ['Breakfast', 'Lunch', 'Snacks', 'Dinner']
                                .filter(meal=>todayMealPlan[meal.toLowerCase()])
                                .map(meal=>[
                                    meal, 
                                    todayMealPlan[meal.toLowerCase()].name, 
                                    todayMealPlan[meal.toLowerCase()].calories
                                ])
                        }/>
                    <div className="text-xl font-semibold mt-4 text-gray-700">Workout</div>
                    <Table className="mt-1" 
                            colSpan={[2,1,1,2]} 
                            header={["Excercise","Sets","Reps","Muscle Group"]} 
                            rows={todayWorkoutRoutine.map(({name,sets,reps,muscleGroup})=>[name,sets,reps,muscleGroup])}/>
                </div>
            </div>
            {
                openCreatePlan ?
                <CreatePlan plan={plan} setShowCreate={setOpenCreatePlan}/> :
                null
            }
            {
                openSwitchPlan ?
                <div onClick={()=>setOpenSwitchPlan(false)} className="bg-black bg-opacity-10 fixed top-0 left-0 h-screen w-full z-50 flex justify-center items-center">
                    <div onClick={e=>e.stopPropagation()} className="w-1/4 bg-white p-6 rounded-md flex justify-center items-center">
                        <div>
                            <div className="text-2xl font-bold">Choose a plan</div>
                            <div className="grid gap-2 mt-2">
                            {
                                userFitnessPlans.map((fitnessPlan, index)=>(
                                    <div onClick={()=>{
                                        setOpenSwitchPlan(false);
                                    }} key={index} className="p-2 bg-gray-200 font-semibold rounded-md cursor-pointer hover:opacity-80">
                                        <div>{fitnessPlan.plan_name}</div>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    </div>
                </div> :
                null
            }
        </div>
    );
}