import styles from "./styles.module.scss";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {FC, MouseEvent, useRef} from "react";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {FeatureButtons} from "../../feature-buttons";
import {useOutsideClick} from "../../../shared/lib/hooks/useClickOutside.ts";
import {PasteButton} from "../../paste-button";
import {initialTemplateState, setIsActive} from "../../item-template";
import {initialContextState, setContextMenu} from "../../context-menu";
import {initialFilterState, setFilter} from "../../popup";

interface ISelectionBar {
    selectionProps: {
        name: string
        title: string
        url: string
        size: number
        is_public: boolean
        itemId: string
    }
}

const SelectionBar: FC<ISelectionBar> = ({selectionProps}) => {

    const {
        name,
        title,
        url,
        size,
        is_public,
        itemId
    } = selectionProps

    const dispatch = useAppDispatch()

    const {type} = useAppSelector(state => state.contextMenu)
    const {status, isOwner} = useAppSelector(state => state.itemTemplate)
    const {filter} = useAppSelector(state => state.popup)
    const {id} = useAppSelector(state => state.copy)

    const selectionBarRef = useRef<HTMLDivElement>(null)

    useOutsideClick(selectionBarRef, () => {
        !filter.isOpen ? dispatch(setIsActive(initialTemplateState)) : dispatch(setFilter(initialFilterState))
    }, status)

    const featureButtonsProps = {
        title,
        url,
        name,
        size,
        is_public,
        id: itemId
    }

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
            <p>{title ? title : name}</p>
            <div>
                {isOwner && id && <PasteButton/>}
                <FeatureButtons featureButtonsProps={featureButtonsProps}/>
            </div>
        </section>
    );
};

export default SelectionBar;