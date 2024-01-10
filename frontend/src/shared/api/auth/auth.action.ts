import {createAsyncThunk} from "@reduxjs/toolkit";
import {IUser} from "../../types";
import axios from "axios";
import axiosInstance from "../axiosInstance.ts";

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async (params: IUser) => {
        const res = await axios.post('http://localhost:8000/api/v1/users/', params)
        return res.data
    }
)

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async (params: IUser) => {
        const res = await axios.post('http://localhost:8000/api/v1/auth/token/login/', params)
        return res.data
    }
)

export const fetchLoginMe = createAsyncThunk(
    'auth/fetchLoginMe',
    async () => {
        const res = await axiosInstance.get(`/users/me/`)
        return res.data
    }
)

export const fetchLogout = createAsyncThunk(
    'auth/fetchLogout',
    async () => {
        const res = await axiosInstance.post('/auth/token/logout/')
        return res.data
    }
)