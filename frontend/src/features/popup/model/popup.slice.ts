import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IInitialState {
    isFoldersOpen: boolean
    isFilesOpen: boolean
}

const initialState: IInitialState = {
    isFoldersOpen: false,
    isFilesOpen: false
}

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setIsFoldersOpen: (state, action: PayloadAction<boolean>) => {
            state.isFoldersOpen = action.payload
        },
        setIsFilesOpen: (state, action: PayloadAction<boolean>) => {
            state.isFilesOpen = action.payload
        }
    }
})

export const {setIsFoldersOpen, setIsFilesOpen} = popupSlice.actions