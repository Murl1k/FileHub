import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IFileData, IFolder, IFolderData} from "../types";
import axiosInstance from "./axiosInstance.ts";

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ["File", "Folder"],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/v1',
    }),
    endpoints: builder => ({
        getFiles: builder.query<IFileData[], string>({
            queryFn: async (id) => {
                return await axiosInstance.get(`/cloud_storage/files/?folder=${id ? id : ''}`)
            },
            providesTags: ["File"]
        }),
        getFolders: builder.query<IFolderData[], string>({
            queryFn: async (id) => {
                if (location.pathname === '/') {
                    return await axiosInstance.get(`/cloud_storage/folders/`)
                } else {
                    return await axiosInstance.get(`/cloud_storage/folders/${id}/child_folders/`)
                }
            },
            providesTags: ["Folder"]
        }),
        addFile: builder.mutation<IFileData[], FormData>({
            queryFn: async (data) => {
                return await axiosInstance.post('/cloud_storage/files/', data)
            },
            invalidatesTags: ["File"]
        }),
        addFolder: builder.mutation<IFolderData[], IFolder>({
            queryFn: async (params) => {
                console.log(params)
                return await axiosInstance.post('/cloud_storage/folders/', params)
            },
            invalidatesTags: ["Folder"]
        })
    })
})

export const {
    useGetFilesQuery,
    useGetFoldersQuery,
    useAddFileMutation,
    useAddFolderMutation
} = api