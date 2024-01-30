import {IMergedData} from "./folder.interface.ts";
import {IIsActive} from "../../features/selection-bar";
import {Dispatch, SetStateAction} from "react";

export interface IItem {
    item: IMergedData
    isActive: IIsActive
    setIsActive: Dispatch<SetStateAction<IIsActive>>
    isGrid: boolean
}