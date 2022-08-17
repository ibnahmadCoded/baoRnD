import axios from "axios"

const API_URL = "/api/projectmilestones/"

// get milestones
const getMilestones = async (projectId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + projectId, config)
    
    return response.data
}

// delete milestone
const deleteMilestone = async (milestoneId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + milestoneId, config)
    
    return response.data
}

// add milestone
const addMilestone = async (milestoneData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, milestoneData, config)
    
    return response.data
}

const milestoneService = { getMilestones, deleteMilestone, addMilestone }

export default milestoneService