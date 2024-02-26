import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IInitialState {
    id: string
    isFolder: boolean
}

const initialState: IInitialState = {
    id: '',
    isFolder: false,
}

export const copySlice = createSlice({
    name: 'copy',
    initialState,
    reducers: {
        getItemId: (state, action: PayloadAction<{ id: string, isFolder: boolean }>) => {
            state.id = action.payload.id
            state.isFolder = action.payload.isFolder
        }
    }
})

export const {getItemId} = copySlice.actions