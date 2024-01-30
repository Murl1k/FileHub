import {Dispatch, FC, MouseEvent, SetStateAction} from "react";
import {fetchDownloadFolderAsZip} from "../../../shared/api/folders/folders.action.ts";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {useRemoveFileMutation, useRemoveFolderMutation} from "../../../shared/api/api.ts";
import {IContextMenu} from "../../context-menu";
import {IIsActive} from "../../selection-bar";

interface IFeatureButtons {
    featureButtonsProps: {
        id: string
        title: string
        url: string
        name: string
        stateAction: Dispatch<SetStateAction<IContextMenu>> | Dispatch<SetStateAction<IIsActive>>
    }
}

const FeatureButtons: FC<IFeatureButtons> = ({featureButtonsProps}) => {

    const {
        id,
        title,
        url,
        name,
        stateAction
    } = featureButtonsProps

    const dispatch = useAppDispatch()

    const [updateRemoveFolder] = useRemoveFolderMutation()
    const [updateRemoveFile] = useRemoveFileMutation()

    const handleDownload = async (e: MouseEvent<HTMLButtonElement>, id: string, data: string, title: string) => {
        try {
            e.stopPropagation()
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

        if ("status" in stateAction) {
            (stateAction as Dispatch<SetStateAction<IIsActive>>)({
                id: '',
                isFolder: false,
                status: false
            });
        } else {
            (stateAction as Dispatch<SetStateAction<IContextMenu>>)({
                show: false,
                x: 0,
                y: 0
            });
        }
    }

    return (
        <>
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