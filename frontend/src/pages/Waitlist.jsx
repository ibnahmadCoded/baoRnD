import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { joinwaitlist, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Waitlist() {
    const [formData, setFormData] = useState({
        email: ''
    })

    const { email } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess){
            toast.success(message)
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const waitlistData = {
            email: email,
        }

        dispatch(joinwaitlist(waitlistData))

        setFormData({
            email: ""
        })
    } 

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
        <section className="font-bold text-3xl mb-0 py-0 px-5 content-center">
            <h1 className='text-3xl text-center'>
                 Join The Waitlist
            </h1>
            <p className="text-custom-120 text-2xl text-center">Please enter your email in the text field below</p>
        </section>

        <section className="my-0 mx-auto w-9/12 mb-44">
            <div class=" sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                    <form onSubmit={onSubmit}>
                        <div class="mb-4">
                            <input type="email" id="email" name="email"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                placeholder="Enter your email" value={email} onChange={onChange} required 
                            />
                        </div>
                        
                        <div>
                            <button type="submit" class="text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 rounded-lg text-sm px-5 py-2.5 text-center">
                                Add me to Waitlist</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default Waitlist