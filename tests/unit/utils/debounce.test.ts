import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { debounce } from '@/debounce'

describe('debounce', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('returns a function with a cancel method', () => {
        const fn = vi.fn()
        const debounced = debounce(fn, 50)

        expect(typeof debounced).toBe('function')
        expect(typeof debounced.cancel).toBe('function')
    })

    it('invokes the original function after the wait period', () => {
        const fn = vi.fn()
        const debounced = debounce(fn, 100)

        debounced()
        expect(fn).not.toHaveBeenCalled()

        vi.advanceTimersByTime(100)
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('passes arguments through to the original function', () => {
        const fn = vi.fn()
        const debounced = debounce(fn, 100)

        debounced(1, 'a', { foo: true })
        vi.advanceTimersByTime(100)

        expect(fn).toHaveBeenCalledWith(1, 'a', { foo: true })
    })

    it('resets the timer if called again before the timeout', () => {
        const fn = vi.fn()
        const debounced = debounce(fn, 100)

        debounced()
        vi.advanceTimersByTime(50)
        debounced()

        // first call should have been cancelled
        vi.advanceTimersByTime(50)
        expect(fn).not.toHaveBeenCalled()

        // now let the second call fire
        vi.advanceTimersByTime(50)
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('allows cancellation before the function executes', () => {
        const fn = vi.fn()
        const debounced = debounce(fn, 100)

        debounced()
        debounced.cancel()
        vi.advanceTimersByTime(200)

        expect(fn).not.toHaveBeenCalled()
    })

    it('cancel() is safe to call multiple times or after execution', () => {
        const fn = vi.fn()
        const debounced = debounce(fn, 50)

        debounced()
        vi.advanceTimersByTime(50)
        expect(fn).toHaveBeenCalledTimes(1)

        // should not throw or do anything
        expect(() => debounced.cancel()).not.toThrow()
        expect(() => debounced.cancel()).not.toThrow()
    })

    it('uses a default wait of 100ms when none is provided', () => {
        const fn = vi.fn()
        const debounced = debounce(fn)

        debounced()
        vi.advanceTimersByTime(100)
        expect(fn).toHaveBeenCalledTimes(1)
    })
})
