import { Table } from "./Table";

export const MealPlanTable = ({mealPlan, className}) => {
    const getDayString = dayIndex =>{
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[dayIndex];
    }
    return (
        <div className={`rounded-md overflow-y-auto text-sm ${className}`}>
            {
                mealPlan?.data.map((dayPlan, dayIndex) => (
                    <div className="bg-gray-200 p-4">
                        <div className="text-xl font-bold text-gray-800">{getDayString(dayIndex)}</div>
                        <Table className="mt-2" 
                            colSpan={[1,3,1]}
                            header={["Meal","Food","Calories"]}
                            rows={
                                ['Breakfast', 'Lunch', 'Snacks', 'Dinner']
                                    .filter(meal=>dayPlan[meal.toLowerCase()])
                                    .map(meal=>[
                                        meal, 
                                        dayPlan[meal.toLowerCase()].name, 
                                        dayPlan[meal.toLowerCase()].calories
                                        ])
                            }/>
                    </div>
                ))
            }
        </div>
    );
}