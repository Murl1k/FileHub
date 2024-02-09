import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    fetchDeleteMyAccount,
    fetchGetUsersCount,
    fetchLogin,
    fetchLoginMe,
    fetchLogout,
    fetchRegister,
    fetchSetUsername,
    fetchUpdateMyAccount
} from "./auth.action.ts";
import {IUserData} from "./";

interface IInitialState {
    data: IUserData | null
    isLoading: boolean
    error: string
    status: string
    users_count: number
}

const initialState: IInitialState = {
    data: null,
    isLoading: true,
    error: '',
    status: '',
    users_count: 0
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
            .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<IUserData>) => {
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
                state.status = 'loading'
            })
            .addCase(fetchLoginMe.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchLoginMe.rejected, state => {
                state.isLoading = false
                state.error = 'error'
                state.status = 'error'
            })
            .addCase(fetchDeleteMyAccount.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchDeleteMyAccount.fulfilled, state => {
                state.isLoading = false
                state.data = null
            })
            .addCase(fetchDeleteMyAccount.rejected, state => {
                state.error = 'error'
            })
            .addCase(fetchUpdateMyAccount.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchUpdateMyAccount.fulfilled, (state, action: PayloadAction<{ email: string }>) => {
                if (!state.data) {
                    return
                }

                state.isLoading = false
                state.data.email = action.payload.email
            })
            .addCase(fetchUpdateMyAccount.rejected, state => {
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
            .addCase(fetchGetUsersCount.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchGetUsersCount.fulfilled, (state, action: PayloadAction<{ users_count: number }>) => {
                state.isLoading = false
                state.users_count = action.payload.users_count
            })
            .addCase(fetchGetUsersCount.rejected, state => {
                state.error = 'error'
            })
    }
})