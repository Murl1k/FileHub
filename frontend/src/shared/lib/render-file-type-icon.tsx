import { FileSvg } from "../../app/assets/images";

export const renderFileTypeIcon = (name: string) => {
    const type = name.replace(/^.*\.([^.]+)$/, '$1')

    switch (type) {
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'webp':
        case 'svg':
        case 'avif':
        case 'gif':
            return (
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
        <path fillRule="evenodd" clipRule="evenodd"
            d="M2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5ZM7.5 10C8.88071 10 10 8.88071 10 7.5C10 6.11929 8.88071 5 7.5 5C6.11929 5 5 6.11929 5 7.5C5 8.88071 6.11929 10 7.5 10ZM10.3536 13.3536L12.5 15.5L18.1464 9.85355C18.4614 9.53857 19 9.76165 19 10.2071V19H5V18L9.64645 13.3536C9.84171 13.1583 10.1583 13.1583 10.3536 13.3536Z"
            fill="#583DA1"></path>
                </g>
                </svg>
        );
        case 'mp3':
        case 'mp4':
        case 'avi':
        case 'mov':
        case 'mkv':
        case 'wmv':
            return (
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
        <path d="M14.7295 2H9.26953V6.36H14.7295V2Z" fill="#583DA1"></path>
            <path d="M16.2305 2V6.36H21.8705C21.3605 3.61 19.3305 2.01 16.2305 2Z" fill="#583DA1"></path>
            <path
            d="M2 7.85938V16.1894C2 19.8294 4.17 21.9994 7.81 21.9994H16.19C19.83 21.9994 22 19.8294 22 16.1894V7.85938H2ZM14.44 16.1794L12.36 17.3794C11.92 17.6294 11.49 17.7594 11.09 17.7594C10.79 17.7594 10.52 17.6894 10.27 17.5494C9.69 17.2194 9.37 16.5394 9.37 15.6594V13.2594C9.37 12.3794 9.69 11.6994 10.27 11.3694C10.85 11.0294 11.59 11.0894 12.36 11.5394L14.44 12.7394C15.21 13.1794 15.63 13.7994 15.63 14.4694C15.63 15.1394 15.2 15.7294 14.44 16.1794Z"
            fill="#583DA1"></path>
                <path d="M7.76891 2C4.66891 2.01 2.63891 3.61 2.12891 6.36H7.76891V2Z" fill="#583DA1"></path>
            </g>
            </svg>
        );
        default:
            return <FileSvg/>;
    }
}
