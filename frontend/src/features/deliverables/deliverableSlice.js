import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import deliverableService from "./deliverableService"

const initialState = {
    deliverables: [],
    isErrorDeliverable: false,
    isSuccessDeliverable: false,
    isLoadingDeliverable: false,
    messageDeliverable: ""
}

// get the project`s deliverables
export const getDeliverables = createAsyncThunk("deliverables/getAll", async (projectId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await deliverableService.getDeliverables(projectId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete deliverable
export const deleteDeliverable = createAsyncThunk("deliverables/delete", async (deliverableId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await deliverableService.deleteDeliverable(deliverableId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// add deliverable
export const addDeliverable = createAsyncThunk("deliverables/add", async (deliverableData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await deliverableService.addDeliverable(deliverableData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// update deliverable as delivered or not
export const updateDeliverable = createAsyncThunk("goals/change", async (deliverableData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await deliverableService.updateDeliverable(deliverableData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deliverableSlice = createSlice({
    name: "deliverable",
    initialState,
    reducers: {
        resetdeliverables: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDeliverables.pending, (state) => {
                state.isLoadingDeliverable = true
            })
            .addCase(getDeliverables.fulfilled, (state, action) => {
                state.isLoadingDeliverable = false
                state.isSuccessDeliverable = true
                state.deliverables = action.payload
            })
            .addCase(getDeliverables.rejected, (state, action) => {
                state.isLoadingDeliverable = false
                state.isErrorDeliverable = true
                state.messageDeliverable = action.payload
            })
            .addCase(deleteDeliverable.pending, (state) => {
                state.isLoadingDeliverable = true
            })
            .addCase(deleteDeliverable.fulfilled, (state, action) => {
                state.isLoadingDeliverable = false
                state.isSuccessDeliverable = true
                state.deliverables = state.deliverables.filter((deliverable) => (deliverable._id !== action.payload.id)) 
            })
            .addCase(deleteDeliverable.rejected, (state, action) => {
                state.isLoadingDeliverable = false
                state.isErrorDeliverable = true
                state.messageDeliverable = action.payload
            })
            .addCase(addDeliverable.pending, (state) => {
                state.isLoadingDeliverable = true
            })
            .addCase(addDeliverable.fulfilled, (state, action) => {
                state.isLoadingDeliverable = false
                state.isSuccessDeliverable = true
                state.deliverables.push(action.payload) 
            })
            .addCase(addDeliverable.rejected, (state, action) => {
                state.isLoadingDeliverable = false
                state.isErrorDeliverable = true
                state.messageDeliverable = action.payload
            })
            .addCase(updateDeliverable.pending, (state) => {
                state.isLoadingDeliverable = true
            })
            .addCase(updateDeliverable.fulfilled, (state, action) => {
                state.isLoadingDeliverable = false
                state.isSuccessDeliverable = true
                state.deliverables = state.deliverables.filter((deliverable) => (deliverable._id !== action.payload._id)) 
                state.deliverables.push(action.payload)
            })
            .addCase(updateDeliverable.rejected, (state, action) => {
                state.isLoadingDeliverable = false
                state.isErrorDeliverable = true
                state.messageDeliverable = action.payload
            })
    }
})

export const {resetdeliverables} = deliverableSlice.actions
export default deliverableSlice.reducer