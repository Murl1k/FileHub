import styles from "./styles.module.scss";
import {MainContainer} from "../../../features/main-container";
import {GridItem} from "../../grid-item";
import {MouseEvent, useEffect, useState} from "react";
import {IMergedData} from "../../../shared/types";
import {useNavigate, useParams} from "react-router-dom";
import {useGetFilesQuery, useGetFoldersAncestorsQuery, useGetFoldersQuery} from "../../../shared/api/api.ts";
import {SelectionBar} from "../../../features/selection-bar";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {ItemTemplate} from "../../../features/item-template";
import {ListItem} from "../../list-item";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {initialContextState, setContextMenu} from "../../../features/context-menu";
import {FilterPopup, initialFilterState, setFilter} from "../../../features/popup";
import {Transition} from "react-transition-group";
import {NavigationButton} from "../../../features/navigation-button";
import Breadcrumbs from "../../../shared/UIKit/breadcrumbs";

const Main = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {id} = useParams() as { id: string }

    const [isGrid, setIsGrid] = useState(true)

    const {data: userData} = useAppSelector(state => state.auth)
    const {type} = useAppSelector(state => state.contextMenu)
    const {id: activeId, status} = useAppSelector(state => state.itemTemplate)
    const {filter} = useAppSelector(state => state.popup)

    const {data: folders, isLoading: foldersLoading, isError} = useGetFoldersQuery(id)
    const {data: files, isLoading: filesLoading} = useGetFilesQuery(id)
    const {data: foldersAncestors} = useGetFoldersAncestorsQuery(id)

    const parentFolder = foldersAncestors?.[foldersAncestors.length - 1]?.parent_folder

    const mergedData: IMergedData[] = [
        ...(folders ? folders : []),
        ...(files ? files : [])
    ] as IMergedData[]

    const sortedMergedData = mergedData
        .sort((a, b) => {
            switch (filter.sortBy) {
                case 'last updated':
                    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
                case 'size':
                    return b.size - a.size
                default:
                    return 0
            }
        })
        .filter(item => {
            switch (filter.sortBy) {
                case 'folder':
                    return item.title
                case 'file':
                    return item.name
                default:
                    return item
            }
        })

    const selectionBarData = sortedMergedData.filter(item => item.id === activeId)

    const setView = (value: boolean) => {
        setIsGrid(value)

        type !== 'initial' && dispatch(setContextMenu(initialContextState))
    }

    const handleOpenSort = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        dispatch(setFilter({isOpen: !filter.isOpen, sortBy: filter.sortBy}))

        type !== 'initial' && dispatch(setContextMenu(initialContextState))
    }

    const handleResetFilter = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        dispatch(setFilter(initialFilterState))
    }

    const handleStopPropagation = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation()
    }

    const isOwner = userData?.id === foldersAncestors?.[0].owner || location.pathname === '/'

    useEffect(() => {
        if (isError) {
            navigate('/')
        }
    }, [isError, navigate]);

    return (
        <>
            <MainContainer isOwner={isOwner}>
                {!foldersLoading && !filesLoading ?
                    <>
                        <div className={styles.storageHeadline}>
                            <div>
                                {isOwner ?
                                    <Breadcrumbs
                                        onContextMenu={handleStopPropagation}
                                        foldersAncestors={foldersAncestors}
                                    />
                                    : ''
                                }
                                <div onContextMenu={handleStopPropagation} className={styles.setSort}>
                                    <div onClick={handleOpenSort}>
                                        <div>
                                            <p>Sort by:</p>
                                            <p>{filter.sortBy ? filter.sortBy : 'Type'}</p>
                                        </div>
                                        <svg style={filter.isOpen ? {rotate: '180deg'} : {}} height="24"
                                             width="24"
                                             viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                               strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path
                                                    d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z"
                                                    fill="#0F0F0F"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    {Boolean(filter.sortBy) &&
                                        <button onClick={handleResetFilter}>
                                            Reset filter
                                        </button>
                                    }
                                </div>
                                <Transition in={filter.isOpen} timeout={200} unmountOnExit>
                                    {state => (
                                        <FilterPopup transitionState={state}/>
                                    )}
                                </Transition>
                            </div>
                            <div onClick={handleStopPropagation} onContextMenu={handleStopPropagation}>
                                <button className={isGrid ? styles.activeBtn : ''}
                                        onClick={() => setView(true)}>
                                    <svg width={16} height={16} viewBox="0 0 28 28" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg"
                                         fill="#000000">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                           strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <defs></defs>
                                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none"
                                               fillRule="evenodd">
                                                <g id="Icon-Set-Filled"
                                                   transform="translate(-104.000000, -935.000000)"
                                                   fill="#cccccc">
                                                    <path
                                                        d="M128,935 L124,935 C121.791,935 120,936.791 120,939 L120,943 C120,945.209 121.791,947 124,947 L128,947 C130.209,947 132,945.209 132,943 L132,939 C132,936.791 130.209,935 128,935 L128,935 Z M128,951 L124,951 C121.791,951 120,952.791 120,955 L120,959 C120,961.209 121.791,963 124,963 L128,963 C130.209,963 132,961.209 132,959 L132,955 C132,952.791 130.209,951 128,951 L128,951 Z M112,951 L108,951 C105.791,951 104,952.791 104,955 L104,959 C104,961.209 105.791,963 108,963 L112,963 C114.209,963 116,961.209 116,959 L116,955 C116,952.791 114.209,951 112,951 L112,951 Z M112,935 L108,935 C105.791,935 104,936.791 104,939 L104,943 C104,945.209 105.791,947 108,947 L112,947 C114.209,947 116,945.209 116,943 L116,939 C116,936.791 114.209,935 112,935 L112,935 Z"
                                                        id="grid"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                                <button className={!isGrid ? styles.activeBtn : ''}
                                        onClick={() => setView(false)}>
                                    <svg width={16} height={16} viewBox="0 0 18 18"
                                         xmlns="http://www.w3.org/2000/svg"
                                         fill="#000000">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                           strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <g fill="#cccccc" fillRule="evenodd">
                                                <rect width="18" height="4" rx="2"></rect>
                                                <rect width="18" height="4" y="7" rx="2"></rect>
                                                <rect width="18" height="4" y="14" rx="2"></rect>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {isGrid ?
                            <div className={styles.grid}>
                                {id && <NavigationButton parentFolder={parentFolder}/>}
                                {sortedMergedData.map((item, index) => {
                                    const itemProps = {
                                        isGrid,
                                        item,
                                        isOwner,
                                        index
                                    }

                                    return (
                                        <ItemTemplate key={item.id} itemProps={itemProps}>
                                            <GridItem item={item}/>
                                        </ItemTemplate>
                                    )
                                })}
                            </div>
                            : <div className={styles.list}>
                                <div style={{
                                    padding: '20px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    borderBottom: '2px solid #583DA1'
                                }}>
                                    <h4>Name</h4>
                                    <div style={{display: 'flex', gap: '25px', marginRight: '30px'}}>
                                        <h4>Size</h4>
                                        <h4>Type</h4>
                                    </div>
                                </div>
                                {id &&
                                    <div className={styles.listNavigation}>
                                        <NavigationButton parentFolder={parentFolder}/>
                                    </div>
                                }
                                {sortedMergedData.map((item, index) => {
                                    const itemProps = {
                                        isGrid,
                                        item,
                                        isOwner,
                                        index
                                    }

                                    return (
                                        <div key={item.id} className={styles.listContainer}>
                                            <ItemTemplate itemProps={itemProps}>
                                                <ListItem item={item}/>
                                            </ItemTemplate>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </>
                    : ''}
            </MainContainer>
            {status &&
                selectionBarData.map(item => {
                    const selectionProps = {
                        name: item.name,
                        title: item.title,
                        itemId: item.id,
                        url: item.url,
                        size: item.size,
                        isOwner,
                    }

                    return <SelectionBar key={item.id} selectionProps={selectionProps}/>
                })
            }
        </>
    );
};

export default Main;