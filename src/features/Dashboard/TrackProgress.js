import { useEffect, useState } from "react";
import { InlineInput } from "../generalComponents/InlineInput";
import { useDispatch, useSelector } from "react-redux";
import { bodyMetrics, dataStatus, userHistory, userTodayHistory } from "../userData/dataSlice";
import { Table } from "../generalComponents/Table";
import { AiTwotoneSave } from "react-icons/ai";
import { Loading } from "../generalComponents/Loading";
import { saveUserProgress } from "../userData/dataThunk";
import { PopUpWrapper } from "../generalComponents/PopUpWrapper";
import { LineGraphComponent } from "../generalComponents/LineGraphComponent";

export const TrackProgress = () => {
    const [ weight, setWeight ] = useState("");
    const [ water, setWater ] = useState("");
    const [ food, setFood ] = useState([]);
    const [ excercise, setExcercise ] = useState("");
    const [ showInights, setShowInsights ] = useState(false);

    const userBodyMetrics = useSelector(bodyMetrics);
    const status = useSelector(dataStatus);
    const todayHistory = useSelector(userTodayHistory);
    const history = useSelector(userHistory);

    const dispatch = useDispatch();

    const historyUpdated = (
        weight!==todayHistory?.weight ||
        water!==todayHistory?.water ||
        food!==todayHistory?.food ||
        excercise!==todayHistory?.excercise
    );

    const calculateTotalCalories = food => food ? food.reduce((calCount, foodItem) => (calCount+(foodItem.carbs*4+foodItem.protein*4+foodItem.fat*9)),0) : 0
    //const today = todayHistory;

      //const caloriesFromProtein = today ? today.food.reduce((prev, foodItem)=>(prev+foodItem.protein*4),0) : 0;
        //const caloriesFromCarbs = today ? today.food.reduce((prev, foodItem)=>(prev+foodItem.carbs*4),0) : 0;
        //const caloriesFromFat = today ? today.food.reduce((prev, foodItem)=>(prev+foodItem.fat*9),0) : 0;
        // const totalCalories = caloriesFromProtein+caloriesFromCarbs+caloriesFromFat;

        let latest;

        history.forEach(d=>{
            if(!latest || latest.day<d.day) latest=d;
        });

        const bmr = 88.362 + (13.397 * latest?.weight) + (4.799 * 177) - (5.677 * 20);
        // const calorieDeficit = bmr+today?.excercise-totalCalories;
    
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dates = {
        label:"Date",
        values:history.slice().reverse().map(d=>`${days[new Date(d.date).getDay()]}`)
      }
      const cdHistory = [...history].reverse().map(d=>(bmr+d.excercise-calculateTotalCalories(d.food)));
      const weightHistory = [...history].reverse().map(d=>d.weight);
      const yaxisDeficit = {
        label:"Deficit (KCal)",
        values:[0,500,1000,1500,2000,2500]
      }
      const deficitGraph = {
        label: "2023",
        data: cdHistory,
        pointColor: "#6B6B6B",
        graphColor: "#0257CE",
        dashing: 0,
        hoverLabel: val=>`${Math.round(val)} KCal`,
      };
      const yaxisWeight = {
        label:"Weight (Kg)",
        values:[75,80,85,90,95,100]
      }
      const weightGraph = {
        label: "Weight Data",
        data: weightHistory,
        pointColor: "#183A1D",
        graphColor: "#F0A04B",
        dashing: 0,
        hoverLabel: val=>`${Math.round(val*10)/10} Kg`,
      };

    useEffect(()=>{
        if(todayHistory){
            setWeight(todayHistory.weight);
            setWater(todayHistory.water);
            setFood(todayHistory.food);
            setExcercise(todayHistory.excercise);
        }
    },[todayHistory]);

    return (
        <div className="items-center h-fit">
            <div className="flex justify-between">
                <div className="text-2xl font-bold">Track Progress</div>
                <button onClick={()=>{
                    dispatch(saveUserProgress({weight,water,food,excercise}));
                }} className={`${historyUpdated ? 'flex' : 'hidden'} gap-2 items-center py-1.5 px-2 bg-gray-800 text-white rounded-md hover:opacity-80 w-20 text-center`}>
                    {
                        status==="loading" ?
                        <Loading height={24} width={24} stroke="white" className="mx-auto" /> :
                        <>
                            <div>Save</div>
                            <AiTwotoneSave className="w-5 h-5" />
                        </>
                    }
                </button>
            </div>
            <div className="flex gap-4 text-xl font-semibold items-center mt-3">
                <div className="flex gap-1 items-center">
                    <div className="mr-1">Weight:</div>
                    <InlineInput value={weight} setValue={setWeight} placeholder={userBodyMetrics.weight.toString()} className=""/>
                    <div className="font-medium text-gray-700">kg</div>
                </div>
                <div className="flex gap-1 items-center">
                    <div className="mr-1">Water:</div>
                    <InlineInput value={water} setValue={setWater} placeholder="2.5" className=""/>
                    <div className="font-medium text-gray-700">L</div>
                </div> 
                <div className="flex gap-1 items-center">
                    <div className="mr-1">Excercise:</div>
                    <InlineInput value={excercise} setValue={setExcercise} placeholder="250" className=""/>
                    <div className="font-medium text-gray-700">KCal</div>
                </div>
            </div>
          <div className="mt-2 text-xl font-semibold">Record Meals</div>
            <Table 
                className="mt-2 h-44 text-left"
                colSpan={[4,2,2,2,2]}
                header={["Name","Calories","Carbs","Protein","Fat"]}
                rows={food.map(({name,carbs,protein,fat})=>[name,carbs*4+protein*4+fat*9,carbs,protein,fat])}
                addRecord={true}
                summary={
                    <div className="flex gap-1 items-center px-3">
                        <div className="text-sm font-semibold">
                            {calculateTotalCalories(food)} KCal 
                        </div>
                        <div className="text-xs text-gray-700">
                            {Math.round(food.reduce((p,c)=>(c.protein*4+p),0)*1000/calculateTotalCalories(food))/10}% Protein, {Math.round(food.reduce((p,c)=>(c.carbs*4+p),0)*1000/calculateTotalCalories(food))/10}% Carbs, {Math.round(food.reduce((p,c)=>(c.fat*9+p),0)*1000/calculateTotalCalories(food))/10}% Fat
                        </div>
                    </div>
                }
                inputRecords={[
                    {derived: false, default: ""},
                    {derived: true, default: 0, fun: record=>{
                        const carbs = record[2] ? parseInt(record[2]) : 0;
                        const protein = record[3] ? parseInt(record[3]) : 0;
                        const fat = record[4] ? parseInt(record[4]) : 0;
                        return carbs*4+protein*4+fat*9;
                    }},
                    {derived: false, default: 0},
                    {derived: false, default: 0},
                    {derived: false, default: 0},
                ]}
                setRecord={record=>{
                    setFood([
                        ...food,
                        {
                            name: record[0],
                            carbs: record[2],
                            protein: record[3],
                            fat: record[4]
                        }
                    ]);
                }}
                />
            <button onClick={()=>setShowInsights(true)} className="p-2 bg-gray-800 rounded-md text-white font-semibold hover:opacity-80 mt-4">Show Insights</button>
            <PopUpWrapper show={showInights} setShow={setShowInsights} className="w-1/3 bg-white p-6 rounded-md flex flex-col justify-center items-center">
                <LineGraphComponent graphID="deficit-graph" width={400} height={200} xaxis={dates} yaxis={yaxisDeficit} graphs={[deficitGraph]} target={{value:1000,type:"gt",label:"Target"}} sum={`Total Saved: ${Math.round(cdHistory.reduce((a,b)=>(a+b),0))}KCal / ${Math.round(cdHistory.reduce((a,b)=>(a+b),0)/770)/10}Kg`}/>
                <LineGraphComponent graphID="weight-graph" width={400} height={200} xaxis={dates} yaxis={yaxisWeight} graphs={[weightGraph]} target={{value:85,type:"lt",label:"Target"}} />
            </PopUpWrapper>
        </div>
    );
}