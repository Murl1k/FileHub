import {toast} from "react-toastify";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance.ts";

export const fetchDownloadFolderAsZip = createAsyncThunk(
    'folders/fetchDownloadFolderAsZip',
    async (id: string) => {
        try {
            const res = await axiosInstance.get(`/cloud_storage/folders/${id}/download_as_zip/`, {responseType: "blob"})
            return res.data
        } catch (err) {
            return toast.error(err.message)
        }
    }
)