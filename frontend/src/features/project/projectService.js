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

const projectService = { getProject, deleteProject }

export default projectService