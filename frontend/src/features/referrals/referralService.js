import axios from "axios"

const API_URL = "/api/referrals/"

// Add new referral
const addReferral = async(referralData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, referralData, config)

    return response.data
}

// Get all referrals of a user
const getMyReferrals = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete referral
const deleteReferral = async(referralId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.delete(API_URL + referralId, config)

    return response.data
}

const projectService = {
    addReferral,
    getMyReferrals,
    deleteReferral
}

export default projectService