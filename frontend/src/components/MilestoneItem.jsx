import { useSelector, useDispatch } from "react-redux"
import { deleteMilestone } from "../features/milestones/milestoneSlice"

const MilestoneItem = ({milestone}) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)

    return (
        <>
        <div className="my-0 mx-auto w-9/12 mb-5">
        <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
            <p>
                Milestone: <span className="text-custom-100 text-bold">{milestone.title}</span>
            </p>
            {/* Allow users to delete milestones on projects that is theirs */}
            {project.user === user._id ? (
                <button 
                    onClick={() => dispatch(deleteMilestone(milestone._id))} 
                    className="text-black rounded-lg hover:bg-custom-100 bg-custom-150 float-right w-16 h-10 rounded-tr-lg hover:text-white">
                        Delete
                </button>
            ) : (null)}
            <p>
                Detail: {milestone.detail}
            </p>
            <p className="text-custom-150">
                Due Date: {new Date(milestone.dueDate).toLocaleString("en-Us")}
            </p>
            <p>
                Created At: {new Date(milestone.createdAt).toLocaleString("en-Us")}
            </p>
        </div>
        </div>
        </>
    )
}

export default MilestoneItem