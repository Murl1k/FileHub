import {createAsyncThunk} from "@reduxjs/toolkit";
import {IChangePassword, IChangeUsername, IUser} from "../../../shared/types";
import axios from "axios";
import axiosInstance from "../../../shared/api/axiosInstance.ts";

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async (params: IUser) => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/users/', params)
            return res.data
        } catch (err) {
            console.log(err)
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
            console.log(err)
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
            console.log(err)
        }
    }
)

export const fetchUpdateMyAccount = createAsyncThunk(
    'auth/fetchUpdateMyAccount',
    async (params: { email: string }, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.patch('/users/me/', params)
            return res.data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchDeleteMyAccount = createAsyncThunk(
    'auth/fetchDeleteMyAccount',
    async (params: { current_password: string }) => {
        try {
            const res = await axiosInstance.delete('/users/me/', params)
            return res.data
        } catch (err) {
            console.log(err)
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
            console.log(err)
        }
    }
)

export const fetchSetUsername = createAsyncThunk(
    'auth/fetchSetUsername',
    async (params: IChangeUsername, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.post('/users/set_username/', params)
            return res.data
        } catch (err) {
            return rejectWithValue(err)
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
            console.log(err)
        }
    }
)