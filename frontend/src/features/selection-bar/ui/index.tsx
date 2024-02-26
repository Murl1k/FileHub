import styles from "./styles.module.scss";
import {FC, MouseEvent, useRef} from "react";
import {PasteButton} from "../../paste-button";
import {initialFilterState, setFilter} from "../../popups";
import {initialContextState, setContextMenu} from "../../context-menu";
import {initialTemplateState, setIsActive} from "../../item-template";
import {FeatureButtons} from "../../feature-buttons";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {useOutsideClick} from "../../../shared/lib/hooks/useOutsideClick.ts";
import {IMergedData} from "../../../shared/types";

const SelectionBar: FC<{ item: IMergedData }> = ({item}) => {

    const dispatch = useAppDispatch()

    const {type} = useAppSelector(state => state.contextMenu)
    const {status, isOwner} = useAppSelector(state => state.itemTemplate)
    const {filter} = useAppSelector(state => state.popup)
    const {id} = useAppSelector(state => state.copy)

    const selectionBarRef = useRef<HTMLDivElement>(null)

    useOutsideClick(selectionBarRef, () => {
        !filter.isOpen ? dispatch(setIsActive(initialTemplateState)) : dispatch(setFilter(initialFilterState))
    }, status)

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        type === 'item' && dispatch(setContextMenu(initialContextState))
    }

    return (
        <section
            onClick={handleClick}
            ref={selectionBarRef}
            className={styles.selectionBar}
        >
            <p>{item.title ? item.title : item.name}</p>
            <div>
                {isOwner && id && <PasteButton/>}
                <FeatureButtons item={item}/>
            </div>
        </section>
    );
};

export default SelectionBar;