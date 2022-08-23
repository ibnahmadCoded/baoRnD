import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import fieldService from "./fieldService"

const initialState = {
    fields: [],
    isErrorField: false,
    isSuccessField: false,
    isLoadingField: false,
    messageField: ""
}

// get the project`s fields
export const getFields = createAsyncThunk("fields/getAll", async (projectId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await fieldService.getFields(projectId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete field
export const deleteField = createAsyncThunk("fields/delete", async (fieldData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await fieldService.deleteField(fieldData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// add field
export const addField = createAsyncThunk("fields/add", async (fieldData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await fieldService.addField(fieldData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deliverableSlice = createSlice({
    name: "deliverable",
    initialState,
    reducers: {
        resetfields: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFields.pending, (state) => {
                state.isLoadingField = true
            })
            .addCase(getFields.fulfilled, (state, action) => {
                state.isLoadingField = false
                state.isSuccessField = true
                state.fields = action.payload
            })
            .addCase(getFields.rejected, (state, action) => {
                state.isLoadingField = false
                state.isErrorField = true
                state.messageField = action.payload
            })
            .addCase(deleteField.pending, (state) => {
                state.isLoadingField = true
            })
            .addCase(deleteField.fulfilled, (state, action) => {
                state.isLoadingField = false
                state.isSuccessField = true
                if(action.payload._id){
                    state.fields = state.fields.filter((field) => (field._id !== action.payload._id)) // first delete the stakeholder
                    state.fields.push(action.payload) // then push the new stakeholders, if the type array is not empty
                } 
                else{
                    state.fields = state.fields.filter((field) => (field._id !== action.payload.id))
                }
            })
            .addCase(deleteField.rejected, (state, action) => {
                state.isLoadingField = false
                state.isErrorField = true
                state.messageField = action.payload
            })
            .addCase(addField.pending, (state) => {
                state.isLoadingField = true
            })
            .addCase(addField.fulfilled, (state, action) => {
                state.isLoadingField = false
                state.isSuccessField = true
                state.fields = state.fields.filter((field) => (field._id !== action.payload._id)) 
                state.fields.push(action.payload) 
            })
            .addCase(addField.rejected, (state, action) => {
                state.isLoadingField = false
                state.isErrorField = true
                state.messageField = action.payload
            })
    }
})

export const {resetfields} = deliverableSlice.actions
export default deliverableSlice.reducer