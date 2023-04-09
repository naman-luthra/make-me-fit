export const WorkoutRoutineTable = ({workoutRoutine, className}) => {
    return (
        <div className={`rounded-md overflow-y-auto text-sm ${className}`}>
            {
                workoutRoutine?.data.map((dayPlan, dayIndex) => (
                    <div className="bg-gray-200 p-4">
                        <div className="text-xl font-bold text-gray-800">Day {dayIndex+1}</div>
                        <div className="rounded-md overflow-hidden mt-2">
                            <div className="bg-gray-800 text-white grid grid-cols-6 py-1 px-2 gap-3">
                                <div className="col-span-2">Excercise</div>
                                <div>Sets</div>
                                <div>Reps</div>
                                <div className="col-span-2">Muscle Group</div>
                            </div>
                            {
                                dayPlan.map((excercise, index) => (
                                    <div key={index} className="bg-gray-100 grid grid-cols-6 py-1 px-2 gap-3">
                                        <div className="col-span-2">{excercise.name}</div>
                                        <div>{excercise.sets}</div>
                                        <div>{excercise.reps}</div>
                                        <div className="col-span-2">{excercise.muscleGroup}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
}