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

// update feedback with upvote (+1) or downvote (-1)
const upvoteFeedback = async (feedbackData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const feedbackId = feedbackData.feedbackId
    
    const body = {upvote: feedbackData.upvote}

    const response = await axios.put(API_URL + feedbackId, body, config)
    
    return response.data
}

// update feedback with upvote (+1) or downvote (-1)
const updateFeedback = async (feedbackData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const feedbackId = feedbackData.feedbackId
    
    const body = {underreview: feedbackData.underreview, resolved: feedbackData.resolved}

    const response = await axios.put(API_URL + feedbackId, body, config)
    
    return response.data
}

const feedbackService = { submitfeedback, getfeedbacks, upvoteFeedback, updateFeedback }

export default feedbackService