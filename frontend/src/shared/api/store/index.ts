import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {api} from "../";
import {authSlice} from "../../../features/auth";
import {itemTemplateSlice} from "../../../features/item-template";
import {contextMenuSlice} from "../../../features/context-menu";
import {popupSlice} from "../../../features/popups";
import {copySlice} from "../../../features/feature-buttons";

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    contextMenu: contextMenuSlice.reducer,
    popup: popupSlice.reducer,
    itemTemplate: itemTemplateSlice.reducer,
    copy: copySlice.reducer,
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