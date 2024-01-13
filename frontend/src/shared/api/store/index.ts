import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {authSlice} from "../../../features/auth/model/auth.slice.ts";
import {folderSlice} from "../folder/folder.slice.ts";
import {filesSlice} from "../files/files.slice.ts";

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    folder: folderSlice.reducer,
    files: filesSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch