import {createSlice} from "@reduxjs/toolkit";

interface IInitialState {
    id: string
    isFolder: boolean
}

const initialState: IInitialState = {
    id: '',
    isFolder: false
}

export const foldersSlice = createSlice({
    name: "folders",
    initialState,
    reducers: {
        getFolderId: (state, action) => {
            state.id = action.payload.id
            state.isFolder = action.payload.isFolder
        }
    }
})

export const {getFolderId} = foldersSlice.actions