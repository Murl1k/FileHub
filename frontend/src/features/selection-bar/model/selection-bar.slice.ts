import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IInitialState {
    id: string
    isFolder: boolean
}

const initialState: IInitialState = {
    id: '',
    isFolder: false
}

export const selectionBarSlice = createSlice({
    name: "folders",
    initialState,
    reducers: {
        getItemId: (state, action: PayloadAction<{ id: string, isFolder: boolean }>) => {
            state.id = action.payload.id
            state.isFolder = action.payload.isFolder
        }
    }
})

export const {getItemId} = selectionBarSlice.actions