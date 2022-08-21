import axios from "axios"

const API_URL = "/api/investments/"

// get project`s investments
const getProjectInvestments = async (projectId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + "projectinvestments/" + projectId, config)
    
    return response.data
}

// get user`s investments
const getMyInvestments = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    
    return response.data
}

// add investment
const addInvestment = async (investmentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, investmentData, config)
    
    return response.data
}

const investmentService = { getMyInvestments, addInvestment, getProjectInvestments }

export default investmentService