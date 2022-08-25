import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import referralService from "./referralService"

const initialState = {
    referrals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Create new referral
export const addReferral = createAsyncThunk("referrals/add", async (referralData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await referralService.addReferral(referralData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all referrals of a user
export const getMyReferrals = createAsyncThunk("referrals/getMyReferrals", async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await referralService.getMyReferrals(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete a referral (not possible for the user, but the route exists)
export const deleteReferral = createAsyncThunk("referrals/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await referralService.deleteReferral(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const referralSlice = createSlice({
    name: "referral",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(addReferral.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addReferral.fulfilled, (state, action) => {
                state.isLoading = false
                if(action.payload._id){
                    state.isSuccess = true
                    state.referrals.push(action.payload)
                }
                state.message = action.payload
            })
            .addCase(addReferral.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getMyReferrals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMyReferrals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.referrals = action.payload
            })
            .addCase(getMyReferrals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteReferral.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteReferral.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.referrals = state.referrals.filter((referral) => referral._id !== action.payload.id)
            })
            .addCase(deleteReferral.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = referralSlice.actions
export default referralSlice.reducer 