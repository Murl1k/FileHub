import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IIsActive} from "./";

const initialState: IIsActive = {
    status: false,
    id: '',
    isFolder: false
}

export const itemTemplateSlice = createSlice({
    name: 'itemTemplate',
    initialState,
    reducers: {
        setIsActive: (state, action: PayloadAction<IIsActive>) => {
            state.status = action.payload.status
            state.id = action.payload.id
            state.isFolder = action.payload.isFolder
        }
    }
})

export const initialTemplateState: IIsActive = {
    status: false,
    id: '',
    isFolder: false
}

export const {setIsActive} = itemTemplateSlice.actions