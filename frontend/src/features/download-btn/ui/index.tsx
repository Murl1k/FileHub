import styles from './styles.module.scss'
import React, {FC, useRef, useState} from "react";
import {fetchDownloadFolderAsZip} from "../../../shared/api/folders/folders.action.ts";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {IMergedData} from "../../../shared/types";
import {useOutsideClick} from "../../../shared/lib/hooks/useClickOutside.ts";

const DownloadBtn: FC<{ item: IMergedData }> = ({item}) => {

    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const popupRef = useRef<HTMLDivElement>(null)

    useOutsideClick(popupRef, setIsOpen, isOpen)

    const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>, id: string, data: string, title: string) => {
        try {
            e.preventDefault()
            let blobData

            if (!data) {
                blobData = (await dispatch(fetchDownloadFolderAsZip(id))).payload
            }

            const url = window.URL.createObjectURL(new Blob([blobData]))

            const a = document.createElement('a')
            a.href = data ? data : url
            a.download = data ? title : `${title}.zip`

            document.body.appendChild(a)
            a.click()

            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        } catch (error) {
            console.error('Произошла ошибка при скачивании файла:', error)
        }
    };

    console.log(isOpen)

    return (
        <div ref={popupRef} className={styles.popup}>
            <button onClick={(e) => {
                e.preventDefault();
                setIsOpen(true)
            }}>Change privacy
            </button>
            <button
                onClick={(e) =>
                    handleDownload(e, item.id, item.url, item.title ? item.title : item.name)}>
                Download
            </button>
            {/*{isOpen && <div className={styles.privacy}>*/}
            {/*    <h2>Change privacy</h2>*/}
            {/*    <div>*/}
            {/*        <img src={folderIcon} alt="folders"/>*/}
            {/*        <h4>{item.title}</h4>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <div>*/}
            {/*            <span>Status: {item.is_public}</span>*/}
            {/*            <input type="checkbox"/>*/}
            {/*        </div>*/}
            {/*        <button>Apply</button>*/}
            {/*    </div>*/}
            {/*</div>}*/}
        </div>
    );
};

export default DownloadBtn;