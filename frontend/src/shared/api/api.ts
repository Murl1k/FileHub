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
                    const responseData = err.response.data

                    switch (true) {
                        case responseData.file && responseData.file.length > 0:
                            return toast.error(responseData.file[0])
                        case responseData.detail && responseData.detail.length > 0:
                            return toast.error(responseData.detail)
                        default:
                            return toast.error(responseData.file[0])
                    }
                }
            },
            invalidatesTags: ["File", "Folder"]
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
        getFoldersAncestors: builder.query<IFolderData[], string>({
            queryFn: async (id) => {
                if (location.pathname !== '/') {
                    const res = await axiosInstance.get(`/cloud_storage/folders/${id}/ancestors/`)
                    return {data: res.data}
                } else {
                    return {data: undefined}
                }
            },
            providesTags: ["Folder"]
        }),
        getUsedSize: builder.query<{ used_size: number }, null>({
            queryFn: async () => {
                const res = await axiosInstance.get(`/cloud_storage/info`)
                return {data: res.data}
            },
            providesTags: ["Folder", "File"]
        }),
        addFolder: builder.mutation<IFolderData[], IFolder>({
            queryFn: async (params) => {
                try {
                    const res = await axiosInstance.post('/cloud_storage/folders/', params)
                    return res.data
                } catch (err) {
                    const responseData = err.response.data

                    switch (true) {
                        case responseData.title && responseData.title.length > 0:
                            return toast.error(responseData.title[0])
                        case responseData.detail && responseData.detail.length > 0:
                            return toast.error(responseData.detail)
                        default:
                            return toast.error(err.message)
                    }
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
    useGetUsedSizeQuery,
    useGetFoldersAncestorsQuery,
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