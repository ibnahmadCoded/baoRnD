import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import goalService from "./goalService"

const initialState = {
    goals: [],
    isErrorGoal: false,
    isSuccessGoal: false,
    isLoadingGoal: false,
    messageGoal: ""
}

// get the project`s goals
export const getGoals = createAsyncThunk("goals/getAll", async (projectId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.getGoals(projectId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete goal
export const deleteGoal = createAsyncThunk("goals/delete", async (goalId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(goalId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// add goal
export const addGoal = createAsyncThunk("goals/add", async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.addGoal(goalData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// update goal as completed or uncomplted
export const updateGoal = createAsyncThunk("goals/change", async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.changeGoal(goalData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const goalSlice = createSlice({
    name: "goal",
    initialState,
    reducers: {
        resetgoals: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGoals.pending, (state) => {
                state.isLoadingGoal = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoadingGoal = false
                state.isSuccessGoal = true
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoadingGoal = false
                state.isErrorGoal = true
                state.messageGoal = action.payload
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoadingGoal = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoadingGoal = false
                state.isSuccessGoal = true
                state.goals = state.goals.filter((goal) => (goal._id !== action.payload.id)) 
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoadingGoal = false
                state.isErrorGoal = true
                state.messageGoal = action.payload
            })
            .addCase(addGoal.pending, (state) => {
                state.isLoadingGoal = true
            })
            .addCase(addGoal.fulfilled, (state, action) => {
                state.isLoadingGoal = false
                state.isSuccessGoal = true
                state.goals.push(action.payload) 
            })
            .addCase(addGoal.rejected, (state, action) => {
                state.isLoadingGoal = false
                state.isErrorGoal = true
                state.messageGoal = action.payload
            })
            .addCase(updateGoal.pending, (state) => {
                state.isLoadingGoal = true
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                state.isLoadingGoal = false
                state.isSuccessGoal = true
                state.goals = state.goals.filter((goal) => (goal._id !== action.payload._id)) 
                state.goals.push(action.payload)
            })
            .addCase(updateGoal.rejected, (state, action) => {
                state.isLoadingGoal = false
                state.isErrorGoal = true
                state.messageGoal = action.payload
            })
    }
})

export const {resetgoals} = goalSlice.actions
export default goalSlice.reducer