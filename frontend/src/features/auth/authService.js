import axios from "axios"

const API_URL = "/api/users/"
const WAITLIST_URL = "/api/waitlist/"

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

// Register user
const registerreferral = async (userData) => {
    const { name, email, type, password, referral_id } = userData

    const newUserData = {name, email, type, password}
    
    const response = await axios.post(API_URL + "referralsignup?id=" + referral_id, newUserData)

    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

// Verify user
const verify = async (verificationData) => {
    const response = await axios.post(API_URL + "verifyemail", verificationData)

    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

// Join user
const joinwaitlist = async (waitlistData) => {
    const response = await axios.post(WAITLIST_URL, waitlistData)

    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData)

    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem("user")
}

const authService = {
    register,
    registerreferral,
    logout,
    login,
    verify,
    joinwaitlist,
}

export default authService