import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import tagService from "./tagService"

const initialState = {
    tags: [],
    isErrorTag: false,
    isSuccessTag: false,
    isLoadingTag: false,
    messageTag: ""
}

// get the project`s tags
export const getTags = createAsyncThunk("tags/getAll", async (projectId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await tagService.getTags(projectId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete tag
export const deleteTag = createAsyncThunk("tags/delete", async (tagData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await tagService.deleteTag(tagData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// add tag
export const addTag = createAsyncThunk("tags/add", async (tagData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await tagService.addTag(tagData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const tagSlice = createSlice({
    name: "tag",
    initialState,
    reducers: {
        resettags: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTags.pending, (state) => {
                state.isLoadingTag = true
            })
            .addCase(getTags.fulfilled, (state, action) => {
                state.isLoadingTag = false
                state.isSuccessTag = true
                state.tags = action.payload
            })
            .addCase(getTags.rejected, (state, action) => {
                state.isLoadingTag = false
                state.isErrorTag = true
                state.messageTag = action.payload
            })
            .addCase(deleteTag.pending, (state) => {
                state.isLoadingTag = true
            })
            .addCase(deleteTag.fulfilled, (state, action) => {
                state.isLoadingTag = false
                state.isSuccessTag = true
                if(action.payload._id){
                    state.tags = state.tags.filter((tag) => (tag._id !== action.payload._id)) // first delete the stakeholder
                    state.tags.push(action.payload) // then push the new stakeholders, if the type array is not empty
                } 
                else{
                    state.tags = state.tags.filter((tag) => (tag._id !== action.payload.id))
                }
            })
            .addCase(deleteTag.rejected, (state, action) => {
                state.isLoadingTag = false
                state.isErrorTag = true
                state.messageTag = action.payload
            })
            .addCase(addTag.pending, (state) => {
                state.isLoadingTag = true
            })
            .addCase(addTag.fulfilled, (state, action) => {
                state.isLoadingTag = false
                state.isSuccessTag = true
                state.tags = state.tags.filter((tag) => (tag._id !== action.payload._id)) 
                state.tags.push(action.payload) 
            })
            .addCase(addTag.rejected, (state, action) => {
                state.isLoadingTag = false
                state.isErrorTag = true
                state.messageTag = action.payload
            })
    }
})

export const {resettags} = tagSlice.actions
export default tagSlice.reducer