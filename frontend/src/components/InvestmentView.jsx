import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "./Spinner"
import { toast } from 'react-toastify'
import { getProjectInvestments, resetinvestments } from "../features/investments/investmentSlice"
import InvestmentItem from "./InvestmentItem"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51LZVa3Cd0GCKuogEkWsfAx5SVEGmaHI4VhlQldVYzzL2V7lKjIzby6tb9WrEmFRkRWuB456cnFKm6znxkp1VALyw00TSu4ZSTv"

const stripeTestPromise = loadStripe(PUBLIC_KEY)
const lodash = require('lodash')

const InvestmentView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)
    const { investments, isLoadingInvestment, isErrorInvestment, isSuccessInvestment, messageInvestment } = useSelector((state) => state.investments)
    const [showPaymentForm, setShowPaymentForm] = useState(false)
    const [invAmount, setInvAmount] = useState(0)

    const [formInvestment, setFormInvestment] = useState({
        amount: 0
    })

    const { amount } = formInvestment

    useEffect(() => {

        if(!user){
            navigate("/landing")
        }
  
        if(isErrorInvestment){
          console.log(messageInvestment)
        }

        if(isSuccessInvestment){
          }
  
        dispatch(getProjectInvestments(params.id))
  
        return() => {
          dispatch(resetinvestments)
        }
  
      }, [user, params.id, messageInvestment, isSuccessInvestment, isErrorInvestment, navigate, dispatch])

    
    const invs = investments.filter((inv) => (inv.project === params.id && inv.amount !== []))

    var totalInvested = 0

    if(invs){
        for (var i = 0; i < invs.length; i++) {
            totalInvested += lodash.sum(invs[i].amounts)
        }
    }

    const onSubmit = e => {
        e.preventDefault()

        if(parseInt(amount) + totalInvested > project.amount){
            toast.error(`You cannot invest more than the goal. The amount left ${project.amount - totalInvested}`)
        }
        else {

            setShowPaymentForm(true)

            setInvAmount(amount)
        }

        setFormInvestment({
            amount: 0
        })
    }

    const onChange = (e) => {
        setFormInvestment((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
  
    if(isLoadingInvestment){
        return <Spinner />
    }

    var cat

    if(project.category === "Fund" && project.acceptapps){
        cat = "allowed"
    }

    var invest
    if(project.amount && totalInvested < project.amount){
        invest = "allowed"
    }

    return (
            <>   
            <section>
                <p className="md:ml-28 md:mb-5">You can find project investments or invest in projects here. We are still in beta stage. Please bear with us.</p>
                {/* Everyone can invest in a project, as long as they can view it. Including the project owner.*/}

                {cat && cat === "allowed" && invest === "allowed" ? (
                <section className="my-0 mx-auto w-9/12">
                    <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                        <p class="font-bold mb-1">General Investment Information</p>
                        <p>Message from the project owner: {project.appmsg}</p>
                        <span className="text-custom-100 font-bold">${totalInvested}</span> out of <span className="text-custom-150">${project.amount} </span> invested.
                        <p>Join the investors in this proejct. </p>
                        <form className="mt-5" onSubmit={onSubmit}>
                            <p class="font-bold mb-3">Make New Investment</p>
                            
                            <div class="mb-4">
                                <input type="text" id="amount" name="amount"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                    placeholder="Enter investment amount" value={amount} onChange={onChange} required 
                                />
                            </div>
                
                            <div>
                                <button type="submit" 
                                class="mb-5 text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 rounded-lg text-sm px-5 py-2.5 text-center">
                                    Make Payment
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
                ) 
                : (null)}

                {(project.amount && totalInvested === project.amount) ? (
                    <section className="my-0 mx-auto w-9/12">
                        <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                            <p class="font-bold mb-1">General Investment Information</p>
                            <p>Message from the project owner: {project.appmsg}</p>
                            <p class="">Sorry, you cannot invest. The investment goal for this project has been reached.</p>
                            <span className="text-custom-100 font-bold">${totalInvested}</span> out of <span className="text-custom-150">${project.amount} </span> 
                            invested.
                        </div>
                    </section>
                    ) : (null)}
                
                {/** Non-owner can ever view investments to a project */}
                {(investments.length > 0 && project.user === user._id) ? (
                    <div>
                        {investments.map((investment) => (
                            <>
                            {investment.project === params.id ? (
                                <InvestmentItem key={investment._id} investment={investment}/>
                            ) : (null)}
                            </>
                        ))}
                    </div>
                    ) : (<h3>You are not authorized to view investments in this project or there are no investments.</h3>)}
                
                {showPaymentForm ? (
                    <>
                    <div class="flex justify-center items-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                        {/* Modal Content */}
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                            {/* Modal Header */}
                            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Make Payment
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal"
                                    onClick={() => setShowPaymentForm(false)}>
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>

                            
                            {/* Modal Body */}
                            <div class="p-6 space-y-2">
                                
                            <Elements stripe={stripeTestPromise}>
                                <PaymentForm amount = {invAmount} setShowPaymentForm={(bool) => setShowPaymentForm(bool)}/>
                            </Elements>

                            </div>

                            {/* Modal footer */}
                            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <button data-modal-toggle="defaultModal" type="button" 
                                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    onClick={() => setShowPaymentForm(false)}>
                                    Close
                                </button>
                            </div>

                        </div>
                        </div>
                    </div>
                    </>
                ) : null}  

            </section>          
            </>
    )
}

export default InvestmentView