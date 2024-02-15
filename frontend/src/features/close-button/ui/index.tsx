import {FC} from "react";

const CloseButton: FC<{ onClick: () => void }> = ({onClick}) => {
    return (
        <div onClick={onClick} style={{cursor: 'pointer'}}>
            <svg width="25" height="25" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 fill="#000000">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <desc>Created with Sketch Beta.</desc>
                    <defs></defs>
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Icon-Set-Filled"
                           transform="translate(-469.000000, -1041.000000)" fill="#000000">
                            <path
                                d="M487.148,1053.48 L492.813,1047.82 C494.376,1046.26 494.376,1043.72 492.813,1042.16 C491.248,1040.59 488.712,1040.59 487.148,1042.16 L481.484,1047.82 L475.82,1042.16 C474.257,1040.59 471.721,1040.59 470.156,1042.16 C468.593,1043.72 468.593,1046.26 470.156,1047.82 L475.82,1053.48 L470.156,1059.15 C468.593,1060.71 468.593,1063.25 470.156,1064.81 C471.721,1066.38 474.257,1066.38 475.82,1064.81 L481.484,1059.15 L487.148,1064.81 C488.712,1066.38 491.248,1066.38 492.813,1064.81 C494.376,1063.25 494.376,1060.71 492.813,1059.15 L487.148,1053.48"
                                id="cross"></path>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default CloseButton;