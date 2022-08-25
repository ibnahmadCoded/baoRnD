import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { submitfeedback } from '../features/feedbacks/feedbackSlice'
import Spinner from '../components/Spinner'
import SideMenu from '../components/SideMenu'

function Feedback() {
    const [formData, setFormData] = useState({
        feedback: ''
    })

    const { feedback } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(!user){
            navigate("/landing")
        }

        if(isSuccess){
            toast.success(message)
        }

    }, [user, isError, isSuccess, message, navigate ])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const feedbackData = {
            feedback: feedback,
        }

        dispatch(submitfeedback(feedbackData))

        toast.success("Feedback successfully submitted. Thank you.")

        setFormData({
            feedback: ""
        })
    } 

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
        <section className="font-bold text-3xl mb-0 py-0 px-5 content-center">
            <h1 className='text-3xl text-center'>
                 Give Us Feedback
            </h1>
            <p className="text-custom-120 text-2xl text-center">Your feedback is important to us.</p>
        </section>

        <section>
            <div class="container mx-auto">
                <div class="flex flex-row flex-wrap py-4">
                {/* Side Menu */}
                
                <SideMenu />

                <main role="main" class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
                    <p>Your praise keep us working hard to provide the best experience for you. However, we love your positive criticism even more! Feel free to tell us
                        anything here. You can even request for a new feature. 
                    </p>
                    <section className="my-0 mx-auto w-9/12 mb-44">
                        <div class=" sm:mx-auto sm:w-full sm:max-w-md">
                            <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10">
                                <form onSubmit={onSubmit}>
                                    <div class="mb-4">
                                        <textarea type="textarea" id="feedback" name="feedback"
                                            class="shadow-sm bg-gray-50 border h-32 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                            placeholder="Write your feedback" value={feedback} onChange={onChange} required 
                                        />
                                    </div>
                                    
                                    <div>
                                        <button type="submit" class="text-white bg-custom-100 hover:bg-custom-150 focus:ring-4 focus:outline-none focus:ring-custom-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                            Submit Feedback</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </main>
                </div>
            </div>
        </section>
        </>
    )
}

export default Feedback