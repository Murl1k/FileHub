import styles from "./styles.module.scss";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {FC, HTMLAttributes, KeyboardEvent, MouseEvent, useEffect} from "react";
import {ContextMenuMain, setContextMenu} from "../../context-menu";
import {getItemId} from "../../selection-bar";
import {
    useCopyFileMutation,
    useCopyFolderMutation,
    useGetFilesQuery,
    useGetFoldersQuery
} from "../../../shared/api/api.ts";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {useParams} from "react-router-dom";
import {initialTemplateState, setIsActive} from "../../item-template";
import {initialFilterState, setFilter, setIsFoldersOpen} from "../../popup";

interface IMainContainer extends HTMLAttributes<HTMLDivElement> {
    isOwner: boolean
}

const MainContainer: FC<IMainContainer> = ({children, isOwner}) => {

    const dispatch = useAppDispatch()

    const {id} = useParams() as { id: string }

    const {id: objectId, isFolder} = useAppSelector(state => state.selectionBar)
    const {type} = useAppSelector(state => state.contextMenu)
    const isActive = useAppSelector(state => state.itemTemplate)
    const {filter, isFoldersOpen} = useAppSelector(state => state.popup)

    const {refetch: foldersRefetch} = useGetFoldersQuery(id)
    const {refetch: filesRefetch} = useGetFilesQuery(id)

    const [copyFolder] = useCopyFolderMutation()
    const [copyFile] = useCopyFileMutation()

    const handleRightClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()

        isOwner && dispatch(setContextMenu({
            type: "main",
            x: e.pageX,
            y: e.pageY
        }))

        isActive.status && dispatch(setIsActive(initialTemplateState))
        isFoldersOpen && dispatch(setIsFoldersOpen(false))
        filter.isOpen && dispatch(setFilter(initialFilterState))
    }

    useEffect(() => {
        const handleCopy = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.code === 'KeyC') {
                if (objectId !== isActive.id) {
                    dispatch(getItemId({id: isActive.id, isFolder: isActive.isFolder}))
                }
            }
        }

        document.addEventListener('keydown', handleCopy as never)

        return () => document.removeEventListener('keydown', handleCopy as never)
    }, [dispatch, isActive.id, isActive.isFolder, isOwner, objectId]);

    useEffect(() => {
        const handlePaste = async (e: KeyboardEvent) => {
            if (((e.ctrlKey || e.metaKey) && e.code === 'KeyV') && objectId && isOwner) {
                if (isFolder) {
                    await copyFolder({id: objectId, folder: id})
                    setTimeout(() => {
                        foldersRefetch()
                    }, 250)
                } else {
                    await copyFile({id: objectId, folder: id})
                    setTimeout(() => {
                        filesRefetch()
                    }, 250)
                }
            }
        }

        document.addEventListener('keydown', handlePaste as never)

        return () => document.removeEventListener('keydown', handlePaste as never)
    }, [copyFile, copyFolder, filesRefetch, foldersRefetch, id, isFolder, isOwner, objectId]);

    useEffect(() => {
        if (isActive.status) {
            const handleHistoryChange = () => {
                dispatch(setIsActive(initialTemplateState))
            }

            window.addEventListener('popstate', handleHistoryChange)

            return () => window.removeEventListener('popstate', handleHistoryChange)
        }
    }, [dispatch, isActive.status]);

    return (
        <>
            {type === "main" && isOwner && <ContextMenuMain/>}
            <section
                onContextMenu={handleRightClick}
                className={isActive.status ? `${styles.container} ${styles.active}` : styles.container}
                style={type === "item" ? {overflow: "hidden"} : {overflow: "auto"}}
            >
                {children}
            </section>
        </>
    );
};

export default MainContainer;