import {IMergedData} from "../../../shared/types";
import {Dispatch, SetStateAction} from "react";

export interface IIsActive {
    isFolder: boolean
    id: string
    status: boolean
}

export interface ISelectionBarProps {
    item: IMergedData
    isActive: IIsActive
    setIsActive: Dispatch<SetStateAction<IIsActive>>
}