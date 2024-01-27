import {IMergedData} from "./folder.interface.ts";
import {Dispatch, SetStateAction} from "react";

export interface IIsActive {
    isFolder: boolean
    id: string
    status: boolean
}

export interface IItem {
    item: IMergedData
    isActive: IIsActive
    setIsActive: Dispatch<SetStateAction<IIsActive>>
}