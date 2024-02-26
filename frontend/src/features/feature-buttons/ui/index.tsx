import {FC, KeyboardEvent, MouseEvent, useEffect} from "react";
import {toast} from "react-toastify";
import {DeleteSvg, PrivateSvg} from "../../../app/assets/images"
import {getItemId} from "../../feature-buttons";
import {initialContextState, setContextMenu} from "../../context-menu";
import {setIsFolderRenameOpen, setIsPrivacyOpen} from "../../popups";
import {initialTemplateState, setIsActive} from "../../item-template";
import {useRemoveFileMutation, useRemoveFolderMutation} from "../../../shared/api";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {IMergedData} from "../../../shared/types";
import {fetchDownloadFolderAsZip} from "../../../shared/api/folders/folders.action.ts";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";

const FeatureButtons: FC<{ item: IMergedData }> = ({item}) => {

    const dispatch = useAppDispatch()

    const {id: objectId} = useAppSelector(state => state.copy)
    const {isFolder, isOwner} = useAppSelector(state => state.itemTemplate)

    const [updateRemoveFolder] = useRemoveFolderMutation()
    const [updateRemoveFile] = useRemoveFileMutation()

    const handleTemplate = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        dispatch(setContextMenu(initialContextState))
        dispatch(setIsActive({id: item.id, isFolder: false, status: false}))
    }

    const handleOpenPrivacy = (e: MouseEvent<HTMLDivElement>) => {
        handleTemplate(e)
        dispatch(setIsPrivacyOpen(true))
    }

    const handleOpenFolderRename = (e: MouseEvent<HTMLDivElement>) => {
        handleTemplate(e)
        dispatch(setIsFolderRenameOpen(true))
    }

    const handleCopy = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        if (objectId !== item.id) {
            dispatch(getItemId({id: item.id, isFolder: isFolder}))
        }

        dispatch(setContextMenu(initialContextState))
    }

    const handleDownload = async (e: MouseEvent<HTMLDivElement>, id: string, data: string, title: string) => {
        try {
            e.stopPropagation()

            if (!item.size) {
                toast.error('The folder is empty with no downloadable files.')
            } else if (!(isOwner || item.is_public)) {
                toast.error("You don't have permission to download this folder.")
            } else {
                let blobData = ''

                dispatch(setContextMenu(initialContextState))
                const loading = toast.loading(`${data ? 'The file' : 'Folder'} is downloading...`, {
                    closeOnClick: true,
                    closeButton: true
                })

                if (!data) {
                    blobData = (await dispatch(fetchDownloadFolderAsZip(id))).payload
                }

                if (blobData || data) {
                    const response = await fetch(data, {
                        method: 'GET'
                    })

                    if (response.status === 200) {
                        const blob = await response.blob()
                        const downloadUrl = window.URL.createObjectURL(data ? blob : new Blob([blobData]))
                        const a = document.createElement('a')
                        a.href = downloadUrl
                        a.download = data ? title : `${title}.zip`

                        document.body.appendChild(a)
                        a.click()

                        toast.update(loading, {
                            render: `The ${data ? 'file' : 'folder'} has been downloaded.`,
                            type: "success",
                            isLoading: false,
                            autoClose: undefined,
                            closeButton: true,
                            closeOnClick: true
                        })

                        document.body.removeChild(a)
                        window.URL.revokeObjectURL(item.url)
                    }
                }

            }
        } catch (err) {
            console.log(err)
        }
    };

    const handleRemove = (e: MouseEvent<HTMLDivElement> | KeyboardEvent) => {
        e.stopPropagation()

        if (item.title) {
            updateRemoveFolder(item.id)
        } else {
            updateRemoveFile(item.id)
        }

        dispatch(setIsActive(initialTemplateState))
        dispatch(setContextMenu(initialContextState))
    }

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Delete") {
                handleRemove(e)
            }
        }

        document.addEventListener("keydown", onKeyDown as never)

        return () => document.removeEventListener("keydown", onKeyDown as never)
    })

    return (
        <>
            <section>
                {isOwner &&
                    <>
                        <div onClick={handleOpenPrivacy}>
                            <PrivateSvg/>
                            <p>Change privacy</p>
                        </div>
                        {item.title && <div onClick={handleOpenFolderRename}>
                            <svg height="30" width="30" style={{color: '#808080'}} xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24">
                                <path
                                    d="M18.41 5.8L17.2 4.59c-.78-.78-2.05-.78-2.83 0l-2.68 2.68L3 15.96V20h4.04l8.74-8.74 2.63-2.63c.79-.78.79-2.05 0-2.83zM6.21 18H5v-1.21l8.66-8.66 1.21 1.21L6.21 18zM11 20l4-4h6v4H11z"
                                    fill="#808080"></path>
                            </svg>
                            <p>Rename</p>
                        </div>}
                        <div onClick={handleCopy}>
                            <svg height="30" width="30" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z"
                                          fill="#808080"></path>
                                    <path
                                        d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z"
                                        fill="#808080"></path>
                                </g>
                            </svg>
                            <p>Copy</p>
                        </div>
                    </>
                }
                <div onClick={(e) => handleDownload(e, item.id, item.url, item.title ? item.title : item.name)}>
                    <svg width="30" height="30" fill="#808080" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                         id="download-alt"
                         className="icon glyph">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M11.29,16.71h0a1.15,1.15,0,0,0,.33.21.94.94,0,0,0,.76,0,1.15,1.15,0,0,0,.33-.21h0l4-4a1,1,0,0,0-1.42-1.42L13,13.59V3a1,1,0,0,0-2,0V13.59l-2.29-2.3a1,1,0,1,0-1.42,1.42Z"></path>
                            <path d="M19,20H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z"></path>
                        </g>
                    </svg>
                    <p>Download</p>
                </div>
            </section>
            {isOwner &&
                <section>
                    <div onClick={handleRemove}>
                        <DeleteSvg/>
                        <p>Delete</p>
                    </div>
                </section>
            }
        </>
    );
};

export default FeatureButtons;