import styles from "./styles.module.scss";
import {MainContainer} from "../../../features/main-container";
import {GridItem} from "../../grid-item";
import {useEffect, useState} from "react";
import {IMergedData} from "../../../shared/types";
import {useNavigate, useParams} from "react-router-dom";
import {useGetFilesQuery, useGetFoldersQuery} from "../../../shared/api/api.ts";
import {SelectionBar} from "../../../features/selection-bar";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {ItemTemplate} from "../../../features/item-template";
import {ListItem} from "../../list-item";

const Main = () => {

    const navigate = useNavigate()

    const {id} = useParams() as { id: string }

    const [isGrid, setIsGrid] = useState(true)

    const {id: activeId, status} = useAppSelector(state => state.itemTemplate)

    const {data: folders, isError} = useGetFoldersQuery(id)
    const {data: files} = useGetFilesQuery(id)

    const mergedData: IMergedData[] = [
        ...(folders ? folders : []),
        ...(files ? files : [])
    ] as IMergedData[]

    const sortedMergedData = mergedData
        .sort((a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())

    const selectionBarData = sortedMergedData.filter(item => item.id === activeId)

    useEffect(() => {
        if (isError) {
            navigate('/')
        }
    }, [isError, navigate]);

    return (
        <>
            <MainContainer>
                <div className={styles.storageHeadline}>
                    <div>
                        <h2>My Cloud</h2>
                        <p>Sort by: Type</p>
                    </div>
                    <div onClick={e => e.stopPropagation()}>
                        <button className={isGrid ? styles.activeBtn : ''} onClick={() => setIsGrid(true)}>
                            <svg width={16} height={16} viewBox="0 0 28 28" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="#000000">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <defs></defs>
                                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <g id="Icon-Set-Filled"
                                           transform="translate(-104.000000, -935.000000)" fill="#cccccc">
                                            <path
                                                d="M128,935 L124,935 C121.791,935 120,936.791 120,939 L120,943 C120,945.209 121.791,947 124,947 L128,947 C130.209,947 132,945.209 132,943 L132,939 C132,936.791 130.209,935 128,935 L128,935 Z M128,951 L124,951 C121.791,951 120,952.791 120,955 L120,959 C120,961.209 121.791,963 124,963 L128,963 C130.209,963 132,961.209 132,959 L132,955 C132,952.791 130.209,951 128,951 L128,951 Z M112,951 L108,951 C105.791,951 104,952.791 104,955 L104,959 C104,961.209 105.791,963 108,963 L112,963 C114.209,963 116,961.209 116,959 L116,955 C116,952.791 114.209,951 112,951 L112,951 Z M112,935 L108,935 C105.791,935 104,936.791 104,939 L104,943 C104,945.209 105.791,947 108,947 L112,947 C114.209,947 116,945.209 116,943 L116,939 C116,936.791 114.209,935 112,935 L112,935 Z"
                                                id="grid"></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </button>
                        <button className={!isGrid ? styles.activeBtn : ''} onClick={() => setIsGrid(false)}>
                            <svg width={16} height={16} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"
                                 fill="#000000">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
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
                        {sortedMergedData.map(item => {
                            const itemProps = {
                                isGrid,
                                item
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
                        {sortedMergedData.map(item => {
                            const itemProps = {
                                isGrid,
                                item
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
            </MainContainer>
            {status &&
                selectionBarData.map(item => {
                    const selectionProps = {
                        name: item.name,
                        title: item.title,
                        itemId: item.id,
                        url: item.url
                    }

                    return <SelectionBar key={item.id} selectionProps={selectionProps}/>
                })
            }
        </>
    );
};

export default Main;