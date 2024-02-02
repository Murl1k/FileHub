import {
    useCopyFileMutation,
    useCopyFolderMutation,
    useGetFilesQuery,
    useGetFoldersQuery
} from "../../../shared/api/api.ts";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {useParams} from "react-router-dom";
import {FC} from "react";
import {IContextMenuMain} from "../../context-menu";

interface IPasteButton extends Partial<Pick<IContextMenuMain, 'setContextMenu'>> {
}

const PasteButton: FC<IPasteButton> = ({setContextMenu}) => {

    const {id} = useParams() as { id: string }

    const {isFolder, id: objectId} = useAppSelector(state => state.selectionBar)

    const {refetch: foldersRefetch} = useGetFoldersQuery(id)
    const {refetch: filesRefetch} = useGetFilesQuery(id)

    const [copyFolder] = useCopyFolderMutation()
    const [copyFile] = useCopyFileMutation()

    const handlePaste = async () => {
        if (isFolder) {
            await copyFolder({id: objectId, folder: id})
            setTimeout(() => {
                foldersRefetch()
                setContextMenu && setContextMenu({
                    show: false,
                    x: 0,
                    y: 0
                })
            }, 250)
        } else {
            await copyFile({id: objectId, folder: id})
            setTimeout(() => {
                filesRefetch()
                setContextMenu && setContextMenu({
                    show: false,
                    x: 0,
                    y: 0
                })
            }, 250)
        }
    }

    return (
        <button disabled={!objectId} onClick={handlePaste}>Paste</button>
    );
};

export default PasteButton;