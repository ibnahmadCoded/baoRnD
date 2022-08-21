import StakeholderItem from "../components/StakeholderItem";
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addStakeholder, getStakeholders, resetstakeholders } from "../features/stakeholders/stakeholderSlice";
import { getContacts, resetcontacts } from "../features/contacts/contactSlice";
import Spinner from "./Spinner";
import Select from 'react-select'
import { getUsers, resetusers } from "../features/users/userSlice";
import { toast } from "react-toastify"

const StakeholderView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { project } = useSelector((state) => state.project)
    const { contacts, isLoadingContact, isErrorContact, isSuccessContact, messageContact } = useSelector((state) => state.contacts)
    const { users, isLoadingUsers, isErrorUsers, isSuccessUsers, messageUsers } = useSelector((state) => state.users)
    const { stakeholders, isLoadingStakeholder, isErrorStakeholder, isSuccessStakeholder, messageStakeholder } = useSelector((state) => state.stakeholders)
    const params = useParams()
    const [formData, setFormData] = useState({
      type: '',
      viewership: '',
      update: ''
  })

  const [selectedOption, setSelectedOption] = useState("");

  const { type, viewership, update } = formData

      useEffect(() => {
        if(!user){
            navigate("/landing")
        }
  
        if(isErrorStakeholder){
          console.log(messageStakeholder)
        }

        if(isErrorContact){
          console.log(messageContact)
        }

        if(isErrorUsers){
          console.log(messageUsers)
        }

        if(isSuccessUsers){
        }

        if(isSuccessContact){
        }

        if(isSuccessStakeholder){
        }
  
        dispatch(getStakeholders(params.id))

        dispatch(getContacts())

        dispatch(getUsers())
  
        return() => {
          dispatch(resetstakeholders)
          dispatch(resetcontacts)
          dispatch(resetusers)
        }
  
      }, [user, params.id, messageStakeholder, isErrorStakeholder, isSuccessContact, isSuccessStakeholder,
        isSuccessUsers, isErrorContact, isErrorUsers, messageContact, messageUsers, navigate, dispatch])

    const onSubmit = e => {
        e.preventDefault()

        const stakeData = { user: selectedOption, project: params.id, type: type, viewership: viewership, update: update }

        dispatch(addStakeholder(stakeData))

        toast.success("Stakeholder successfully added")

        setFormData({
          type: '',
          viewership: '',
          update: ''
      })
    }

    const onChange = (e) => {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
      }))
  }

  if(isLoadingStakeholder){
    return <Spinner />
  }

  if(isLoadingContact){
    return <Spinner />
  }

  if(isLoadingUsers){
    return <Spinner />
  }

  const handleTypeSelect = e => {
    setSelectedOption(e.value);
  };

  // get the user`s contacts to be selected in form. We need the names, not just the id. Contacts only has IDs.
  const userOptions = users.filter(u => !!contacts.find(c => (c.contact === u._id && c.accepted === true)));

  var options = []

  // we need to have a label to use it with Select component.
  userOptions.map(function(obj) {
    const o = {value: obj._id, label: obj.name}
    return options.push(o)
  });

    return (
        <>
            
        <section className="content">
            <p className="md:ml-28 md:mb-5">You can find project stakeholders here. NOTE: this is still in beta stage. Please bear with us.</p>
            {stakeholders.length > 0 ? (
            <div>
                    {/* The project owner should be able add new stakeholder */}
                    {project.user === user._id ? (
                        <section className="my-0 mx-auto w-9/12">
                        <div class="border-2 border-custom-150 py-8 px-6 shadow rounded-lg sm:px-10 mb-5">
                        <form onSubmit={onSubmit}>
                            <p class="font-bold mb-3">Add New Stakeholder</p>
                            <div class="mb-4">
                              <label for="" class="block mb-2 text-sm font-medium text-gray-900">Select user from your contacts</label>
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
                              <label for="" class="block mb-2 text-sm font-medium text-gray-900">Select stake type</label>
                              <select id="type" name="type" placeholder="Select Type"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-100 focus:border-custom-100 block w-full p-2.5"
                                value={type} onChange={onChange} required>
                                  <option label=" "></option>
                                  <option value="Supervisor">Supervisor</option>
                                  <option value="Researcher">Researcher</option>
                                  <option value="Developer">Developer</option>
                                  <option value="Collaborator">Collaborator</option>
                              </select>
                            </div>
                            <label for="viewership" class="block mb-2 text-sm font-medium text-gray-900">Can this stakeholder view all content of this project</label>
                            <div class="flex items-center mb-4" onChange={onChange}>
                                <input class="mr-1 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="true" name="viewership" /> Yes
                                <input class="mr-1 ml-8 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="false" name="viewership" /> No
                            </div>
                            <label for="update" class="block mb-2 text-sm font-medium text-gray-900">Can this stakeholder push updates for this project</label>
                            <div class="flex items-center mb-4" onChange={onChange}>
                                <input class="mr-1 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="true" name="update" /> Yes
                                <input class="mr-1 ml-8 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-custom-100" type="radio" value="false" name="update" /> No
                            </div>
                            <div>
                                <button type="submit" class="mb-5 text-black bg-custom-150 hover:bg-custom-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-custom-100 rounded-lg text-sm px-5 py-2.5 text-center">
                                    Add Stakeholder
                                </button>
                            </div>
                        </form>
                        </div>
                        </section>
                    ) : (null)}
                {stakeholders.map((stakeholder) => (
                  <>
                    {}
                    <StakeholderItem key={stakeholder._id} stakeholder={stakeholder}/>
                    </>
                ))}
            </div>
                ) : (<h3>No stakeholders can be found</h3>)}
        </section>         
            
        </>
    )
}

export default StakeholderView