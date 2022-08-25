import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import feedbackstatusService from "./statusService"

const initialState = {
    status: [],
    isErrorS: false,
    isSuccessS: false,
    isLoadingS: false,
    messageS: ""
}

// get feedback sttaus
export const getfeedbackStatus = createAsyncThunk("feedbackstatus/getStatus", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await feedbackstatusService.getfeedbackStatus(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const feedbackstatusSlice = createSlice({
    name: "feedbackstatus",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getfeedbackStatus.pending, (state) => {
                state.isLoadingS = true
            })
            .addCase(getfeedbackStatus.fulfilled, (state, action) => {
                state.isLoadingS = false
                state.isSuccessS = true
                state.status = action.payload
            })
            .addCase(getfeedbackStatus.rejected, (state, action) => {
                state.isLoadingS = false
                state.isErrorS = true
                state.messageS = action.payload
            })
    }
})

export const {reset} = feedbackstatusSlice.actions
export default feedbackstatusSlice.reducer