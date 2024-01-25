import styles from './styles.module.scss'
import {Dispatch, FC, MouseEvent, SetStateAction, useRef, useState} from "react";
import {fetchDownloadFolderAsZip} from "../../../shared/api/folders/folders.action.ts";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {IMergedData} from "../../../shared/types";
import {
    useRemoveFileMutation,
    useRemoveFolderMutation,
    useUpdateFolderPrivacyMutation
} from "../../../shared/api/api.ts";
import {useOutsideClick} from "../../../shared/lib/hooks/useClickOutside.ts";

interface IDownloadBtn {
    item: IMergedData
    stateAction: Dispatch<SetStateAction<boolean>>
}

const FilesMenu: FC<IDownloadBtn> = ({item, stateAction}) => {

    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState(false)
    // const [isPrivacyOpen, setIsPrivacyOpen] = useState(item.is_public)
    const popupRef = useRef<HTMLDivElement>(null)

    const [updatePrivacy] = useUpdateFolderPrivacyMutation()
    const [updateRemoveFolder] = useRemoveFolderMutation()
    const [updateRemoveFile] = useRemoveFileMutation()

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

            stateAction(false)
        } catch (err) {
            console.error(err)
        }
    };

    const handleRemove = (e: MouseEvent<HTMLButtonElement>, id: string, title: string) => {
        e.preventDefault()

        if (title) {
            updateRemoveFolder(id)
        } else {
            updateRemoveFile(id)
        }
        stateAction(false)
    }

    const handleChangePrivacy = (id: string, title: string) => {
        if (title) {
            updatePrivacy({id: id, title: title})
        }
    }

    return (
        <>

            <div onClick={e => e.preventDefault()} ref={popupRef} className={styles.popup}>
                {isOpen &&
                    // <div onClick={e => e.preventDefault()} className={styles.changePrivacy}>
                    //     <div className={styles.privacy}>
                    //         <h2>Change privacy</h2>
                    //         <div className={styles.title}>
                    //             <img src={folderIcon} alt="folders"/>
                    //             <h4>{item.title}</h4>
                    //         </div>
                    //         <div className={styles.status}>
                    //             <span>Status: {String(isPrivacyOpen)}</span>
                    //             <button onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}>
                    <label className={styles.checkboxIos}>
                        <input checked={item.is_public}
                               onChange={() => handleChangePrivacy(item.id, item.title)}
                               type="checkbox"
                        />
                        <span className={styles.checkboxIosSwitch}></span>
                    </label>
                    //             </button>
                    //         </div>
                    //         <div className={styles.btns}>
                    //             <button onClick={() => setIsOpen(false)}>Cancel</button>
                    //             <button onClick={() => updatePrivacy({
                    //                 id: item.id, title: item.title
                    //             })}>
                    //                 Apply
                    //             </button>
                    //         </div>
                    //     </div>
                    // </div>
                }
                <button onClick={() => {
                    setIsOpen(true)
                    // stateAction(false)
                }}>
                    Change privacy
                </button>
                <button onClick={(e) => handleDownload(e, item.id, item.url, item.title ? item.title : item.name)}>
                    Download
                </button>
                <button onClick={(e) => handleRemove(e, item.id, item.title)}>
                    Delete
                </button>
            </div>
        </>
    );
};

export default FilesMenu;