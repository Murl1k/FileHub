import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IIsActive} from "./";

interface IInitialState extends IIsActive {
    isOwner: boolean
}

const initialState: IInitialState = {
    status: false,
    id: '',
    isFolder: false,
    isOwner: true
}

export const itemTemplateSlice = createSlice({
    name: 'itemTemplate',
    initialState,
    reducers: {
        setIsActive: (state, action: PayloadAction<IIsActive>) => {
            state.status = action.payload.status
            state.id = action.payload.id
            state.isFolder = action.payload.isFolder
        },
        setIsOwner: (state, action: PayloadAction<boolean>) => {
            state.isOwner = action.payload
        }
    }
})

export const initialTemplateState: IIsActive = {
    status: false,
    id: '',
    isFolder: false
}

export const {setIsActive, setIsOwner} = itemTemplateSlice.actions