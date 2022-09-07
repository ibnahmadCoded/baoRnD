import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "./Spinner"
import { getMyApplications, resetapplications } from "../features/applications/applicaitonSlice"
import MyApplicationItem from "./MyApplicationItem"

const MyApplicationsView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { applications, isLoadingApplication, isErrorApplication, isSuccessApplication, messageApplication } = useSelector((state) => state.applications)

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }
  
        if(isErrorApplication){
          console.log(messageApplication)
        }

        if(isSuccessApplication){
        }

        dispatch(getMyApplications())
  
        return() => {
          dispatch(resetapplications)
        }
  
      }, [user, messageApplication, isSuccessApplication, isErrorApplication, navigate, dispatch])

    if(isLoadingApplication){
          return <Spinner />
    }

    return (
        <>
        <section>
        <p className="md:ml-40 mt-5 md:mb-5">You can find all your applications here. We are still in beta stage. Please bear with us.</p>

            {applications.length > 0 ? (
                <div>
                    {[...applications].reverse().map((application) => (
                        <>
                        {application.user === user._id ? (
                            <MyApplicationItem key={application._id} application={application}/>
                        ) : (null)}
                        </>
                    ))}
                </div>
            ) : (<h3>You have not submitted any applications</h3>)}

        </section>
        </>
    )
}

export default MyApplicationsView