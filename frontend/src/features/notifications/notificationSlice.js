import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import notificationService from "./notificationService"

const initialState = {
    notifications: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// get the user`s notifications
export const getNotifications = createAsyncThunk("notifications/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notificationService.getNotifications(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get the user`s notifications
export const updateNotification = createAsyncThunk("notifications/update", async (notificationId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notificationService.updateNotification(notificationId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete notification
export const deleteNotification = createAsyncThunk("notifications/delete", async (notificationId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notificationService.deleteNotification(notificationId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notifications = action.payload
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateNotification.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateNotification.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notifications = state.notifications.filter((notification) => (notification._id !== action.payload._id))
                state.notifications = action.payload
            })
            .addCase(updateNotification.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteNotification.pending, (state) => {
                state.isLoadingApplication = true
            })
            .addCase(deleteNotification.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notifications = state.notifications.filter((notification) => (notification._id !== action.payload.id)) 
            })
            .addCase(deleteNotification.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = notificationSlice.actions
export default notificationSlice.reducer