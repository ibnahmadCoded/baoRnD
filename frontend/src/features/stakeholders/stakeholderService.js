import axios from "axios"

const API_URL = "/api/stakeholders/"

// get stakeholders
const getStakeholders = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + id, config)
    
    return response.data
}

// delete stakeholder
const deleteStakeholder = async (stakeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: stakeData,
    }

    const response = await axios.delete(API_URL, config)
    
    return response.data
}

// add stakeholder
const addStakeholder = async (stakeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, stakeData, config)
    
    return response.data
}

const stakeholderService = { getStakeholders, deleteStakeholder, addStakeholder }

export default stakeholderService