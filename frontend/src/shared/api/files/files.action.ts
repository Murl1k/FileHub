import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance.ts";

export const fetchAddFiles = createAsyncThunk(
    'files/fetchAddFiles',
    async (data: FormData, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.post('/cloud_storage/files/', data)
            return res.data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchGetFiles = createAsyncThunk(
    'files/fetchGetFiles',
    async (_, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get('/cloud_storage/files/')
            return res.data
        } catch (err) {
            rejectWithValue(err)
        }
    }
)