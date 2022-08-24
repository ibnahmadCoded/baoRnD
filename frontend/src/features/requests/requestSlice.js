import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import requestService from "./requestService"

const initialState = {
    requests: [],
    isErrorRequest: false,
    isSuccessRequest: false,
    isLoadingRequest: false,
    messageRequest: ""
}

// get the project`s requests
export const getProjectRequests = createAsyncThunk("requests/getProjectRequests", async (projectId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await requestService.getProjectRequests(projectId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get the user`s requests
export const getMyRequests = createAsyncThunk("requests/getMyRequests", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await requestService.getMyRequests(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete request
export const deleteRequest = createAsyncThunk("requests/delete", async (requestId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await requestService.deleteRequest(requestId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// add request
export const addRequest = createAsyncThunk("requests/add", async (requestData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await requestService.addRequest(requestData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// reply request with a reply and whether it has been replied or not
export const replyRequest = createAsyncThunk("requests/reply", async (requestData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await requestService.replyRequest(requestData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const requestSlice = createSlice({
    name: "request",
    initialState,
    reducers: {
        resetrequests: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyRequests.pending, (state) => {
                state.isLoadingRequest = true
            })
            .addCase(getMyRequests.fulfilled, (state, action) => {
                state.isLoadingRequest = false
                state.isSuccessRequest = true
                state.requests = action.payload
            })
            .addCase(getMyRequests.rejected, (state, action) => {
                state.isLoadingRequest = false
                state.isErrorRequest = true
                state.messageRequest = action.payload
            })
            .addCase(getProjectRequests.pending, (state) => {
                state.isLoadingRequest = true
            })
            .addCase(getProjectRequests.fulfilled, (state, action) => {
                state.isLoadingRequest = false
                state.isSuccessRequest = true
                state.requests = action.payload
            })
            .addCase(getProjectRequests.rejected, (state, action) => {
                state.isLoadingRequest = false
                state.isErrorRequest = true
                state.messageRequest = action.payload
            })
            .addCase(deleteRequest.pending, (state) => {
                state.isLoadingRequest = true
            })
            .addCase(deleteRequest.fulfilled, (state, action) => {
                state.isLoadingRequest = false
                state.isSuccessRequest = true
                state.requests = state.requests.filter((request) => (request._id !== action.payload.id)) 
            })
            .addCase(deleteRequest.rejected, (state, action) => {
                state.isLoadingRequest = false
                state.isErrorRequest = true
                state.messageRequest = action.payload
            })
            .addCase(addRequest.pending, (state) => {
                state.isLoadingRequest = true
            })
            .addCase(addRequest.fulfilled, (state, action) => {
                state.isLoadingRequest = false
                state.isSuccessRequest = true
                state.requests.push(action.payload) 
            })
            .addCase(addRequest.rejected, (state, action) => {
                state.isLoadingRequest = false
                state.isErrorRequest = true
                state.messageRequest = action.payload
            })
            .addCase(replyRequest.pending, (state) => {
                state.isLoadingRequest = true
            })
            .addCase(replyRequest.fulfilled, (state, action) => {
                state.isLoadingRequest = false
                state.isSuccessRequest = true
                state.requests = state.requests.filter((request) => (request._id !== action.payload._id))
                state.requests.push(action.payload) 
            })
            .addCase(replyRequest.rejected, (state, action) => {
                state.isLoadingRequest = false
                state.isErrorRequest = true
                state.messageRequest = action.payload
            })
    }
})

export const {resetrequests} = requestSlice.actions
export default requestSlice.reducer