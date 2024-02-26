import styles from '../styles.module.scss';
import {MouseEvent, useRef} from "react";
import {PasteButton} from "../../../paste-button";
import {setIsFilesOpen, setIsFoldersOpen} from "../../../popups";
import {contextMenuPosition, initialContextState, setContextMenu} from "../../";
import {useOutsideClick} from "../../../../shared/lib/hooks/useOutsideClick.ts";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";

const ContextMenuMain = () => {

    const dispatch = useAppDispatch()

    const contextMenu = useAppSelector(state => state.contextMenu)
    const {isFoldersOpen} = useAppSelector(state => state.popup)
    const {id} = useAppSelector(state => state.copy)

    const contextMenuRef = useRef<HTMLDivElement>(null)

    useOutsideClick(contextMenuRef, () => dispatch(setContextMenu(initialContextState)), contextMenu.type === 'main')

    const handleOpenFolders = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        dispatch(setIsFoldersOpen(true))

        dispatch(setContextMenu(initialContextState))
    }

    const handleOpenFiles = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        dispatch(setIsFilesOpen(true))

        dispatch(setContextMenu(initialContextState))

        if (isFoldersOpen) {
            dispatch(setIsFoldersOpen(false))
        }
    }

    console.log(contextMenu)

    return (
        <div
            className={styles.contextMenu}
            ref={contextMenuRef}
            style={contextMenuPosition(contextMenu.x, contextMenu.y, 138, 96)}
        >
            <section>
                <div onClick={handleOpenFolders}>
                    <svg height="30" width="30" fill="#808080" version="1.1" id="Capa_1"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 45 45"
                         stroke="#808080">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <path
                                    d="M44.45,13.436c-0.476-0.591-1.192-0.936-1.95-0.936H40c0-1.381-1.119-2.5-2.5-2.5H30c-1.381,0-2.5,1.119-2.5,2.5h-15 c-1.172,0-2.186,0.814-2.439,1.958c0,0-5.059,22.862-5.059,23.042H2.5v-30H35C35,6.119,33.881,5,32.5,5h-30C1.119,5,0,6.119,0,7.5 v30C0,38.881,1.119,40,2.5,40h5h25h5c1.172,0,2.186-0.814,2.439-1.957l5-22.5C45.105,14.802,44.925,14.027,44.45,13.436z M37.299,20.767h-2.363v2.366c0,0.664-0.539,1.202-1.203,1.202s-1.203-0.538-1.203-1.202v-2.366h-2.364 c-0.662,0-1.202-0.539-1.202-1.204c0-0.663,0.54-1.202,1.202-1.202h2.364v-2.365c0-0.665,0.539-1.203,1.203-1.203 s1.203,0.539,1.203,1.203v2.365h2.363c0.666,0,1.203,0.539,1.203,1.204C38.502,20.229,37.965,20.767,37.299,20.767z"></path>
                            </g>
                        </g>
                    </svg>
                    <p>Add folder</p>
                </div>
                <div onClick={handleOpenFiles}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M13.75 5.00001V2.25001L14.1716 2.25001L14.2516 2.24985C14.5773 2.24891 14.9288 2.2479 15.2555 2.38322C15.5822 2.51854 15.83 2.7678 16.0596 2.99875L16.1161 3.05546L18.9445 5.88389L19.0013 5.94038C19.2322 6.17 19.4815 6.41783 19.6168 6.74452C19.7521 7.07122 19.7511 7.42271 19.7502 7.74838L19.75 7.82843V8.25001H17C16.036 8.25001 15.3884 8.24841 14.9054 8.18347C14.4439 8.12143 14.2464 8.01421 14.1161 7.88389C13.9858 7.75357 13.8786 7.55608 13.8165 7.09462C13.7516 6.61158 13.75 5.96402 13.75 5.00001Z"
                                fill="#808080"></path>
                            <path
                                d="M12.25 5.05201L12.25 2.25001L8.948 2.25001C8.04953 2.24998 7.30031 2.24995 6.70552 2.32992C6.07773 2.41432 5.51093 2.59999 5.05546 3.05546C4.59999 3.51093 4.41432 4.07773 4.32992 4.70553C4.24995 5.30029 4.24997 6.04956 4.25 6.94801V16.75H4.75V16C4.75 14.7574 5.75736 13.75 7 13.75C8.24264 13.75 9.25 14.7574 9.25 16V16.75H10C11.2426 16.75 12.25 17.7574 12.25 19C12.25 20.2426 11.2426 21.25 10 21.25H9.25V21.75H15.052C15.9505 21.75 16.6997 21.7501 17.2945 21.6701C17.9223 21.5857 18.4891 21.4 18.9445 20.9446C19.4 20.4891 19.5857 19.9223 19.6701 19.2945C19.7501 18.6997 19.75 17.9505 19.75 17.052L19.75 9.75001L16.948 9.75001C16.0495 9.75004 15.3003 9.75006 14.7055 9.6701C14.0777 9.58569 13.5109 9.40002 13.0555 8.94455C12.6 8.48908 12.4143 7.92228 12.3299 7.29449C12.2499 6.69971 12.25 5.95049 12.25 5.05201Z"
                                fill="#808080"></path>
                            <path
                                d="M8 16C8 15.4477 7.55228 15 7 15C6.44772 15 6 15.4477 6 16V18H4C3.44772 18 3 18.4477 3 19C3 19.5523 3.44772 20 4 20H6V22C6 22.5523 6.44772 23 7 23C7.55228 23 8 22.5523 8 22V20H10C10.5523 20 11 19.5523 11 19C11 18.4477 10.5523 18 10 18H8V16Z"
                                fill="#808080"></path>
                        </g>
                    </svg>
                    <p>Add files</p>
                </div>
            </section>
            {id &&
                <section>
                    <PasteButton/>
                </section>
            }
        </div>
    );
};

export default ContextMenuMain;