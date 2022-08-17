import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import userService from "./userService"

const initialState = {
    users: [],
    isErrorUsers: false,
    isSuccessUsers: false,
    isLoadingUsers: false,
    messageUsers: ""
}

// get the users
export const getUsers = createAsyncThunk("users/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await userService.getUsers(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetusers: (state) => initialState  // make it similar to userSlice if u want it to persist so we can search users  and projects throughout the app. ( for use in stakeholders and contacts) 
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoadingUsers = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoadingUsers = false
                state.isSuccessUsers = true
                state.users = action.payload
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoadingUsers = false
                state.isErrorUsers = true
                state.message = action.payload
            })
    }
})

export const {resetusers} = userSlice.actions
export default userSlice.reducer