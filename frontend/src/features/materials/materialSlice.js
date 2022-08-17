import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import materialService from "./materialService"

const initialState = {
    materials: [],
    isErrorMaterial: false,
    isSuccessMaterial: false,
    isLoadingMaterial: false,
    messageMaterial: ""
}

// get the project`s materials
export const getMaterials = createAsyncThunk("materials/getAll", async (projectId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await materialService.getMaterials(projectId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete material
export const deleteMaterial = createAsyncThunk("materials/delete", async (materialData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await materialService.deleteMaterial(materialData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// add material
export const addMaterial = createAsyncThunk("materials/add", async (materialData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await materialService.addMaterial(materialData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const materialSlice = createSlice({
    name: "material",
    initialState,
    reducers: {
        resetmaterials: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMaterials.pending, (state) => {
                state.isLoadingMaterial = true
            })
            .addCase(getMaterials.fulfilled, (state, action) => {
                state.isLoadingMaterial = false
                state.isSuccessMaterial = true
                state.materials = action.payload
            })
            .addCase(getMaterials.rejected, (state, action) => {
                state.isLoadingMaterial = false
                state.isErrorMaterial = true
                state.messageMaterial = action.payload
            })
            .addCase(deleteMaterial.pending, (state) => {
                state.isLoadingMaterial = true
            })
            .addCase(deleteMaterial.fulfilled, (state, action) => {
                state.isLoadingMaterial = false
                state.isSuccessMaterial = true
                state.materials = state.materials.filter((material) => (material._id !== action.payload.id)) 
            })
            .addCase(deleteMaterial.rejected, (state, action) => {
                state.isLoadingMaterial = false
                state.isErrorMaterial = true
                state.messageMaterial = action.payload
            })
            .addCase(addMaterial.pending, (state) => {
                state.isLoadingMaterial = true
            })
            .addCase(addMaterial.fulfilled, (state, action) => {
                state.isLoadingMaterial = false
                state.isSuccessMaterial = true
                state.materials.push(action.payload) // then push the new materials
            })
            .addCase(addMaterial.rejected, (state, action) => {
                state.isLoadingMaterial = false
                state.isErrorMaterial = true
                state.messageMaterial = action.payload
            })
    }
})

export const {resetmaterials} = materialSlice.actions
export default materialSlice.reducer