import { useSelector, useDispatch } from "react-redux"
import { deleteDeliverable, updateDeliverable } from "../features/deliverables/deliverableSlice"

const DeliverableItem = ({deliverable}) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)

    return (
        <>
        <div className="my-0 mx-auto w-9/12 mb-5">
        <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
            
           
            <span className="text-custom-100 font-bold">{deliverable.deliverable}</span>
            {deliverable.delivered ? 
                    <p className="text-custom-100 font-bold">Delivered</p>
                    : 
                    <p className="text-custom-150 font-bold">Undelievered</p>
                }
            {/* Allow users to delete milestones on projects that is theirs */}
            {project.user === user._id ? (
                <>
                    <button 
                        onClick={() => dispatch(deleteDeliverable(deliverable._id))} 
                        className="text-black rounded-lg hover:bg-custom-100 bg-custom-150 float-right w-16 h-10 ml-5 rounded-tr-lg hover:text-white">
                            Delete
                    </button>
                </>
            ) : (null)}
            <p>
                Created at: {new Date(deliverable.createdAt).toLocaleString("en-Us")}
            </p>
                {deliverable.delivered ? 
                    null
                    : 
                    <button 
                        onClick={() => dispatch(updateDeliverable({id: deliverable._id}))} 
                        className="rounded-lg hover:text-custom-150 text-custom-100 h-12 rounded-tr-lg">
                            Mark As Delivered
                    </button>
                }
        </div>
        </div>
        </>
    )
}

export default DeliverableItem