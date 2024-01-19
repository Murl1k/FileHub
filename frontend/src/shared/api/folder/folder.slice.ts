import {createSlice} from "@reduxjs/toolkit";
import {fetchAddFolder, fetchGetFolders} from "./folder.action.ts";
import {IFolderData} from "../../types";

interface IInitialState {
    data: IFolderData[]
    current_folder: string
    isLoading: boolean
    error: string
}

const initialState: IInitialState = {
    data: [],
    current_folder: '',
    isLoading: true,
    error: ''
}

export const folderSlice = createSlice({
    name: 'folder',
    initialState,
    reducers: {
        getCurrentFolder(state) {
            state.current_folder = location.pathname.replace('/folder/', '')
        }
    },
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

export const {getCurrentFolder} = folderSlice.actions