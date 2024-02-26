export * from './types.ts'
export * from './popup.slice.ts'

const transitionStyles = {
    entering: {opacity: 1},
    entered: {opacity: 1},
    exiting: {opacity: 0},
    exited: {opacity: 0},
}

export const getTransitionStyles = (transitionState: string) => {
    return transitionStyles[transitionState as keyof typeof transitionStyles]

}