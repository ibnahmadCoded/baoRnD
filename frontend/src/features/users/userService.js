import axios from "axios"

const API_URL = "/api/users/"

// get users
const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// get users
const getUser = async (userId) => {

    const response = await axios.get(API_URL + "profile/" + userId)

    return response.data
}

const userService = { getUsers, getUser }

export default userService