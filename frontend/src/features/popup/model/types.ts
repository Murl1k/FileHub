import {PayloadAction} from "@reduxjs/toolkit";

export interface IPopupTransition {
    transitionState: string
}

export interface IPopup extends IPopupTransition {
    state: boolean
    stateAction: (type: boolean) => PayloadAction<boolean>
}