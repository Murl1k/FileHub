import {IFileData} from "./file.interface.ts";
import {Dispatch, SetStateAction} from "react";

export interface IFolder {
    title: string
    parent_folder?: string | null
}

export interface IFolderData {
    id: string
    title: string
    size: number
    parent_folder: string
    is_public: boolean
    created_at: string
    updated_at: string
}

export interface IMergedData extends IFileData, IFolderData {
}

export interface IPopup {
    state: boolean
    stateAction: Dispatch<SetStateAction<boolean>>
}