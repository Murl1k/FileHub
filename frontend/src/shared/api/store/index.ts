import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {authSlice} from "../../../features/auth/model/auth.slice.ts";
import {api} from "../api.ts";
import {selectionBarSlice} from "../../../features/selection-bar";
import {itemTemplateSlice} from "../../../features/item-template";
import {contextMenuSlice} from "../../../features/context-menu";
import {popupSlice} from "../../../features/popup";

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    contextMenu: contextMenuSlice.reducer,
    popup: popupSlice.reducer,
    itemTemplate: itemTemplateSlice.reducer,
    selectionBar: selectionBarSlice.reducer,
    [api.reducerPath]: api.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }).concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch