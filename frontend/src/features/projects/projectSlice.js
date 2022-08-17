import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import projectService from "./projectService"

const initialState = {
    projects: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Create new project
export const createProject = createAsyncThunk("projects/create", async (projectData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await projectService.createProject(projectData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all projects (all public projects on baoRnD and private projects the user has access to)
export const getProjects = createAsyncThunk("projects/getAll", async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await projectService.getProjects(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all user`s projects (public projects of the user and private projects the user has access to)
export const getMyProjects = createAsyncThunk("projects/getMyProjects", async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await projectService.getMyProjects(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete user project
export const deleteProject = createAsyncThunk("projects/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await projectService.deleteProject(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProject.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects.push(action.payload)
                state.message = action.payload
            })
            .addCase(createProject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getProjects.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects = action.payload
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getMyProjects.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMyProjects.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects = action.payload
            })
            .addCase(getMyProjects.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteProject.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects = state.projects.filter((project) => project._id !== action.payload.id)
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = projectSlice.actions
export default projectSlice.reducer 