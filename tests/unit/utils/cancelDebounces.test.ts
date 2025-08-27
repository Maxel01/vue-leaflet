import { describe, it, expect, vi } from 'vitest'
import { cancelDebounces } from '../../../src/utils'
import type { LeafletEventHandlerFnMap } from 'leaflet'

// Helper type for handlers with cancel method
type CancellableHandler = {
    (): void
    cancel: () => void
}

describe('cancelDebounces', () => {
    it('calls cancel on all handlers that have a cancel method', () => {
        const cancelClick = vi.fn()
        const cancelZoom = vi.fn()

        const clickHandler: CancellableHandler = Object.assign(() => {}, { cancel: cancelClick })
        const zoomHandler: CancellableHandler = Object.assign(() => {}, { cancel: cancelZoom })

        const handlers: LeafletEventHandlerFnMap = {
            click: clickHandler,
            zoom: zoomHandler
        }

        cancelDebounces(handlers)

        expect(cancelClick).toHaveBeenCalledOnce()
        expect(cancelZoom).toHaveBeenCalledOnce()
    })

    it('does not throw if handlers do not have cancel method', () => {
        const handlers: LeafletEventHandlerFnMap = {
            click: () => {},
            zoom: () => {}
        }

        expect(() => cancelDebounces(handlers)).not.toThrow()
    })

    it('skips undefined or null handlers', () => {
        const handlers: LeafletEventHandlerFnMap = {
            click: undefined,
            zoom: null
        }

        expect(() => cancelDebounces(handlers)).not.toThrow()
    })

    it('ignores non-function cancel properties', () => {
        const handler = Object.assign(() => {}, { cancel: 'notAFunction' })

        const handlers: LeafletEventHandlerFnMap = {
            move: handler
        }

        expect(() => cancelDebounces(handlers)).not.toThrow()
    })
})
