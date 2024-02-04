import {PayloadAction} from "@reduxjs/toolkit";

export interface IPopup {
    state: boolean
    stateAction: (type: boolean) => PayloadAction<boolean>
}