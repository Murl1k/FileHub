import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {authSlice} from "../../../features/auth/model/auth.slice.ts";
import {api} from "../api.ts";

const rootReducer = combineReducers({
    auth: authSlice.reducer,
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