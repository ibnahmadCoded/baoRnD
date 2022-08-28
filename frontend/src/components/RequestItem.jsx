import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { deleteRequest, replyRequest } from "../features/requests/requestSlice"
import { toast } from "react-toastify"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentRequestForm from "./PaymentRequestForm"

const PUBLIC_KEY = "pk_test_51LZVa3Cd0GCKuogEkWsfAx5SVEGmaHI4VhlQldVYzzL2V7lKjIzby6tb9WrEmFRkRWuB456cnFKm6znxkp1VALyw00TSu4ZSTv"

const stripeTestPromise = loadStripe(PUBLIC_KEY)
//const lodash = require('lodash')

const RequestItem = ({request}) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)
    const [showReplyTextModal, setShowReplyTextModal] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false)

    const [formRequest, setFormRequest] = useState({
        reply: "",
    })

    const { reply } = formRequest

    const onSubmitNormalReply = e => {
        e.preventDefault()

        const requestData = { requestId: request._id, reply: reply  }

        dispatch(replyRequest(requestData))

        toast.success("Your reply was successfully submitted. Thank you!")

        setFormRequest({
            reply: "",
        })
    }

    const onChange = (e) => {
        setFormRequest((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <>
        {/* only the request sender (those they sent), the project owner (all), or the request receiver (those they received) can view requests. */}
        {(request.user === user._id || request.to === user._id || project.user === user._id) ?
        <>
        <div className="my-0 mx-auto w-9/12 mb-5">
        <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
            <p>
                Sent by: {request.user === user._id ? 
                <span><a className="text-custom-100 font-bold hover:text-custom-150" href={"/profile/" + request.user}> You </a></span>
                : 
                <span><a className="text-custom-100 font-bold hover:text-custom-150" href={"/profile/" + request.user}> {request.username}</a></span>
                }
                
            </p>

            <p>
                Sent to: {request.to === user._id ? 
                <span><a className="text-custom-100 font-bold hover:text-custom-150" href={"/profile/" + request.to}> You </a></span>
                : 
                <span><a className="text-custom-100 font-bold hover:text-custom-150" href={"/profile/" + request.to}> {request.toname}</a></span>
                }
                
            </p>

            {/* Allow the request sender to delete the request. You cannot delete a repleid request, for audit purpose */}
            {(request.user === user._id && !request.replied) ? (
                <button 
                    onClick={() => dispatch(deleteRequest(request._id))} 
                    className="text-black rounded-lg hover:bg-custom-100 bg-custom-150 float-right p-2 hover:text-white">
                        Delete Request
                </button>
            ) : (null)}

            <p>
                Request Type: {request.type}
            </p>

            {(request.type === "Payment") ? (
                <p>
                    Amount Requested: ${request.amount}
                </p>
            ) : (null)}

            <p>
                Request Message: {request.requestMsg}
            </p>
            
            {(((request.replied && request.type === "Invoice") || (request.replied && request.type === "Other") || (request.replied && request.type === "Receipt"))) ? (
                <p>Request <span className="text-custom-100 font-bold">Replied</span></p>
            ) : (null)}

            {(request.replied && request.type === "Payment") ? (
                <p>Request <span className="text-custom-100 font-bold">Paid</span></p>
            ) : (null)}

            {(request.replied) ? (
                <p>Reply: {request.reply} </p>
            ) : (<p>Status: <span className="text-custom-150 font-bold">Awaiting Reply</span></p>)}
            <p>
                Request Date: {new Date(request.createdAt).toLocaleString("en-Us")}
            </p>

            {/* Allow request receivers to reply requests either by sending the invoice (only text for now) or making payment */}
            {(!request.replied && request.to === user._id && request.type === "Payment") ? (
                <button 
                    onClick={() => setShowPaymentForm(true)} 
                    className="text-custom-100 hover:text-custom-150 mt-5">
                        Make Payment
                </button>
            ) : (null)}

            {(!request.replied && request.to === user._id && request.type === "Invoice") ? (
                <button 
                    onClick={() => setShowReplyTextModal(true)} 
                    className="text-custom-100 hover:text-custom-150 mt-5">
                        Send Invoice
                </button>
            ) : (null)}

            {(!request.replied && request.to === user._id && request.type === "Receipt") ? (
                <button 
                    onClick={() => setShowReplyTextModal(true)} 
                    className="text-custom-100 hover:text-custom-150 mt-5">
                        Send Receipt
                </button>
            ) : (null)}

            {(!request.replied && request.to === user._id && request.type === "Other") ? (
                <button 
                    onClick={() => setShowReplyTextModal(true)} 
                    className="text-custom-100 hover:text-custom-150 mt-5">
                        Reply Request
                </button>
            ) : (null)}
        </div>
        </div>
        <>
            {showReplyTextModal ? (
                    <>
                    <div class="flex justify-center items-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                        {/* Modal Content */}
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                            {/* Modal Header */}
                            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Reply Request
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal"
                                    onClick={() => setShowReplyTextModal(false)}>
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close</span>
                                </button>
                            </div>

                            
                            {/* Modal Body */}
                            <div class="p-6 space-y-2">
                                <form onSubmit={onSubmitNormalReply}>
                                    <div class="mb-4">
                                        <label for="" class="block mb-2 text-sm font-medium text-gray-900">Please input your reply</label>
                                        <textarea type="textarea" id="reply" name="reply"
                                            class="shadow-sm bg-gray-50 border h-28 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                            placeholder="Enter reply" value={reply} onChange={onChange}
                                        />
                                    </div>
                                    <div>
                                        <button type="submit" class="mb-5 text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 rounded-lg text-sm px-5 py-2.5 text-center">
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Modal footer */}
                            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <button data-modal-toggle="defaultModal" type="button" 
                                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    onClick={() => setShowReplyTextModal(false)}>
                                    Close
                                </button>
                            </div>

                        </div>
                        </div>
                    </div>
                    </>
                ) : null}

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
                                <PaymentRequestForm amount = {request.amount} requestId={request._id} setShowPaymentForm={(bool) => setShowPaymentForm(bool)}/>
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
            </>
        </> 
        : 
        null}
        </>
    )
}

export default RequestItem