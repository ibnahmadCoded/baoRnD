import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addGoal, getGoals, resetgoals } from "../features/goals/goalSlice"
import { toast } from "react-toastify"
import Spinner from "./Spinner"
import GoalItem from "./GoalItem"

const GoalView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)
    const { goals, isLoadingGoal, isErrorGoal, isSuccessGoal, messageGoal } = useSelector((state) => state.goals)

    const [formGoal, setFormGoal] = useState({
        goal: ''
    })

    const { goal } = formGoal

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }
  
        if(isErrorGoal){
          console.log(messageGoal)
        }

        if(isSuccessGoal){
          }
  
        dispatch(getGoals(params.id))
  
        return() => {
          dispatch(resetgoals)
        }
  
      }, [user, params.id, messageGoal, isSuccessGoal, isErrorGoal, navigate, dispatch])

    const onSubmit = e => {
        e.preventDefault()

        const goalData = { project: params.id, goal: goal }

        dispatch(addGoal(goalData))

        toast.success("New goal successfully added")

        setFormGoal({
            goal: ''
        })
    }

    const onChange = (e) => {
        setFormGoal((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    if(isLoadingGoal){
        return <Spinner />
    }

    return (
        <>   
        <section>
            <p className="md:ml-28 md:mb-5">You can find project goals here. We are still in beta stage. Please bear with us.</p>
            {/* The project owner should be able add new goals */}
            {project.user === user._id ? (
            <section className="my-0 mx-auto w-9/12">
                <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                    <form onSubmit={onSubmit}>
                        <p class="font-bold mb-3">Add New Goal</p>
                        <div class="mb-4">
                            <input type="text" id="goal" name="goal"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                placeholder="Enter goal" value={goal} onChange={onChange} required 
                            />
                        </div>
                        <div>
                            <button type="submit" class="mb-5 text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 rounded-lg text-sm px-5 py-2.5 text-center">
                                Add Goal
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            ) 
            : (null)}

            {goals.length > 0 ? (
                <div>
                    {[...goals].reverse().map((goal) => (
                        <>
                        {goal.project === params.id ? (
                            <GoalItem key={goal._id} goal={goal}/>
                        ) : (null)}
                        </>
                    ))}
                </div>
                ) : (<h3>No goals can be found</h3>)}
           
        </section>          
        </>
    )
}

export default GoalView