import axios from "axios"

const API_URL = "/api/fields/"

// get fields
const getFields = async (projectId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + projectId, config)
    
    return response.data
}

// delete field
const deleteField = async (fieldData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: fieldData,
    }

    const response = await axios.delete(API_URL, config)
    
    return response.data
}

// add field
const addField = async (fieldData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, fieldData, config)
    
    return response.data
}

const fieldService = { getFields, addField, deleteField }

export default fieldService