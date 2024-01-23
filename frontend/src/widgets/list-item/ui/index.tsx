import styles from "./styles.module.scss";
import {FC, useState} from "react";
import {fileIcon, folderIcon} from "../../../app/assets/images";
import {IMergedData} from "../../../shared/types";
import {SizeCalculate} from "../../../shared/lib/size-calculate.ts";
import {FilesMenu} from "../../../features/files-menu";

const ListItem: FC<{ item: IMergedData }> = ({item}) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {isOpen && <FilesMenu item={item} stateAction={setIsOpen}/>}
            <div className={styles.container}>
                <div className={styles.item}>
                    <div>
                        <img height='40' width='40' src={item.title ? folderIcon : fileIcon} alt="folder"/>
                        <h4>{item.title ? item.title : item.name}</h4>
                    </div>
                    <div>
                        <div>
                            <h5>{SizeCalculate(item.size)}</h5>
                            <p>{item.title ? 'Folder' : 'File'}</p>
                        </div>
                        <div
                            onClick={(e) => {
                                e.preventDefault()
                                setIsOpen(!isOpen)
                            }}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListItem;