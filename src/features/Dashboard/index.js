import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../Login/authSlice";
import { getPlanData, getUserData, getUserHistory, setUserImage, updateUserMetrics } from "../userData/dataThunk";
import { useEffect, useState } from "react";
import { activeFitnessPlan as activeFitness, bodyMetrics, fitnessPlans, mealPlan, newUser, setActiveMealPlan, setActiveWorkoutRoutine, userImage, workoutRoutine } from "../userData/dataSlice";
import { CreatePlan } from "../CreatePlan";
import { GettingStarted } from "../GettingStarted";
import { Table } from "../generalComponents/Table";
import { GrUpload } from "react-icons/gr";
import { PopUpWrapper } from "../generalComponents/PopUpWrapper";
import { InlineInput } from "../generalComponents/InlineInput";
import { TrackProgress } from "./TrackProgress";
import { Loading } from "../generalComponents/Loading";

export const Dashborad = () => {
    const dispatch = useDispatch();

    const userBasic = useSelector(userDetails);
    const userBodyMetrics = useSelector(bodyMetrics);
    const activeFitnessPlan = useSelector(activeFitness);
    const activeMealPlan = useSelector(mealPlan);
    const activeWorkoutRoutine = useSelector(workoutRoutine);
    const newUserBoolean = useSelector(newUser);
    const userFitnessPlans = useSelector(fitnessPlans);
    const userImageSrc = useSelector(userImage);

    const [ openCreatePlan, setOpenCreatePlan ] = useState(false);
    const [ openSwitchPlan, setOpenSwitchPlan ] = useState(false);
    const [ plan, setPlan ] = useState("fitness");
    const [ uploadImage, setUploadImage ] = useState(false);
    const [ image, setImage ] = useState(null);
    const [ editProfile, setEditProfile ] = useState(false);
    const [ weight , setWeight ] = useState("");
    const [ height , setHeight ] = useState("");
    const [ weightGoal, setWeightGoal ] = useState("");
    const [ gender, setGender ] = useState("");

    const updatedProfile = ( 
        weight!==userBodyMetrics?.weight?.toString() ||
        height!==userBodyMetrics?.height?.toString() ||
        weightGoal!==userBodyMetrics?.weightGoal?.toString() ||
        gender!==userBodyMetrics?.gender
    );

    const today = new Date().getDay();
    const todayMealPlan =  activeMealPlan?.data[today];
    const todayWorkoutRoutine = activeWorkoutRoutine?.data[today];

    useEffect(()=>{
        if(userBodyMetrics===null){
            dispatch(getUserData());
            dispatch(getUserHistory());
        }
        else {
            setWeight(userBodyMetrics.weight?.toString());
            setHeight(userBodyMetrics.height?.toString());
            setWeightGoal(userBodyMetrics.weightGoal?.toString());
            setGender(userBodyMetrics.gender);
        }
    },[userBodyMetrics, dispatch]);

    useEffect(()=>{
        document.title="Dashboard | MakeMeFit";
    },[]);

    if(!userBodyMetrics) return (
        <div className="flex h-screen justify-center items-center">
            <Loading stroke="black" width="36px" height="36px"/>
        </div>
    )

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
        <div className="p-4 pt-20 flex flex-col">
            <div className="grid lg:grid-cols-5 gap-6 mt-4">
                <div className="flex flex-col gap-4 lg:col-span-2 ">
                    <div className="rounded-md bg-gray-100 p-4 flex w-full gap-8 items-center h-fit">
                        <div className="w-32 h-32 rounded-full overflow-hidden group relative cursor-pointer">
                            <img id="display-picture" src={ userImageSrc ? userImageSrc : "./img/default-dp.jpeg" } alt="" className="w-32 h-32"/>
                            <div onClick={()=>setUploadImage(true)} className="h-full w-full bg-black bg-opacity-20 absolute top-0 left-0 hidden justify-center items-center group-hover:flex">
                                <GrUpload className="text-xl"/>
                            </div>
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
                            <div onClick={()=>setEditProfile(true)} className="text-sm mt-2 font-semibold text-gray-600 cursor-pointer hover:text-gray-800 flex items-center gap-1">
                                <div>Manage profile</div>
                            </div>
                        </div>
                    </div>
                    <TrackProgress />
                </div>
                <div className="lg:col-span-3">
                    <div className="grid lg:grid-cols-4 gap-3">
                        <div className="col-span-4 font-semibold text-3xl p-4 bg-gray-100 rounded-md flex gap-2">
                            <div className="grow">{activeFitnessPlan.name}</div>
                            <button onClick={()=>{
                                setOpenSwitchPlan(true);
                            }} className="text-lg font-medium bg-gray-800 text-white p-1 px-2 rounded-md hover:opacity-90">Switch</button>
                            <button onClick={()=>{
                                setPlan("fitness");
                                setOpenCreatePlan(true);
                            }} className="text-lg font-medium bg-gray-800 text-white p-1 px-2 rounded-md hover:opacity-90">Create New</button>
                        </div>
                    </div>
                    <div className="text-2xl font-semibold mt-4">Mealplan</div>
                    <div className="font-semibold text-gray-800 flex gap-2 overflow-x-scroll mt-2">
                        {
                            activeFitnessPlan.mealPlans.map((mealPlan, index)=>(
                                <div onClick={()=>{dispatch(setActiveMealPlan(mealPlan))}} key={index} className={`py-1.5 px-3 border-[1.5px] ${activeMealPlan.id === mealPlan.id ? 'bg-gray-200 border-gray-800' : 'bg-gray-100 border-gray-100'} rounded-md cursor-pointer hover:bg-gray-200`}>
                                    <div>{mealPlan.name}</div>
                                </div>
                            ))
                        }
                        <div className="grow" />
                        <div onClick={()=>{
                                setPlan("meal");
                                setOpenCreatePlan(true);
                            }} className="py-1.5 px-3 border-2 border-gray-700 bg-gray-700 text-white rounded-md cursor-pointer hover:opacity-80">
                            <div>Add New</div>
                        </div>
                    </div>
                    <Table className="mt-2"
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
                    <div className="text-2xl font-semibold mt-4">Workout Routine</div>
                    <div className="font-semibold text-gray-800 flex gap-2 overflow-x-scroll mt-2">
                        {
                            activeFitnessPlan.workoutRoutines.map((workoutRoutine, index)=>(
                                <div onClick={()=>{dispatch(setActiveWorkoutRoutine(workoutRoutine))}} key={index} className={`py-1.5 px-3 border-[1.5px] ${activeWorkoutRoutine.id === workoutRoutine.id ? 'bg-gray-200 border-gray-800' : 'bg-gray-100 border-gray-100'} rounded-md cursor-pointer hover:bg-gray-200`}>
                                    <div>{workoutRoutine.name}</div>
                                </div>
                            ))
                        }
                        <div className="grow" />
                        <div onClick={()=>{
                                setPlan("routine");
                                setOpenCreatePlan(true);
                            }} className="py-1.5 px-3 border-2 border-gray-700 bg-gray-700 text-white rounded-md cursor-pointer hover:opacity-80">
                            <div>Add New</div>
                        </div>
                    </div>
                    <Table className="mt-2" 
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
            <PopUpWrapper show={openSwitchPlan} setShow={setOpenSwitchPlan} className="w-1/4 bg-white p-6 rounded-md flex justify-center items-center">
                <div>
                    <div className="text-2xl font-bold">Choose a plan</div>
                    <div className="grid gap-2 mt-2">
                    {
                        userFitnessPlans.map((fitnessPlan, index)=>(
                            <div onClick={()=>{
                                dispatch(getPlanData({planId: fitnessPlan.plan_id}));
                                setOpenSwitchPlan(false);
                            }} key={index} className="p-2 bg-gray-200 font-semibold rounded-md cursor-pointer hover:opacity-80">
                                <div>{fitnessPlan.plan_name}</div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </PopUpWrapper>
            <PopUpWrapper show={uploadImage} setShow={setUploadImage} className="w-1/3 bg-white p-6 rounded-md flex justify-center items-center">
                <div className="w-full text-center">
                    {
                        image ?
                        <div className="flex flex-col justify-center items-center">
                            <div className="w-52 h-52 rounded-full overflow-hidden">
                                <img src={URL.createObjectURL(image)} alt="" className="w-52 h-52"/>
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <button onClick={()=>{
                                    setImage(null);
                                }} className="font-semibold bg-gray-800 text-white p-1 px-2 rounded-md hover:opacity-90">Choose Other</button>
                                <button onClick={()=>{
                                    dispatch(setUserImage({image}));
                                    setUploadImage(false);
                                }} className="font-semibold bg-gray-800 text-white p-1 px-2 rounded-md hover:opacity-90">Upload</button>
                            </div>
                        </div> :
                        <>
                            <div className="text-2xl font-bold">Upload Image</div>
                            <div className="h-36 border-2 border-gray-800 border-dashed rounded-md mt-2 flex justify-center items-center" onDrop={e=>{
                                setImage(e.dataTransfer.files[0]);
                                e.preventDefault();
                                }} onDragOver={e=>e.preventDefault()}>
                                <div className="font-bold text-gray-500">Drop image here</div>
                            </div>
                            {/* <input type="file" className="w-fit mx-auto mt-2" multiple={false} onChange={e=>{setImage(e.target.files[0])}}/> */}
                        </>
                    }
                </div>
            </PopUpWrapper>
            <PopUpWrapper show={editProfile} setShow={setEditProfile} className="w-1/3 bg-white p-6 rounded-md flex justify-center items-center">
                <div>
                    <div className="flex text-2xl items-center gap-2">
                        <div className="font-medium">Weight</div>
                        <InlineInput className="ml-2" value={weight} setValue={setWeight} placeholder={""}/>
                    </div>
                    <div className="flex text-2xl items-center gap-2 mt-2">
                        <div className="font-medium">Height</div>
                        <InlineInput className="ml-2" value={height} setValue={setHeight} placeholder={""}/>
                    </div>
                    <div className="flex text-2xl items-center gap-2 mt-2">
                        <div className="font-medium">Weight Goal</div>
                        <InlineInput className="ml-2" value={weightGoal} setValue={setWeightGoal} placeholder={""}/>
                    </div>
                    <div className="flex text-2xl items-center gap-2 mt-2">
                        <div className="font-medium">Gender</div>
                        <InlineInput className="ml-2" value={gender} setValue={setGender} placeholder={""}/>
                    </div>
                    <button onClick={
                        ()=>{
                            dispatch(updateUserMetrics({weight, height, weightGoal, gender}));
                            setEditProfile(false);
                        }
                    } disabled={!updatedProfile} className="text-xl bg-gray-800 text-white font-semibold p-1 px-2 rounded-md mt-4 hover:opacity-90 disabled:opacity-80 w-24">
                        Save
                    </button>
                </div>
            </PopUpWrapper>
        </div>
    );
}