import {createSlice} from "@reduxjs/toolkit";
import {fetchLogin, fetchLoginMe, fetchLogout, fetchRegister, fetchSetUsername} from "./auth.action.ts";
import {IUser} from "../../../shared/types";
import {RootState} from "../../../shared/api/store";

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
            .addCase(fetchLogin.fulfilled, state => {
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
            .addCase(fetchSetUsername.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchSetUsername.fulfilled, (state, action) => {
                if (!state.data) {
                    return
                }

                state.isLoading = false
                state.data.username = action.meta.arg.new_username
            })
            .addCase(fetchSetUsername.rejected, state => {
                state.error = 'error'
            })
    }
})

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data)