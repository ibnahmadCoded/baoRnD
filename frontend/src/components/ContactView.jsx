import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addContact, getContactRequests, getContacts, resetcontacts } from "../features/contacts/contactSlice";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import Select from 'react-select'
import ContactItem from "./ContactItem";

const ContactView = ({users}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { contacts, contactrequests, isLoadingContact, isErrorContact, isSuccessContact, messageContact } = useSelector((state) => state.contacts)
    //const { users, isLoadingUsers, isErrorUsers, isSuccessUsers, messageUsers } = useSelector((state) => state.users)

    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        if(!user){
            navigate("/landing")
        }

        if(isErrorContact){
          console.log(messageContact)
        }

        if(isSuccessContact){
        }

        dispatch(getContacts())

        dispatch(getContactRequests())
  
        return() => {
          dispatch(resetcontacts)
        }
  
      }, [user, isSuccessContact, isErrorContact, messageContact, navigate, dispatch])

    const onSubmit = e => {
        e.preventDefault()

        const contactData = { contact: selectedOption }

        dispatch(addContact(contactData))

        toast.success("Contact request successfully sent")
    }

    if(isLoadingContact){
        return <Spinner />
    }

    // get registered users for the current user to select from. To be changed later to random
    const userOptions = users.filter((u) => u._id !== user._id);

    // we need to have a label to use it with Select component.
    var options = []
    userOptions.map(function(obj) {
        if (!contacts.some(c => c.contact === obj._id)) {
            const o = {value: obj._id, label: obj.name}
            return options.push(o)
        }
    });

    const handleTypeSelect = e => {
        setSelectedOption(e.value);
    };

    return (
        <>
            
        <section className="content">
            <p className="md:ml-10 mt-5 md:mb-5">You can find your contacts here, send new requests, accept or reject requests here. Please bear with us in this beta stage.
            </p>

            {/* Show contact addition form */}
            
            <section className="my-0 mx-auto w-9/12">
                <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                    <form onSubmit={onSubmit}>
                        <p class="font-bold mb-3">Send New Contact Request</p>
                        <div class="mb-4">
                            <label for="" class="block mb-2 text-sm font-medium text-gray-900">Select user by searching</label>
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
                        <div>
                            <button type="submit" class="mb-5 text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 rounded-lg text-sm px-5 py-2.5 text-center">
                                Send Request
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            
            <h3 className="font-bold mb-5 md:ml-96">Contact Requests</h3>
            {contactrequests.length > 0 ? (
            <div>
                {[...contactrequests].reverse().map((contact) => (
                    <>
                  
                        <ContactItem key={contact._id} contact={contact} type="ContactRequest"/>
                   
                    </>
                ))}
            </div>
                ) : (<h3>You do not have any contact request</h3>)}
            
            <h3 className="font-bold mb-5 md:ml-96">Contact List</h3>
            {contacts.length > 0 ? (
            <div>
                {[...contacts].reverse().map((contact) => (
                    <>
                  
                        <ContactItem key={contact._id} contact={contact} type="ContactList"/>
             
                    </>
                ))}
            </div>
                ) : (<h3>You do not have any contact</h3>)}
             
        </section>         
            
        </>
    )
}

export default ContactView