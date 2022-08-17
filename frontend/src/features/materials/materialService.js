import axios from "axios"

const API_URL = "/api/projectmaterials/"

// get materials
const getMaterials = async (projectId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + projectId, config)
    
    return response.data
}

// delete material
const deleteMaterial = async (materialId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + materialId, config)
    
    return response.data
}

// add material
const addMaterial = async (materialData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, materialData, config)
    
    return response.data
}

const materialService = { getMaterials, deleteMaterial, addMaterial }

export default materialService