import {Dispatch, SetStateAction} from "react";

export interface IContextMenu {
    show: boolean,
    x: number,
    y: number
}

export interface IContextMenuMain {
    contextMenu: IContextMenu
    setContextMenu: Dispatch<SetStateAction<IContextMenu>>
}