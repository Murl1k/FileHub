import styles from './styles.module.scss'
import {FC, HTMLAttributes, MouseEvent, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Transition} from "react-transition-group";
import {FolderSvg} from "../../../app/assets/images";
import {getTransitionStyles} from "../../popups";
import {IFolderData} from "../../../shared/types";
import {useOutsideClick} from "../../../shared/lib/hooks/useOutsideClick.ts";
import {OptionButton} from "../../../shared/UIKit/buttons";

interface IBreadCrumbs extends HTMLAttributes<HTMLElement> {
    foldersAncestors: IFolderData[] | undefined
}

const Breadcrumbs: FC<IBreadCrumbs> = ({foldersAncestors, ...props}) => {

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)

    const popupRef = useRef<HTMLDivElement>(null)
    useOutsideClick(popupRef, () => setIsOpen(false), isOpen)

    const start = foldersAncestors?.length ? foldersAncestors.length - 4 : 0;

    const crumbs = foldersAncestors?.slice(start > 0 ? start : 0, foldersAncestors?.length)
        .map(item => (
                <li className={styles.crumb} key={item.id}>
                    <Link to={`/folder/${item.id}`}>{item.title}</Link>
                </li>
            )
        )

    const handleNavigate = (link: string) => {
        navigate(link)
        setIsOpen(false)
    }

    const popupCrumbs = [...foldersAncestors || []].slice(0, start)
        .reverse()
        .map(item => (
            <div onClick={() => handleNavigate(`/folder/${item.id}`)} key={item.id}>
                <FolderSvg/>
                <p>{item.title}</p>
            </div>
        ))

    const handleOpenCrumbs = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        setIsOpen(!isOpen)
    }

    return (
        <nav {...props} className={styles.breadcrumbs}>
            <ul>
                {start > 0 ?
                    <li className={styles.openPopupCrumbs}>
                        <OptionButton onClick={handleOpenCrumbs}/>
                    </li> :
                    <li className={styles.crumb}>
                        <Link to='/'>My Cloud</Link>
                    </li>
                }
                <Transition in={isOpen} timeout={200} unmountOnExit>
                    {state => (
                        <div
                            ref={popupRef}
                            style={getTransitionStyles(state)}
                            className={styles.popupCrumbs}
                        >
                            <section>
                                {popupCrumbs}
                                <div onClick={() => handleNavigate('/')}>
                                    <svg width="30" height="30" viewBox="0 -3 20 20" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg"
                                         fill="#808080">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <g id="Dribbble-Light-Preview"
                                                   transform="translate(-140.000000, -3442.000000)" fill="#808080">
                                                    <g id="icons" transform="translate(56.000000, 160.000000)">
                                                        <path
                                                            d="M98.8968326,3293.97071 C88.4628326,3293.97071 87.7908326,3294.27678 86.7908326,3293.53604 C84.6948326,3291.98278 87.1428326,3288.76062 89.2388326,3290.42255 C87.1828326,3283.66917 97.5638326,3281.38814 98.9018326,3287.99895 C102.844833,3287.85838 103.156833,3293.97071 98.8968326,3293.97071 M100.447833,3286.23135 C100.447833,3286.23135 99.7448326,3284.42088 97.8888326,3283.18166 C93.5658326,3280.29647 87.7268326,3282.98725 87.0668326,3288.08569 C87.0618326,3288.12257 87.0078326,3288.12457 87.0378326,3288.11759 C86.0858326,3288.35287 85.2678326,3288.92612 84.7218326,3289.70175 C83.6068326,3291.28492 83.7338326,3293.59885 85.4518326,3294.99359 C87.0438326,3296.28564 87.5318326,3295.96462 98.7728326,3295.96462 C100.090833,3295.96462 101.337833,3295.4811 102.282833,3294.67058 C105.282833,3292.09943 104.160833,3287.35591 100.447833,3286.23135"
                                                            id="cloud-[#808080]"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    <p>My Cloud</p>
                                </div>
                            </section>
                        </div>
                    )}
                </Transition>
                {crumbs}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;