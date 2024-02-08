import styles from '../styles.module.scss';
import {MouseEvent, useRef} from "react";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {contextMenuPosition, initialContextState, setContextMenu} from "../../";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";
import {PasteButton} from "../../../paste-button";
import {setIsFilesOpen, setIsFoldersOpen} from "../../../popup";

const ContextMenuMain = () => {

    const dispatch = useAppDispatch()

    const contextMenu = useAppSelector(state => state.contextMenu)
    const {isFoldersOpen} = useAppSelector(state => state.popup)
    const {id} = useAppSelector(state => state.selectionBar)

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
                    <svg height="30" width="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                         stroke="#808080">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                                stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M17 15V18M17 21V18M17 18H14M17 18H20" stroke="#808080" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"></path>
                        </g>
                    </svg>
                    <p>Add files</p>
                </div>
            </section>
            {id && <section>
                <PasteButton/>
            </section>}
        </div>
    );
};

export default ContextMenuMain;