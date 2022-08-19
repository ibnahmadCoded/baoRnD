import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import updateService from "./updateService"

const initialState = {
    updates: [],
    update: "",
    isErrorUpdate: false,
    isSuccessUpdate: false,
    isLoadingUpdate: false,
    messageUpdate: ""
}

// get the project`s updates
export const getProjectUpdates = createAsyncThunk("updates/getProjectAll", async (projectId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await updateService.getProjectUpdates(projectId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get the user`s updates
export const getUserUpdates = createAsyncThunk("updates/getUserAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await updateService.getUserUpdates(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get one project update
export const getAnUpdate = createAsyncThunk("updates/getAll", async (updateId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await updateService.getAnUpdate(updateId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete update
export const deleteUpdate = createAsyncThunk("updates/delete", async (updateId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await updateService.deleteUpdate(updateId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// add update
export const addUpdate = createAsyncThunk("materials/add", async (updateData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await updateService.addUpdate(updateData, token)
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
            .addCase(getProjectUpdates.pending, (state) => {
                state.isLoadingUpdate = true
            })
            .addCase(getProjectUpdates.fulfilled, (state, action) => {
                state.isLoadingUpdate = false
                state.isSuccessUpdate = true
                state.updates = action.payload
            })
            .addCase(getProjectUpdates.rejected, (state, action) => {
                state.isLoadingUpdate = false
                state.isErrorUpdate = true
                state.messageUpdate = action.payload
            })
            .addCase(getUserUpdates.pending, (state) => {
                state.isLoadingUpdate = true
            })
            .addCase(getUserUpdates.fulfilled, (state, action) => {
                state.isLoadingUpdate = false
                state.isSuccessUpdate = true
                state.updates = action.payload
            })
            .addCase(getUserUpdates.rejected, (state, action) => {
                state.isLoadingUpdate = false
                state.isErrorUpdate = true
                state.messageUpdate = action.payload
            })
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
                state.updates = state.updates.filter((update) => (update._id !== action.payload.id)) 
                if(state.update !== "" || state.update !== null){
                    state.update = null
                }
            })
            .addCase(deleteUpdate.rejected, (state, action) => {
                state.isLoadingUpdate = false
                state.isErrorUpdate = true
                state.messageUpdate = action.payload
            })
            .addCase(addUpdate.pending, (state) => {
                state.isLoadingUpdate = true
            })
            .addCase(addUpdate.fulfilled, (state, action) => {
                state.isLoadingUpdate = false
                state.isSuccessUpdate = true
                state.updates.push(action.payload) 
            })
            .addCase(addUpdate.rejected, (state, action) => {
                state.isLoadingUpdate = false
                state.isErrorUpdate = true
                state.messageUpdate = action.payload
            })
    }
})

export const {resetupdates} = updateSlice.actions
export default updateSlice.reducer