import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { acceptContact, deleteContact, deleteContactRequest } from "../features/contacts/contactSlice"
import moment from 'moment';

const ContactItem = ({contact, type}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }

    }, [user, navigate])

    return (
        <>
        {type === "ContactRequest" ? 
        
        <div className="my-0 mx-auto w-9/12 mb-5">
            
            <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
                <p >
                    {contact.contact === user._id ? (
                    <>
                        <a className="text-custom-100 hover:text-custom-150 font-bold" href={"/profile/" + contact.user}>{contact.username}</a> 

                        <button 
                            onClick={() => dispatch(acceptContact(contact._id))} 
                            className="text-white bg-custom-100 w-20 h-10 mx-20 rounded-lg hover:bg-custom-150 hover:text-black">
                                Accept
                        </button>

                        <button 
                            onClick={() => dispatch(deleteContactRequest(contact._id))} 
                            className="text-black bg-custom-150 w-20 h-10 mx-20 rounded-lg hover:bg-custom-100 hover:text-white">
                                Reject
                        </button>
                        
                    </>
                    ) : (
                        null
                    )
                    }
                </p>
                <p className=" text-sm">
                    {moment(new Date(contact.createdAt)).fromNow()}
                </p>
            </div>
        </div>
        
        : null}


{type === "ContactList" ? 
        
        <div className="my-0 mx-auto w-9/12 mb-5">
            
            <div class="bg-custom-50 py-8 px-6 rounded-lg sm:px-10">
                <p >
                    {contact.user === user._id ? (
                    <>
                        <a className="text-custom-100 hover:text-custom-150 font-bold" href={"/profile/" + contact.contact}>{contact.contactname}</a> 

                        <button 
                            onClick={() => dispatch(deleteContact(contact._id))} 
                            className="text-black bg-custom-150 w-20 h-10 mx-20 rounded-lg hover:bg-custom-100 hover:text-white">
                                Delete
                        </button>
                        
                    </>
                    ) : (
                        null
                    )}
                </p>
            </div>
        </div>
        
        : null}
        </>
    )
}

export default ContactItem