import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import applicationService from "./applicationService"

const initialState = {
    applications: [],
    isErrorApplication: false,
    isSuccessApplication: false,
    isLoadingApplication: false,
    messageApplication: ""
}

// get the project`s applications
export const getProjectapplications = createAsyncThunk("applications/getProjectApplications", async (projectId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await applicationService.getProjectapplications(projectId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get the user`s applications
export const getMyApplications = createAsyncThunk("applications/getMyApplicaitons", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await applicationService.getMyApplications(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete application
export const deleteApplication = createAsyncThunk("applications/delete", async (applicationId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await applicationService.deleteApplication(applicationId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// add application
export const addApplication = createAsyncThunk("applications/add", async (applicationData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await applicationService.addApplication(applicationData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// reply application with acceptance or rejection
export const replyApplication = createAsyncThunk("applications/reply", async (applicationId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await applicationService.replyApplication(applicationId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        resetapplications: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyApplications.pending, (state) => {
                state.isLoadingApplication = true
            })
            .addCase(getMyApplications.fulfilled, (state, action) => {
                state.isLoadingApplication = false
                state.isSuccessApplication = true
                state.applications = action.payload
            })
            .addCase(getMyApplications.rejected, (state, action) => {
                state.isLoadingApplication = false
                state.isErrorApplication = true
                state.messageApplication = action.payload
            })
            .addCase(getProjectapplications.pending, (state) => {
                state.isLoadingApplication = true
            })
            .addCase(getProjectapplications.fulfilled, (state, action) => {
                state.isLoadingApplication = false
                state.isSuccessApplication = true
                state.applications = action.payload
            })
            .addCase(getProjectapplications.rejected, (state, action) => {
                state.isLoadingApplication = false
                state.isErrorApplication = true
                state.messageApplication = action.payload
            })
            .addCase(deleteApplication.pending, (state) => {
                state.isLoadingApplication = true
            })
            .addCase(deleteApplication.fulfilled, (state, action) => {
                state.isLoadingApplication = false
                state.isSuccessApplication = true
                state.applications = state.applications.filter((application) => (application._id !== action.payload.id)) 
            })
            .addCase(deleteApplication.rejected, (state, action) => {
                state.isLoadingApplication = false
                state.isErrorApplication = true
                state.messageApplication = action.payload
            })
            .addCase(addApplication.pending, (state) => {
                state.isLoadingApplication = true
            })
            .addCase(addApplication.fulfilled, (state, action) => {
                state.isLoadingApplication = false
                state.isSuccessApplication = true
                state.applications.push(action.payload) 
            })
            .addCase(addApplication.rejected, (state, action) => {
                state.isLoadingApplication = false
                state.isErrorApplication = true
                state.messageApplication = action.payload
            })
            .addCase(replyApplication.pending, (state) => {
                state.isLoadingApplication = true
            })
            .addCase(replyApplication.fulfilled, (state, action) => {
                state.isLoadingApplication = false
                state.isSuccessApplication = true
                state.applications = state.applications.filter((application) => (application._id !== action.payload._id))
                state.applications.push(action.payload) 
            })
            .addCase(replyApplication.rejected, (state, action) => {
                state.isLoadingApplication = false
                state.isErrorApplication = true
                state.messageApplication = action.payload
            })
    }
})

export const {resetapplications} = applicationSlice.actions
export default applicationSlice.reducer