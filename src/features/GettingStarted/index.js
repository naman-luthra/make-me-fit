import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../Login/authSlice";
import { useState } from "react";
import { InlineInput } from "../generalComponents/InlineInput";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { submitBasicInfo } from "../Login/authThunks";

export const GettingStarted = () => {
    const user = useSelector(userDetails);
    const [page, setPage] = useState(0);
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState(false);
    const [diet, setDiet] = useState("");
    const [activity, setActivity] = useState("");
    const [weightGoal, setWeightGoal] = useState("");
    const [activityGoal, setActivityGoal] = useState("");

    const dispatch = useDispatch();
    return (
        <div className="h-screen w-full flex justify-center items-center absolute top-0 right-0">
            {
                page===0 ?
                <div className="font-semibold text-center w-2/3 grid gap-4">
                    <div className="text-3xl">Hi {user.firstName} 👋</div>
                    <div className="text-xl text-gray-700">Welcome to Make Me Fit! We're here to help you achieve your fitness goals with a custom plan tailored to your body metrics, activity level, and dietary preferences. Answer a few basic questions and let us help you reach your fitness goals!</div>
                    <div className="flex items-end gap-2 justify-center text-2xl">
                        <span onClick={()=>setPage(1)} className="underline underline-offset-4 text-gray-600 cursor-pointer hover:opacity-80">Click here</span>
                        <span>to get started!</span>
                    </div>
                </div> :
                page===1 ?
                <div className="font-semibold text-3xl">
                    <div className="grid gap-1.5">
                        <div className="flex gap-2 items-center">
                            <span>I am</span>
                            <InlineInput value={age} setValue={setAge} placeholder="25" errorCondition={error && !age}/>
                            <span>years old</span>
                            <InlineInput value={gender} setValue={setGender} placeholder="Male" errorCondition={error && !gender}/>
                            <span>,</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <span>My weight is</span>
                            <InlineInput value={weight} setValue={setWeight} placeholder="75" errorCondition={error && !weight}/>
                            <span>kg,</span>
                            
                        </div>
                        <div className="flex gap-2 items-center">
                            <span>and my Height is</span>
                            <InlineInput value={height} setValue={setHeight} placeholder="175" errorCondition={error && !height}/>
                            <span>cm.</span>
                        </div>
                    </div>
                    <div className="">
                        <div className="text-red-500 text-xs h-3 mt-2">{error ? "Please fill all the fields!" : ""}</div>
                        <BsFillArrowRightCircleFill onClick={()=>{
                            if(!age || !gender || !weight || !height) return setError(true);
                            setPage(2);
                            setError(false);
                            }} className="text-5xl text-gray-600 cursor-pointer hover:opacity-80 mt-3"/>
                    </div>
                </div> :
                page===2 ?
                <div className="font-semibold text-3xl">
                    <div>I am a </div>
                    <div className="grid gap-2 mt-3">
                        <div onClick={()=>{setDiet("Non-Vegeterian"); setPage(3);}} className={`w-fit bg-gray-200 py-2 px-3 rounded-md ${diet!=="Non-Vegeterian" ? "text-gray-600" : "text-black"} hover:text-black cursor-pointer`}>Non-Vegeterian</div>
                        <div onClick={()=>{setDiet("Vegeterian that eats egg"); setPage(3);}} className={`w-fit bg-gray-200 py-2 px-3 rounded-md ${diet!=="Vegeterian that eats egg" ? "text-gray-600" : "text-black"} hover:text-black cursor-pointer`}>Vegeterian that eats egg</div>
                        <div onClick={()=>{setDiet("Vegeterian that doesn't eat egg"); setPage(3);}} className={`w-fit bg-gray-200 py-2 px-3 rounded-md ${diet!=="Vegeterian that doesn't eat egg" ? "text-gray-600" : "text-black"} hover:text-black cursor-pointer`}>Vegeterian that doesn't eat egg</div>
                        <div onClick={()=>{setDiet("Vegan"); setPage(3);}} className={`w-fit bg-gray-200 py-2 px-3 rounded-md ${diet!=="Vegan" ? "text-gray-600" : "text-black"} hover:text-black cursor-pointer`}>Vegan</div>
                    </div>
                </div> :
                page===3 ?
                <div className="font-semibold text-3xl">
                    <div className="">I workout</div>
                    <div className="grid gap-2 mt-3">
                        <div onClick={()=>{setActivity("Sedentary"); setPage(4);}} className={`w-fit bg-gray-200 py-2 px-3 rounded-md ${activity!=="Sedentary" ? "text-gray-600" : "text-black"} hover:text-black cursor-pointer`}>Rarely</div>
                        <div onClick={()=>{setActivity("Lightly Active"); setPage(4);}} className={`w-fit bg-gray-200 py-2 px-3 rounded-md ${activity!=="Lightly Active" ? "text-gray-600" : "text-black"} hover:text-black cursor-pointer`}>1-2 times a week</div>
                        <div onClick={()=>{setActivity("Moderately Active"); setPage(4);}} className={`w-fit bg-gray-200 py-2 px-3 rounded-md ${activity!=="Moderately Active" ? "text-gray-600" : "text-black"} hover:text-black cursor-pointer`}>3-5 times a week</div>
                        <div onClick={()=>{setActivity("Very Active"); setPage(4);}} className={`w-fit bg-gray-200 py-2 px-3 rounded-md ${activity!=="Very Active" ? "text-gray-600" : "text-black"} hover:text-black cursor-pointer`}>Almost everyday</div>
                    </div>
                </div> :
                page===4 ?
                <div className="font-semibold w-2/3 text-center">
                    <div className="flex gap-2 items-center text-3xl justify-center">
                        <span>My ideal weight is</span>
                        <InlineInput value={weightGoal} setValue={setWeightGoal} placeholder={Math.floor(22.5*(Math.pow((height/100),2))).toString()} errorCondition={error && !weightGoal}/>
                        <span>kg.</span>
                    </div>
                    <div className="text-xl mt-3 text-gray-600">Based on your BMI, a suggested weight range for you is between {Math.floor(20*(Math.pow((height/100),2)))} to {Math.floor(25*(Math.pow((height/100),2)))} Kg. However, please keep in mind that BMI is not a perfect index and your fitness goal should be more individualized based on your body type, activity level, and other factors.</div>
                    <BsFillArrowRightCircleFill onClick={()=>{
                            if(!weightGoal) return setError(true);
                            setPage(5);
                            setError(false);
                            }} className="text-5xl text-gray-600 cursor-pointer hover:opacity-80 mt-3 mx-auto"/>
                </div> :
                page===5 ?
                <div className="font-semibold text-3xl">
                    <div className="">I want to workout</div>
                    <div className="grid gap-2 mt-3">
                        <div onClick={()=>{setActivityGoal("Sedentary"); setPage(6);}} className={`w-fit bg-gray-200 py-2 px-3 rounded-md ${activityGoal!=="Sedentary" ? "text-gray-600" : "text-black"} hover:text-black cursor-pointer`}>Very little</div>
                        <div onClick={()=>{setActivityGoal("Lightly Active"); setPage(6);}} className={`w-fit bg-gray-200 py-2 px-3 rounded-md ${activityGoal!=="Lightly Active" ? "text-gray-600" : "text-black"} hover:text-black cursor-pointer`}>1-2 times a week</div>
                        <div onClick={()=>{setActivityGoal("Moderately Active"); setPage(6);}} className={`w-fit bg-gray-200 py-2 px-3 rounded-md ${activityGoal!=="Moderately Active" ? "text-gray-600" : "text-black"} hover:text-black cursor-pointer`}>3-5 times a week</div>
                        <div onClick={()=>{setActivityGoal("Very Active"); setPage(6);}} className={`w-fit bg-gray-200 py-2 px-3 rounded-md ${activityGoal!=="Very Active" ? "text-gray-600" : "text-black"} hover:text-black cursor-pointer`}>Almost everyday</div>
                    </div>
                </div> :
                page===6 ?
                <div className="font-semibold flex flex-col items-center gap-4">
                    <div className="text-3xl">Thanks for putting in the information!</div>
                    <button onClick={()=>{dispatch(submitBasicInfo({age, gender, weight, height, diet, activity, weightGoal, activityGoal}))}} className="bg-gray-800 text-white font-semibold py-2 px-3 w-fit rounded hover:opacity-90">Submit and go to the app</button>
                </div> :
                <></>
            }
        </div>
    );
}