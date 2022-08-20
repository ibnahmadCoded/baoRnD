import { useDispatch } from "react-redux"
import { replyApplication } from "../features/applications/applicaitonSlice"

const ApplicationItem = ({application}) => {
    const dispatch = useDispatch()

    return (
        <>
        <div className="my-0 mx-auto w-9/12 mb-5">
        <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
            <p>
                Applicant: <span className="text-custom-100 text-bold">{application.username}</span>
            </p>
            {/* Allow project users to accept or reject applications to projects that are theirs */}
            {(application.reply === "Pending") ? (
                <button 
                    onClick={() => dispatch(replyApplication({applicationId: application._id, reply: "Accepted"}))} 
                    className="text-white rounded-lg hover:bg-custom-150 bg-custom-100 float-right w-16 h-10 rounded-tr-lg hover:text-black">
                        Accept
                </button>
            ) : (null)}

            {(application.reply === "Pending") ? (
                <button 
                    onClick={() => dispatch(replyApplication({applicationId: application._id, reply: "Rejected"}))} 
                    className="text-black rounded-lg mr-3 hover:bg-custom-100 bg-custom-150 float-right w-16 h-10 rounded-tr-lg hover:text-white">
                        Reject
                </button>
            ) : (null)}

            {(application.reply === "Accepted") ? (
                <p>Application <span className="text-custom-100 font-bold">Accepted</span></p>
            ) : (null)}

            {(application.reply === "Rejected") ? (
                <p>Application <span className="text-custom-150 font-bold">Rejected</span></p>
            ) : (null)}

            <p>
                Applicant`s Message`: {application.message}
            </p>
            <p>
                Application Date: {new Date(application.createdAt).toLocaleString("en-Us")}
            </p>
        </div>
        </div>
        </>
    )
}

export default ApplicationItem