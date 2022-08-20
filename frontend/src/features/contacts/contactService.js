import axios from "axios"

const API_URL = "/api/contacts/"

// get contacts
const getContacts = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    
    return response.data
}

// delete contact
const deleteContact = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL, config)
    
    return response.data
}

// add contact
const addContact = async (contact, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, contact, config)
    
    return response.data
}

// accept contact
const acceptContact = async (contactId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + contactId, config)
    
    return response.data
}

const contactService = { getContacts, deleteContact, addContact, acceptContact }

export default contactService