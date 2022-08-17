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

const notificationService = { getNotifications }

export default notificationService