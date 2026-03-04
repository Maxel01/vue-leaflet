import type { DebouncedFunction } from 'ts-debounce'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = <Args extends any[], F extends (...args: Args) => any>(
    func: F,
    waitMs = 100
): DebouncedFunction<any[], F> => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const debouncedFunction = ((...args: Parameters<F>) => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            timeoutId = null
            func(...args)
        }, waitMs)
    }) as DebouncedFunction<any[], F>

    debouncedFunction.cancel = () => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
            timeoutId = null
        }
    }

    return debouncedFunction
}
