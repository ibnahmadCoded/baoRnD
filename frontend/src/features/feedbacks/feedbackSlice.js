import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import feedbackService from "./feedbackService"

const initialState = {
    feedbacks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Submit feedback
export const submitfeedback = createAsyncThunk("feedbacks/submitfeedback", async (feedbackData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await feedbackService.submitfeedback(feedbackData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get feedbacks
export const getfeedbacks = createAsyncThunk("feedbacks/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await feedbackService.getfeedbacks(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// update feedback with upvote (+1) or downvote (-1)
export const upvoteFeedback = createAsyncThunk("feedbacks/vote", async (feedbackData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await feedbackService.upvoteFeedback(feedbackData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// update feedback with under review or resolved
export const updateFeedback = createAsyncThunk("feedbacks/update", async (feedbackData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await feedbackService.updateFeedback(feedbackData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitfeedback.pending, (state) => {
                state.isLoading = true
            })
            .addCase(submitfeedback.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.feedbacks.push(action.payload)
                state.message = "Feedback successfully submitted. Thank you!"
            })
            .addCase(submitfeedback.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getfeedbacks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getfeedbacks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.feedbacks = action.payload
            })
            .addCase(getfeedbacks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(upvoteFeedback.pending, (state) => {
                state.isLoading = true
            })
            .addCase(upvoteFeedback.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.feedbacks = state.feedbacks.filter((feedback) => (feedback._id !== action.payload._id))
                state.feedbacks.push(action.payload) 
            })
            .addCase(upvoteFeedback.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateFeedback.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateFeedback.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.feedbacks = state.feedbacks.filter((feedback) => (feedback._id !== action.payload._id))
                state.feedbacks.push(action.payload) 
            })
            .addCase(updateFeedback.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = feedbackSlice.actions
export default feedbackSlice.reducer