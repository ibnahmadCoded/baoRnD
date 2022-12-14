import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import MaterialItem from "../components/MaterialItem"
import { addMaterial, getMaterials, resetmaterials } from "../features/materials/materialSlice"
import Spinner from "./Spinner"
import { toast } from "react-toastify"
import axios from "axios"

const MaterialView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)
    const { materials, isLoadingMaterial, isErrorMaterial, isSuccessMaterial, messageMaterial } = useSelector((state) => state.materials)

    const [formMaterial, setFormMaterial] = useState({
        material: '',
        visibility: '',
        type: ''
    })

    const [file, setFile] = useState("")
    const [uploadedFile, setUploadedFile] = useState({})

    const onChangeFile = e => {
        setFile(e.target.files[0])
    }

    const { material, visibility, type } = formMaterial

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }
  
        if(isErrorMaterial){
          console.log(messageMaterial)
        }

        if(isSuccessMaterial){
        }
  
        dispatch(getMaterials(params.id))
  
        return() => {
          dispatch(resetmaterials)
        }
  
      }, [user, params.id, messageMaterial, isErrorMaterial, isSuccessMaterial, navigate, dispatch])

    const onSubmit = async e => {
        e.preventDefault()

        if (type === "Link" || type === "Text"){
            const materialData = { project: params.id, material: material, type: type, visibility: visibility }

            dispatch(addMaterial(materialData))

            toast.success("New material successfully added")
        }

        if (type === "File"){
            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await axios.post("/api/upload", formData, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })

                const { fileName, filePath } = res.data
                setUploadedFile({ fileName, filePath })
            } catch (err) {
                console.log(err)
            }

            const materialData = { project: params.id, material: uploadedFile.filePath, type: type, visibility: visibility }

            console.log(materialData)

            dispatch(addMaterial(materialData))

            toast.success("New material successfully added")
        }

        setFormMaterial({
            material: '',
            visibility: '',
            type: ''
        })
    }

    const onChange = (e) => {
        setFormMaterial((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
  
      if(isLoadingMaterial){
          return <Spinner />
        }

    return (
        <>   
        <section className="content">
            <p className="md:ml-28 md:mb-5">You can find project materials here. Files, and other formats will soon be supported. Please bear with us.</p>
            {/* The project owner should be able add new materials */}
            {project.user === user._id ? (
                        <section className="my-0 mx-auto w-9/12">
                        <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                        <form onSubmit={onSubmit}>
                            <p class="font-bold mb-3">Add New Material</p>
                            <div class="mb-4">
                              <label for="" class="block mb-2 text-sm font-medium text-gray-900">Select material type</label>
                              <select id="type" name="type" placeholder="Select Type"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5"
                                value={type} onChange={onChange} required>
                                    <option label=" "></option>
                                    <option value="Link" selected="selected">Link</option>
                                    <option value="Text">Text</option>
                                    <option value="File">File (JPG, PNG, Only)</option>
                              </select>
                            </div>

                            { formMaterial['type'] === 'Link' || formMaterial['type'] === 'Text' ?
                                <>
                                    <label for="update" class="block mb-2 text-sm font-medium text-gray-900">Please select visibility of this material</label>
                                    <div class="flex items-center mb-4" onChange={onChange}>
                                        <input class="mr-1 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="Hidden" name="visibility" /> Hidden
                                        <input class="mr-1 ml-8 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="Visible" name="visibility" /> Visible
                                    </div>
                                    <label for="update" class="block mb-2 text-sm font-medium text-gray-900">Please enter the material</label>
                                    <div class="mb-4">
                                        <input type="text" id="material" name="material"
                                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                            placeholder="Enter material here" value={material} onChange={onChange} required 
                                        />
                                    </div>
                                </>
                                : null
                            }

                            { formMaterial['type'] === 'File' ?
                                <>
                                    <label for="update" class="block mb-2 text-sm font-medium text-gray-900">Please select visibility of this material</label>
                                    <div class="flex items-center mb-4" onChange={onChange}>
                                        <input class="mr-1 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="Hidden" name="visibility" /> Hidden
                                        <input class="mr-1 ml-8 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="Visible" name="visibility" /> Visible
                                    </div>
                                    <div class="mb-4 border-2 border-custom-100 p-3 rounded-lg">
                                        <label for="update" class="block mb-2 text-sm font-medium text-gray-900">Please select file</label>
                                        <input type="file" onChange={onChangeFile} required />
                                    </div>
                                </>
                                : null
                            }

                            <div>
                                <button type="submit" class="mb-5 text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 rounded-lg text-sm px-5 py-2.5 text-center">
                                    Add Material
                                </button>
                            </div>
                        </form>
                        </div>
                        </section>
                    ) 
            : (null)}
            {materials.length > 0 ? (
                <div>
                    {[...materials].reverse().map((material) => (
                        <>
                        {material.project === params.id ? (
                            <MaterialItem key={material._id} material={material}/>
                        ) : (null)}
                        </>
                    ))}
                </div>
                ) : (<h3>No materials can be found</h3>)}
        </section>          
        </>
    )
}

export default MaterialView