import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance.ts";
import {IFile} from "../../types";

export const fetchAddFiles = createAsyncThunk(
    'files/fetchAddFiles',
    async (params: IFile, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.post('/cloud_storage/files/', params)
            return res.data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)