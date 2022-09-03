import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "./Spinner"
import Select from "react-select"
import { addRequest, getProjectRequests, resetrequests } from "../features/requests/requestSlice"
import { toast } from "react-toastify"
import RequestItem from "./RequestItem"

const RequestView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const { user } = useSelector((state) => state.auth)
    const { stakeholders } = useSelector((state) => state.stakeholders)
    const { requests, isLoadingRequest, isErrorRequest, isSuccessRequest, messageRequest } = useSelector((state) => state.requests)

    const [formRequest, setFormRequest] = useState({
        type: "",
        message: "",
        amount: 0,
    })

    const [selectedOption, setSelectedOption] = useState("");
    const [showTypeModal, setShowTypeModal] = useState(false);

    const { type, message, amount } = formRequest

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }
  
        if(isErrorRequest){
          console.log(messageRequest)
        }

        if(isSuccessRequest){
          }
  
        dispatch(getProjectRequests(params.id))
  
        return() => {
          dispatch(resetrequests)
        }
  
      }, [user, params.id, messageRequest, isSuccessRequest, isErrorRequest, navigate, dispatch])
    
    const onSubmit = e => {
        e.preventDefault()

        const requestData = { project: params.id, type: type, to: selectedOption, message: message, amount: amount  }

        dispatch(addRequest(requestData))

        toast.success("Your request was successfully submitted. Thank you!")

        setFormRequest({
            type: "",
            message: "",
            amount: 0,
        })
    }

    const onChange = (e) => {
        setFormRequest((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
  
    if(isLoadingRequest){
        return <Spinner />
    }

    const handleTypeSelect = e => {
        setSelectedOption(e.value);
    };

    const stakes = stakeholders.filter((stakeholder) => stakeholder.user === user._id)

    var stakestatus
    
    if(stakes.length > 0){
        stakestatus = "Allowed"
    }

    const userOptions = stakeholders.filter((stakeholder) => stakeholder.project === params.id && stakeholder.user !== user._id)

    var options = []

    // we need to have a label to use it with Select component.
    userOptions.map(function(obj) {
      const o = {value: obj.user, label: obj.username}
      return options.push(o)
    });

    return (
        <>   
        <section>
            <p className="md:ml-28">You can find project requests or make request to project stakeholders here.</p>
            <p className="md:ml-28 md:mb-5">We are still in beta stage. Please bear with us.</p>
            {/* Stakeholders should be able submit new requests to other stakeholders. project owner doesnt need to submit application.*/}

            {stakestatus === "Allowed" ? (
            <section className="my-0 mx-auto w-9/12">
                <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                    <form onSubmit={onSubmit}>
                        <p class="font-bold mb-3">Submit New Request</p>

                        <div class="mb-4">
                            <label for="" class="block mb-2 text-sm font-medium text-gray-900">Select a stakeholder</label>
                            <Select
                                options={options}
                                onChange={handleTypeSelect}
                                value={options.filter(function(option) {
                                  return option.value === selectedOption;
                                })}
                                label="Single select"
                                required 
                            />

                        </div>

                        <div class="mb-4">
                            <label for="" class="block mb-2 text-sm font-medium text-gray-900">
                                Select request type
                                <button 
                                    className="ml-2 rounded-full bg-custom-150 w-4 h-4 text-black hover:bg-custom-100 hover:text-white text-xs"
                                    onClick={() => setShowTypeModal(true)}
                                    >
                                    i
                                </button>
                            </label>
                              <select id="type" name="type" placeholder="Select Type"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5"
                                value={type} onChange={onChange} required>
                                  <option label=" "></option>
                                  <option value="Payment">Payment Request</option>
                                  <option value="Invoice">Invoice Request</option>
                                  <option value="Receipt">Receipt Request</option>
                                  <option value="Other">Other</option>
                              </select>
                        </div>

                        { formRequest["type"] === "Payment" ? 
                            <>
                                <div class="mb-4">
                                    <label for="" class="block mb-2 text-sm font-medium text-gray-900">Any message for the receiver?</label>
                                    <textarea type="textarea" id="message" name="message"
                                        class="shadow-sm bg-gray-50 border h-28 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                        placeholder="Enter request message" value={message} onChange={onChange}
                                    />
                                </div>

                                <div class="mb-4">
                                    <label for="" class="block mb-2 text-sm font-medium text-gray-900">Input the amount you are requesting</label>
                                    <input type="text" id="amount" name="amount"
                                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                        placeholder="Enter request amount" value={amount} onChange={onChange}  
                                    />
                                </div>
                            </>
                        : 
                            null 
                        }

                        { formRequest["type"] === "Invoice" || formRequest["type"] === "Receipt" || formRequest["type"] === "Other" ? 
                            <>
                                <div class="mb-4">
                                    <label for="" class="block mb-2 text-sm font-medium text-gray-900">Any message for the receiver?</label>
                                    <textarea type="textarea" id="message" name="message"
                                        class="shadow-sm bg-gray-50 border h-28 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5" 
                                        placeholder="Enter request message" value={message} onChange={onChange}
                                    />
                                </div>
                            </>
                        : 
                            null 
                        }
            
                        <div>
                            <button type="submit" class="mb-5 text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 rounded-lg text-sm px-5 py-2.5 text-center">
                                Submit Request
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            ) 
            : (null)}

            {/** Non-owner can never view requests to a project */}
            {(requests.length > 0) ? (
                <div>
                    {[...requests].reverse().map((request) => (
                        <>
                        {request.project === params.id ? (
                            <RequestItem key={request._id} request={request}/>
                        ) : (null)}
                        </>
                    ))}
                </div>
                ) : (<h3>You are not authorized to view applications to this project or there are no applications.</h3>)}
            
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
                                    Understanding Request Types
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal"
                                    onClick={() => setShowTypeModal(false)}>
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close</span>
                                </button>
                            </div>

                            
                            {/* Modal Body */}
                            <div class="p-6 space-y-2">

                                <p className="font-semibold text-black">Payment Request</p>
                                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    This means you want the receiver of the request to pay some money to you.
                                </p>

                                <p className="font-semibold text-black">Invoice Request</p>
                                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Select this option if you would like to get an invoice from another stakeholder.
                                </p>

                                <p className="font-semibold text-black">Reciept Request</p>
                                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Select this option if you would like to get a receipt from another stakeholder.
                                </p>

                                <p className="font-semibold text-black">Other</p>
                                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Choose this option if you are not requesting for a payment or an invoice. 
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
        </>
    )
}

export default RequestView