import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "./Spinner"
import { addApplication, getProjectapplications, resetapplications } from "../features/applications/applicaitonSlice"
import { toast } from 'react-toastify'

const ApplicationView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)
    const { stakeholders } = useSelector((state) => state.project)
    const { applications, isLoadingApplication, isErrorApplicaiton, isSuccessApplication, messageApplication } = useSelector((state) => state.applications)

    const [formApplication, setFormApplication] = useState({
        message: ''
    })

    const { message } = formApplication

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }
  
        if(isErrorApplicaiton){
          console.log(messageApplication)
        }

        if(isSuccessApplication){
          }
  
        dispatch(getProjectapplications(params.id))
  
        return() => {
          dispatch(resetapplications)
        }
  
      }, [user, params.id, messageApplication, isSuccessApplication, isErrorApplicaiton, navigate, dispatch])

      const onSubmit = e => {
        e.preventDefault()

        const applicationData = { project: params.id, type: project.category, message: message  }

        dispatch(addApplication(applicationData))

        toast.success("Your application was successfully submitted. Thank you!")

        setFormApplication({
            message: ''
        })
    }

    const onChange = (e) => {
        setFormApplication((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
  
    if(isLoadingApplication){
          return <Spinner />
    }

    console.log(stakeholders)
    const stakes = stakeholders.filter((stakeholder) => stakeholder.user === user._id)

    console.log(stakes)

    return (
        <>   
        <section>
            <p className="md:ml-28 md:mb-5">You can find project applications or apply to projects here. We are still in beta stage. Please bear with us.</p>
            {/* People should be able submit new application. project owner doesnt need to submit application */}
            {project.user !== user._id ? (
            <section className="my-0 mx-auto w-9/12">
                <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                    <form onSubmit={onSubmit}>
                        <p class="font-bold mb-3">Submit New Application</p>
                        
                        <div class="mb-4">
                            <textarea type="textarea" id="message" name="message"
                                class="shadow-sm bg-gray-50 border h-28 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                placeholder="Enter milestone detail" value={message} onChange={onChange}
                            />
                        </div>
            
                        <div>
                            <button type="submit" class="mb-5 text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 rounded-lg text-sm px-5 py-2.5 text-center">
                                Submit Application
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            ) 
            : (null)}

            {/* 
            {milestones.length > 0 ? (
                <div>
                    {milestones.map((milestone) => (
                        <>
                        {milestone.project === params.id ? (
                            <MilestoneItem key={milestone._id} milestone={milestone}/>
                        ) : (null)}
                        </>
                    ))}
                </div>
                ) : (<h3>No milestones can be found</h3>)}
            */}
        </section>          
        </>
    )
}

export default ApplicationView