export const contextMenuPosition = (x: number, y: number, width: number) => {
    if (x >= 1100) {
        return {
            top: `calc(${y}px - 83px)`,
            left: `calc(${x}px - 280px - ${width}px)`
        }
    } else {
        return {
            top: `calc(${y}px - 83px)`,
            left: `calc(${x}px - 280px)`
        }
    }
}