import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerreferral, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Registerreferral() {
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

    let query = useQuery();
    const referral_id = query.get("id")

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user){
            navigate("/verification")   // do otp verification.
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
                referral_id
            }

            dispatch(registerreferral(userData))
        }
    } 

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
        <section className="font-bold text-3xl mb-0 py-0 px-5 content-center">
            <h1 className='text-3xl text-center'>
                 Register
            </h1>
            <p className="text-custom-120 text-2xl text-center">Please create an account</p>
        </section>

        <section className="my-0 mx-auto w-9/12 mb-16">
            <div class=" sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
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
                        {/* sample comment  */}
                        <div class="flex items-start mb-4">
                            <div class="flex items-center h-5">
                            <input id="terms" type="checkbox" value="" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-custom-100" required />
                            </div>
                            <label for="terms" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="http://localhost:3000" class="text-custom-100 hover:underline">terms and conditions</a></label>
                        </div>
                        
                        <div>
                            <button type="submit" class="text-white bg-custom-100 hover:bg-custom-150 focus:ring-4 focus:outline-none focus:ring-custom-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Register new account</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default Registerreferral