import styles from '../styles.module.scss'
import {FC, useRef} from 'react'
import {IMergedData} from "../../../../shared/types";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {contextMenuPosition, initialContextState, setContextMenu} from "../../";
import {FeatureButtons} from "../../../feature-buttons";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";
import {useNavigate} from "react-router-dom";
import {initialTemplateState, setIsActive} from "../../../item-template";
import {FolderSvg} from '../../../../app/assets/images'

interface IContextMenuItem {
    item: IMergedData
    index: number
    maxIndex: number
}

const ContextMenuItem: FC<IContextMenuItem> = ({item, index, maxIndex}) => {

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

    const contextMenuStyles = () => {
        const defaultPosition: { right: string, top?: string, bottom?: string } = {
            top: '45px',
            right: '45px'
        }

        const position = state.x ?
            item.title ?
                contextMenuPosition(state.x, state.y, 172, 307) :
                contextMenuPosition(state.x, state.y, 172, 205) :
            defaultPosition

        if (index >= maxIndex) {
            delete defaultPosition.top
            defaultPosition.bottom = '40px'
            defaultPosition.right = '40px'
        }

        return position
    }

    return (
        <div
            onContextMenu={(e) => {
                e.preventDefault()
                e.stopPropagation()

                dispatch(setContextMenu(initialContextState))
            }}
            ref={contextMenuRef}
            style={contextMenuStyles()}
            className={styles.contextMenu}
        >
            {item.title && <section className={styles.open}>
                <div onClick={handleOpenFolder}>
                    <FolderSvg/>
                    <p>Open</p>
                </div>
            </section>}
            <FeatureButtons featureButtonsProps={featureButtonsProps}/>
        </div>
    );
};

export default ContextMenuItem;