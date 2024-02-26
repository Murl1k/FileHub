import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IContextMenu} from "./types.ts";

const initialState: IContextMenu = {
    type: "initial",
    x: 0,
    y: 0
}

export const contextMenuSlice = createSlice({
    name: 'contextMenu',
    initialState,
    reducers: {
        setContextMenu: (state, action: PayloadAction<IContextMenu>) => {
            state.type = action.payload.type
            state.x = action.payload.x
            state.y = action.payload.y
        }
    }
})

export const initialContextState: IContextMenu = {
    type: "initial",
    x: 0,
    y: 0
}

export const {setContextMenu} = contextMenuSlice.actions