import { useSelector, useDispatch } from "react-redux"
import { deleteRequest } from "../features/requests/requestSlice"

const MyRequestItem = ({request}) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)


    return (
        <>
        {/* only the request sender (those they sent), the project owner (all), or the request receiver (those they received) can view requests. */}
        {(request.user === user._id || request.to === user._id || project.user === user._id) ?
        <>
        <div className="my-0 mx-auto w-9/12 mb-5">
        <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
                <p>
                    Project:
                        
                    <a className="text-custom-100 font-bold hover:text-custom-150" href={"/project/" + request.project}> {request.projectname}</a> 
                    
                </p>
            <p>
                Sent by: {request.user === user._id ? 
                <span><a className="text-custom-100 font-bold hover:text-custom-150" href={"/profile/" + request.user}> You </a></span>
                : 
                <span><a className="text-custom-100 font-bold hover:text-custom-150" href={"/profile/" + request.user}> {request.username}</a></span>
                }
                
            </p>

            <p>
                Sent to: {request.to === user._id ? 
                <span><a className="text-custom-100 font-bold hover:text-custom-150" href={"/profile/" + request.to}> You </a></span>
                : 
                <span><a className="text-custom-100 font-bold hover:text-custom-150" href={"/profile/" + request.to}> {request.toname}</a></span>
                }
                
            </p>

            {/* Allow the request sender to delete the request. You cannot delete a repleid request, for audit purpose */}
            {(request.user === user._id && !request.replied) ? (
                <button 
                    onClick={() => dispatch(deleteRequest(request._id))} 
                    className="text-black rounded-lg hover:bg-custom-100 bg-custom-150 float-right p-2 hover:text-white">
                        Delete Request
                </button>
            ) : (null)}

            <p>
                Request Type: {request.type}
            </p>

            {(request.type === "Payment") ? (
                <p>
                    Amount Requested: ${request.amount}
                </p>
            ) : (null)}

            <p>
                Request Message: {request.requestMsg}
            </p>
            
            {(((request.replied && request.type === "Invoice") || (request.replied && request.type === "Other") || (request.replied && request.type === "Receipt"))) ? (
                <p>Request <span className="text-custom-100 font-bold">Replied</span></p>
            ) : (null)}

            {(request.replied && request.type === "Payment") ? (
                <p>Request <span className="text-custom-100 font-bold">Paid</span></p>
            ) : (null)}

            {(request.replied) ? (
                <p>Reply: {request.reply} </p>
            ) : (<p>Status: <span className="text-custom-150 font-bold">Awaiting Reply</span></p>)}
            <p>
                Request Date: {new Date(request.createdAt).toLocaleString("en-Us")}
            </p>
        </div>
        </div>
        <>
        </>
        </> 
        : 
        null}
        </>
    )
}

export default MyRequestItem