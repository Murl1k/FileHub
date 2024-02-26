import styles from "./styles.module.scss";
import {MouseEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Transition} from "react-transition-group";
import {GridItem, ListItem} from "../../items/";
import {EmptyCloud} from "../../empty-cloud";
import {SortSwitcher, ViewSwitcher} from "../../../features/switchers";
import {MainContainer} from "../../../features/main-container";
import {NavigationButton} from "../../../features/navigation-button";
import {Breadcrumbs, BreadcrumbsLoading} from "../../../features/breadcrumbs";
import {ItemTemplate, setIsOwner} from "../../../features/item-template";
import {SelectionBar} from "../../../features/selection-bar";
import {initialContextState, setContextMenu} from "../../../features/context-menu";
import {FilterPopup} from "../../../features/popups";
import {IMergedData} from "../../../shared/types";
import {useGetFilesQuery, useGetFoldersAncestorsQuery, useGetFoldersQuery} from "../../../shared/api";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";


const Main = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {id} = useParams() as { id: string }

    const [isGrid, setIsGrid] = useState(true)

    const {data: userData} = useAppSelector(state => state.auth)
    const {type} = useAppSelector(state => state.contextMenu)
    const {id: activeId, status, isOwner} = useAppSelector(state => state.itemTemplate)
    const {filter} = useAppSelector(state => state.popup)

    const {data: folders, isLoading: foldersLoading, isError} = useGetFoldersQuery(id)
    const {data: files, isLoading: filesLoading} = useGetFilesQuery(id)
    const {data: foldersAncestors, isLoading: ancestorsLoading} = useGetFoldersAncestorsQuery(id)

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

    const handleStopPropagation = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation()
    }

    useEffect(() => {
        dispatch(setIsOwner(userData?.id === foldersAncestors?.[0].owner || location.pathname === '/'))
    }, [dispatch, foldersAncestors]);

    useEffect(() => {
        if (isError) {
            navigate('/')
        }
    }, [isError, navigate]);

    return (
        <>
            <MainContainer>
                {!foldersLoading && !filesLoading ?
                    <>
                        <section className={styles.storageHeadline}>
                            <div>
                                {!ancestorsLoading ? isOwner &&
                                    <Breadcrumbs
                                        onContextMenu={handleStopPropagation}
                                        foldersAncestors={foldersAncestors}
                                    />
                                    : <BreadcrumbsLoading/>
                                }
                                <SortSwitcher sortBy={filter.sortBy} isOpen={filter.isOpen}/>
                                <Transition in={filter.isOpen} timeout={200} unmountOnExit>
                                    {state => (
                                        <FilterPopup transitionState={state}/>
                                    )}
                                </Transition>
                            </div>
                            <ViewSwitcher
                                onClick={handleStopPropagation}
                                onContextMenu={handleStopPropagation}
                                isGrid={isGrid} setView={setView}
                            />
                        </section>
                        {!mergedData.length && !id ? <EmptyCloud/> : isGrid ?
                            <section className={styles.grid}>
                                {id && <NavigationButton parentFolder={parentFolder}/>}
                                {sortedMergedData.map((item, index) => {
                                    const itemProps = {
                                        isGrid,
                                        item,
                                        index
                                    }

                                    return (
                                        <ItemTemplate key={item.id} itemProps={itemProps}>
                                            <GridItem item={item}/>
                                        </ItemTemplate>
                                    )
                                })}
                            </section>
                            : <section className={styles.list}>
                                <div className={styles.listHeadline}>
                                    <h4>Name</h4>
                                    <div>
                                        <h4>Size</h4>
                                        <h4>Type</h4>
                                        <h4>Date added</h4>
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
                            </section>
                        }
                    </>
                    : ''}
            </MainContainer>
            {status &&
                selectionBarData.map(item => (
                    <SelectionBar key={item.id} item={item}/>
                ))
            }
        </>
    );
};

export default Main;