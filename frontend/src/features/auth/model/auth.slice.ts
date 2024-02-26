import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
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
    status: "initial" | "loading" | "loaded" | "error"
    users_count: number
}

const initialState: IInitialState = {
    data: null,
    status: 'initial',
    users_count: 0
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchRegister.pending, state => {
                state.status = "loading"
            })
            .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<IUserData>) => {
                state.status = "loaded"
                state.data = action.payload
            })
            .addCase(fetchRegister.rejected, state => {
                state.status = "error"
            })
            .addCase(fetchLogin.pending, state => {
                state.status = "loading"
            })
            .addCase(fetchLogin.fulfilled, state => {
                state.status = "loaded"
                state.data = null
            })
            .addCase(fetchLogin.rejected, state => {
                state.status = "error"
            })
            .addCase(fetchLoginMe.pending, state => {
                state.status = "loading"
            })
            .addCase(fetchLoginMe.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = "loaded"
            })
            .addCase(fetchLoginMe.rejected, state => {
                state.status = "error"
            })
            .addCase(fetchUpdateMyAccount.pending, state => {
                state.status = "loading"
            })
            .addCase(fetchUpdateMyAccount.fulfilled, (state, action: PayloadAction<{ email: string }>) => {
                if (!state.data) {
                    return
                }

                state.status = "loaded"
                state.data.email = action.payload.email
            })
            .addCase(fetchUpdateMyAccount.rejected, state => {
                state.status = "error"
            })
            .addCase(fetchLogout.pending, state => {
                state.status = "loading"
            })
            .addCase(fetchLogout.fulfilled, state => {
                state.status = "loaded"
                state.data = null

                localStorage.removeItem('token')
            })
            .addCase(fetchLogout.rejected, state => {
                state.status = "error"
            })
            .addCase(fetchSetUsername.pending, state => {
                state.status = "loading"
            })
            .addCase(fetchSetUsername.fulfilled, (state, action) => {
                if (!state.data) {
                    return
                }

                state.status = "loaded"
                state.data.username = action.meta.arg.new_username
            })
            .addCase(fetchSetUsername.rejected, state => {
                state.status = "error"
            })
            .addCase(fetchGetUsersCount.fulfilled, (state, action: PayloadAction<{ users_count: number }>) => {
                state.users_count = action.payload.users_count
            })
    }
})