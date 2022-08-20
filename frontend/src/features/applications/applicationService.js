import axios from "axios"

const API_URL = "/api/projectapplications/"

// get project`s applications
const getProjectapplications = async (projectId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + "getprojectapplications/" + projectId, config)
    
    return response.data
}

// get user`s applications
const getMyApplicaitons = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    
    return response.data
}

// delete application
const deleteApplication = async (applicationId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + applicationId, config)
    
    return response.data
}

// add application
const addApplication = async (applicationData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, applicationData, config)
    
    return response.data
}

// accept/reject application
const replyApplication = async (applicationData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const applicationId = applicationData.applicationId
    
    const body = {reply: applicationData.reply}

    const response = await axios.put(API_URL + applicationId, body, config)
    
    return response.data
}

const applicationService = { getMyApplicaitons, deleteApplication, addApplication, replyApplication, getProjectapplications }

export default applicationService