import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { addDeliverable, getDeliverables, resetdeliverables } from "../features/deliverables/deliverableSlice"
import Spinner from "./Spinner"
import DeliverableItem from "./DeliverableItem"

const DeliverableView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)

    const { deliverables, isLoadingDeliverable, isErrorDeliverable, isSuccessDeliverable, messageDeliverable } = useSelector((state) => state.deliverables)

    const [formDeliverable, setFormDeliverable] = useState({
        deliverable: ''
    })

    const { deliverable } = formDeliverable

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }
  
        if(isErrorDeliverable){
          console.log(messageDeliverable)
        }

        if(isSuccessDeliverable){
          }
  
        dispatch(getDeliverables(params.id))
  
        return() => {
          dispatch(resetdeliverables)
        }
  
      }, [user, params.id, messageDeliverable, isSuccessDeliverable, isErrorDeliverable, navigate, dispatch])
    
    const onSubmit = e => {
        e.preventDefault()

        const deliverableData = { project: params.id, deliverable: deliverable }

        dispatch(addDeliverable(deliverableData))

        toast.success("New deliverable successfully added")

        setFormDeliverable({
            deliverable: ''
        })
    }

    const onChange = (e) => {
        setFormDeliverable((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    if(isLoadingDeliverable){
        return <Spinner />
    }

    return (
        <>   
        <section>
            <p className="md:ml-28 md:mb-5">You can find project deliverables here. We are still in beta stage. Please bear with us.</p>
            {/* The project owner should be able add new deliverables */}
            {project.user === user._id ? (
            <section className="my-0 mx-auto w-9/12">
                <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                    <form onSubmit={onSubmit}>
                        <p class="font-bold mb-3">Add New Deliverable</p>
                        <div class="mb-4">
                            <input type="text" id="deliverable" name="deliverable"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                placeholder="Enter goal" value={deliverable} onChange={onChange} required 
                            />
                        </div>
                        <div>
                            <button type="submit" class="mb-5 text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 rounded-lg text-sm px-5 py-2.5 text-center">
                                Add Deliverable
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            ) 
            : (null)}

            {deliverables.length > 0 ? (
                <div>
                    {deliverables.map((deliverable) => (
                        <>
                        {deliverable.project === params.id ? (
                            <DeliverableItem key={deliverable._id} deliverable={deliverable}/>
                        ) : (null)}
                        </>
                    ))}
                </div>
                ) : (<h3>No deliverables can be found</h3>)}
           
        </section>          
        </>
    )
}

export default DeliverableView