import {createSlice} from "@reduxjs/toolkit";
import {IFileData} from "../../types";
import {fetchAddFiles, fetchGetFiles} from "./files.action.ts";

interface IInitialState {
    data: IFileData[],
    isLoading: boolean,
    error: string
}

const initialState: IInitialState = {
    data: [],
    isLoading: true,
    error: ''
}

export const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAddFiles.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchAddFiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.data.push(action.payload)
            })
            .addCase(fetchAddFiles.rejected, state => {
                state.isLoading = false
                state.error = 'error'
            })
            .addCase(fetchGetFiles.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchGetFiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchGetFiles.rejected, state => {
                state.isLoading = false
                state.error = 'error'
            })
    }
})