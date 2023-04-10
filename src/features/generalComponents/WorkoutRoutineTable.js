import { Table } from "./Table";

export const WorkoutRoutineTable = ({workoutRoutine, className}) => {
    const getDayString = dayIndex =>{
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[dayIndex];
    }
    return (
        <div className={`rounded-md overflow-y-auto text-sm ${className}`}>
            {
                workoutRoutine?.data.map((dayPlan, dayIndex) => (
                    <div className="bg-gray-200 p-4">
                        <div className="text-xl font-bold text-gray-800">{getDayString(dayIndex)}</div>
                        <Table className="mt-2" 
                            colSpan={[2,1,1,2]} 
                            header={["Excercise","Sets","Reps","Muscle Group"]} 
                            rows={dayPlan.map(({name,sets,reps,muscleGroup})=>[name,sets,reps,muscleGroup])}/>
                    </div>
                ))
            }
        </div>
    );
}