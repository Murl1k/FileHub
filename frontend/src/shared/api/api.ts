import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IFileData, IFolder, IFolderData} from "../types";
import axiosInstance from "./axiosInstance.ts";
import {toast} from "react-toastify";

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
            providesTags: ["File"],
        }),
        addFile: builder.mutation<IFileData[], FormData>({
            queryFn: async (data) => {
                try {
                    const res = await axiosInstance.post('/cloud_storage/files/', data)
                    return res.data
                } catch (err) {
                    return toast.error(err.response.data.file[0])
                }
            },
            invalidatesTags: ["File"]
        }),
        removeFile: builder.mutation<IFileData[], string>({
            queryFn: async (id) => {
                try {
                    const res = await axiosInstance.delete(`/cloud_storage/files/${id}/`)
                    return res.data
                } catch (err) {
                    return toast.error(err.response.data.detail)
                }
            },
            invalidatesTags: ["File"]
        }),
        updateFilePrivacy: builder.mutation<IFileData[], { id: string, is_public: boolean }>({
            queryFn: async ({id, is_public}) => {
                try {
                    const res = await axiosInstance.patch(`/cloud_storage/files/${id}/`, {
                        is_public: is_public
                    })
                    return res.data
                } catch (err) {
                    return toast.error(err.message)
                }
            },
            invalidatesTags: ["File"]
        }),
        copyFile: builder.mutation<IFileData[], { id: string, folder: string }>({
            queryFn: async ({id, folder}) => {
                try {
                    const res = await axiosInstance.post(`/cloud_storage/files/${id}/copy/`, {folder: folder})
                    return res.data
                } catch (err) {
                    return toast.error(err.response.data.detail)
                }
            }
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
        getParentFolder: builder.query<IFolderData, string>({
            queryFn: async (id) => {
                if (location.pathname !== '/') {
                    const res = await axiosInstance.get(`/cloud_storage/folders/${id}`)
                    return {data: res.data.parent_folder}
                } else {
                    return {data: undefined}
                }
            },
            providesTags: ["Folder"]
        }),
        addFolder: builder.mutation<IFolderData[], IFolder>({
            queryFn: async (params) => {
                try {
                    const res = await axiosInstance.post('/cloud_storage/folders/', params)
                    return res.data
                } catch (err) {
                    return toast.error(err.response.data.title[0])
                }
            },
            invalidatesTags: ["Folder"]
        }),
        removeFolder: builder.mutation<IFolderData[], string>({
            queryFn: async (id) => {
                try {
                    const res = await axiosInstance.delete(`/cloud_storage/folders/${id}/`)
                    return res.data
                } catch (err) {
                    return toast.error(err.response.data.detail)
                }
            },
            invalidatesTags: ["Folder"]
        }),
        updateFolderPrivacy: builder.mutation<IFolderData[], string>({
            queryFn: async (id) => {
                try {
                    const res = await axiosInstance.post(`/cloud_storage/folders/${id}/change_privacy/`)
                    return res.data
                } catch (err) {
                    return toast.error(err.message)
                }
            },
            invalidatesTags: ["Folder"]
        }),
        renameFolder: builder.mutation<IFolderData[], { id: string, title: string }>({
            queryFn: async ({id, title}) => {
                try {
                    const res = await axiosInstance.patch(`/cloud_storage/folders/${id}/`, {title: title})
                    return res.data
                } catch (err) {
                    return toast.error(err.response.data.detail)
                }
            },
            invalidatesTags: ["Folder"]
        }),
        copyFolder: builder.mutation<IFolderData[], { id: string, folder: string }>({
            queryFn: async ({id, folder}) => {
                try {
                    const res = await axiosInstance.post(`/cloud_storage/folders/${id}/copy/`, {parent_folder: folder})
                    return res.data
                } catch (err) {
                    return toast.error(err.response.data.detail)
                }
            }
        })
    })
})

export const {
    useGetFilesQuery,
    useGetFoldersQuery,
    useGetParentFolderQuery,
    useAddFileMutation,
    useAddFolderMutation,
    useUpdateFilePrivacyMutation,
    useUpdateFolderPrivacyMutation,
    useRemoveFolderMutation,
    useRemoveFileMutation,
    useCopyFolderMutation,
    useCopyFileMutation,
    useRenameFolderMutation
} = api