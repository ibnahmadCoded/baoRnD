import { useSelector, useDispatch } from "react-redux"
import { deleteGoal, updateGoal } from "../features/goals/goalSlice"

const GoalItem = ({goal}) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)

    return (
        <>
        <div className="my-0 mx-auto w-9/12 mb-5">
        <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
            
           
            <span className="text-custom-100 font-bold">{goal.goal}</span>
            {goal.completed ? 
                    <p className="text-custom-100 font-bold">Completed</p>
                    : 
                    <p className="text-custom-150 font-bold">Incomplete</p>
                }
            {/* Allow users to delete milestones on projects that is theirs */}
            {project.user === user._id ? (
                <>
                    <button 
                        onClick={() => dispatch(deleteGoal(goal._id))} 
                        className="text-black rounded-lg hover:bg-custom-100 bg-custom-150 float-right w-16 h-10 ml-5 rounded-tr-lg hover:text-white">
                            Delete
                    </button>
                </>
            ) : (null)}
            <p>
                Created at: {new Date(goal.createdAt).toLocaleString("en-Us")}
            </p>
                {goal.completed ? 
                    <button 
                        onClick={() => dispatch(updateGoal({id: goal._id}))} 
                        className="rounded-lg hover:text-custom-100 text-custom-150 h-12 rounded-tr-lg">
                            Mark As Incomplete
                    </button>
                    : 
                    <button 
                        onClick={() => dispatch(updateGoal({id: goal._id}))} 
                        className="rounded-lg hover:text-custom-150 text-custom-100 h-12 rounded-tr-lg">
                            Mark As Completed
                    </button>
                }
        </div>
        </div>
        </>
    )
}

export default GoalItem