import styles from './styles.module.scss';
import {FC, useRef} from "react";
import {IPopupTransition, setFilter} from "../../model";
import {FileSvg, FolderSizeSvg, FolderSvg, LastUpdatedSvg} from "../../../../app/assets/images";
import {useOutsideClick} from "../../../../shared/lib/hooks/useOutsideClick.ts";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";

const filterArray = [
    {title: "folder", svg: <FolderSvg/>},
    {title: "file", svg: <FileSvg/>},
    {title: "size", svg: <FolderSizeSvg/>},
    {title: "last updated", svg: <LastUpdatedSvg/>}
]

const FilterPopup: FC<IPopupTransition> = ({transitionState}) => {

    const dispatch = useAppDispatch()

    const {filter} = useAppSelector(state => state.popup)

    const filterRef = useRef<HTMLDivElement>(null)
    useOutsideClick(filterRef, () => dispatch(setFilter({isOpen: false, sortBy: filter.sortBy})), filter.isOpen)

    const transitionStyles = {
        entering: {opacity: 1, translate: '0 5px'},
        entered: {opacity: 1, translate: '0 5px'},
        exiting: {opacity: 0, translate: '0 -20px'},
        exited: {opacity: 0, translate: '0 -20px'},
    }

    return (
        <div
            ref={filterRef}
            className={styles.sort}
            style={transitionStyles[transitionState as keyof typeof transitionStyles]}
        >
            <section>
                {filterArray.map((item, i) => (
                    <div
                        key={i}
                        onClick={() => dispatch(setFilter({isOpen: false, sortBy: item.title}))}
                    >
                        {item.svg}
                        <p>{item.title}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default FilterPopup;