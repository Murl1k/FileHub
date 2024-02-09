import styles from "./styles.module.scss";
import {Transition} from "react-transition-group";
import {HeaderButton} from "../../../shared/UIKit/buttons";

const File = ({view}: { view: boolean }) => {
    return (
        <Transition in={view} timeout={300} unmountOnExit={true}>
            {(state) => (
                <div className={`${styles.file} ${styles[state]}`}>
                    <img style={{borderRadius: '12px', objectFit: 'cover'}} height='170px' width='100%'
                         src="https://masterpiecer-images.s3.yandex.net/3fa445469f7711eebf685a76f5576984:upscaled"
                         alt="img"/>
                    <div className={styles.btns}>
                        <HeaderButton>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_blackgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                   strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M12 1.25C11.5858 1.25 11.25 1.58579 11.25 2V12.9726L9.56944 11.0119C9.29988 10.6974 8.8264 10.661 8.51191 10.9306C8.19741 11.2001 8.16099 11.6736 8.43056 11.9881L11.4306 15.4881C11.573 15.6543 11.7811 15.75 12 15.75C12.2189 15.75 12.427 15.6543 12.5694 15.4881L15.5694 11.9881C15.839 11.6736 15.8026 11.2001 15.4881 10.9306C15.1736 10.661 14.7001 10.6974 14.4306 11.0119L12.75 12.9726L12.75 2C12.75 1.58579 12.4142 1.25 12 1.25Z"
                                          fill="black"></path>
                                    <path
                                        d="M14.25 9V9.37828C14.9836 9.11973 15.8312 9.2491 16.4642 9.79167C17.4077 10.6004 17.517 12.0208 16.7083 12.9643L13.7083 16.4643C13.2808 16.963 12.6568 17.25 12 17.25C11.3431 17.25 10.7191 16.963 10.2916 16.4643L7.29163 12.9643C6.48293 12.0208 6.5922 10.6004 7.53568 9.79167C8.16868 9.2491 9.01637 9.11973 9.74996 9.37828V9H8C5.17157 9 3.75736 9 2.87868 9.87868C2 10.7574 2 12.1716 2 15V16C2 18.8284 2 20.2426 2.87868 21.1213C3.75736 22 5.17157 22 7.99999 22H16C18.8284 22 20.2426 22 21.1213 21.1213C22 20.2426 22 18.8284 22 16V15C22 12.1716 22 10.7574 21.1213 9.87868C20.2426 9 18.8284 9 16 9H14.25Z"
                                        fill="black"></path>
                                </g>
                            </svg>
                        </HeaderButton>
                        <HeaderButton>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                                        fill="#000000"></path>
                                </g>
                            </svg>
                        </HeaderButton>
                        <HeaderButton>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                   strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M3 6.38597C3 5.90152 3.34538 5.50879 3.77143 5.50879L6.43567 5.50832C6.96502 5.49306 7.43202 5.11033 7.61214 4.54412C7.61688 4.52923 7.62232 4.51087 7.64185 4.44424L7.75665 4.05256C7.8269 3.81241 7.8881 3.60318 7.97375 3.41617C8.31209 2.67736 8.93808 2.16432 9.66147 2.03297C9.84457 1.99972 10.0385 1.99986 10.2611 2.00002H13.7391C13.9617 1.99986 14.1556 1.99972 14.3387 2.03297C15.0621 2.16432 15.6881 2.67736 16.0264 3.41617C16.1121 3.60318 16.1733 3.81241 16.2435 4.05256L16.3583 4.44424C16.3778 4.51087 16.3833 4.52923 16.388 4.54412C16.5682 5.11033 17.1278 5.49353 17.6571 5.50879H20.2286C20.6546 5.50879 21 5.90152 21 6.38597C21 6.87043 20.6546 7.26316 20.2286 7.26316H3.77143C3.34538 7.26316 3 6.87043 3 6.38597Z"
                                        fill="#000000"></path>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M11.5956 22.0001H12.4044C15.1871 22.0001 16.5785 22.0001 17.4831 21.1142C18.3878 20.2283 18.4803 18.7751 18.6654 15.8686L18.9321 11.6807C19.0326 10.1037 19.0828 9.31524 18.6289 8.81558C18.1751 8.31592 17.4087 8.31592 15.876 8.31592H8.12404C6.59127 8.31592 5.82488 8.31592 5.37105 8.81558C4.91722 9.31524 4.96744 10.1037 5.06788 11.6807L5.33459 15.8686C5.5197 18.7751 5.61225 20.2283 6.51689 21.1142C7.42153 22.0001 8.81289 22.0001 11.5956 22.0001ZM10.2463 12.1886C10.2051 11.7548 9.83753 11.4382 9.42537 11.4816C9.01321 11.525 8.71251 11.9119 8.75372 12.3457L9.25372 17.6089C9.29494 18.0427 9.66247 18.3593 10.0746 18.3159C10.4868 18.2725 10.7875 17.8856 10.7463 17.4518L10.2463 12.1886ZM14.5746 11.4816C14.9868 11.525 15.2875 11.9119 15.2463 12.3457L14.7463 17.6089C14.7051 18.0427 14.3375 18.3593 13.9254 18.3159C13.5132 18.2725 13.2125 17.8856 13.2537 17.4518L13.7537 12.1886C13.7949 11.7548 14.1625 11.4382 14.5746 11.4816Z"
                                          fill="#000000"></path>
                                </g>
                            </svg>
                        </HeaderButton>
                        <HeaderButton>
                            <svg width="30px" height="30px" viewBox="-4 0 30 30" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="#000000">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                   strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"><title>bookmark</title>
                                    <desc>Created with Sketch Beta.</desc>
                                    <defs></defs>
                                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none"
                                       fillRule="evenodd">
                                        <g id="Icon-Set-Filled"
                                           transform="translate(-419.000000, -153.000000)" fill="#000000">
                                            <path
                                                d="M437,153 L423,153 C420.791,153 419,154.791 419,157 L419,179 C419,181.209 420.791,183 423,183 L430,176 L437,183 C439.209,183 441,181.209 441,179 L441,157 C441,154.791 439.209,153 437,153"
                                                id="bookmark"></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </HeaderButton>
                        <HeaderButton>
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                   strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75ZM12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z"
                                          fill="#000000"></path>
                                </g>
                            </svg>
                        </HeaderButton>
                    </div>
                    <div className={styles.tags}>
                        <h4>My first render</h4>
                        <p>PNG-image</p>
                        <div>
                            <button>3d concept</button>
                            <button>futuristic</button>
                            <button>purple</button>
                            <button>minimalistic</button>
                            <button>highly detailed</button>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <h5>Description</h5>
                        <p>So this is my first attempt with 3D art fm
                            trying out Adobe Dimension. and curious as to
                            what other programs. people recommend for
                            3D modeling,</p>
                    </div>
                    <div className={styles.fileInfo}>
                        <h5>Info</h5>
                        <div>
                            <p>Size</p>
                            <h5>3840 x 2160</h5>
                        </div>
                        <div>
                            <p>Date</p>
                            <h5>18 sep 2022</h5>
                        </div>
                    </div>
                    <div className={styles.shareInfo}>
                        <h5>Share with</h5>
                        <div>
                        <span>
                            <img
                                src="https://get.pxhere.com/photo/person-girl-woman-hair-photography-portrait-model-youth-fashion-blue-lady-hairstyle-smile-long-hair-face-dress-eye-head-skin-beauty-blond-photo-shoot-brown-hair-portrait-photography-108386.jpg"
                                alt="avatar"/>
                        </span>
                            <span>
                            <img src="https://i.pinimg.com/originals/88/0c/03/880c03bfa39cc434f2a0d6fcf81892ff.jpg"
                                 alt="avatar"/>
                        </span>
                            <span>
                            <img
                                src="https://catherineasquithgallery.com/uploads/posts/2021-02/1614523089_178-p-litso-na-belom-fone-225.jpg"
                                alt="avatar"/>
                        </span>
                            <span>
                            <HeaderButton>
                                <svg width="28" height="28" viewBox="0 0 24 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z"
                                              fill="#000000"></path>
                                    </g>
                                </svg>
                            </HeaderButton>
                        </span>
                        </div>
                    </div>
                </div>
            )}
        </Transition>
    );
};

export default File;