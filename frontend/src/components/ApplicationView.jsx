import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "./Spinner"
import { addApplication, getProjectapplications, resetapplications } from "../features/applications/applicaitonSlice"
import { toast } from 'react-toastify'
import ApplicationItem from "./ApplicationItem"

const ApplicationView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)
    const { stakeholders } = useSelector((state) => state.stakeholders)
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

    const stakes = stakeholders.filter((stakeholder) => stakeholder.user === user._id)

    const apps = applications.filter((app) => (app.user === user._id && app.project === params.id && app.type === project.category))

    var cat

    if(project.category === "Res"){
        cat = "Researcher"
    }

    if(project.category === "Sup"){
        cat = "Supervisor"
    }

    if(project.category === "Dev"){
        cat = "Developer"
    }

    if(project.category === "Collab"){
        cat = "Collaborator"
    }

    var appstatus

    if(apps.length > 0 && apps[0].reply === "Rejected"){
        appstatus = "Allowed"
    }

    if(apps.length > 0 && apps[0].reply === "Pending"){
        appstatus = "Not allowed"
    }

    if(apps.length > 0 && apps[0].reply === "Accepted"){
        appstatus = "Not allowed"
    }

    var stakestatus
    if(stakes.length > 0 && !stakes[0].type.includes(cat)){
        stakestatus = "Allowed"
    }

    if(stakes.length > 0 && stakes[0].type.includes(cat)){
        stakestatus = "Not allowed"
    }

    return (
        <>   
        <section>
            <p className="md:ml-28 md:mb-5">You can find project applications or apply to projects here. We are still in beta stage. Please bear with us.</p>
            {/* People should be able submit new application. project owner doesnt need to submit application. a user that already has a stake for which 
            they are apply for in the project cannot apply again either. A user who has applied before cannot apply also except if the application has 
            already been rejected. If the project isnt accepting apps, dont show form also.*/}

            {(project.user !== user._id || !stakes) && cat && apps && stakestatus !== "Not allowed" && appstatus !== "Not allowed" && project.acceptapps ? (
            <section className="my-0 mx-auto w-9/12">
                <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                    Apply to this project as {cat}
                    Message from the project owner: {project.appmsg}
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

            {/** Non-owner can never view applications to a project */}
            {(applications.length > 0 && project.user === user._id) ? (
                <div>
                    {applications.map((application) => (
                        <>
                        {application.project === params.id ? (
                            <ApplicationItem key={application._id} application={application}/>
                        ) : (null)}
                        </>
                    ))}
                </div>
                ) : (<h3>You are not authorized to view applications to this project</h3>)}

            
        </section>          
        </>
    )
}

export default ApplicationView