import axios from "axios"

const API_URL = "/api/projectgoals/"

// get goals
const getGoals = async (projectId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + projectId, config)
    
    return response.data
}

// delete goal
const deleteGoal = async (goalId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + goalId, config)
    
    return response.data
}

// add goal
const addGoal = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, goalData, config)
    
    return response.data
}

// update goal
const changeGoal = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const goalId = goalData.id

    const response = await axios.put(API_URL + goalId, goalData, config)
    
    
    return response.data
}

const goalService = { getGoals, deleteGoal, addGoal, changeGoal }

export default goalService