import {createSlice} from "@reduxjs/toolkit";
import {fetchLogin, fetchLoginMe, fetchLogout, fetchRegister} from "./auth.action.ts";
import {IUser} from "../../types";
import {RootState} from "../store/store.ts";

interface IInitialState {
    data: IUser | null
    isLoading: boolean
    error: string
}

const initialState: IInitialState = {
    data: null,
    isLoading: true,
    error: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchRegister.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchRegister.rejected, state => {
                state.error = 'error'
            })
            .addCase(fetchLogin.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = null
            })
            .addCase(fetchLogin.rejected, state => {
                state.error = 'error'
            })
            .addCase(fetchLoginMe.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchLoginMe.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchLoginMe.rejected, state => {
                state.error = 'error'
            })
            .addCase(fetchLogout.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchLogout.fulfilled, state => {
                state.isLoading = false
                state.data = null

                localStorage.removeItem('token')
            })
            .addCase(fetchLogout.rejected, state => {
                state.error = 'error'
            })
    }
})

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data)

export default authSlice.reducer
