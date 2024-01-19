import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IFileData, IFolderData} from "../types";

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ["Folder"],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/v1',
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }),
    endpoints: builder => ({
        getFiles: builder.query<IFileData[], string>({
            query: (id) => `/cloud_storage/files/?folder=${id}`,
            providesTags: ["Folder"]
        }),
        getFolders: builder.query<IFolderData[], string>({
            query: (id) => `/cloud_storage/folders/${id}/child_folders/`
        })
    })
})

export const {useGetFilesQuery, useGetFoldersQuery} = api