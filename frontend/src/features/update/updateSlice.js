import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import updateService from "./updateService"

const initialState = {
    update: "",
    isErrorUpdate: false,
    isSuccessUpdate: false,
    isLoadingUpdate: false,
    messageUpdate: ""
}

// get one project update
export const getAnUpdate = createAsyncThunk("update/getUpdate", async (updateId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await updateService.getAnUpdate(updateId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete update
export const deleteUpdate = createAsyncThunk("update/delete", async (updateId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await updateService.deleteUpdate(updateId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateSlice = createSlice({
    name: "update",
    initialState,
    reducers: {
        resetupdates: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAnUpdate.pending, (state) => {
                state.isLoadingUpdate = true
            })
            .addCase(getAnUpdate.fulfilled, (state, action) => {
                state.isLoadingUpdate = false
                state.isSuccessUpdate = true
                state.update = action.payload
            })
            .addCase(getAnUpdate.rejected, (state, action) => {
                state.isLoadingUpdate = false
                state.isErrorUpdate = true
                state.messageUpdate = action.payload
            })
            .addCase(deleteUpdate.pending, (state) => {
                state.isLoadingUpdate = true
            })
            .addCase(deleteUpdate.fulfilled, (state, action) => {
                state.isLoadingUpdate = false
                state.isSuccessUpdate = true
                state.update = null
            })
            .addCase(deleteUpdate.rejected, (state, action) => {
                state.isLoadingUpdate = false
                state.isErrorUpdate = true
                state.messageUpdate = action.payload
            })
    }
})

export const {resetupdate} = updateSlice.actions
export default updateSlice.reducer