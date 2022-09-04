import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import PasswordChecklist from "react-password-checklist"

function Register() {
    // no signups during beta period, 
    const beta = true

    const [formData, setFormData] = useState({
        name: '',
        type: '',
        email: '',
        password: '',
        confirmpassword: ''
    })

    const { name, type, email, password, confirmpassword } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const [showTermsModal, setShowTermsModal] = useState(false);

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user){
            navigate("/verification")   // do otp verification instead, therefore send to otp verificationpage
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

        if(password !== confirmpassword){
            toast.error("Passwords do not match")
        } else {
            const userData = {
                name,
                email,
                type,
                password,
            }

            dispatch(register(userData))
        }
    } 

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
        {beta ? (<>
        <section className="font-bold text-3xl mb-2 py-0 px-5 content-center">
            <h1 className='text-3xl text-center'>
                Welcome To <span class="text-custom-100">baoRnD </span>
            </h1>
            <p className="text-custom-120 text-2xl text-center">We are currently unavailable in your region, please join the waitlist</p>
        </section>

        <section className="my-0 mx-auto w-9/12 md:mb-64 ">
        <div class=" sm:mx-auto sm:w-full sm:max-w-md">
        {/* Button */}
            <div class="py-8 px-6 mx-auto sm:px-10">
              <a
                href="http://localhosT:3000/earlyaccess"
                class="p-3 px-6 pt-2 shadow-2xl text-black bg-custom-150 rounded-full baseline hover:bg-custom-100 hover:text-white">Join the waitlist
              </a>
            </div>
        </div>
        </section>
        
        </>) : (
        <>
        <section className="font-bold text-3xl mb-0 py-0 px-5 content-center">
            <h1 className='text-3xl text-center'>
                 Register
            </h1>
            <p className="text-custom-120 text-2xl text-center">Please create an account</p>
        </section>

        <section className="my-0 mx-auto w-9/12 mb-16">
            <div class=" sm:mx-auto sm:w-full sm:max-w-md">
                <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10">
                    <form onSubmit={onSubmit}>
                        <div class="mb-4">
                            <input type="text" id="name" name="name"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                placeholder="Enter your full name" value={name} onChange={onChange} required 
                            />
                        </div>
                        <div class="mb-4">
                            <input type="email" id="email" name="email" 
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                placeholder="Your email goes here!" value={email} onChange={onChange} required 
                            />
                        </div>
                        
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Please select account type</label>
                        <div class="flex items-center mb-4" onChange={onChange}>
                            <input class="mr-1 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="Company" name="type" /> Company
                            <input class="mr-1 ml-8 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="Individual" name="type" /> Individual
                        </div>
                        
                        <div class="mb-4">
                            <input type="password" id="password" name="password"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                placeholder="Please enter your password." value={password} onChange={onChange} required 
                            />
                        </div>
                        <div class="mb-4">
                            <input type="password" id="confirmpassword" name="confirmpassword" 
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                placeholder="Please repeat your password." value={confirmpassword} onChange={onChange} required 
                            />
                        </div>
                        <PasswordChecklist
                            rules={["minLength","specialChar","number","capital","match"]}
                            minLength={5}
                            value={password}
                            valueAgain={confirmpassword}
                            onChange={(isValid) => {}}
                        />
                        {/* privacy and terms agreement  */}
                        <div class="flex items-start mb-4">
                            <div class="flex items-center h-5">
                            <input id="terms" type="checkbox" value="" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-custom-100" required />
                            </div>
                            <label for="terms" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                I agree with the 
                                <button 
                                    onClick={() => setShowTermsModal(true)}
                                    class="text-custom-100 hover:underline">{<span className='ml-1'> terms and conditions</span>} 
                                </button>
                            </label>
                        </div>
                        
                        <div>
                            <button type="submit" class="text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 rounded-lg text-sm px-5 py-2.5 text-center">Register new account</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </>)} 

        {showTermsModal ? (
                    <>
                    <div class="flex justify-center items-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                        {/* Modal Content */}
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                            {/* Modal Header */}
                            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Terms and Conditions
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal"
                                    onClick={() => setShowTermsModal(false)}>
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close</span>
                                </button>
                            </div>

                            
                            {/* Modal Body */}
                            <div class="p-6 space-y-2">
                            <p class="mb-5 mt-5 text-gray-500 sm:text-xl">
                                Sorry, we are still drawing this up. However, you can be rest assured that your project data is secure and safe. We do 
                                gather or use your data for anything other than making sure it is available for YOU when your need it. Our 
                                terms and privacy will be up soon. Regarding condiitons, just be good! Please bear with us.
                            </p>
                            </div>

                            {/* Modal footer */}
                            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <button data-modal-toggle="defaultModal" type="button" 
                                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    onClick={() => setShowTermsModal(false)}>
                                    Close
                                </button>
                            </div>

                        </div>
                        </div>
                    </div>
                    </>
                ) : null}
        </>
    )
}

export default Register