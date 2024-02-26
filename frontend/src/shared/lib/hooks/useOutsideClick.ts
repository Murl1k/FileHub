import {RefObject, useEffect, useRef} from "react";

export const useOutsideClick = (elementRef: RefObject<HTMLElement>, handler: () => void, attached: boolean = true) => {

    const savedHandler = useRef(handler)

    useEffect(() => {
        savedHandler.current = handler
    }, [handler]);

    useEffect(() => {
        if (!attached) return

        const handleClickOutside = (e: MouseEvent) => {
            if (!elementRef.current?.contains(e.target as Node)) {
                savedHandler.current()
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => document.removeEventListener('click', handleClickOutside)
    }, [elementRef, savedHandler, attached])
}