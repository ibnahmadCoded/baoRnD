import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useState } from 'react'
//import { addInvestment } from "../features/investments/investmentSlice"
import { toast } from 'react-toastify'
import { replyRequest } from "../features/requests/requestSlice"


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentRequestForm({ amount, requestId, setShowPaymentForm }) {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const params = useParams()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    const [formRequest, setFormRequest] = useState({
        reply: "",
    })

    const { reply } = formRequest

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if(amount === 0){
            toast.error("You cannot invest $0")
        } else {
            if(!error){
                try {
                    const {id} = paymentMethod
        
                    const config = {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        },
                        mode: "no-cors"
                    }
                    
                    const paymentData = {
                        amount: parseInt(amount)*100,  // stripe accepts in cents unit
                        id: id,
                        type: "Requested Payment",
                        project: params.id
                    }
        
                    const response = await axios.post("/api/payment", paymentData, config)
        
                    const requestData = { requestId: requestId, reply: reply  }
        
                    dispatch(replyRequest(requestData))
        
                    if(response.data){
                        setSuccess(true)
                    }
        
                    toast.success("Your payment was successfully submitted. Thank you!")

                    setShowPaymentForm(false)
        
                } catch (error) {
                    console.log("Error", error)
                }
            } else {
                console.log(error.message)
            }
        }
    }

    const onChange = (e) => {
        setFormRequest((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <div class="mb-4 content-center">
                <p>You are about to make a payment of ${amount}</p>
            </div>
            <div class="mb-4">
                <label for="" class="block mb-2 text-sm font-medium text-gray-900">Any reply message for the receiver?</label>
                <textarea type="textarea" id="reply" name="reply"
                    class="shadow-sm bg-gray-50 border h-28 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                    placeholder="Enter request message" value={reply} onChange={onChange}
                />
            </div>
            
            <div class="mb-4">
                <label for="" class="block mb-2 text-sm font-medium text-gray-900">Input card details and pay</label>
                <fieldset className="FormGroup">
                    <div className="FormRow">
                        <CardElement options={CARD_OPTIONS}/>
                    </div>
                </fieldset>
            </div>
            <div class="mb-4">
                <button className="bg-custom-150 text-black hover:bg-custom-100 hover:text-white ml-6 w-11/12 h-10">Pay</button>
            </div>
        </form>
        :
       <div>
           <h2>Thank you for making a payment</h2>
       </div> 
        }
            
        </>
    )
}