import styles from "./styles.module.scss";
import {IPopupTransition, setIsPrivacyOpen} from "../../model";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";
import {FC, MouseEvent, useRef} from "react";
import {useUpdateFilePrivacyMutation, useUpdateFolderPrivacyMutation} from "../../../../shared/api/api.ts";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {CloseBtn} from "../../../close-btn";
import PopupTemplate from "../template";
import {transitionStyles} from "../../index.ts";

interface IPrivacyPopup extends IPopupTransition {
    id: string
    title: string
    is_public: boolean
}

const PrivacyPopup: FC<IPrivacyPopup> = ({id, title, is_public, transitionState}) => {

    const dispatch = useAppDispatch()

    const {isPrivacyOpen} = useAppSelector(state => state.popup)
    const [updateFolderPrivacy] = useUpdateFolderPrivacyMutation()
    const [updateFilePrivacy] = useUpdateFilePrivacyMutation()

    const privacyRef = useRef<HTMLDivElement>(null)
    useOutsideClick(privacyRef, () => dispatch(setIsPrivacyOpen(false)), isPrivacyOpen)

    const handleChangePrivacy = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        if (title) {
            updateFolderPrivacy(id)
        } else {
            updateFilePrivacy({id: id, is_public: !is_public})
        }

        dispatch(setIsPrivacyOpen(false))
    }

    return (
        <PopupTemplate
            onContextMenu={e => e.stopPropagation()}
            style={transitionStyles[transitionState as keyof typeof transitionStyles]}
        >
            <div
                onClick={e => e.stopPropagation()}
                ref={privacyRef}
                style={transitionStyles[transitionState as keyof typeof transitionStyles]}
                className={styles.privacy}
            >
                <div className={styles.privacyHeadline}>
                    <h3>Confirmation</h3>
                    <CloseBtn onClick={() => dispatch(setIsPrivacyOpen(false))}/>
                </div>
                <div>
                    <svg height="24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11 15C11 13.1787 11.9421 12.4566 12.7704 11.8217C13.4202 11.3236 14 10.8792 14 10C14 8.9 13.1 8 12 8C10.9 8 10 8.9 10 10H8C8 7.79 9.79 6 12 6C14.21 6 16 7.79 16 10C16 11.2829 15.21 11.9733 14.4408 12.6455C13.711 13.2833 13 13.9046 13 15H11ZM13 16.5V18.5H11V16.5H13Z"
                                  fill="#000000"></path>
                        </g>
                    </svg>
                    <p>Are you sure you want to change the privacy of this {title ? 'folder' : 'file'}?</p>
                </div>
                <div>
                    <button onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()

                        dispatch(setIsPrivacyOpen(false))
                    }}>
                        No
                    </button>
                    <button onClick={handleChangePrivacy}>
                        Yes
                    </button>
                </div>
            </div>
        </PopupTemplate>
    );
};

export default PrivacyPopup;