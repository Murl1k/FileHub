import styles from "./styles.module.scss";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {FC, useRef} from "react";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {FeatureButtons} from "../../feature-buttons";
import {useOutsideClick} from "../../../shared/lib/hooks/useClickOutside.ts";
import {PasteButton} from "../../paste-button";
import {initialTemplateState, setIsActive} from "../../item-template";

interface ISelectionBar {
    selectionProps: {
        name: string
        title: string
        url: string
        itemId: string
    }
}


const SelectionBar: FC<ISelectionBar> = ({selectionProps}) => {

    const {
        name,
        title,
        url,
        itemId
    } = selectionProps

    const dispatch = useAppDispatch()

    const {status} = useAppSelector(state => state.itemTemplate)

    const selectionBarRef = useRef<HTMLDivElement>(null)

    useOutsideClick(selectionBarRef, () => dispatch(setIsActive(initialTemplateState)), status)

    const featureButtonsProps = {
        title,
        url,
        name,
        id: itemId
    }

    return (
        <div
            onContextMenu={e => e.stopPropagation()}
            ref={selectionBarRef}
            className={styles.selectionBar}
        >
            <PasteButton/>
            <FeatureButtons featureButtonsProps={featureButtonsProps}/>
        </div>
    );
};

export default SelectionBar;