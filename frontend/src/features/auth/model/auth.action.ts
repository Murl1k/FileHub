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
            return toast.error(err.response.data.password[0])
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

export const fetchDeleteMyAccount = createAsyncThunk(
    'auth/fetchDeleteMyAccount',
    async (current_password: string) => {
        try {
            const res = await axiosInstance.delete('/users/me/', current_password)
            return res.data
        } catch (err) {
            return toast.error(err.message)
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
            return toast.error(err.response.data.new_username[0])
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
            return toast.error(err.response.data.new_password[0])
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