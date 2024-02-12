import {IFileData} from "./file.interface.ts";

export interface IFolder {
    title: string
    parent_folder?: string | null
}

export interface IFolderData {
    id: string
    owner: number
    title: string
    size: number
    parent_folder: string
    is_public: boolean
    created_at: string
    updated_at: string
}

export interface IMergedData extends IFileData, IFolderData {
}