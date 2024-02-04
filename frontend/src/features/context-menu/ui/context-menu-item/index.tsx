import styles from './styles.module.scss'
import {FC, useRef} from "react";
import {IMergedData} from "../../../../shared/types";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {contextMenuPosition, initialContextState, setContextMenu} from "../../";
import {FeatureButtons} from "../../../feature-buttons";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";

const ContextMenuItem: FC<{ item: IMergedData }> = ({item}) => {

    const dispatch = useAppDispatch()

    const contextMenuRef = useRef<HTMLDivElement>(null)

    const state = useAppSelector(state => state.contextMenu)

    useOutsideClick(contextMenuRef, () => dispatch(setContextMenu(initialContextState)), state.type === 'item')

    const featureButtonsProps = {
        id: item.id,
        title: item.title,
        name: item.name,
        url: item.url
    }

    return (
        <div
            onContextMenu={(e) => {
                e.preventDefault()
                e.stopPropagation()

                dispatch(setContextMenu(initialContextState))
            }}
            ref={contextMenuRef}
            style={state.x ? contextMenuPosition(state.x, state.y, 118) : {
                top: '40px',
                right: '35px'
            }}
            className={styles.contextMenu}
        >
            <FeatureButtons featureButtonsProps={featureButtonsProps}/>
        </div>
    );
};

export default ContextMenuItem;