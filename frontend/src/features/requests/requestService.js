import axios from "axios"

const API_URL = "/api/request/"

// get project`s requests
const getProjectRequests = async (projectId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + "getprojectrequests/" + projectId, config)
    
    return response.data
}

// get user`s requests
const getMyRequests = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    
    return response.data
}

// delete request
const deleteRequest = async (requestId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + requestId, config)
    
    return response.data
}

// add request
const addRequest = async (requestData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, requestData, config)
    
    return response.data
}

// reply request
const replyRequest = async (requestData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const requestId = requestData.requestId
    
    const body = {reply: requestData.reply}

    const response = await axios.put(API_URL + requestId, body, config)
    
    return response.data
}

const requestService = { getMyRequests, deleteRequest, addRequest, replyRequest, getProjectRequests }

export default requestService