import styles from "./styles.module.scss";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {Dispatch, FC, SetStateAction, useRef} from "react";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {getItemId, IIsActive} from "../";
import {FeatureButtons} from "../../feature-buttons";
import {useOutsideClick} from "../../../shared/lib/hooks/useClickOutside.ts";
import {PasteButton} from "../../paste-button";

interface ISelectionBar {
    selectionProps: {
        isActive: IIsActive
        setIsActive: Dispatch<SetStateAction<IIsActive>>
        name: string
        title: string
        url: string
        itemId: string
    }
}


const SelectionBar: FC<ISelectionBar> = ({selectionProps}) => {

    const {
        isActive,
        setIsActive,
        name,
        title,
        url,
        itemId
    } = selectionProps

    const dispatch = useAppDispatch()

    const selectionBarRef = useRef<HTMLDivElement>(null)

    useOutsideClick<IIsActive>(selectionBarRef, setIsActive, {status: false, id: '', isFolder: false}, isActive.status)

    const {id: objectId} = useAppSelector(state => state.selectionBar)

    const handleCopy = () => {
        if (objectId !== isActive.id) {
            dispatch(getItemId({id: isActive.id, isFolder: isActive.isFolder}))
            setIsActive({
                status: false,
                id: '',
                isFolder: false
            })
        }
    }

    const featureButtonsProps = {
        title,
        url,
        name,
        id: itemId,
        stateAction: setIsActive,
    }

    return (
        <div
            onContextMenu={e => e.stopPropagation()}
            ref={selectionBarRef}
            className={styles.selectionBar}
        >
            <button onClick={handleCopy}>Copy</button>
            <PasteButton/>
            <FeatureButtons featureButtonsProps={featureButtonsProps}/>
        </div>
    );
};

export default SelectionBar;