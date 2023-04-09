export const MealPlanTable = ({mealPlan, className}) => {
    console.log(mealPlan);
    return (
        <div className={`rounded-md overflow-y-auto text-sm ${className}`}>
            {
                mealPlan?.data.map((dayPlan, dayIndex) => (
                    <div className="bg-gray-200 p-4">
                        <div className="text-xl font-bold text-gray-800">Day {dayIndex+1}</div>
                        <div className="rounded-md overflow-hidden mt-2">
                            <div className="bg-gray-800 text-white grid grid-cols-5 py-1 px-2 gap-3">
                                <div>Meal</div>
                                <div className="col-span-3">Food</div>
                                <div>Calories</div>
                            </div>
                            {
                                dayPlan.breakfast &&
                                <div className="bg-gray-100 grid grid-cols-5 py-1 px-2 gap-3">
                                    <div>Breakfast</div>
                                    <div className="col-span-3">{dayPlan.breakfast.name}</div>
                                    <div>{dayPlan.breakfast.calories}</div>
                                </div>
                            }
                            {
                                dayPlan.lunch &&
                                <div className="bg-gray-100 grid grid-cols-5 py-1 px-2 gap-3">
                                    <div>Lunch</div>
                                    <div className="col-span-3">{dayPlan.lunch.name}</div>
                                    <div>{dayPlan.lunch.calories}</div>
                                </div>
                            }
                            {
                                dayPlan.snacks &&
                                <div className="bg-gray-100 grid grid-cols-5 py-1 px-2 gap-3">
                                    <div>Snacks</div>
                                    <div className="col-span-3">{dayPlan.snacks.name}</div>
                                    <div>{dayPlan.snacks.calories}</div>
                                </div>
                            }
                            {
                                dayPlan.dinner &&
                                <div className="bg-gray-100 grid grid-cols-5 py-1 px-2 gap-3">
                                    <div>Dinner</div>
                                    <div className="col-span-3">{dayPlan.dinner.name}</div>
                                    <div>{dayPlan.dinner.calories}</div>
                                </div>
                            }

                        </div>
                    </div>
                ))
            }
        </div>
    );
}