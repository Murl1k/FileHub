import styles from './styles.module.scss';
import {FC, HTMLAttributes} from "react";

interface IViewSwitcher extends HTMLAttributes<HTMLDivElement> {
    isGrid: boolean
    setView: (value: boolean) => void
}

const ViewSwitcher: FC<IViewSwitcher> = ({isGrid, setView}) => {
    return (
        <div className={styles.viewSwitcher}>
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
    );
};

export default ViewSwitcher;