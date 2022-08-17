import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import contactService from "./contactService"

const initialState = {
    contacts: [],
    isErrorContact: false,
    isSuccessContact: false,
    isLoadingContact: false,
    messageContact: ""
}

// get the user`s contacts
export const getContacts = createAsyncThunk("contacts/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await contactService.getContacts(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete contact
export const deleteContact = createAsyncThunk("contacts/delete", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await contactService.deleteContact(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// add contact
export const addContact = createAsyncThunk("contact/add", async (contact, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await contactService.addContact(contact, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// accept contact
export const acceptContact = createAsyncThunk("contact/accept", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await contactService.acceptContact(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        resetcontacts: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getContacts.pending, (state) => {
                state.isLoadingContact = true
            })
            .addCase(getContacts.fulfilled, (state, action) => {
                state.isLoadingContact = false
                state.isSuccessContact = true
                state.contacts = action.payload
            })
            .addCase(getContacts.rejected, (state, action) => {
                state.isLoadingContact = false
                state.isErrorContact = true
                state.messageContact = action.payload
            })
            .addCase(deleteContact.pending, (state) => {
                state.isLoadingContact = true
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isLoadingContact = false
                state.isSuccessContact = true
                state.contacts = state.contacts.filter((contact) => (contact._id !== action.payload.id)) 
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.isLoadingContact = false
                state.isErrorContact = true
                state.messageContact = action.payload
            })
            .addCase(addContact.pending, (state) => {
                state.isLoadingContact = true
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.isLoadingContact = false
                state.isSuccessContact = true
                state.contacts.push(action.payload) 
            })
            .addCase(addContact.rejected, (state, action) => {
                state.isLoadingContact = false
                state.isErrorContact = true
                state.messageContact = action.payload
            })
            .addCase(acceptContact.pending, (state) => {
                state.isLoadingContact = true
            })
            .addCase(acceptContact.fulfilled, (state, action) => {
                state.isLoadingContact = false
                state.isSuccessContact = true
                state.contacts = state.contacts.filter((contact) => (contact._id !== action.payload.id))
                state.contacts.push(action.payload) 
            })
            .addCase(acceptContact.rejected, (state, action) => {
                state.isLoadingContact = false
                state.isErrorContact = true
                state.messageContact = action.payload
            })
    }
})

export const {resetcontacts} = contactSlice.actions
export default contactSlice.reducer