import axios from "axios"

const API_URL = "/api/notifications/"

// get notifications
const getNotifications = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// update notification as seen
const updateNotification = async (notificationId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + notificationId, config)
    
    return response.data
}

// delete notification
const deleteNotification = async (notificaitonId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + notificaitonId, config)
    
    return response.data
}

const notificationService = { getNotifications, updateNotification, deleteNotification }

export default notificationService