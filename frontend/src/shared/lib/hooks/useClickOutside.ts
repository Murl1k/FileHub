import {RefObject, useEffect} from "react";

export const useOutsideClick = (elementRef: RefObject<HTMLElement>, handler: () => void, attached: boolean = true) => {
    useEffect(() => {
        if (!attached) return

        const handleClickOutside = (e: MouseEvent) => {
            if (!elementRef.current?.contains(e.target as Node)) {
                handler()
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => document.removeEventListener('click', handleClickOutside)
    }, [elementRef, handler, attached])
}