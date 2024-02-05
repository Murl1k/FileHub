import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IInitialState {
    isFoldersOpen: boolean
    isFilesOpen: boolean
    isPrivacyOpen: boolean
    isFolderRenameOpen: boolean
}

const initialState: IInitialState = {
    isFoldersOpen: false,
    isFilesOpen: false,
    isPrivacyOpen: false,
    isFolderRenameOpen: false
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
        },
        setIsPrivacyOpen: (state, action: PayloadAction<boolean>) => {
            state.isPrivacyOpen = action.payload
        },
        setIsFolderRenameOpen: (state, action: PayloadAction<boolean>) => {
            state.isFolderRenameOpen = action.payload
        }
    }
})

export const {
    setIsFoldersOpen,
    setIsFilesOpen,
    setIsPrivacyOpen,
    setIsFolderRenameOpen
} = popupSlice.actions