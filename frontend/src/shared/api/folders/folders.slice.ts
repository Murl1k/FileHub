import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IInitialState {
    isFoldersOpen: boolean
}

const initialState: IInitialState = {
    isFoldersOpen: false
}

export const foldersSlice = createSlice({
    name: "folders",
    initialState,
    reducers: {
        setIsFoldersOpen: (state, action: PayloadAction<boolean>) => {
            state.isFoldersOpen = action.payload
        }
    }
})

export const {setIsFoldersOpen} = foldersSlice.actions