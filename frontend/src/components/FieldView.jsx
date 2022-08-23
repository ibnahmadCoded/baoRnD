import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import Spinner from "./Spinner"
import { addField, deleteField, getFields, resetfields } from "../features/fields/fieldSlice"

const FieldView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)

    const { fields, isLoadingField, isErrorField, isSuccessField, messageField } = useSelector((state) => state.fields)

    const [formField, setFormField] = useState({
        field: ''
    })

    const { field } = formField

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }
  
        if(isErrorField){
          console.log(messageField)
        }

        if(isSuccessField){
          }
  
        dispatch(getFields(params.id))
  
        return() => {
          dispatch(resetfields)
        }
  
      }, [user, params.id, messageField, isSuccessField, isErrorField, navigate, dispatch])
    
    const onSubmit = e => {
        e.preventDefault()

        const fieldData = { project: params.id, field: field }

        dispatch(addField(fieldData))

        toast.success("New field successfully added")

        setFormField({
            field: ''
        })
    }

    const onChange = (e) => {
        setFormField((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    if(isLoadingField){
        return <Spinner />
    }

    return (
        <>   
        <section>
            <p className="md:ml-28 md:mb-5">You can find project fields here. We are still in beta stage. Please bear with us.</p>
            {/* The project owner should be able add new deliverables */}
            {project.user === user._id ? (
            <section className="my-0 mx-auto w-9/12">
                <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                    <form onSubmit={onSubmit}>
                        <p class="font-bold mb-3">Add New Field</p>
                        <div class="mb-4">
                            <input type="text" id="field" name="field"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                placeholder="Enter goal" value={field} onChange={onChange} required 
                            />
                        </div>
                        <div>
                            <button type="submit" class="mb-5 text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 rounded-lg text-sm px-5 py-2.5 text-center">
                                Add Field
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            ) 
            : (null)}

            {fields.length > 0 ? (
                <div>
                    <div className="my-0 mx-auto w-9/12 mb-5">
            
                        <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
                            <div className="mt-5">
                                {fields[0].fields.map((field) => (
                                    <p key={field}>
                                        {field}
                                        {/* Allow users to delete fields on projects that is theirs */}
                                        {(project.user === user._id) ? (
                                            <button 
                                                onClick={() => dispatch(deleteField({project: project._id, field: field}))} 
                                                className="text-black mx-20 rounded-lg hover:bg-custom-100 hover:text-white">
                                                    X
                                            </button>
                                        ) : (null)}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                ) : (<h3>No fields can be found</h3>)}
           
        </section>          
        </>
    )
}

export default FieldView