import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import milestoneService from "./milestoneService"

const initialState = {
    milestones: [],
    isErrorMilestone: false,
    isSuccessMilestone: false,
    isLoadingMilestone: false,
    messageMilestone: ""
}

// get the project`s milestones
export const getMilestones = createAsyncThunk("milestones/getAll", async (projectId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await milestoneService.getMilestones(projectId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete milestone
export const deleteMilestone = createAsyncThunk("milestones/delete", async (milestoneId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await milestoneService.deleteMilestone(milestoneId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// add material
export const addMilestone = createAsyncThunk("milestones/add", async (milestoneData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await milestoneService.addMilestone(milestoneData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const milestoneSlice = createSlice({
    name: "milestone",
    initialState,
    reducers: {
        resetmilestones: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMilestones.pending, (state) => {
                state.isLoadingMilestone = true
            })
            .addCase(getMilestones.fulfilled, (state, action) => {
                state.isLoadingMilestone = false
                state.isSuccessMilestone = true
                state.milestones = action.payload
            })
            .addCase(getMilestones.rejected, (state, action) => {
                state.isLoadingMilestone = false
                state.isErrorMilestone = true
                state.messageMilestone = action.payload
            })
            .addCase(deleteMilestone.pending, (state) => {
                state.isLoadingMilestone = true
            })
            .addCase(deleteMilestone.fulfilled, (state, action) => {
                state.isLoadingMilestone = false
                state.isSuccessMilestone = true
                state.milestones = state.milestones.filter((milestone) => (milestone._id !== action.payload.id)) 
            })
            .addCase(deleteMilestone.rejected, (state, action) => {
                state.isLoadingMilestone = false
                state.isErrorMilestone = true
                state.messageMilestone = action.payload
            })
            .addCase(addMilestone.pending, (state) => {
                state.isLoadingMilestone = true
            })
            .addCase(addMilestone.fulfilled, (state, action) => {
                state.isLoadingMilestone = false
                state.isSuccessMilestone = true
                state.milestones.push(action.payload) 
            })
            .addCase(addMilestone.rejected, (state, action) => {
                state.isLoadingMilestone = false
                state.isErrorMilestone = true
                state.messageMilestone = action.payload
            })
    }
})

export const {resetmilestones} = milestoneSlice.actions
export default milestoneSlice.reducer