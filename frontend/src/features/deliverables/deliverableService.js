import axios from "axios"

const API_URL = "/api/projectdeliverables/"

// get deliverables
const getDeliverables = async (projectId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + projectId, config)
    
    return response.data
}

// delete deliverable
const deleteDeliverable = async (deliverableId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + deliverableId, config)
    
    return response.data
}

// add deliverable
const addDeliverable = async (deliverableData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, deliverableData, config)
    
    return response.data
}

// update deliverable
const updateDeliverable = async (deliverableData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const deliverableId = deliverableData.id

    const response = await axios.put(API_URL + deliverableId, deliverableData, config)
    
    
    return response.data
}

const deliverableService = { getDeliverables, deleteDeliverable, addDeliverable, updateDeliverable }

export default deliverableService