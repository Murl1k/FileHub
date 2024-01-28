import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IInitialState {
    isFilesOpen: boolean
}

const initialState: IInitialState = {
    isFilesOpen: false
}

export const filesSlice = createSlice({
    name: "files",
    initialState,
    reducers: {
        setIsFilesOpen: (state, action: PayloadAction<boolean>) => {
            state.isFilesOpen = action.payload
        }
    }
})

export const {setIsFilesOpen} = filesSlice.actions