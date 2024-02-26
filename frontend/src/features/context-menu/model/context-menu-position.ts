import {CSSProperties} from "react";

export const contextMenuPosition = (x: number, y: number, width: number, height: number): CSSProperties => {
    const maxHeight = 1000 - height - 40
    const top = y > maxHeight ? maxHeight : `calc(${y}px)`;
    const left = x >= 1100 ? `calc(${x}px - ${width}px)` : `calc(${x}px)`;

    return {top, left, position: "fixed"};
}
