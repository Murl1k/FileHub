import styles from '../styles.module.scss'
import {FC, useRef} from "react";
import {IMergedData} from "../../../../shared/types";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {contextMenuPosition, initialContextState, setContextMenu} from "../../";
import {FeatureButtons} from "../../../feature-buttons";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";
import {useNavigate} from "react-router-dom";
import {initialTemplateState, setIsActive} from "../../../item-template";
import {folderIcon} from "../../../../app/assets/images";

const ContextMenuItem: FC<{ item: IMergedData }> = ({item}) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const contextMenuRef = useRef<HTMLDivElement>(null)

    const state = useAppSelector(state => state.contextMenu)

    useOutsideClick(contextMenuRef, () => {
        dispatch(setContextMenu(initialContextState))
        dispatch(setIsActive(initialTemplateState))
    }, state.type === 'item')

    const featureButtonsProps = {
        id: item.id,
        title: item.title,
        name: item.name,
        url: item.url,
        size: item.size
    }

    const handleOpenFolder = () => {
        navigate(`/folder/${item.id}`)
    }

    return (
        <div
            onContextMenu={(e) => {
                e.preventDefault()
                e.stopPropagation()

                dispatch(setContextMenu(initialContextState))
            }}
            ref={contextMenuRef}
            style={state.x ? item.title ? contextMenuPosition(state.x, state.y, 172, 307) :
                contextMenuPosition(state.x, state.y, 172, 205) : {
                top: '40px',
                right: '35px'
            }}
            className={styles.contextMenu}
        >
            {item.title && <section className={styles.open}>
                <div onClick={handleOpenFolder}>
                    <img src={folderIcon} alt="folder"/>
                    <p>Open</p>
                </div>
            </section>}
            <FeatureButtons featureButtonsProps={featureButtonsProps}/>
        </div>
    );
};

export default ContextMenuItem;