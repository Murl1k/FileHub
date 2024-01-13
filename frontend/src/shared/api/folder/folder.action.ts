import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance.ts";
import {IFolder} from "../../types";

export const fetchAddFolder = createAsyncThunk(
    'folder/fetchAddFolder',
    async (params: IFolder, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.post('/cloud_storage/folders/', params)
            return res.data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchGetFolders = createAsyncThunk(
    'folder/fetchGetFolders',
    async (_, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get('/cloud_storage/folders/')
            return res.data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)