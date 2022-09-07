import { useDispatch } from "react-redux"
import { deleteApplication } from "../features/applications/applicaitonSlice"

const MyApplicationItem = ({application}) => {
    const dispatch = useDispatch()

    return (
        <>
        <div className="my-0 mx-auto w-9/12 mb-5">
        <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
            <p>
                Project: <span>
                    <a className="text-custom-100 font-bold hover:text-custom-150" href={"/project/" + application.project}> {application.projectname}</a>
                </span>
            </p>
            {/* Allow users to delete applications that are theirs */}

            {(application.reply === "Pending") ? (
                <>
                <p>Status: <span className="text-custom-100 font-bold">Pendiing</span></p>
                <button 
                    onClick={() => dispatch(deleteApplication({applicationId: application._id}))} 
                    className="text-black rounded-lg mr-3 hover:bg-custom-100 bg-custom-150 float-right w-16 h-10 rounded-tr-lg hover:text-white">
                        Delete
                </button>
                </>
            ) : (null)}

            {(application.reply === "Accepted") ? (
                <p>Status: <span className="text-custom-100 font-bold">Accepted</span></p>
            ) : (null)}

            {(application.reply === "Rejected") ? (
                <p>Status: <span className="text-custom-150 font-bold">Rejected</span></p>
            ) : (null)}

            <p>
                Your Message`: {application.message}
            </p>
            <p>
                Application Date: {new Date(application.createdAt).toLocaleString("en-Us")}
            </p>
        </div>
        </div>
        </>
    )
}

export default MyApplicationItem