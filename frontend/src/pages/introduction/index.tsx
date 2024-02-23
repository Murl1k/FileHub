import styles from './styles.module.scss';
import {PrimaryButton} from "../../shared/UIKit/buttons";
import {Link} from "react-router-dom";

const Introduction = () => {
    return (
        <div className={styles.introduction}>
            <header className={styles.header}>
                <img src="/logo.png" alt="logo"/>
                <div>
                    <Link to='/auth/login'>
                        <button>Sign in</button>
                    </Link>
                    <Link to='/auth/register'>
                        <PrimaryButton>Create an account</PrimaryButton>
                    </Link>
                </div>
            </header>
            <main className={styles.main}>
                <section className={styles.mainSection}>
                    <div>
                        <h1>File storage and sharing <span>platform</span></h1>
                        <p>
                            FileHub offers users a secure platform to organize and share their files effortlessly.
                            With its user-friendly interface,
                            managing and exchanging documents becomes convenient and efficient.
                        </p>
                        <Link to='/auth/register'>
                            <PrimaryButton>Get started</PrimaryButton>
                        </Link>
                    </div>
                    <img src="/src/app/assets/images/storage.jpg" alt="main-section"/>
                </section>
                <section className={styles.infoSection}>
                    <h1>Simplifying <span>File Management</span> Effortlessly.</h1>
                    <div className={styles.wrapper}>
                        <article className={styles.wrapperItem}>
                            <span>File Sharing</span>
                            <p>
                                Secure file sharing between users, as well as access control and easy navigation
                            </p>
                            <img src="/src/app/assets/images/file-sharing.svg" alt="file-sharing"/>
                        </article>
                        <article className={styles.wrapperItem}>
                            <span>Collect Files</span>
                            <p>
                                You can collect and receive files in a secure environment, even if the other person
                                doesn’t have a FileHub account.
                            </p>
                            <img src="/src/app/assets/images/collect-files.svg" alt="collect-files"/>
                        </article>
                    </div>
                </section>
                <section className={styles.howItWorks}>
                    <h2>How it works?</h2>
                    <p>
                        FileHub removes complexity and offers a simple interface that allows users to
                        take advantage of the vast array of storage with better security and performance.
                    </p>
                    <div className={styles.instruction}>
                        <article className={styles.instructionItem}>
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="40" cy="40" r="40" fill="#651FFF"/>
                                <svg x="22" y="22" width="41" height="32" viewBox="0 0 41 32" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_959_3185)">
                                        <path
                                            d="M23.7928 26.2876C23.6318 26.4446 23.522 26.6448 23.4774 26.8628L22.5625 31.3259C22.482 31.719 22.8376 32.0659 23.241 31.9878L27.8163 31.0947C28.0394 31.051 28.2444 30.9443 28.4054 30.7871L36.4324 22.9558L31.8193 18.4552L23.7928 26.2876ZM40.3273 15.9814L38.9756 14.662C38.0749 13.7832 36.6149 13.7832 35.7142 14.662L33.2715 17.0457L37.8846 21.5464L40.3273 19.1632C41.2242 18.2814 41.2242 16.8564 40.3273 15.9814Z"
                                            fill="white"/>
                                        <path opacity="0.4"
                                              d="M14.2923 16C18.8216 16 22.4923 12.4181 22.4923 8C22.4923 3.58187 18.8216 0 14.2923 0C9.82078 0 6.15 3.58187 6.15 8C6.15 12.4181 9.82078 16 14.2923 16ZM17.598 19H11.102C4.97189 19 0 23.8563 0 29.8375C0 31.0312 0.99425 32 2.22041 32H20.5679C20.4881 31.6543 20.4763 31.2931 20.5498 30.935L21.4646 26.4719C21.589 25.8642 21.8923 25.3119 22.341 24.8744L25.2699 22.0169C23.2739 20.15 20.5769 19 17.598 19Z"
                                              fill="white"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_959_3185">
                                            <rect width="41" height="32" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </svg>
                            <h5>Create an account</h5>
                            <p>Create a FileHub account and start uploading your files to the Cloud Storage.</p>
                        </article>
                        <article className={styles.instructionItem}>
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="40" cy="40" r="40" fill="#651FFF"/>
                                <svg x="21" y="19" width="36" height="36" viewBox="0 0 36 36" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_959_3188)">
                                        <path
                                            d="M7.41094 12.8391C6.53273 11.9609 6.53273 10.5363 7.41094 9.65742L16.4109 0.657422C16.8469 0.219727 17.4234 0 18 0C18.5766 0 19.1517 0.219727 19.5905 0.65918L28.5905 9.65918C29.4687 10.5374 29.4687 11.9619 28.5905 12.8408C27.7116 13.719 26.287 13.7197 25.4088 12.8409L20.25 7.68516V24.75C20.25 25.9924 19.2424 27 18 27C16.7576 27 15.75 25.9924 15.75 24.75V7.68516L10.5891 12.8391C9.71016 13.718 8.28984 13.718 7.41094 12.8391Z"
                                            fill="white"/>
                                        <path opacity="0.4"
                                              d="M33.75 24.75H22.5C22.5 27.2355 20.4855 29.25 18 29.25C15.5145 29.25 13.5 27.2355 13.5 24.75H2.25C1.00758 24.75 0 25.7576 0 27V33.75C0 34.9924 1.00758 36 2.25 36H33.75C34.9924 36 36 34.9924 36 33.75V27C36 25.7555 34.9945 24.75 33.75 24.75ZM30.375 32.0625C29.4469 32.0625 28.6875 31.3031 28.6875 30.375C28.6875 29.4469 29.4469 28.6875 30.375 28.6875C31.3031 28.6875 32.0625 29.4469 32.0625 30.375C32.0625 31.3031 31.3031 32.0625 30.375 32.0625Z"
                                              fill="white"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_959_3188">
                                            <rect width="36" height="36" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </svg>
                            <h5>Upload your files</h5>
                            <p>
                                Your file is encrypted and split into pieces then distributed to the nodes around the
                                world.
                            </p>
                        </article>
                        <article className={styles.instructionItem}>
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="40" cy="40" r="40" fill="#651FFF"/>
                                <svg x="15" y="20" width="45" height="36" viewBox="0 0 45 36" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.2335 31.5562C0.263027 27.5835 0.263027 21.1429 4.2335 17.1773L12.1289 9.21788C16.0383 5.30921 22.5351 5.30921 26.4445 9.21788C29.9601 12.7335 30.4805 18.3374 27.5906 22.3804L27.5133 22.4929C26.789 23.4983 25.3828 23.7374 24.3773 23.0132C23.3648 22.289 23.1258 20.8827 23.85 19.8773L23.9273 19.7648C25.5375 17.5077 25.2844 14.421 23.3226 12.4593C21.1148 10.2515 17.5219 10.2515 15.307 12.4593L7.41796 20.3554C5.20241 22.5069 5.20241 26.1562 7.41796 28.371C9.37264 30.3327 12.4664 30.5858 14.7164 28.9757L14.8289 28.8351C15.8414 28.1741 17.2476 28.4062 17.9648 29.4187C18.6891 30.4312 18.457 31.8374 17.4445 32.5616L17.332 32.639C13.2258 35.5288 7.74843 35.0648 4.2335 31.5562Z"
                                        fill="white"/>
                                    <path opacity="0.4"
                                          d="M40.7672 4.44664C44.7399 8.41648 44.7399 14.8571 40.7672 18.8227L32.8711 26.7188C28.8984 30.6915 22.4649 30.6915 18.4922 26.7188C14.9766 23.2032 14.5195 17.6626 17.4094 13.6196L17.4867 13.5071C18.1477 12.5016 19.5539 12.2626 20.6227 12.9868C21.6352 13.6477 21.8742 15.054 21.15 16.1227L21.0727 16.2352C19.4625 18.429 19.7156 21.579 21.6774 23.5407C23.8852 25.7485 27.4781 25.7485 29.693 23.5407L37.582 15.6446C39.7969 13.4298 39.7969 9.78055 37.582 7.62898C35.6274 5.66937 32.5336 5.41344 30.2836 7.0243L30.1711 7.10164C29.1586 7.82586 27.7524 7.53055 27.0352 6.57992C26.3109 5.56883 26.543 4.16328 27.5555 3.44117L27.668 3.36242C31.7109 0.473351 37.2516 0.931718 40.7672 4.44664Z"
                                          fill="white"/>
                                </svg>
                            </svg>
                            <h5>Share file instantly</h5>
                            <p>Change the privacy of your folder and share the link to that folder with other users.</p>
                        </article>
                    </div>
                </section>
                <section className={styles.startSection}>
                    <div>
                        <h4>Ready to get started?</h4>
                        <p>Storing and sharing files in a cloud storage suitable for all operations.</p>
                    </div>
                    <Link to='/auth/register'>
                        <PrimaryButton>Create an account</PrimaryButton>
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default Introduction;