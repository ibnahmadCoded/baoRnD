import axios from "axios"

const API_URL = "/api/projectupdates/"

// get project updates
const getProjectUpdates = async (projectId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + "getprojectupdates/" + projectId, config)
    
    return response.data
}

// get user updates
const getUserUpdates = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    
    return response.data
}

// get an update
const getAnUpdate = async (updateId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + updateId, config)
    
    return response.data
}

// delete update
const deleteUpdate = async (updateId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + updateId, config)
    
    return response.data
}

// add update
const addUpdate = async (updateData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, updateData, config)
    
    return response.data
}

const updateService = { getUserUpdates, getProjectUpdates, getAnUpdate, deleteUpdate, addUpdate }

export default updateService