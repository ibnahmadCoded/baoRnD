import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addReferral } from "../features/referrals/referralSlice";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const ReferralForm = () => {
    const dispatch = useDispatch()

    const [showTypeModal, setShowTypeModal] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        type: '',
    })
    
    const { email, type } = formData

    const { referrals, isLoading, isError, isSuccess, message } = useSelector((state) => state.referrals)

    useEffect(() => {
        if(isError){
            //toast.error(message)
        }

        if(isSuccess){
        }

    }, [referrals, isError, isSuccess, message, email, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = e => {
        e.preventDefault()

        const referralData = { email, type }

        dispatch(addReferral(referralData))

        toast.success(`Referral successfully created. An email has been sent to ${email}`)

        setFormData({
            email: '',
            type: '',
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
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Enter email of the user</label>
                        <input type="email" id="email" name="email"
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                            placeholder="Enter the user`s email" value={email} onChange={onChange} required 
                        />
                    </div>

                    <div class="mb-4">
                        <label for="" class="block mb-2 text-sm font-medium text-gray-900">
                            What are you referring this user to baoRnD as?
                            <button 
                                className="ml-2 rounded-full bg-custom-150 w-4 h-4 text-black hover:bg-custom-100 hover:text-white text-xs"
                                onClick={() => setShowTypeModal(true)}
                                >
                                i
                            </button>
                        </label>
                        <select id="type" name="type" 
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5"
                            value={type} onChange={onChange} required>
                            <option label=" "></option>
                            <option value="Follower">Follower</option>
                            <option value="Researcher">Researcher</option>
                            <option value="Developer">Developer</option>
                            <option value="Supervisor">Supervisor</option>
                            <option value="Collaborator">Collaborator</option>
                            <option value="Basic">Ths person just wants to join baoRnD</option>
                        </select>
                    </div>

                    <div>
                        <button type="submit" class="text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add My Project</button>
                    </div>
                </form>
            </div>

            <>
                {showTypeModal ? (
                    <>
                    <div class="flex justify-center items-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                        {/* Modal Content */}
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                            {/* Modal Header */}
                            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Understanding Referral Types
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal"
                                    onClick={() => setShowTypeModal(false)}>
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close</span>
                                </button>
                            </div>

                            
                            {/* Modal Body */}
                            <div class="p-6 space-y-2">
                                <p className="font-semibold text-black">Investment Category</p>
                                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    You can refer the user as a supervisor, researcher, developer, collaborator, follower or even just to join baoRnD. Note that
                                    preference will be automaticlly given to people who you immediately need on your project, as we select the next set of users.
                                </p>
                            </div>

                            {/* Modal footer */}
                            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <button data-modal-toggle="defaultModal" type="button" 
                                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    onClick={() => setShowTypeModal(false)}>
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

export default ReferralForm