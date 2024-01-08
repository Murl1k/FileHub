import styles from "./styles.module.scss";
import {FC, HTMLAttributes} from "react";
import {IItem} from "../../main/ui";

interface IGridItem extends HTMLAttributes<HTMLDivElement> {
    item: IItem
}

const GridItem: FC<IGridItem> = ({item, ...props}) => {
    return (
        <div {...props} className={styles.item}>
            <div style={{padding: '20px'}}>
                <div className={styles.itemHeadline}>
                    <svg width='50' height='50' viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M2 7c0-1.4 0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.093C3.9 3 4.6 3 6 3h1.431c.94 0 1.409 0 1.835.13a3 3 0 0 1 1.033.552c.345.283.605.674 1.126 1.455L12 6h6c1.4 0 2.1 0 2.635.272a2.5 2.5 0 0 1 1.092 1.093C22 7.9 22 8.6 22 10v5c0 1.4 0 2.1-.273 2.635a2.5 2.5 0 0 1-1.092 1.092C20.1 19 19.4 19 18 19H6c-1.4 0-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092C2 17.1 2 16.4 2 15V7z"
                                fill="#583DA1"></path>
                        </g>
                    </svg>
                    <div>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <h4>{item.title}</h4>
                <p>{item.files} files</p>
            </div>
            <div className={styles.itemFooter}>
                <h5>{item.size} Mb</h5>
                <img src="" alt=""/>
            </div>
        </div>
    );
};

export default GridItem;