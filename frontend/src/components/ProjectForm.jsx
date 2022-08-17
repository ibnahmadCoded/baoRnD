import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createProject } from "../features/projects/projectSlice"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

const ProjectForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        overview: '',
        moreinfo: '',
        visibility: '',
        duration: ''
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { title, overview, moreinfo, visibility, duration } = formData

    const { projects, isLoading, isError, isSuccess, message } = useSelector((state) => state.projects)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess){
            //navigate("/verification")   // navigate to project page to view the project currently created
            navigate(`/project/${message._id}`)
        }

    }, [projects, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = e => {
        e.preventDefault()

        const projectData = { title, overview, moreinfo, visibility, duration }

        dispatch(createProject(projectData))

        setFormData({
            title: '',
            overview: '',
            moreinfo: '',
            visibility: '',
            duration: ''
        })
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <section class="mb-10">
            <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-md sm:px-10">
            <form onSubmit={onSubmit}>
                <div class="mb-4">
                    <input type="text" id="title" name="title"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                        placeholder="Enter project title" value={title} onChange={onChange} required 
                    />
                </div>

                <div class="mb-4">
                    <textarea id="overview" name="overview"
                        class="shadow-sm h-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                        placeholder="Enter brief project overview" value={overview} onChange={onChange} required 
                    />
                </div>

                <div class="mb-4">
                    <textarea type="text" id="moreinfo" name="moreinfo"
                        class="shadow-sm h-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                        placeholder="Any more information you would like to add?" value={moreinfo} onChange={onChange}
                    />
                </div>

                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Please select project`s visibility</label>
                <div class="flex items-center mb-4" onChange={onChange}>
                    <input class="mr-1 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="Public" name="visibility" /> Public
                    <input class="mr-1 ml-8 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="Private" name="visibility" /> Private
                </div>

                <div class="mb-4">
                    <input type="text" id="duration" name="duration"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                        placeholder="Enter project duration, e.g. 10 days" value={duration} onChange={onChange} 
                    />
                </div>

                <div>
                    <button type="submit" class="text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add My Project</button>
                </div>
            </form>
            </div>
        </section>
    )
}

export default ProjectForm