import { useState } from "react";
import { BsFillArrowRightCircleFill, BsFillSaveFill } from "react-icons/bs";
import { InlineInput } from "../generalComponents/InlineInput";
import { Loading } from "../generalComponents/Loading";
import { useDispatch, useSelector } from "react-redux";
import { creatMealPlan, createFitnessPlan, createWorkoutRoutine } from "../userData/dataThunk";
import { dataStatus } from "../userData/dataSlice";
import { IoMdRefresh } from "react-icons/io";
import { MealPlanTable } from "../generalComponents/MealPlanTable";
import { WorkoutRoutineTable } from "../generalComponents/WorkoutRoutineTable";

export const CreateFitnessPlan = () => {
    const [ page, setPageActual ] = useState(0);
    const [ cuisine, setCuisine ] = useState("");
    const [ place, setPlace ] = useState("");
    const [ error, setError ] = useState(false);
    const [ breakfast, setBreakfast ] = useState("");
    const [ lunch, setLunch ] = useState(false);
    const [ dinner, setDinner ] = useState(false);
    const [ snacks, setSnacks ] = useState(false);
    const [ goal, setGoal ] = useState("");
    const [ equipment, setEquipment ] = useState("");
    const [ planName, setPlanName ] = useState("");

    const dispatch = useDispatch();

    const status = useSelector(dataStatus);
    const mealPlan = useSelector(state=>state.data.mealPlan);
    const workoutRoutine = useSelector(state=>state.data.workoutRoutine);

    const setPage = (page) => {
        if(page===3){
            dispatch(creatMealPlan({cuisine, place, breakfast, lunch, dinner, snacks}));
            let time=0;
            const mealInterval = setInterval(()=>{
                if(time>16 && status==="success"){
                    clearInterval(mealInterval);
                    setPageActual(4);
                }
                time++;
            },1000);
        }
        if(page===8){
            dispatch(createWorkoutRoutine({goal, equipment}));
            let time=0;
            const workoutInterval = setInterval(()=>{
                if(time>16 && status==="success"){
                    clearInterval(workoutInterval);
                    setPageActual(9);
                }
                time++;
            },1000);
        }
        setPageActual(page);
    }

    if(workoutRoutine) console.log(workoutRoutine);

    return (
        <div className="h-screen w-full flex justify-center items-center absolute top-0 right-0 bg-white">
            {
                page===0 ?
                <div className="font-semibold text-center w-2/3 grid gap-6">
                    <div className="text-xl">Maintaining a healthy diet is one of the most important aspects of achieving good health. A well-balanced diet provides the necessary nutrients and energy to support physical activity, promote mental clarity, and prevent chronic diseases. That's why we're starting your fitness journey by creating a personalized diet plan tailored to your dietary preferences and fitness goals. Are you ready to take the first step towards a healthier you? Let's get started!</div>
                    <button onClick={()=>setPage(1)} className="rounded-full p-4 text-xl bg-gray-700 text-white w-fit hover:opacity-90 mx-auto flex items-center gap-2">
                        <span>Next</span>
                        <BsFillArrowRightCircleFill className="text-2xl"/>
                    </button>
                </div> :
                page===1 ?
                <div className="font-semibold grid gap-2">
                    <div className="text-3xl font-bold flex items-center gap-2">
                        <div>I like to eat</div>
                        <InlineInput value={cuisine} setValue={setCuisine} placeholder="Italian" errorCondition={error && !cuisine}/>
                        <div>food.</div>
                    </div>
                    <div className="text-3xl font-bold flex items-center gap-2">
                        <div>I live in</div>
                        <InlineInput value={place} setValue={setPlace} placeholder="New York" errorCondition={error && !place}/>
                    </div>
                    <div className="h-4 text-sm text-red-500">
                        {error ? "Please fill all the fields!" : ""}
                    </div>
                    <button onClick={()=>{
                        if(!cuisine || !place) return setError(true);
                        setPage(2);
                        setError(false);
                        }} className="rounded-full p-4 text-xl bg-gray-700 text-white w-fit hover:opacity-90 flex items-center gap-2">
                        <span>Next</span>
                        <BsFillArrowRightCircleFill className="text-2xl"/>
                    </button>
                </div> :
                page===2 ?
                <div className="font-semibold w-2/3 text-3xl">
                    <div className="font-bold text-left">What meals do you want to include in your diet plan?</div>
                    <div className="flex gap-2 mt-4">
                        <div onClick={()=>setBreakfast(!breakfast)} className={`w-fit py-2 px-3 rounded-md ${!breakfast ? "text-gray-600 bg-gray-200" : "text-black bg-gray-300"} hover:text-black cursor-pointer`}>Breakfast</div>
                        <div onClick={()=>setLunch(!lunch)} className={`w-fit py-2 px-3 rounded-md ${!lunch ? "text-gray-600 bg-gray-200" : "text-black bg-gray-300"} hover:text-black cursor-pointer`}>Lunch</div>
                        <div onClick={()=>setDinner(!dinner)} className={`w-fit py-2 px-3 rounded-md ${!dinner ? "text-gray-600 bg-gray-200" : "text-black bg-gray-300"} hover:text-black cursor-pointer`}>Dinner</div>
                        <div onClick={()=>setSnacks(!snacks)} className={`w-fit py-2 px-3 rounded-md ${!snacks ? "text-gray-600 bg-gray-200" : "text-black bg-gray-300"} hover:text-black cursor-pointer`}>Snacks</div>
                    </div>
                    <div className="h-4 text-sm text-red-500 text-left mt-1">
                        {error ? "Select atleast one!" : ""}
                    </div>
                    <button onClick={()=>{
                        if(!breakfast && !lunch && !dinner && !snacks) return setError(true);
                        setPage(3)
                        setError(false);
                        }} className="rounded-full p-4 text-xl bg-gray-700 text-white w-fit hover:opacity-90 flex items-center gap-2 mt-2">
                        <span>Next</span>
                        <BsFillArrowRightCircleFill className="text-2xl"/>
                    </button>
                </div> :
                page===3 ?
                <div className="w-2/3 text-left">
                    <div className="text-xl font-semibold text-gray-800">At Make Me Fit, we are dedicated to providing the best possible service to our clients. That's why we use the latest AI models to generate a personalized meal plan tailored to your dietary preferences and fitness goals. We believe that by combining cutting-edge technology with expert nutrition advice, we can help you achieve your health and fitness goals faster than ever before.</div>
                    <div className="text-xl font-semibold text-gray-600 mt-4">We are currently in the process of generating your personalized meal plan. This may take a few minutes. Please be patient while we work on your plan.</div>
                    <Loading width={28} height={28} stroke="black" className="mt-4"/>
                </div> :
                page===4 ?
                <div className="w-2/3 text-left flex">
                    <div className="grow flex flex-col justify-center text-2xl font-semibold text-gray-800">
                        <div className="">Congratulations!</div>
                        <div>Your personalized meal plan is ready</div>
                        <div className="flex gap-2">
                            <button onClick={()=>setPage(5)} className="rounded-full p-4 text-xl bg-gray-700 text-white w-fit hover:opacity-90 flex items-center gap-2 mt-4">
                                <span>Next</span>
                                <BsFillArrowRightCircleFill className="text-2xl"/>
                            </button>
                            <button onClick={()=>setPage(3)} className="rounded-full p-4 text-xl bg-gray-700 text-white w-fit hover:opacity-90 flex items-center gap-2 mt-4">
                                <span>Regenerate</span>
                                <IoMdRefresh className="text-2xl"/>
                            </button>
                        </div>
                    </div>
                    <MealPlanTable mealPlan={mealPlan} className="h-96"/>
                </div> :
                page===5 ?
                <div className="w-2/3 text-left">
                    <div className="text-xl font-semibold text-gray-800">To complement your personalized meal plan, Make Me Fit also offers a range of customized exercise plans tailored to your fitness goals and experience level. Our advanced AI will work with you to design a workout program that is challenging yet achievable, helping you to build muscle, improve cardiovascular health, and increase endurance.</div>
                    <button onClick={()=>setPage(6)} className="rounded-full p-4 text-xl bg-gray-700 text-white w-fit hover:opacity-90 flex items-center gap-2 mt-2">
                        <span>Next</span>
                        <BsFillArrowRightCircleFill className="text-2xl"/>
                    </button>
                </div> :
                page===6 ?
                <div className="text-left text-2xl">
                    <div className="font-bold text-left">What is your fitness goal?</div>
                    <div className="flex flex-col gap-2 mt-2">
                        <div onClick={()=>{setGoal("Weight Loss"); setPage(7)}} className={`w-fit py-2 px-3 rounded-md ${goal==="Weight Loss" ? "text-black bg-gray-300" : "text-gray-600 bg-gray-200"} hover:text-black cursor-pointer`}>Weight Loss</div>
                        <div onClick={()=>{setGoal("Muscle Gain"); setPage(7)}} className={`w-fit py-2 px-3 rounded-md ${goal==="Muscle Gain" ? "text-black bg-gray-300" : "text-gray-600 bg-gray-200"} hover:text-black cursor-pointer`}>Muscle Gain</div>
                        <div onClick={()=>{setGoal("Cardiovascular Health"); setPage(7)}} className={`w-fit py-2 px-3 rounded-md ${goal==="Cardiovascular Health" ? "text-black bg-gray-300" : "text-gray-600 bg-gray-200"} hover:text-black cursor-pointer`}>Cardiovascular Health</div>
                        <div onClick={()=>{setGoal("Endurance"); setPage(7)}} className={`w-fit py-2 px-3 rounded-md ${goal==="Endurance" ? "text-black bg-gray-300" : "text-gray-600 bg-gray-200"} hover:text-black cursor-pointer`}>Endurance</div>
                    </div>
                </div> :
                page===7 ?
                <div className="text-left text-2xl flex gap-2">
                    <div className="font-bold text-left mt-2">I have access to a</div>
                    <div className="flex flex-col gap-2">
                        <div onClick={()=>{setEquipment("Gym"); setPage(8)}} className={`w-fit py-2 px-3 rounded-md ${equipment==="Gym" ? "text-black bg-gray-300" : "text-gray-600 bg-gray-200"} hover:text-black cursor-pointer`}>Gym</div>
                        <div onClick={()=>{setEquipment("Home Gym"); setPage(8)}} className={`w-fit py-2 px-3 rounded-md ${equipment==="Home Gym" ? "text-black bg-gray-300" : "text-gray-600 bg-gray-200"} hover:text-black cursor-pointer`}>Home Gym</div>
                        <div onClick={()=>{setEquipment("None"); setPage(8)}} className={`w-fit py-2 px-3 rounded-md ${equipment==="None" ? "text-black bg-gray-300" : "text-gray-600 bg-gray-200"} hover:text-black cursor-pointer`}>None</div>
                    </div>
                </div> :
                page===8 ?
                <div className="w-2/3 text-left">
                    <div className="text-xl font-semibold text-gray-800">
                        {
                            goal==="Weight Loss" ?
                            "Our weight loss program is designed to help you lose weight while maintaining muscle mass. This program is ideal for those who are looking to lose a few pounds and improve their overall health." :
                            goal==="Muscle Gain" ?
                            "Our muscle gain program is designed to help you build muscle and increase strength. This program is ideal for those who are looking to build muscle and improve their overall health." :
                            goal==="Cardiovascular Health" ?
                            "Our cardiovascular health program is designed to help you improve your cardiovascular health and endurance. This program is ideal for those who are looking to improve their cardiovascular health and endurance." :  
                            goal==="Endurance" ?
                            "Our endurance program is designed to help you improve your endurance and cardiovascular health. This program is ideal for those who are looking to improve their endurance and cardiovascular health." :
                            <></>
                        }
                    </div>
                    <div className="text-xl font-semibold text-gray-600 mt-4">We are currently in the process of generating your personalized workout routine. This may take a few minutes. Please be patient while we work on your plan.</div>
                    <Loading width={28} height={28} stroke="black" className="mt-4"/>
                </div> :
                page===9 ?
                <div className="w-2/3 text-left flex">
                    <div className="grow flex flex-col justify-center text-2xl font-semibold text-gray-800">
                        <div className="">Congratulations!</div>
                        <div>Your personalized workout routine is ready</div>
                        <div className="flex gap-2">
                            <button onClick={()=>setPage(10)} className="rounded-full p-4 text-xl bg-gray-700 text-white w-fit hover:opacity-90 flex items-center gap-2 mt-4">
                                <span>Next</span>
                                <BsFillArrowRightCircleFill className="text-2xl"/>
                            </button>
                            <button onClick={()=>setPage(8)} className="rounded-full p-4 text-xl bg-gray-700 text-white w-fit hover:opacity-90 flex items-center gap-2 mt-4">
                                <span>Regenerate</span>
                                <IoMdRefresh className="text-2xl"/>
                            </button>
                        </div>
                    </div>
                    <WorkoutRoutineTable workoutRoutine={workoutRoutine} className="h-96"/>
                </div> :
                page===10 ?
                <div className="w-2/3 text-left">
                    <div className="text-2xl font-semibold flex items-center gap-2">
                        <span>Name of the plan</span>
                        <InlineInput value={planName} setValue={setPlanName} placeholder="Your plan" errorCondition={error && !planName} className=""/>
                    </div>
                    <div className="text-3xl mt-4">Congratulations on taking the first step towards a healthier you! Your custom fitness plan tailored to your body metrics, activity level, and dietary preferences is ready.</div>
                    <div className="text-red-500 h-4 mt-2 text-xs">{
                        error ? "Please give a name to your plan!" : <></>
                    }</div>
                    <button onClick={()=>{
                        if(!planName) return setError(true);
                        dispatch(createFitnessPlan({planName}))
                        setError(false);
                    }} className="rounded-full p-4 text-xl bg-gray-700 text-white w-40 hover:opacity-90 flex items-center gap-2 mt-2">
                        {
                            status==="loading" ?
                            <Loading width={28} height={28} stroke="white" className="mx-auto"/> :
                            <div className="flex items-center gap-2">
                                <div>Save Plan</div>
                                <BsFillSaveFill className="text-2xl"/>
                            </div>
                        }
                    </button>
                </div> :
                <></>
            }
        </div>
    );
}