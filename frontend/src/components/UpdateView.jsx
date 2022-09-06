import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addUpdate, getProjectUpdates, resetupdates } from "../features/updates/updateSlice"
import Spinner from "./Spinner"
import { getStake, resetstakeholders } from "../features/stakeholders/stakeholderSlice"
import UpdateItem from "./UpdateItem"
import { toast } from "react-toastify"

const UpdateView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)
    const { updates, isLoadingUpdate, isErrorUpdate, isSuccessUpdate, messageUpdate } = useSelector((state) => state.updates)
    const { stake, isLoadingStakeholder, isErrorStakehodler, isSuccessStakeholder, messageStakeholder } = useSelector((state) => state.stakeholders)

    const [formUpdate, setFormUpdate] = useState({
        type: '',
        content: '',
    })

    const { type, content } = formUpdate

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }
  
        if(isErrorUpdate){
          console.log(messageUpdate)
        }

        if(isErrorStakehodler){
            console.log(messageStakeholder)
          }

        if(isSuccessUpdate){
        }

        if(isSuccessStakeholder){
        }
  
        dispatch(getProjectUpdates(params.id))

        dispatch(getStake(params.id))
  
        return() => {
          dispatch(resetupdates)
          dispatch(resetstakeholders)
        }
  
      }, [user, params.id, messageUpdate, isSuccessUpdate, isErrorUpdate, messageStakeholder, isSuccessStakeholder, isErrorStakehodler, navigate, dispatch])

      const onSubmit = e => {
        e.preventDefault()

        const updateData = { project: params.id, type: type, content: content  }

        dispatch(addUpdate(updateData))

        toast.success("Your update was successfully saved.")

        setFormUpdate({
            type: '',
            content: ''
        })
    }

    const onChange = (e) => {
        setFormUpdate((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
  
    if(isLoadingUpdate){
          return <Spinner />
    }

    if(isLoadingStakeholder){
        return <Spinner />
  }

    return (
        <>
        <section>
        <p className="md:ml-28 md:mb-5">You can find project updates here. Only text updates for now. We are still in beta stage. Please bear with us.</p>
            {/* The project owner should be able add new updates */}
            {(project.user === user._id || stake.update) ? (
            <section className="my-0 mx-auto w-9/12">
                <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                    <form onSubmit={onSubmit}>
                        <p class="font-bold mb-3">Add New Update</p>
                        <label for="" class="block mb-2 text-sm font-medium text-gray-900">Select update type</label>
                        <select id="type" name="type" placeholder="Select Type"
                            class="shadow-sm mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5"
                            value={type} onChange={onChange} required>
                            <option label=" "></option>
                            <option value="Normal" selected="selected">Normal</option>
                            <option value="Note">Note</option>
                            <option value="Hidden">Hidden</option>
                        </select>
                        <div class="mb-4">
                            <textarea type="textarea" id="content" name="content"
                                class="shadow-sm bg-gray-50 border h-28 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                placeholder="Enter update content" value={content} onChange={onChange}
                            />
                        </div>
                        <div>
                            <button type="submit" class="mb-5 text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 rounded-lg text-sm px-5 py-2.5 text-center">
                                Add Update
                            </button>
                        </div>
                        <button onClick={() => navigate(`/editor/${params.id}`)}>use editor</button>
                    </form>
                </div>
            </section>
            ) 
            : (null)}

            {updates.length > 0 ? (
                <div>
                    {[...updates].reverse().map((update) => (
                        <>
                        {update.project === params.id ? (
                            <UpdateItem key={update._id} update={update}/>
                        ) : (null)}
                        </>
                    ))}
                </div>
            ) : (<h3>No updates can be found</h3>)}
        </section>
        </>
    )
}

export default UpdateView