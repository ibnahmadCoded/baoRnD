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
        duration: '',
        category: "",
        amount: "",
        acceptapps: false,
        appmsg: ""
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { title, overview, moreinfo, visibility, duration, category, amount, acceptapps, appmsg } = formData

    const { projects, isLoading, isError, isSuccess, message } = useSelector((state) => state.projects)

    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showVisibilityModal, setShowVisibilityModal] = useState(false);
    const [showAppmsgModal, setShowAppmsgModal] = useState(false);
    const [showInvestormsgModal, setShowInvestormsgModal] = useState(false);

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

        const projectData = { title, overview, moreinfo, visibility, duration, category, amount, acceptapps, appmsg }

        dispatch(createProject(projectData))

        setFormData({
            title: '',
            overview: '',
            moreinfo: '',
            visibility: '',
            duration: '',
            category: "",
            amount: "",
            acceptapps: false,
            appmsg: ""
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
                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Enter project title</label>
                    <input type="text" id="title" name="title"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                        placeholder="Enter project title" value={title} onChange={onChange} required 
                    />
                </div>

                <div class="mb-4">
                    <label for="" class="block mb-2 text-sm font-medium text-gray-900">
                        What do you seek on this platform with this project?
                        <button 
                            className="ml-2 rounded-full bg-custom-150 w-4 h-4 text-black hover:bg-custom-100 hover:text-white text-xs"
                            onClick={() => setShowCategoryModal(true)}
                            >
                            i
                        </button>
                    </label>
                    <select id="category" name="category" 
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5"
                        value={category} onChange={onChange} required>
                        <option label=" "></option>
                        <option value="Fund">I`m seeking investment for this project</option>
                        <option value="Res">I`m seeking researcher(s) for this project</option>
                        <option value="Dev">I`m seeking developer(s) for this project</option>
                        <option value="Sup">I`m seeking supervisor(s) for this project</option>
                        <option value="Collab">I`m seeking collaborator(s) for this project</option>
                        <option value="Basic">I just want to host my project here</option>
                        <option value="Pub">I just want to publicize my project here</option>
                    </select>
                </div>

                { formData['category'] === 'Fund' ?
                   <>
                        <div class="mb-4">
                            <label for="amount" class="block mb-2 text-sm font-medium text-gray-900">Enter then investment amount you seek</label>
                            <input type="amount" id="amount" name="amount"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                placeholder="Enter then investment amount you seek" value={amount} onChange={onChange} required 
                            />
                        </div>

                        <label for="acceptapps" class="block mb-2 text-sm font-medium text-gray-900">Do you want to accept investments for this project?</label>
                        <div class="flex items-center mb-4" onChange={onChange}>
                            <input class="mr-1 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="true" name="acceptapps" /> Yes
                            <input class="mr-1 ml-8 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="false" name="acceptapps" /> No
                        </div>
                        
                        <div class="mb-4">
                            <label for="appmsg" class="block mb-2 text-sm font-medium text-gray-900">
                                Any message for portential investors? Enter it  here.
                                <button 
                                    className="ml-2 rounded-full bg-custom-150 w-4 h-4 text-black hover:bg-custom-100 hover:text-white text-xs"
                                    onClick={() => setShowInvestormsgModal(true)}
                                    >
                                    i
                                </button>
                            </label>
                            <textarea type="text" id="appmsg" name="appmsg"
                                class="shadow-sm h-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                placeholder="Enter message for potential investors." value={appmsg} onChange={onChange}
                            />
                        </div>
                   </>
                   : null
               } 

                { formData['category'] === 'Res' || formData['category'] === 'Dev' || formData['category'] === 'Collab' || formData['category'] === 'Sup' ?
                   <>
                        <label for="acceptapps" class="block mb-2 text-sm font-medium text-gray-900">Do you want to accept applications for this project?</label>
                        <div class="flex items-center mb-4" onChange={onChange}>
                            <input class="mr-1 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="true" name="acceptapps" /> Yes
                            <input class="mr-1 ml-8 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="false" name="acceptapps" /> No
                        </div>

                        <div class="mb-4">
                            <label for="appmsg" class="block mb-2 text-sm font-medium text-gray-900">
                                Any message for portential applicants? Enter it  here
                                <button 
                                    className="ml-2 rounded-full bg-custom-150 w-4 h-4 text-black hover:bg-custom-100 hover:text-white text-xs"
                                    onClick={() => setShowAppmsgModal(true)}
                                    >
                                    i
                                </button>
                            </label>
                            <textarea type="text" id="appmsg" name="appmsg"
                                class="shadow-sm h-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                placeholder="Enter message for potential applicants." value={appmsg} onChange={onChange}
                            />
                        </div>
                   </>
                   : null
               } 
                

                <div class="mb-4">
                    <label for="overview" class="block mb-2 text-sm font-medium text-gray-900">Enter project overview</label>
                    <textarea id="overview" name="overview"
                        class="shadow-sm h-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                        placeholder="Enter brief project overview" value={overview} onChange={onChange} required 
                    />
                </div>

                <div class="mb-4">
                    <label for="moreinfo" class="block mb-2 text-sm font-medium text-gray-900">Any more information about this project? Enter it  here</label>
                    <textarea type="text" id="moreinfo" name="moreinfo"
                        class="shadow-sm h-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                        placeholder="Any more information you would like to add?" value={moreinfo} onChange={onChange}
                    />
                </div>

                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
                    Please select project`s visibility
                    <button 
                        className="ml-2 rounded-full bg-custom-150 w-4 h-4 text-black hover:bg-custom-100 hover:text-white text-xs"
                        onClick={() => setShowVisibilityModal(true)}
                            >
                        i
                    </button>
                </label>
                <div class="flex items-center mb-4" onChange={onChange}>
                    <input class="mr-1 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="Public" name="visibility" /> Public
                    <input class="mr-1 ml-8 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="Private" name="visibility" /> Private
                </div>

                <div class="mb-4">
                    <label for="duration" class="block mb-2 text-sm font-medium text-gray-900">Enter project duration</label>
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

            <>
                {showCategoryModal ? (
                    <>
                    <div class="flex justify-center items-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                        {/* Modal Content */}
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                            {/* Modal Header */}
                            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Understanding Project Categories
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal"
                                    onClick={() => setShowCategoryModal(false)}>
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>

                            
                            {/* Modal Body */}
                            <div class="p-6 space-y-2">
                                <p className="font-semibold text-black">Investment Category</p>
                                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    This is a project for which you are seeking investment. Choosing this options allows people to invest in your project.
                                </p>

                                <p className="font-semibold text-black">Researcher, Supervisor, Developer, or Collaborator Categories</p>
                                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    This is a project for which you are seeking researcher(s), supervisor(s), developer(s), or collaborator(s). 
                                    Choosing this options allows people to apply to your project as researcher, sepervisor, developer, or collaborator respectively.
                                    Develoepr does not necessarily mean programmer. Contractors, Civil Enginners, Architects are considered developers on this platform.
                                </p>

                                <p className="font-semibold text-black">Other Categories</p>
                                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    The other two categories are the basic categories. Both are not mutually exclusive. E.g., you can host your project and publicize it. 
                                </p>
                            </div>

                            {/* Modal footer */}
                            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <button data-modal-toggle="defaultModal" type="button" 
                                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    onClick={() => setShowCategoryModal(false)}>
                                    Close
                                </button>
                            </div>

                        </div>
                        </div>
                    </div>
                    </>
                ) : null}
                </>

                <>
                {showVisibilityModal ? (
                    <>
                    <div class="flex justify-center items-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                        {/* Modal Content */}
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                            {/* Modal Header */}
                            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Understanding Project Visibility
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal"
                                    onClick={() => setShowVisibilityModal(false)}>
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>

                            
                            {/* Modal Body */}
                            <div class="p-6 space-y-2">
                                <p className="font-semibold text-black">Public</p>
                                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Public projects are visible to everyone on the platform through the discover page. People can follow these projects.
                                    They will be able to see and comment on your updates, if you the update type is not a Note or Hidden.
                                </p>

                                <p className="font-semibold text-black">Private</p>
                                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Private projects are only visible to the project initiator (the person that created it) and stakeholders who have view access 
                                    on the project. You can add stakeholders, and set or change their view access on the stakeholders sub-page of the project page. 
                                    Similarly, stakeholders with view access will be able to see and comment on your updates, if you the update type is not a Note or Hidden.
                                </p>

                            </div>

                            {/* Modal footer */}
                            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <button data-modal-toggle="defaultModal" type="button" 
                                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    onClick={() => setShowVisibilityModal(false)}>
                                    Close
                                </button>
                            </div>

                        </div>
                        </div>
                    </div>
                    </>
                ) : null}
                </>
                <>
                {showAppmsgModal ? (
                    <>
                    <div class="flex justify-center items-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                        {/* Modal Content */}
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                            {/* Modal Header */}
                            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Understanding Application Message
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal"
                                    onClick={() => setShowAppmsgModal(false)}>
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>

                            
                            {/* Modal Body */}
                            <div class="p-6 space-y-2">
                                
                                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Enter message for potential applicants. Fill this if you are accepting applications for this project. 
                                For example, you can put what you are offering the researcher if they join your project. 
                                You can also leave this blank if you do not have any message for potential applicants. 
                                </p>

                            </div>

                            {/* Modal footer */}
                            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <button data-modal-toggle="defaultModal" type="button" 
                                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    onClick={() => setShowAppmsgModal(false)}>
                                    Close
                                </button>
                            </div>

                        </div>
                        </div>
                    </div>
                    </>
                ) : null}
                </>

                <>
                {showInvestormsgModal ? (
                    <>
                    <div class="flex justify-center items-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                        {/* Modal Content */}
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                            {/* Modal Header */}
                            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Understanding Investment Message
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal"
                                    onClick={() => setShowInvestormsgModal(false)}>
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>

                            
                            {/* Modal Body */}
                            <div class="p-6 space-y-2">
                                
                                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Enter message for potential investors. Fill this if you are accepting investment for this project. 
                                For example, you can put what you are offering the investor if they invest your project. 
                                You can also leave this blank if you do not have any message for potential investors. 
                                </p>

                            </div>

                            {/* Modal footer */}
                            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <button data-modal-toggle="defaultModal" type="button" 
                                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    onClick={() => setShowInvestormsgModal(false)}>
                                    Close
                                </button>
                            </div>

                        </div>
                        </div>
                    </div>
                    </>
                ) : null}
                </>
        </section>
    )
}

export default ProjectForm