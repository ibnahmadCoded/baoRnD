import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import projectService from "./projectService"

const initialState = {
    project: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// get the project
export const getProject = createAsyncThunk("project/getProject", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await projectService.getProject(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// change the category of a project
export const changeProjectCategory = createAsyncThunk("project/changeCategory", async (categoryData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await projectService.changeProjectCategory(categoryData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// change the visibility of a project
export const changeProjectVisibility = createAsyncThunk("project/changeVisibility", async (visibilityData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await projectService.changeProjectVisibility(visibilityData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete user project
export const deleteProject = createAsyncThunk("project/delete", async (id, thunkAPI) => {
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
            .addCase(getProject.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.project = action.payload
            })
            .addCase(getProject.rejected, (state, action) => {
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
                state.project = null
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(changeProjectCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(changeProjectCategory.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.project = action.payload
            })
            .addCase(changeProjectCategory.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(changeProjectVisibility.pending, (state) => {
                state.isLoading = true
            })
            .addCase(changeProjectVisibility.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.project = action.payload
            })
            .addCase(changeProjectVisibility.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = projectSlice.actions
export default projectSlice.reducer