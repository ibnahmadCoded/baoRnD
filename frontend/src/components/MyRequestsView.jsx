import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "./Spinner"
import MyRequestItem from "./MyRequestItem"
import { getMyRequests, resetrequests } from "../features/requests/requestSlice"

const MyRequestsView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { requests, isLoadingRequest, isErrorRequest, isSuccessRequest, messageRequest } = useSelector((state) => state.requests)

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }
  
        if(isErrorRequest){
          console.log(messageRequest)
        }

        if(isSuccessRequest){
        }

        dispatch(getMyRequests())
  
        return() => {
          dispatch(resetrequests)
        }
  
      }, [user, messageRequest, isSuccessRequest, isErrorRequest, navigate, dispatch])

    if(isLoadingRequest){
          return <Spinner />
    }

    return (
        <>
        <section>
        <p className="md:ml-28 md:mb-5">You can find all your requests here. We are still in beta stage. Please bear with us.</p>

            {requests.length > 0 ? (
                <div>
                    {[...requests].reverse().map((request) => (
                        <>
                        {request.user === user._id ? (
                            <MyRequestItem key={request._id} request={request}/>
                        ) : (null)}
                        </>
                    ))}
                </div>
            ) : (<h3>You have not made any requests</h3>)}

        </section>
        </>
    )
}

export default MyRequestsView