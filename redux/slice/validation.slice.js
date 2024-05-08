import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    error: false,
    success: false,
    msg: ''
}

const validationSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = true
            state.msg = action.payload
        },
        setSuccess: (state, action) => {
            state.success = true
            state.msg = action.payload
        },
        resetValidation: (state) => {
            state.error = false
            state.success = false
            state.msg = ""
        },
    },
})

export const { setError, setSuccess, resetValidation } = validationSlice.actions
export default validationSlice.reducer