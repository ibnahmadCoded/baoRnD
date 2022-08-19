import axios from "axios"

const API_URL = "/api/projects/"

// Get a project
const getProject = async(projectId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.get(API_URL + projectId, config)

    return response.data
}

// change the category of a project
const changeProjectCategory = async(categoryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const projectId = categoryData.projectId
    
    const body = {category: categoryData.category, amount: categoryData.amount, acceptapps: categoryData.acceptapps}
    
    const response = await axios.put(API_URL + projectId, body, config)

    return response.data
}

// change the visibility of a project
const changeProjectVisibility = async(visibilityData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const projectId = visibilityData.projectId
    
    const body = {visibility: visibilityData.visibility}
    
    const response = await axios.put(API_URL + projectId, body, config)

    return response.data
}

// Delete user project
const deleteProject = async(projectId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.delete(API_URL + projectId, config)

    return response.data
}

const projectService = { getProject, deleteProject, changeProjectCategory, changeProjectVisibility }

export default projectService