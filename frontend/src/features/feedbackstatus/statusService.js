import axios from "axios"

const API_URL = "/api/userfeedback/"

// get feedbacks
const getfeedbackStatus = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const feedbackstatusService = { getfeedbackStatus }

export default feedbackstatusService