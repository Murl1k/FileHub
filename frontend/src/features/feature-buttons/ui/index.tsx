import {FC, MouseEvent} from "react";
import {fetchDownloadFolderAsZip} from "../../../shared/api/folders/folders.action.ts";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {useRemoveFileMutation, useRemoveFolderMutation} from "../../../shared/api/api.ts";
import {setIsActive} from "../../item-template";
import {getItemId} from "../../selection-bar";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {initialContextState, setContextMenu} from "../../context-menu";

interface IFeatureButtons {
    featureButtonsProps: {
        id: string
        title: string
        url: string
        name: string
    }
}

const FeatureButtons: FC<IFeatureButtons> = ({featureButtonsProps}) => {

    const {
        id,
        title,
        url,
        name
    } = featureButtonsProps

    const dispatch = useAppDispatch()

    const {type} = useAppSelector(state => state.contextMenu)
    const {id: objectId} = useAppSelector(state => state.selectionBar)
    const isActive = useAppSelector(state => state.itemTemplate)

    const [updateRemoveFolder] = useRemoveFolderMutation()
    const [updateRemoveFile] = useRemoveFileMutation()

    const handleCopy = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        if (objectId !== isActive.id) {
            dispatch(getItemId({id: isActive.id, isFolder: isActive.isFolder}))
        }

        type === 'item' && dispatch(setContextMenu(initialContextState))
    }

    const handleDownload = async (e: MouseEvent<HTMLButtonElement>, id: string, data: string, title: string) => {
        try {
            e.stopPropagation()
            let blobData

            if (!data) {
                blobData = (await dispatch(fetchDownloadFolderAsZip(id))).payload
            }

            if (blobData || data) {
                const url = window.URL.createObjectURL(new Blob([blobData]))

                const a = document.createElement('a')
                a.href = data ? data : url
                a.download = data ? title : `${title}.zip`

                document.body.appendChild(a)
                a.click()

                window.URL.revokeObjectURL(url)
                document.body.removeChild(a)
            }
        } catch (err) {
            console.error(err)
        }
    };

    const handleRemove = (e: MouseEvent<HTMLButtonElement>, id: string, title: string) => {
        e.stopPropagation()

        if (title) {
            updateRemoveFolder(id)
        } else {
            updateRemoveFile(id)
        }

        isActive.status && dispatch(setIsActive({
            id: '',
            isFolder: false,
            status: false
        }))

        type === 'item' && dispatch(setContextMenu(initialContextState))
    }

    return (
        <>
            <button onClick={handleCopy}>Copy</button>
            <button onClick={(e) => handleDownload(e, id, url, title ? title : name)}>
                Download
            </button>
            <button onClick={(e) => handleRemove(e, id, title)}>
                Delete
            </button>
        </>
    );
};

export default FeatureButtons;