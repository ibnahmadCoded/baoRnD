import axios from "axios"

const API_URL = "/api/projects/"

// Create new project
const createProject = async(projectData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, projectData, config)

    return response.data
}

// Get all projects (public and private projects the user has access to)
const getProjects = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Get all projects (public and private projects the user has access to)
const getMyProjects = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + "myprojects", config)

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

const projectService = {
    createProject,
    getProjects,
    getMyProjects,
    deleteProject
}

export default projectService