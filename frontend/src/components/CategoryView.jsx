import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { changeProjectCategory, getProject, reset } from "../features/project/projectSlice"
import Spinner from "./Spinner"

// change category, accept/reject apps
const CategoryView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const { user } = useSelector((state) => state.auth)
    const { project, isLoading, isError, isSuccess, message } = useSelector((state) => state.project)
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    
    //const { project } = useSelector((state) => state.project)

    const [formCategory, setFormCategory] = useState({
        category: '',
        amount: '',
        acceptapps: false
    })

    const { category, amount, acceptapps } = formCategory

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }
  
        if(isError){
          console.log(message)
        }

        if(isSuccess){
          }
  
        dispatch(getProject(params.id))
  
        return() => {
          dispatch(reset)
        }
  
      }, [user, params.id, message, isSuccess, isError, navigate, dispatch])

      const onSubmit = e => {
        e.preventDefault()

        const categoryData = {projectId: params.id, category: category, amount: amount, acceptapps: acceptapps  }

        // continue from here
        dispatch(changeProjectCategory(categoryData))

        setFormCategory({
            category: '',
            amount: '',
            acceptapps: false
        })
    }

    const onChange = (e) => {
        setFormCategory((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <>   
        <section className="content">
            <p className="md:ml-28 md:mb-5">You can find project category here. We are still in beta stage. Please bear with us.</p>
            {/* The project owner should be able change the category of the project */}
            {project.user === user._id ? (
            <section className="my-0 mx-auto w-9/12">
                <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                    <form onSubmit={onSubmit}>
                        <p class="font-bold mb-3">Change Project`s` Category</p>
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

                            { formCategory['category'] === 'Fund' ?
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
                            </>
                            : null
                        } 

                            { formCategory['category'] === 'Res' || formCategory['category'] === 'Dev' || formCategory['category'] === 'Collab' || formCategory['category'] === 'Sup' ?
                            <>
                                    <label for="acceptapps" class="block mb-2 text-sm font-medium text-gray-900">Do you want to accept applications for this project?</label>
                                    <div class="flex items-center mb-4" onChange={onChange}>
                                        <input class="mr-1 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="true" name="acceptapps" /> Yes
                                        <input class="mr-1 ml-8 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="false" name="acceptapps" /> No
                                    </div>
                            </>
                            : null
                        } 
                        <div>
                            <button type="submit" class="mb-5 text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 rounded-lg text-sm px-5 py-2.5 text-center">
                                Change Category
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            ) 
            : (null)}

            {project.category ? (
                <div>
                    <div className="my-0 mx-auto w-9/12 mb-5">
                    <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
                        <p>
                            Category: 
                            <span>
                                {project.category === "Collab" ? <> seeking colloaborator(s)</> : (null)}
                                {project.category === "Res" ? <> seeking researcher(s)</> : (null)}
                                {project.category === "Sup" ? <> seeking supervisor(s)</> : (null)}
                                {project.category === "Dev" ? <> seeking developer(s)</> : (null)}
                                {project.category === "Fund" ? <> seeking investment to the tune of ${project.amount}</> : (null)}
                                {project.category === "Pub" ? <> seeking to publicize project</> : (null)}
                                {project.category === "Basic" ? <> seeking to just host project</> : (null)}
                            </span>
                        </p>
                        {/* Allow users to toggle accept applications for this category or not */}
                        {(project.user === user._id && project.acceptapps && project.category !== "Basic" && project.category !== "Pub") ? (
                            <button 
                                onClick={() => dispatch(changeProjectCategory({projectId: params.id, acceptapps: false}))} 
                                className="rounded-lg hover:text-custom-150 text-custom-100 h-12 rounded-tr-lg">
                                    Stop Accepting Applications
                            </button>
                        ) : (null)}
                        {(project.user === user._id && !project.acceptapps && project.category !== "Basic" && project.category !== "Pub")? (
                            <button 
                                onClick={() => dispatch(changeProjectCategory({projectId: params.id, acceptapps: true}))} 
                                className="rounded-lg hover:text-custom-150 text-custom-100 h-12 rounded-tr-lg">
                                    Start Accepting Applications
                            </button>
                        ) : (null)}
                    </div>
                    </div>
                </div>
                ) : (<h3>No category can be found</h3>)}
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
        </section>          
        </>
    )
}

export default CategoryView