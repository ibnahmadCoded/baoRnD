import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { verify, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Verifyaccount() {
    const [formData, setFormData] = useState({
        otp: ''
    })

    const { otp } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    console.log(typeof(otp))

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user.verified){
            navigate("/")   
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const userId = user._id

    const onSubmit = (e) => {
        e.preventDefault()

        if(user.verified){
            toast.error("Account already verified, Please proceed to login!")
        } else {
            const verificationData = {
                user: userId,
                otpCode: otp,
            }

            dispatch(verify(verificationData))
            console.log(verificationData)
        }
    } 

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
        <section className="font-bold text-3xl mb-0 py-0 px-5 content-center">
            <h1 className='text-3xl text-center'>
                 Verify Account
            </h1>
            <p className="text-custom-120 text-2xl text-center">Please check your email inbox for the code</p>
        </section>

        <section className="my-0 mx-auto w-9/12 mb-44">
            <div class=" sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                    <form onSubmit={onSubmit}>
                        <div class="mb-4">
                            <input type="text" id="otp" name="otp"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                placeholder="Enter the verification code" value={otp} onChange={onChange} required 
                            />
                        </div>
                        
                        <div>
                            <button type="submit" class="text-white bg-custom-100 hover:bg-custom-150 focus:ring-4 focus:outline-none focus:ring-custom-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Verify my account</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default Verifyaccount