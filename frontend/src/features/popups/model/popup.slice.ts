import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IFilters {
    isOpen: boolean
    sortBy: string
}

interface IInitialState {
    isFoldersOpen: boolean
    isFilesOpen: boolean
    isPrivacyOpen: boolean
    isFolderRenameOpen: boolean
    filter: IFilters
}

const initialState: IInitialState = {
    isFoldersOpen: false,
    isFilesOpen: false,
    isPrivacyOpen: false,
    isFolderRenameOpen: false,
    filter: {
        isOpen: false,
        sortBy: '',
    }
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
        },
        setFilter: (state, action: PayloadAction<IFilters>) => {
            state.filter = action.payload
        }
    }
})

export const initialFilterState = {
    isOpen: false,
    sortBy: ''
}

export const {
    setIsFoldersOpen,
    setIsFilesOpen,
    setIsPrivacyOpen,
    setIsFolderRenameOpen,
    setFilter
} = popupSlice.actions