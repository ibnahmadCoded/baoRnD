import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import MilestoneItem from "../components/MilestoneItem"
import { addMilestone, getMilestones, resetmilestones } from "../features/milestones/milestoneSlice"
import Spinner from "./Spinner"

const MilestoneView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)
    const { milestones, isLoadingMilestone, isErrorMilestone, isSuccessMilestone, messageMilestone } = useSelector((state) => state.milestones)

    const [formMilestone, setFormMilestone] = useState({
        title: '',
        detail: '',
        dueDate: ''
    })

    const { title, detail, dueDate } = formMilestone

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }
  
        if(isErrorMilestone){
          console.log(messageMilestone)
        }
  
        dispatch(getMilestones(params.id))
  
        return() => {
          dispatch(resetmilestones)
        }
  
      }, [user, params.id, messageMilestone, isErrorMilestone, navigate, dispatch])

      const onSubmit = e => {
        e.preventDefault()

        const milestoneData = { project: params.id, title: title, detail: detail, dueDate: dueDate  }

        dispatch(addMilestone(milestoneData))

        setFormMilestone({
            title: '',
            detail: '',
            dueDate: ''
        })
    }

    const onChange = (e) => {
        setFormMilestone((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
  
      if(isLoadingMilestone){
          return <Spinner />
        }

    return (
        <>   
        <section className="content">
            
            {milestones.length > 0 ? (
                <div>
                    <p className="md:ml-28 md:mb-5">You can find project milestones here. We are still in beta stage. Please bear with us.</p>
                    {/* The project owner should be able add new milestones */}
                    {project.user === user._id ? (
                        <section className="my-0 mx-auto w-9/12">
                        <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                        <form onSubmit={onSubmit}>
                            <p class="font-bold mb-3">Add New Milestone</p>
                            <div class="mb-4">
                                <input type="text" id="title" name="title"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                    placeholder="Enter milestone title" value={title} onChange={onChange} required 
                                />
                            </div>
                            <div class="mb-4">
                                <textarea type="textarea" id="detail" name="detail"
                                    class="shadow-sm bg-gray-50 border h-28 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                    placeholder="Enter milestone detail" value={detail} onChange={onChange}
                                />
                            </div>
                            <div class="mb-4">
                                <input type="date" id="dueDate" name="dueDate"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                    placeholder="Enter milestone due date" value={dueDate} onChange={onChange} required 
                                />
                            </div>
                            <div>
                                <button type="submit" class="mb-5 text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 rounded-lg text-sm px-5 py-2.5 text-center">
                                    Add Milestone
                                </button>
                            </div>
                        </form>
                        </div>
                        </section>
                    ) 
                    : (null)}
                    
                    {milestones.map((milestone) => (
                        <>
                        {milestone.project === params.id ? (
                            <MilestoneItem key={milestone._id} milestone={milestone}/>
                        ) : (null)}
                        </>
                    ))}
                </div>
                ) : (<h3>No milestones can be found</h3>)}
        </section>          
        </>
    )
}

export default MilestoneView