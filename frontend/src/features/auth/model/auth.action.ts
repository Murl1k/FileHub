import {createAsyncThunk} from "@reduxjs/toolkit";
import {IChangePassword, IChangeUsername, IUser} from "./";
import axios from "axios";
import axiosInstance from "../../../shared/api/axiosInstance.ts";
import {toast} from "react-toastify";

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async (params: IUser) => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/users/', params)
            return res.data
        } catch (err) {
            const responseData = err.response.data

            switch (true) {
                case responseData.username && responseData.username.length > 0:
                    return toast.error(responseData.username[0])
                case responseData.password && responseData.password.length > 0:
                    return toast.error(responseData.password[0])
                default:
                    return toast.error(err.message)
            }
        }
    }
)

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async (params: IUser) => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/auth/token/login/', params)
            return res.data
        } catch (err) {
            return toast.error(err.response.data.non_field_errors[0])
        }
    }
)

export const fetchLoginMe = createAsyncThunk(
    'auth/fetchLoginMe',
    async () => {
        try {
            const res = await axiosInstance.get(`/users/me/`)
            return res.data
        } catch (err) {
            return toast.error(err.response.data.detail)
        }
    }
)

export const fetchUpdateMyAccount = createAsyncThunk(
    'auth/fetchUpdateMyAccount',
    async (params: { email: string }) => {
        try {
            const res = await axiosInstance.patch('/users/me/', params)
            return res.data
        } catch (err) {
            return toast.error(err.response.data.email[0])
        }
    }
)

export const fetchLogout = createAsyncThunk(
    'auth/fetchLogout',
    async () => {
        try {
            const res = await axiosInstance.post('/auth/token/logout/')
            return res.data
        } catch (err) {
            return toast.error(err.response.data.detail)
        }
    }
)

export const fetchSetUsername = createAsyncThunk(
    'auth/fetchSetUsername',
    async (params: IChangeUsername) => {
        try {
            const res = await axiosInstance.post('/users/set_username/', params)
            return res.data
        } catch (err) {
            const responseData = err.response.data

            switch (true) {
                case responseData.current_password && responseData.current_password.length > 0:
                    return toast.error(responseData.current_password[0])
                case responseData.new_username && responseData.new_username.length > 0:
                    return toast.error(responseData.new_username[0])
                default:
                    return toast.error(err.message)
            }
        }
    }
)

export const fetchSetPassword = createAsyncThunk(
    'auth/fetchSetPassword',
    async (params: IChangePassword) => {
        try {
            const res = await axiosInstance.post('/users/set_password/', params)
            return res.data
        } catch (err) {
            const responseData = err.response.data

            switch (true) {
                case responseData.new_password && responseData.new_password.length > 0:
                    return toast.error(responseData.new_password[0])
                case responseData.non_field_errors && responseData.non_field_errors.length > 0:
                    return toast.error(responseData.non_field_errors[0])
                case responseData.current_password && responseData.current_password.length > 0:
                    return toast.error(responseData.current_password[0])
                default:
                    return toast.error(err.message)
            }
        }
    }
)

export const fetchGetUsersCount = createAsyncThunk(
    'auth/fetchGetUsersCount',
    async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/users/count_all/')
            return res.data
        } catch (err) {
            return toast.error(err.message)
        }
    }
)