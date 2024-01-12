import {createSlice} from "@reduxjs/toolkit";
import {IFolderData} from "../../types/folder.interface.ts";
import {fetchAddFolder, fetchGetFolders} from "./folder.action.ts";

interface IInitialState {
    data: IFolderData[]
    isLoading: boolean
    error: string
}

const initialState: IInitialState = {
    data: [],
    isLoading: true,
    error: ''
}

export const folderSlice = createSlice({
    name: 'folder',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAddFolder.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchAddFolder.fulfilled, (state, action) => {
                state.isLoading = false
                state.data.push(action.payload)
            })
            .addCase(fetchAddFolder.rejected, state => {
                state.error = 'error'
            })
            .addCase(fetchGetFolders.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchGetFolders.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchGetFolders.rejected, state => {
                state.error = 'error'
            })
    }
})