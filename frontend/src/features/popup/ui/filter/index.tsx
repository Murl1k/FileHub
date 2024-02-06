import styles from './styles.module.scss';
import {setFilter} from "../../model";
import {useRef} from "react";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";
import {fileIcon, folderIcon, folderSize, lastUpdated} from "../../../../app/assets/images";

const filterArray = [
    {title: "folder", src: folderIcon},
    {title: "file", src: fileIcon},
    {title: "size", src: folderSize},
    {title: "last updated", src: lastUpdated}
]

const FilterPopup = () => {

    const dispatch = useAppDispatch()

    const {filter} = useAppSelector(state => state.popup)

    const filterRef = useRef<HTMLDivElement>(null)
    useOutsideClick(filterRef, () => dispatch(setFilter({isOpen: false, sortBy: filter.sortBy})), filter.isOpen)

    return (
        <div ref={filterRef} className={styles.sort}>
            <section>
                {filterArray.map((item, i) => (
                    <div
                        key={i}
                        onClick={() => dispatch(setFilter({isOpen: false, sortBy: item.title}))}
                    >
                        <img src={item.src} alt={item.title}/>
                        <p>{item.title}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default FilterPopup;