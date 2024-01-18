import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {authSlice} from "../../../features/auth/model/auth.slice.ts";
import {folderSlice} from "../folder/folder.slice.ts";
import {filesSlice} from "../files/files.slice.ts";
import {api} from "../api.ts";

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    folder: folderSlice.reducer,
    files: filesSlice.reducer,
    [api.reducerPath]: api.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch