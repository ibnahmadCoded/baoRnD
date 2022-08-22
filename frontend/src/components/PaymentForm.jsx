import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useState } from 'react'
import { addInvestment } from "../features/investments/investmentSlice"
import { toast } from 'react-toastify'


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

export default function PaymentForm({ amount, setShowPaymentForm }) {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const params = useParams()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

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
                        type: "Investment",
                        project: params.id
                    }
        
                    const response = await axios.post("/api/payment", paymentData, config)
        
                    const investmentData = { project: params.id, amount: amount  }
        
                    dispatch(addInvestment(investmentData))
        
                    if(response.data){
                        console.log("Successful payment")
                        setSuccess(true)
                    }
        
                    toast.success("Your investment was successfully submitted. Thank you!")

                    setShowPaymentForm(false)
        
                } catch (error) {
                    console.log("Error", error)
                }
            } else {
                console.log(error.message)
            }
        }
    
    }

    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button className="bg-custom-150 text-black hover:bg-custom-100 hover:text-white ml-6 w-11/12 h-10">Pay</button>
        </form>
        :
       <div>
           <h2>Thank you for making a payment</h2>
       </div> 
        }
            
        </>
    )
}