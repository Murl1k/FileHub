import {PayloadAction} from "@reduxjs/toolkit";

export interface IPopupAction {
    payload: boolean;
    type: string;
}

export interface IPopup {
    state: boolean
    stateAction: (type: boolean) => PayloadAction<boolean>
}