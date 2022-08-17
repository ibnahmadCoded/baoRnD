import axios from "axios"

const API_URL = "/api/feedbacks/"

// submit feedback
const submitfeedback = async (feedbackData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, feedbackData, config)

    return response.data
}

// get feedbacks
const getfeedbacks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const feedbackService = { submitfeedback, getfeedbacks }

export default feedbackService