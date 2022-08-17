import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import stakeholderService from "./stakeholderService"

const initialState = {
    stakeholders: [],
    isErrorStakeholder: false,
    isSuccessStakeholder: false,
    isLoadingStakeholder: false,
    messageStakeholder: ""
}

// get the project`s stakeholders
export const getStakeholders = createAsyncThunk("stakeholders/getAll", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await stakeholderService.getStakeholders(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete stakeholder
export const deleteStakeholder = createAsyncThunk("stakeholders/delete", async (stakeData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await stakeholderService.deleteStakeholder(stakeData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// add stakeholder
export const addStakeholder = createAsyncThunk("stakeholders/add", async (stakeData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await stakeholderService.addStakeholder(stakeData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const stakeholderSlice = createSlice({
    name: "stakeholder",
    initialState,
    reducers: {
        resetstakeholders: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStakeholders.pending, (state) => {
                state.isLoadingStakeholder = true
            })
            .addCase(getStakeholders.fulfilled, (state, action) => {
                state.isLoadingStakeholder = false
                state.isSuccessStakeholder = true
                state.stakeholders = action.payload
            })
            .addCase(getStakeholders.rejected, (state, action) => {
                state.isLoadingStakeholder = false
                state.isErrorStakeholder = true
                state.messageStakeholder = action.payload
            })
            .addCase(deleteStakeholder.pending, (state) => {
                state.isLoadingStakeholder = true
            })
            .addCase(deleteStakeholder.fulfilled, (state, action) => {
                state.isLoadingStakeholder = false
                state.isSuccessStakeholder = true
                console.log(action.payload)
                if(action.payload._id){
                    state.stakeholders = state.stakeholders.filter((stakeholder) => (stakeholder._id !== action.payload._id)) // first delete the stakeholder
                    state.stakeholders.push(action.payload) // then push the new stakeholders, if the type array is not empty
                } 
                else{
                    state.stakeholders = state.stakeholders.filter((stakeholder) => (stakeholder._id !== action.payload.id))
                }
            })
            .addCase(deleteStakeholder.rejected, (state, action) => {
                state.isLoadingStakeholder = false
                state.isErrorStakeholder = true
                state.messageStakeholder = action.payload
            })
            .addCase(addStakeholder.pending, (state) => {
                state.isLoadingStakeholder = true
            })
            .addCase(addStakeholder.fulfilled, (state, action) => {
                state.isLoadingStakeholder = false
                state.isSuccessStakeholder = true
                console.log(action.payload)
                state.stakeholders = state.stakeholders.filter((stakeholder) => (stakeholder._id !== action.payload._id)) // first delete the stakeholder
                state.stakeholders.push(action.payload) // then push the new stakeholders
            })
            .addCase(addStakeholder.rejected, (state, action) => {
                state.isLoadingStakeholder = false
                state.isErrorStakeholder = true
                state.messageStakeholder = action.payload
            })
    }
})

export const {resetstakeholders} = stakeholderSlice.actions
export default stakeholderSlice.reducer