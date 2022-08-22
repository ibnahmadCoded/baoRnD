import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import investmentService from "./investmentService"

const initialState = {
    investments: [],
    isErrorInvestment: false,
    isSuccessInvestment: false,
    isLoadingInvestment: false,
    messageInvestment: ""
}

// get the project`s investments
export const getProjectInvestments = createAsyncThunk("investments/getProjectInvestments", async (projectId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await investmentService.getProjectInvestments(projectId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get the user`s investments
export const getMyInvestments = createAsyncThunk("investments/getMyInvestments", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await investmentService.getMyInvestments(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// add investment
export const addInvestment = createAsyncThunk("investments/add", async (investmentData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await investmentService.addInvestment(investmentData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const investmentSlice = createSlice({
    name: "investment",
    initialState,
    reducers: {
        resetinvestments: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyInvestments.pending, (state) => {
                state.isLoadingInvestment = true
            })
            .addCase(getMyInvestments.fulfilled, (state, action) => {
                state.isLoadingInvestment = false
                state.isSuccessInvestment = true
                state.investments = action.payload
            })
            .addCase(getMyInvestments.rejected, (state, action) => {
                state.isLoadingInvestment = false
                state.isErrorInvestment = true
                state.messageInvestment = action.payload
            })
            .addCase(getProjectInvestments.pending, (state) => {
                state.isLoadingInvestment = true
            })
            .addCase(getProjectInvestments.fulfilled, (state, action) => {
                state.isLoadingInvestment = false
                state.isSuccessInvestment = true
                state.investments = action.payload
            })
            .addCase(getProjectInvestments.rejected, (state, action) => {
                state.isLoadingInvestment = false
                state.isErrorInvestment = true
                state.messageInvestment = action.payload
            })
            .addCase(addInvestment.pending, (state) => {
                state.isLoadingInvestment = true
            })
            .addCase(addInvestment.fulfilled, (state, action) => {
                state.isLoadingInvestment = false
                state.isSuccessInvestment = true
                state.investments = state.investments.filter((investment) => (investment._id !== action.payload._id))
                state.investments.push(action.payload) 
            })
            .addCase(addInvestment.rejected, (state, action) => {
                state.isLoadingInvestment = false
                state.isErrorInvestment = true
                state.messageInvestment = action.payload
            })
    }
})

export const {resetinvestments} = investmentSlice.actions
export default investmentSlice.reducer