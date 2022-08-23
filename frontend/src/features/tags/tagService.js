import axios from "axios"

const API_URL = "/api/tags/"

// get tags
const getTags = async (projectId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + projectId, config)
    
    return response.data
}

// delete tag
const deleteTag = async (tagData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: tagData,
    }

    const response = await axios.delete(API_URL, config)
    
    return response.data
}

// add tag
const addTag = async (tagData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, tagData, config)
    
    return response.data
}

const tagService = { getTags, deleteTag, addTag }

export default tagService